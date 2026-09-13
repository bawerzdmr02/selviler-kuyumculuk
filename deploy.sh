#!/usr/bin/env bash
#
# Selviler Kuyumculuk — zero-downtime deploy
#
# Sunucuda (deploy kullanıcısı, repo kökünde):
#   chmod +x deploy.sh
#   ./deploy.sh
#
# Akış: git pull → frontend bağımlılık / build → pm2 reload (restart değil)
# Faz 2: prisma migrate deploy satırının yorumunu kaldır.
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="${ROOT_DIR}/frontend"
APP_NAME="selviler-frontend"
BRANCH="${DEPLOY_BRANCH:-main}"

log() {
  printf '\n[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Hata: '$1' bulunamadı." >&2
    exit 1
  fi
}

require_cmd git
require_cmd npm
require_cmd pm2

cd "${ROOT_DIR}"

log "1/5 Kod çekiliyor (branch: ${BRANCH})"
git fetch origin "${BRANCH}"
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

log "2/5 Frontend bağımlılıkları"
cd "${FRONTEND_DIR}"
if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

log "3/5 Production build"
npm run build

# Faz 2 — backend Prisma migrations (backend hazır olunca aç):
# log "3b/5 Prisma migrate deploy"
# cd "${ROOT_DIR}/backend"
# npx prisma migrate deploy

cd "${ROOT_DIR}"
mkdir -p "${ROOT_DIR}/logs"

log "4/5 PM2 zero-downtime reload"
if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
  # Cluster reload: instance'lar sırayla yenilenir, trafik kesilmez
  pm2 reload ecosystem.config.js --env production --update-env
else
  log "İlk kurulum: pm2 start"
  pm2 start ecosystem.config.js --env production
  pm2 save
fi

log "5/5 Durum"
pm2 show "${APP_NAME}" | sed -n '1,25p' || pm2 list

log "Deploy tamamlandı (zero-downtime reload)."
