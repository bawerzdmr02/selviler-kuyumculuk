/**
 * PM2 ecosystem — Selviler Kuyumculuk (Faz 1: Next.js frontend)
 *
 * Sunucuda (deploy kullanıcısı):
 *   pm2 start ecosystem.config.js --env production
 *   pm2 startup && pm2 save
 *
 * Güncelleme (zero-downtime):
 *   ./deploy.sh
 *   # veya: pm2 reload ecosystem.config.js --env production
 *
 * Not: `exec_mode: 'cluster'` ile `next start` doğrudan çalıştırılır.
 * npm wrapper kullanılmaz (cluster altında gereksiz ek process oluşmasını önler).
 */
const path = require("path");

const root = __dirname;
const frontendDir = path.join(root, "frontend");

module.exports = {
  apps: [
    {
      name: "selviler-frontend",
      cwd: frontendDir,
      script: path.join(frontendDir, "node_modules", "next", "dist", "bin", "next"),
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "512M",
      kill_timeout: 5000,
      listen_timeout: 10000,
      // reload sırasında yeni instance'lar hazır olana kadar bekle
      wait_ready: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_PUBLIC_SITE_URL: "https://selvilerkuyumculuk.com",
      },
      error_file: path.join(root, "logs", "pm2-error.log"),
      out_file: path.join(root, "logs", "pm2-out.log"),
      merge_logs: true,
      time: true,
    },
  ],
};
