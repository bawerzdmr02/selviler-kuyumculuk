# Selviler Kuyumculuk

Lüks kuyumculuk markası için e-ticaret ve dijital vitrin monoreposu.

**Teknoloji:** Next.js (App Router) + Tailwind CSS · Node.js + Express.js · PostgreSQL · Ubuntu VPS (Nginx + PM2 + Let's Encrypt) · İyzico · Capacitor

## Yapı

```
selviler-kuyumculuk/
├── frontend/   # Next.js App Router (Faz 1 dijital vitrin → Faz 2 e-ticaret UI)
├── backend/    # Express.js API (Faz 2'de)
└── Selviler-Kuyumculuk-Master-Checklist.md
```

## Gereksinimler

- Node.js LTS (önerilen: `nvm install --lts && nvm use --lts`)
- npm

## Kurulum

```bash
# Node LTS (nvm ile)
nvm install --lts && nvm use --lts

# Frontend bağımlılıkları
cd frontend
npm install

# Geliştirme sunucusu
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışır.

## Mimari not

Frontend **Node process** modunda çalışır (`next build` + `next start` / PM2). `output: 'export'` kullanılmaz — Faz 2'de middleware, server actions ve API route'lar için Node sunucusu gereklidir.

## Branch stratejisi

| Branch        | Amaç                                      |
|---------------|-------------------------------------------|
| `main`        | Canlı (production)                        |
| `develop`     | Entegrasyon / geliştirme hattı            |
| `feature/*`   | Özellik dalları (`feature/hero-section`)  |

Akış: `feature/*` → `develop` → `main`

## Faydalı komutlar (frontend)

```bash
cd frontend
npm run dev      # geliştirme
npm run build    # üretim derlemesi
npm run start    # üretim sunucusu (Node process)
npm run lint     # ESLint
```
