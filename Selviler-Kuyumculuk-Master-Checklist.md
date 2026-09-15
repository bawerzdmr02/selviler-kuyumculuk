# 🏛️ SELVİLER KUYUMCULUK — MASTER PROJE YOL HARİTASI

**Teknoloji Yığını:** Next.js (App Router) + Tailwind CSS · Node.js + Express.js · PostgreSQL · Ubuntu VPS (Nginx + PM2 + Let's Encrypt) · İyzico · Capacitor

> Bu doküman aylar sürecek bir projenin tek gerçek kaynağıdır (single source of truth). Her maddeyi sırasıyla tamamla, atlama. `- [ ]` kutucuklarını kodladıkça `- [x]` yaparak ilerlemeni takip edebilirsin.

---

## 📚 İÇİNDEKİLER

**FAZ 1 — Açılış İçin Acil Dijital Vitrin (Gün 1-20)**
1. [Proje ve Ortam Hazırlığı](#1-proje-ve-ortam-hazırlığı)
2. [Next.js İskeletinin Kurulması](#2-nextjs-i̇skeletinin-kurulması)
3. [Tasarım Sistemi (Lüks Tema)](#3-tasarım-sistemi-lüks-tema)
4. [Statik Sayfa İçerikleri](#4-statik-sayfa-i̇çerikleri)
5. [SEO, Performans ve Yasal Sayfalar](#5-seo-performans-ve-yasal-sayfalar)
6. [Google İşletme Profili](#6-google-i̇şletme-profili)
7. [Alan Adı (Domain) ve DNS](#7-alan-adı-domain-ve-dns)
8. [VPS Sunucu İlk Kurulumu ve Güvenliği](#8-vps-sunucu-i̇lk-kurulumu-ve-güvenliği)
9. [Node.js ve PM2 Kurulumu](#9-nodejs-ve-pm2-kurulumu)
10. [Nginx Reverse Proxy Kurulumu](#10-nginx-reverse-proxy-kurulumu)
11. [SSL Sertifikası (Let's Encrypt)](#11-ssl-sertifikası-lets-encrypt)
12. [Canlıya Alma, Test ve Açılış Kontrolü](#12-canlıya-alma-test-ve-açılış-kontrolü)

**FAZ 2 — E-Ticaret ve Özel Backend Entegrasyonu**
13. [Sunucuda Veritabanı Kurulumu](#13-sunucuda-veritabanı-kurulumu)
14. [Veritabanı Şema Tasarımı](#14-veritabanı-şema-tasarımı)
15. [Express.js Backend İskeleti](#15-expressjs-backend-i̇skeleti)
16. [Prisma ORM Kurulumu](#16-prisma-orm-kurulumu)
17. [Kimlik Doğrulama (Auth) Sistemi](#17-kimlik-doğrulama-auth-sistemi)
18. [Ürün / Kategori / Stok API](#18-ürün--kategori--stok-api)
19. [Sepet (Cart) Mantığı](#19-sepet-cart-mantığı)
20. [Admin Paneli](#20-admin-paneli)
21. [İyzico Ödeme Entegrasyonu](#21-i̇yzico-ödeme-entegrasyonu)
22. [Güvenlik Sertleştirme](#22-güvenlik-sertleştirme)
23. [Next.js Frontend ↔ Backend Bağlantısı](#23-nextjs-frontend--backend-bağlantısı)
24. [Sipariş Yönetimi ve Bildirimler](#24-sipariş-yönetimi-ve-bildirimler)
25. [Test Süreçleri](#25-test-süreçleri)
26. [Deployment Güncelleme Süreci](#26-deployment-güncelleme-süreci)
27. [Yedekleme (Backup) Stratejisi](#27-yedekleme-backup-stratejisi)

**FAZ 3 — Mobil Uygulama ve Mağazalar**
28. [Mimari Karar: Capacitor Stratejisi](#28-mimari-karar-capacitor-stratejisi)
29. [iOS ve Android Proje Ekleme](#29-ios-ve-android-proje-ekleme)
30. [Native Özellikler ve İzinler](#30-native-özellikler-ve-i̇zinler)
31. [Push Notification Altyapısı](#31-push-notification-altyapısı)
32. [App Icon, Splash Screen ve Marka Kimliği](#32-app-icon-splash-screen-ve-marka-kimliği)
33. [Cihaz Testleri](#33-cihaz-testleri)
34. [Yasal ve Hukuki Hazırlık](#34-yasal-ve-hukuki-hazırlık)
35. [Google Play Store Süreci](#35-google-play-store-süreci)
36. [Apple App Store Süreci](#36-apple-app-store-süreci)
37. [Yayın Sonrası İzleme](#37-yayın-sonrası-i̇zleme)

[📌 Ek: Genel Proje Yönetimi Notları](#-ek-genel-proje-yönetimi-notları)

---
---

# 🟡 FAZ 1 — AÇILIŞ İÇİN ACİL DİJİTAL VİTRİN (Gün 1-20)

> Bu fazda **veritabanı ve e-ticaret yok**. Amaç: 20 gün içinde lüks, hızlı, SEO uyumlu statik bir tanıtım sitesini kendi VPS'imizde canlıya almak.

## 1. Proje ve Ortam Hazırlığı

- [x] VS Code + Node.js LTS (nvm üzerinden) yerel makineye kurulumu
- [x] `nvm install --lts && nvm use --lts` ile Node sürümünü sabitle
- [x] GitHub/GitLab üzerinde **private** repo oluştur: `selviler-kuyumculuk`
- [x] Repo içinde `frontend/` ve (ileride kullanılacak) `backend/` klasör ayrımını şimdiden planla (monorepo yaklaşımı)
- [x] `.gitignore` dosyasını oluştur (`node_modules`, `.env`, `.next`, `.DS_Store`)
- [x] README.md içine proje özeti, kurulum komutları ve branch stratejisini yaz
- [x] Git branch stratejisine karar ver: `main` (canlı), `develop` (geliştirme), `feature/*` (özellik dalları)

## 2. Next.js İskeletinin Kurulması

- [x] Proje oluştur:
  ```bash
  npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```
- [x] Gereksiz demo içerikleri temizle (`app/page.tsx`, `app/globals.css`)
- [x] Klasör mimarisini kur: `src/components/`, `src/lib/`, `src/data/` (statik ürün/kategori JSON'ları için), `src/types/`
- [x] `next.config.js` üzerinde image domains / remotePatterns ayarı (ileride CDN/kendi sunucumuz için)
- [x] **Mimari karar (önemli):** Next.js'i baştan `next start` (Node process) modunda çalıştırmaya karar ver — `output: 'export'` (tam statik) **kullanma**. Neden: Faz 2'de middleware, server actions ve API route'lara ihtiyaç duyacağız; şimdiden Node/PM2 mimarisini kurarsak Faz 2'de sunucu konfigürasyonunu yeniden yapmamış oluruz.
- [x] ESLint + Prettier entegrasyonu (`npm i -D prettier eslint-config-prettier`) ve `.prettierrc` oluştur
- [x] `npm i framer-motion` — lüks geçiş animasyonları için (hover, fade-in, sayfa geçişleri)
- [x] `npm i lucide-react` — ikon seti

## 3. Tasarım Sistemi (Lüks Tema)

- [x] Marka renk paletini `tailwind.config.ts` içine `extend.colors` olarak tanımla:
  - `noir: "#0A0A0A"` (ana siyah)
  - `charcoal: "#1A1A1A"` (koyu gri panel arka planı)
  - `gold: "#C9A24B"` / `gold-light: "#E5C97B"` (altın sarısı vurgu — gradient için iki ton öner)
  - `ivory: "#F5F1E8"` (açık metin/arka plan tonu)
- [x] Tipografi seç: Başlıklar için bir serif (ör. Playfair Display), gövde metni için sade bir sans-serif (ör. Inter) — `next/font/google` ile self-host et (performans + gizlilik)
- [x] Buton, kart, badge, divider gibi tekrar eden UI parçaları için `src/components/ui/` altında yeniden kullanılabilir bileşenler oluştur
- [x] Altın renkli ince çizgiler / geometrik motiflerle "kuyumcu" hissi veren dekoratif SVG detaylar hazırla
- [x] Karanlık tema tutarlılığı için kontrast kontrolü yap (WCAG AA — metin okunabilirliği)
- [ ] Logo varlıklarını (SVG, PNG — açık ve koyu zemin versiyonları, favicon, apple-touch-icon) `public/` altına yerleştir
- [x] Mobil öncelikli (mobile-first) responsive breakpoint stratejisi belirle (sm/md/lg/xl)

## 4. Statik Sayfa İçerikleri

- [x] **Ana Sayfa:** Hero bölümü (tam ekran görsel/video + slogan + CTA), öne çıkan koleksiyon kartları (statik veri, `src/data/products.json`'dan), marka hikayesi kısa özeti, Instagram/sosyal medya besleme bloğu, iletişim CTA şeridi
- [x] **Hakkımızda sayfası:** Marka hikayesi, ustalık/güven vurgusu, mağaza fotoğrafları galerisi
- [x] **Koleksiyonlar/Ürünler (statik galeri):** Kategori bazlı ızgara (grid), ürün detay olmadan sadece görsel + isim + kısa açıklama (henüz fiyat/stok yok — bu Faz 2'de dinamikleşecek)
- [x] **İletişim sayfası:** Google Haritalar embed (iframe), adres, telefon (tıkla-ara linki), WhatsApp Business linki, çalışma saatleri
- [x] **İletişim formu:** Backend henüz yok — 3. parti bir form servisi kullan (ör. Web3Forms veya Formspree) ya da basit `mailto:` linki; Faz 2'de kendi backend'imize taşınacak şekilde not düş
- [x] Header/Footer bileşenlerini tüm sayfalarda ortak `layout.tsx` üzerinden kur
- [x] 404 sayfası (`app/not-found.tsx`) özel tasarımla oluştur
- [x] **Sepet sayfası (UI):** Statik/mock sepet listesi + sipariş özeti + “Alışverişi Tamamla” (Faz 2’de gerçek sepet/ödeme bağlanacak)
- [x] **Hesabım sayfası (UI):** Profil / siparişler / adresler paneli — mock veri ile (auth Faz 2)

## 5. SEO, Performans ve Yasal Sayfalar

- [x] Her sayfa için Next.js `generateMetadata` API'si ile title/description
- [x] Open Graph ve Twitter Card meta etiketleri (paylaşım önizlemesi için görsel dahil)
- [x] `app/sitemap.ts` ve `app/robots.ts` ile otomatik sitemap/robots üretimi
- [x] JSON-LD structured data ekle (schema.org `JewelryStore` / `LocalBusiness` tipi — adres, telefon, çalışma saatleri, konum)
- [x] `next/image` ile tüm görselleri optimize et (WebP/AVIF, lazy loading, doğru `sizes`)
- [x] Lighthouse denetimi çalıştır (Performance/SEO/Accessibility/Best Practices ≥ 90 hedefle)
- [x] **Gizlilik Politikası** ve **KVKK Aydınlatma Metni** sayfalarını şimdiden ekle (yasal zorunluluk — iletişim formu veri topladığı için Faz 1'de bile gerekli)
- [ ] Google Search Console hesabı aç, domain doğrulaması yap (DNS TXT kaydı ile), sitemap gönder

## 6. Google İşletme Profili

- [x] business.google.com üzerinden işletme kaydı oluştur
- [x] Kategori seç: "Kuyumcu" / "Mücevherci"
- [x] Adres doğrulama sürecini başlat (posta kartı veya telefon/video doğrulama — süre alabileceğinden **en erken günlerde** başlat)
- [x] Çalışma saatlerini, telefon numarasını, web sitesi linkini gir
- [x] Mağaza dışı/içi profesyonel fotoğraflar yükle (min. 10-15 görsel)
- [x] Google Haritalar konumunu doğru pin'le ve web sitesindeki iframe ile eşleştir
- [x] Açılışta ilk yorumları teşvik etmek için bir plan not et

## 7. Alan Adı (Domain) ve DNS

- [ ] Alan adını satın al (`.com` veya `.com.tr` — `.com.tr` için ticari sicil/vergi levhası gerekebilir, süreyi buna göre planla)
- [ ] Domain sağlayıcısında DNS yönetim paneline eriş
- [ ] **A kaydı** oluştur: `@` → VPS'in statik IP adresi
- [ ] **A kaydı** (veya CNAME): `www` → aynı IP / kök domain
- [ ] TTL değerini düşür (ör. 300 sn) ki değişiklikler hızlı yayılsın, canlıya almadan önce düşür sonra normale çek
- [ ] DNS yayılımını `dig` / `nslookup` veya whatsmydns.net ile doğrula

## 8. VPS Sunucu İlk Kurulumu ve Güvenliği

- [ ] Ubuntu 24.04 LTS VPS kirala (RAM/CPU: en az 2 vCPU / 4GB RAM — Faz 2'de DB de aynı sunucuda barınacağı için baştan yeterli kapasite seç)
- [ ] `ssh root@IP` ile ilk bağlantı, sistem güncelle:
  ```bash
  apt update && apt upgrade -y
  ```
- [ ] Yeni sudo kullanıcı oluştur (root ile çalışmayı bırak):
  ```bash
  adduser deploy
  usermod -aG sudo deploy
  ```
- [ ] Yerel makineden SSH key üret ve sunucuya kopyala (`ssh-copy-id deploy@IP`)
- [ ] `/etc/ssh/sshd_config` içinde:
  - `PasswordAuthentication no`
  - `PermitRootLogin no`
  - SSH portunu değiştirmeyi değerlendir (opsiyonel ek güvenlik katmanı)
- [ ] SSH servisini yeniden başlat, **root oturumunu kapatmadan önce** yeni kullanıcı ile bağlanabildiğini doğrula
- [ ] UFW (firewall) kur ve yapılandır:
  ```bash
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw enable
  ```
- [ ] `fail2ban` kur (brute-force SSH denemelerine karşı):
  ```bash
  apt install fail2ban -y
  ```
- [ ] Sunucu saat dilimini ayarla: `timedatectl set-timezone Europe/Istanbul`
- [ ] Küçük/orta VPS'lerde swap alanı oluştur (build sırasında RAM yetersizliğine karşı):
  ```bash
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  ```
- [ ] `unattended-upgrades` paketiyle otomatik güvenlik güncellemelerini aktif et
- [ ] Sunucu için temel izleme kur (opsiyonel: `htop`, ileride Netdata)

## 9. Node.js ve PM2 Kurulumu

- [ ] Sunucuya `nvm` ile Node.js LTS kur (paket yöneticisinden değil — sürüm kontrolü için):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  nvm install --lts
  ```
- [ ] PM2'yi global kur:
  ```bash
  npm install -g pm2
  ```
- [ ] Projeyi sunucuya çek (`git clone` deploy kullanıcısı ile), `npm install`, `npm run build`
- [x] `ecosystem.config.js` dosyasını oluştur (uygulama adı, script: `npm start`, env değişkenleri, `instances`, `exec_mode: cluster` opsiyonu)
- [ ] `pm2 start ecosystem.config.js` ile başlat
- [ ] `pm2 startup` komutunu çalıştır ve çıktısındaki komutu uygula (sunucu yeniden başlasa bile PM2'nin otomatik ayağa kalkması için)
- [ ] `pm2 save` ile mevcut process listesini kaydet

## 10. Nginx Reverse Proxy Kurulumu

- [ ] Nginx kur: `apt install nginx -y`
- [x] `/etc/nginx/sites-available/selviler` dosyasını oluştur, reverse proxy tanımla:
  ```nginx
  server {
      listen 80;
      server_name selvilerkuyumculuk.com www.selvilerkuyumculuk.com;

      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```
- [x] Gzip sıkıştırmasını `/etc/nginx/nginx.conf` içinde aktif et
- [x] `client_max_body_size` değerini ileride görsel yüklemeleri düşünerek yükselt (ör. `20M`)
- [ ] Sembolik link oluştur: `ln -s /etc/nginx/sites-available/selviler /etc/nginx/sites-enabled/`
- [ ] Varsayılan Nginx sitesini devre dışı bırak: `rm /etc/nginx/sites-enabled/default`
- [ ] Konfigürasyonu test et: `nginx -t`, sorun yoksa: `systemctl reload nginx`

## 11. SSL Sertifikası (Let's Encrypt)

- [ ] Certbot kur:
  ```bash
  apt install certbot python3-certbot-nginx -y
  ```
- [ ] Sertifikayı al ve Nginx'e otomatik entegre et:
  ```bash
  certbot --nginx -d selvilerkuyumculuk.com -d www.selvilerkuyumculuk.com
  ```
- [ ] HTTP → HTTPS otomatik yönlendirmenin certbot tarafından eklendiğini doğrula
- [ ] Otomatik yenilemeyi test et: `certbot renew --dry-run`
- [ ] `systemctl status certbot.timer` ile yenileme zamanlayıcısının aktif olduğunu doğrula
- [ ] SSL Labs (ssllabs.com/ssltest) üzerinden A/A+ notu al

## 12. Canlıya Alma, Test ve Açılış Kontrolü

- [ ] Tarayıcıdan `https://` ile siteyi aç, tüm sayfaları gez
- [ ] Mobil cihazlarda gerçek test (iOS Safari + Android Chrome)
- [ ] PageSpeed Insights / GTmetrix ile performans testi
- [ ] Tüm formların (iletişim) çalıştığını doğrula, e-posta/WhatsApp'a ulaştığını kontrol et
- [ ] Google Haritalar iframe'inin doğru konumu gösterdiğini doğrula
- [ ] 404 sayfası ve kırık link taraması (ör. `Screaming Frog` veya basit manuel gezinme)
- [ ] Google Search Console'da sitemap'in indekslendiğini kontrol et
- [ ] Sosyal medya paylaşım önizlemelerini test et (Facebook Debugger, Twitter Card Validator)
- [ ] DNS TTL'i normale (ör. 3600) geri çek

### ✅ FAZ 1 KAPANIŞ ONAYI
- [ ] Site `https://` üzerinden, kesintisiz, cep telefonunda sorunsuz açılıyor
- [ ] Google İşletme Profili yayında ve doğrulanmış
- [ ] PM2 sunucu yeniden başlasa bile otomatik ayağa kalkıyor (`pm2 startup` doğrulandı)
- [ ] SSL sertifikası geçerli ve otomatik yenileme aktif
- [ ] **İşletme açılışa hazır 🎉**

---
---

# 🟠 FAZ 2 — E-TİCARET VE ÖZEL BACKEND ENTEGRASYONU

> Statik site canlıdayken arka planda özel bir Node.js/Express backend geliştirilecek; admin paneli, ürün/stok/sepet yönetimi ve İyzico ödeme entegrasyonu bu fazda eklenecek.

## 13. Sunucuda Veritabanı Kurulumu

- [ ] PostgreSQL kur:
  ```bash
  apt install postgresql postgresql-contrib -y
  ```
- [ ] Veritabanı ve kullanıcı oluştur:
  ```bash
  sudo -u postgres psql
  CREATE DATABASE selviler_db;
  CREATE USER selviler_admin WITH ENCRYPTED PASSWORD 'güçlü-parola';
  GRANT ALL PRIVILEGES ON DATABASE selviler_db TO selviler_admin;
  ```
- [ ] **Güvenlik:** `postgresql.conf` içinde `listen_addresses = 'localhost'` olduğundan emin ol (dışarıya asla açma)
- [ ] `pg_hba.conf` içinde sadece `local`/`md5` (veya `scram-sha-256`) yöntemine izin ver
- [ ] UFW'de 5432 portunun dışarıya kapalı olduğunu doğrula (zaten localhost dinlediği için ek risk yok ama teyit et)
- [ ] Güçlü parolayı bir parola yöneticisinde/`.env`'de sakla, asla repoya commit etme

## 14. Veritabanı Şema Tasarımı

- [ ] ERD (varlık-ilişki diyagramı) çıkar (dbdiagram.io veya draw.io ile)
- [ ] Tabloları planla:
  - `users` (id, email, password_hash, role [customer/admin], created_at)
  - `categories` (id, name, slug, parent_id)
  - `products` (id, name, slug, description, price, sku, stock_quantity, category_id, karat, gram_agirlik, metal_tipi — kuyumculuğa özel alanlar)
  - `product_images` (id, product_id, url, sort_order)
  - `carts` / `cart_items` (guest veya user bazlı)
  - `orders` (id, user_id/guest_info, total_amount, status, shipping_address, created_at)
  - `order_items` (id, order_id, product_id, quantity, unit_price)
  - `payments` (id, order_id, iyzico_payment_id, status, raw_response)
- [ ] Fiyat gibi hassas kuyumcu değerleri için (güncel gram altın fiyatına bağlı ürünler varsa) ayrı bir `fiyat_katsayisi`/güncelleme mekanizması gerekip gerekmediğine karar ver
- [ ] Index stratejisi belirle (slug, sku, category_id üzerinde index)

## 15. Express.js Backend İskeleti

- [ ] `backend/` klasöründe proje başlat: `npm init -y`
- [ ] Klasör mimarisi kur: `src/routes`, `src/controllers`, `src/models`, `src/middlewares`, `src/services`, `src/config`, `src/utils`
- [ ] Temel paketleri kur:
  ```bash
  npm i express cors helmet morgan dotenv compression
  npm i -D nodemon typescript ts-node @types/node @types/express
  ```
- [ ] TypeScript kullanılacaksa `tsconfig.json` oluştur ve build script'lerini `package.json`'a ekle
- [ ] `.env` dosyasını oluştur (DB bağlantı bilgisi, JWT secret, İyzico key/secret) ve `.gitignore`'a ekle
- [ ] Global hata yakalama middleware'i (`errorHandler.ts`) yaz
- [ ] `morgan` ile istek loglama, üretimde log dosyasına yönlendirme
- [ ] Health-check endpoint'i (`GET /api/health`) oluştur

## 16. Prisma ORM Kurulumu

- [ ] Prisma kur:
  ```bash
  npm i prisma @prisma/client
  npx prisma init
  ```
- [ ] `schema.prisma` içinde 14. maddedeki tabloları modelle
- [ ] İlk migration'ı oluştur ve uygula:
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```
- [ ] Prisma Client'ı `src/config/prisma.ts` içinde tekil (singleton) instance olarak dışa aktar
- [ ] (Alternatif not: Sequelize/TypeORM da tercih edilebilir; TypeScript ile type-safety için Prisma önerilir)

## 17. Kimlik Doğrulama (Auth) Sistemi

- [ ] Paketleri kur: `npm i jsonwebtoken bcryptjs`
- [ ] `POST /api/auth/register` ve `POST /api/auth/login` endpoint'lerini yaz
- [ ] Parolaları `bcryptjs` ile hashle (salt round ≥ 10)
- [ ] JWT stratejisi: kısa ömürlü **access token** + `httpOnly`+`secure`+`sameSite=strict` cookie'de saklanan uzun ömürlü **refresh token**
- [ ] `authMiddleware` (giriş kontrolü) ve `adminMiddleware` (rol kontrolü) yaz
- [ ] Login endpoint'ine `express-rate-limit` ile brute-force koruması ekle (ör. 5 deneme/15 dk)
- [ ] Şifre sıfırlama akışı planla (e-posta ile token gönderimi — 24. maddedeki nodemailer ile entegre)

## 18. Ürün / Kategori / Stok API

- [ ] `GET/POST/PUT/DELETE /api/products` CRUD endpoint'leri (admin yetkisi gereken işlemler `adminMiddleware` ile korunmalı)
- [ ] `GET/POST/PUT/DELETE /api/categories` CRUD endpoint'leri
- [ ] Ürün listeleme endpoint'ine sayfalama (pagination), filtreleme (kategori, fiyat aralığı) ve arama (query param) ekle
- [ ] Görsel yükleme: `npm i multer sharp` — yüklenen görselleri `sharp` ile yeniden boyutlandır/optimize et, `/uploads` klasörüne kaydet
- [ ] Nginx'te `/uploads` path'i için statik dosya servisi tanımla (Node üzerinden değil, doğrudan Nginx'ten servis ederek performans kazan)
- [ ] Sipariş tamamlandığında stok azaltma mantığını (transaction içinde, race condition'a karşı) yaz

## 19. Sepet (Cart) Mantığı

- [ ] Sepet stratejisine karar ver: misafir kullanıcı için `localStorage` + backend'de geçici session token, üye kullanıcı için `user_id`'ye bağlı kalıcı sepet
- [ ] `POST /api/cart/add`, `PUT /api/cart/update`, `DELETE /api/cart/remove`, `GET /api/cart` endpoint'leri
- [ ] Sepet toplamının backend'de (frontend'e güvenmeden) yeniden hesaplandığından emin ol — fiyat manipülasyonuna karşı kritik güvenlik noktası
- [ ] Stokta olmayan ürünün sepete eklenmesini engelle

## 20. Admin Paneli

- [ ] Next.js içinde `app/admin` route group oluştur, `middleware.ts` ile JWT/cookie kontrolü yaparak korunmasını sağla
- [ ] Admin login sayfası (ayrı, rate-limited endpoint kullanan)
- [ ] Dashboard: sipariş listesi, günlük/haftalık satış özeti
- [ ] Ürün yönetimi ekranı: ekle/düzenle/sil, görsel yükleme arayüzü, stok güncelleme
- [ ] Kategori yönetimi ekranı
- [ ] Sipariş detay ekranı: durum güncelleme (hazırlanıyor/kargoda/teslim edildi/iptal)
- [ ] Opsiyonel: `speakeasy` ile TOTP tabanlı 2FA (admin girişi için ek güvenlik katmanı)
- [ ] Admin panelinin arama motorlarınca indekslenmemesi için `robots` meta/`noindex` ekle

## 21. İyzico Ödeme Entegrasyonu

- [ ] Resmi Node.js kütüphanesini kur: `npm i iyzipay`
- [ ] İyzico Merchant panelinden **sandbox** API key/secret al
- [ ] `POST /api/payment/initialize` endpoint'i: sipariş + sepet bilgisiyle İyzico'ya ödeme isteği oluştur (3D Secure akışı önerilir)
- [ ] 3D Secure callback/webhook endpoint'i (`POST /api/payment/callback`): İyzico'dan dönen sonucu doğrula, siparişin `payments` ve `orders` tablosundaki durumunu güncelle
- [ ] Sandbox ortamında başarılı ödeme, başarısız ödeme, 3D doğrulama reddi gibi tüm senaryoları test et (İyzico test kart numaralarıyla)
- [ ] Üretim (production) API anahtarlarına geçiş için İyzico'nun gerektirdiği evrak/onay sürecini tamamla
- [ ] Ödeme tutarının backend'de sipariş kalemlerinden yeniden hesaplandığını doğrula (frontend'den gelen tutara asla güvenme)
- [ ] Başarısız/yarım kalan ödemelerin sipariş/stok durumunu bozmadığını test et (idempotency)

## 22. Güvenlik Sertleştirme

- [ ] `helmet()` middleware'ini tüm Express uygulamasına ekle (güvenlik başlıkları)
- [ ] CORS'u sadece kendi domain'lerine izin verecek şekilde whitelist ile sınırla (`cors({ origin: [...] })`)
- [ ] `express-rate-limit` ile özellikle `/auth/login` ve `/payment/*` endpoint'lerinde sıkı limit uygula
- [ ] Input validasyonu: `npm i zod` (veya `express-validator`) ile tüm gelen verileri şemaya karşı doğrula
- [ ] SQL injection: Prisma'nın parametreli sorguları sayesinde doğal koruma var — ham SQL kullanımından kaçın
- [ ] XSS: React zaten output'u escape eder; kullanıcıdan gelen HTML içerik varsa `DOMPurify` ile sanitize et
- [ ] CSRF koruması: `csurf` paketinin artık deprecated olduğunu unutma — bunun yerine SameSite=strict cookie + özel double-submit-cookie deseni veya güncel `csrf-csrf` kütüphanesini kullan
- [ ] Tüm cookie'lerde `secure`, `httpOnly`, `sameSite` bayraklarının aktif olduğunu doğrula
- [ ] `.env` dosyasının asla repoya girmediğini, sunucuda dosya izinlerinin kısıtlı (`chmod 600`) olduğunu doğrula
- [ ] `npm audit` ile bağımlılık güvenlik taraması yap, kritik zafiyetleri gider

## 23. Next.js Frontend ↔ Backend Bağlantısı

- [ ] `.env.local` içinde `NEXT_PUBLIC_API_URL` (veya server-only env) tanımla
- [ ] Sunucu bileşenlerinde (Server Components) doğrudan `fetch` ile backend'e istek at, hassas işlemler için Next.js Server Actions kullanmayı değerlendir
- [ ] Statik ürün galerisini (`src/data/products.json`) kaldırıp backend API'sinden dinamik veri çekmeye geçir
- [ ] Sepet ve ödeme akışının uçtan uca (frontend → backend → İyzico → callback → sipariş onayı) çalıştığını doğrula
- [ ] CORS ayarlarının prod domain'de sorunsuz çalıştığını doğrula

## 24. Sipariş Yönetimi ve Bildirimler

- [ ] `npm i nodemailer` — SMTP (kendi mail sunucusu veya SendGrid/Mailgun/Amazon SES) üzerinden e-posta gönderimi kur
- [ ] Sipariş onay e-postası şablonu (müşteriye)
- [ ] Yeni sipariş bildirimi (admin'e)
- [ ] Opsiyonel: yerli bir SMS API'si (Netgsm, İleti Merkezi vb.) ile sipariş SMS bildirimi
- [ ] E-posta gönderim hatalarının sipariş akışını kesmediğinden (try/catch ile izole edildiğinden) emin ol

## 25. Test Süreçleri

- [ ] Tüm API endpoint'leri için Postman koleksiyonu oluştur, ekip/gelecek referansı için dışa aktar
- [ ] `npm i -D jest supertest` ile kritik akışlar (auth, sepet, ödeme callback) için entegrasyon testleri yaz
- [ ] Manuel QA checklist'i oluştur: farklı tarayıcı/cihazlarda sipariş akışını uçtan uca test et
- [ ] Yük testi (opsiyonel): `autocannon` ile API'nin temel yük altında davranışını ölç

## 26. Deployment Güncelleme Süreci

- [x] Basit bir deploy script'i yaz (`deploy.sh`): `git pull`, `npm install`, `npm run build`, `npx prisma migrate deploy`, `pm2 reload ecosystem.config.js`
- [x] `pm2 reload` kullanarak **zero-downtime** güncelleme yapıldığından emin ol (`pm2 restart` yerine)
- [ ] Prod ortamda migration'ların `migrate dev` değil `migrate deploy` ile uygulandığını doğrula
- [ ] Opsiyonel: GitHub Actions ile basit bir CI/CD pipeline'ı kur (push → build → sunucuya SSH ile deploy)

## 27. Yedekleme (Backup) Stratejisi

- [ ] Günlük otomatik `pg_dump` cron job'u kur:
  ```bash
  0 3 * * * pg_dump -U selviler_admin selviler_db > /backups/db_$(date +\%F).sql
  ```
- [ ] Yedekleri sunucu dışına taşı (rclone ile Google Drive/S3/Backblaze — sunucu çökerse yerel yedek de kaybolmasın)
- [ ] `/uploads` klasörünü de aynı yedekleme rutinine dahil et
- [ ] Eski yedekleri otomatik temizleyen bir rotasyon politikası ekle (ör. son 30 gün)
- [ ] Yedekten geri yükleme (restore) sürecini **en az bir kez test ederek** doğrula — test edilmemiş yedek, yedek sayılmaz

### ✅ FAZ 2 KAPANIŞ ONAYI
- [ ] Ürün/kategori/stok/sepet/sipariş akışı uçtan uca çalışıyor
- [ ] İyzico üretim ortamında gerçek bir test ödemesi başarıyla tamamlandı
- [ ] Admin paneli üzerinden ürün ve sipariş yönetimi sorunsuz
- [ ] Güvenlik sertleştirme maddeleri tamamlandı, `npm audit` temiz
- [ ] Otomatik yedekleme çalışıyor ve geri yükleme test edildi
- [ ] **Site tam işlevsel bir e-ticaret platformu 🎉**

---
---

# 🔵 FAZ 3 — MOBİL UYGULAMA VE MAĞAZALAR

> Web sitesi tamamen işlevsel hale geldikten sonra Capacitor ile iOS/Android paketleme ve mağaza onay süreçleri.

## 28. Mimari Karar: Capacitor Stratejisi

- [ ] Next.js SSR + backend'e bağlı dinamik bir yapı olduğundan **tam statik export** yerine, Capacitor'ın `server.url` özelliğiyle canlı siteyi native bir kabuk (shell) içinde açma yaklaşımına karar ver
- [ ] Bu yaklaşımın riskini not et: Apple App Store inceleme kuralı **4.2 (Minimum Functionality)** salt web-wrapper uygulamaları reddedebilir — bu yüzden native özellikler (push notification, native paylaşım, biyometrik giriş vb.) ekleyerek "sadece bir web sitesi kabuğu" izlenimini kır
- [ ] Paketleri kur:
  ```bash
  npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
  ```
- [ ] Başlat: `npx cap init "Selviler Kuyumculuk" "com.selviler.kuyumculuk"`
- [ ] `capacitor.config.ts` içinde `server: { url: "https://selvilerkuyumculuk.com", cleartext: false }` tanımla

## 29. iOS ve Android Proje Ekleme

- [ ] macOS + Xcode kurulumu (iOS derlemesi için zorunlu — macOS gerektirir)
- [ ] Android Studio kurulumu (Android SDK, emulator dahil)
- [ ] Platformları ekle:
  ```bash
  npx cap add ios
  npx cap add android
  ```
- [ ] `npx cap sync` ile native projelere config'i aktar
- [ ] Bundle ID / Package name'in Apple/Google hesaplarıyla tutarlı olduğunu doğrula

## 30. Native Özellikler ve İzinler

- [ ] Kamera/galeri gerekiyorsa (ör. ürün yorumuna fotoğraf ekleme): `npm i @capacitor/camera`
- [ ] `Info.plist` (iOS) içinde kullanılan izinler için açıklama metinleri ekle (ör. `NSCameraUsageDescription`)
- [ ] `AndroidManifest.xml` içinde ilgili izinleri tanımla
- [ ] Uygulama başlatıldığında gerekli izin taleplerinin kullanıcıya doğru zamanda (context içinde) sorulduğunu doğrula

## 31. Push Notification Altyapısı

- [ ] `npm i @capacitor/push-notifications`
- [ ] Android için Firebase projesi oluştur, `google-services.json` dosyasını Android projesine ekle
- [ ] iOS için Apple Developer hesabından APNs anahtarı (.p8) oluştur, Firebase/backend'e tanımla
- [ ] Backend'de push gönderme servisi kur (`firebase-admin` SDK ile FCM üzerinden hem Android hem iOS'a gönderim yapılabilir)
- [ ] Sipariş durumu değiştiğinde (kargoya verildi vb.) push bildirimi tetikleyen mantığı backend'e ekle
- [ ] Bildirim izni reddedilirse uygulamanın düzgün bir fallback davranışı olduğunu test et

## 32. App Icon, Splash Screen ve Marka Kimliği

- [ ] `npx @capacitor/assets generate` ile tüm cihaz boyutları için icon/splash otomatik üret (kaynak: yüksek çözünürlüklü logo + splash görseli)
- [ ] Splash screen'in marka renk paletiyle (siyah/altın) tutarlı olduğunu doğrula
- [ ] Uygulama adının store'larda görünecek şekilde (karakter sınırı dahilinde) netleştirilmesi

## 33. Cihaz Testleri

- [ ] Gerçek iOS cihazında (TestFlight veya doğrudan Xcode ile) test
- [ ] Gerçek Android cihazında (farklı üretici/ekran boyutu) test
- [ ] Yavaş bağlantı (3G simülasyonu) altında davranış testi
- [ ] Uygulama arka plana alınıp geri döndüğünde (app lifecycle) session/sepet durumunun korunduğunu doğrula
- [ ] Derin bağlantı (deep link) kullanılıyorsa sipariş/ürün linklerinin uygulama içinde doğru açıldığını test et

## 34. Yasal ve Hukuki Hazırlık

- [ ] Gizlilik Politikası sayfasını mağaza gereksinimlerine göre güncelle (veri toplama, üçüncü taraf SDK'lar — Firebase, İyzico dahil olacak şekilde)
- [ ] KVKK aydınlatma metnini ve (yurt dışı kullanıcı olasılığına karşı) GDPR uyumluluğunu gözden geçir
- [ ] **Mesafeli Satış Sözleşmesi** ve **İptal/İade Politikası** sayfalarının Türkiye e-ticaret mevzuatına uygun şekilde sipariş öncesi onaylatıldığını doğrula
- [ ] Kullanım Şartları sayfası

## 35. Google Play Store Süreci

- [ ] Google Play Console hesabı oluştur (tek seferlik kayıt ücreti)
- [ ] Uygulama listesi: başlık, kısa/uzun açıklama, farklı ekran boyutları için ekran görüntüleri, öne çıkan görsel
- [ ] Gizlilik Politikası URL'ini ekle
- [ ] İçerik derecelendirmesi (content rating) anketini doldur
- [ ] **Veri Güvenliği (Data Safety)** formunu eksiksiz doldur (hangi veri toplanıyor, nasıl kullanılıyor)
- [ ] İmzalama anahtarını (keystore / Play App Signing) güvenli bir şekilde sakla — kaybolursa uygulama güncellenemez
- [ ] Internal testing / closed testing track ile önce sınırlı kullanıcıya yayınla
- [ ] Sorun yoksa production'a yayınla

## 36. Apple App Store Süreci

- [ ] Apple Developer Program üyeliği al (yıllık ücret)
- [ ] App Store Connect'te uygulama kaydı oluştur
- [ ] Farklı cihaz boyutları için ekran görüntüleri hazırla (iPhone 6.7", 6.5", 5.5", varsa iPad)
- [ ] **App Privacy** (Nutrition Label) formunu eksiksiz doldur
- [ ] TestFlight ile beta sürüm dağıt, iç ekip/güvenilir müşterilerle test et
- [ ] Review Guideline 4.2 riskine karşı native özelliklerin (push, native paylaşım vb.) belirgin olduğundan emin ol
- [ ] İncelemeye gönder, red durumunda Apple'ın gerekçesine göre düzeltip yeniden gönder

## 37. Yayın Sonrası İzleme

- [ ] Web için `@sentry/nextjs`, mobil kabuk için `@sentry/capacitor` ile crash/hata izleme kur
- [ ] Firebase Analytics veya Google Analytics 4 ile kullanıcı davranışı takibi
- [ ] Store yorumlarını düzenli takip etme sürecini (kim, ne sıklıkla) planla
- [ ] Sürüm güncelleme sürecini netleştir: her güncelleme store onayından geçeceği için (web tarafı gibi anlık değil) sürüm takvimi planla
- [ ] PM2/Nginx/Sunucu izleme rutinini (disk, CPU, log) uygulama canlandıktan sonra da düzenli kontrol listesine ekle

### ✅ FAZ 3 KAPANIŞ ONAYI — PROJE TAMAMLANDI 🎉
- [ ] Uygulama Google Play'de yayında
- [ ] Uygulama App Store'da yayında
- [ ] Push notification uçtan uca test edildi (gerçek cihazda bildirim alındı)
- [ ] Crash reporting ve analytics veri akışı doğrulandı

---

## 📌 Ek: Genel Proje Yönetimi Notları

- [ ] Git branch stratejisine tüm proje boyunca sadık kal (`main` → prod, `develop` → staging, `feature/*` → geliştirme)
- [ ] Görev takibi için bir pano kur (Trello/GitHub Projects/Jira) ve bu checklist'teki maddeleri kartlara dönüştür
- [ ] Aylık `npm audit` / bağımlılık güncelleme rutini oluştur
- [ ] Sunucu erişim bilgilerini (SSH key, DB parolası, İyzico anahtarları, Firebase/Apple sertifikaları) bir parola yöneticisinde (ör. Bitwarden) ekip/patron ile güvenli paylaş
- [ ] Her faz kapanışında kısa bir "post-mortem" notu tut: neler iyi gitti, neler tekrar yapılırsa daha hızlı olurdu

---

**Kullanım notu:** Bu checklist'i kodlarken sırayla ilerle; bir fazı bitirmeden diğerine geçme (özellikle Faz 1 → Faz 2 geçişinde sunucu mimarisi değişikliği var). Her madde tamamlandığında `- [ ]` → `- [x]` yaparak versiyon kontrolüne (Git) commit et — bu hem ilerlemeni hem proje geçmişini kayıt altına alır.
