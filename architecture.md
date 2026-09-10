# Arsitektur

> Web portofolio statis Naufal Althafa. Tanpa framework, tanpa build step.

## Struktur File

```
index.html   # 869 baris: navbar, hero+terminal, tentang, skills, projek (6 kartu), workflow, kontak, modal, footer
style.css    # 1919 baris: token → base → komponen → animasi → responsif
script.js    # 473 baris: 11 fungsi init (lihat bawah)
vercel.json  # cleanUrls + security headers (32 baris)
README.md    # Panduan run + deploy + kustomisasi
```

## Alur JavaScript (`script.js`)

Saat `DOMContentLoaded`: `initTheme` → `initEntrance` (class `loaded` + boot terminal) → `initHeroAnimations` (Split/Blur) → `initNavbar` (scroll spy rAF + drawer) → `initTerminalTyping` (loop ketik, statis jika reduced-motion) → `initProjectModal` (baca `data-overview`/`data-security`/chip/link dari kartu) → `initProjectFilters` → `initSkillsFilter` → `initContactForm` (validasi + toast simulasi kirim) → `initStatsCounter` (IntersectionObserver).

## Arsitektur CSS (`style.css`)

1. Import font → 2. token `:root` (light) + `html.dark` → 3. reset/base/body background grid → 4. komponen (nav, tombol, hero, terminal, about, skills, projek, workflow, kontak, modal, toast, footer) → 5. keyframes + `reduced-motion` → 6. media queries 1024/768/480.

## Keamanan (`vercel.json`)

Header: `nosniff`, `DENY` frame, `Referrer-Policy` ketat, `Permissions-Policy` minimal (tanpa kamera/mic/geolokasi), dan CSP: `script 'self'+inline`, `style` + Google Fonts + Fontshare API, `font` + gstatic/Fontshare CDN, `frame-ancestors 'none'`.

## Alur Deploy

`git push origin main` → GitHub (`mnaufal52752-glitch/web-portofolio`) → Vercel auto-redeploy → live `web-portofolio-black-beta.vercel.app`. Setting Vercel: Framework `Other`, tanpa build command, output `./`.

## Keputusan Kunci

- Vanilla HTML/CSS/JS agar ringan dan mudah diedit langsung (isi projek cukup ubah `index.html`).
- Referensi React/shadcn diadaptasi ke vanilla (tanpa dependensi) supaya deploy statis tetap zero-build.
- Terminal, banner, dan footer dipertahankan bernuansa gelap di kedua tema sebagai identitas.

## Web Toko (repo `mnaufal52752-glitch/web-toko`, di-ignore di sini)

```
client/  # React 18 + Vite + Tailwind v4 (deploy → Vercel, Root client)
server/  # Express 4 + Supabase JS + JWT cookie (deploy → Railway, Root server)
supabase/schema.sql  # categories/products/orders/order_items/admins/settings + RLS
```

- **API:** `GET /api/health`, `/api/auth` (login/me/logout, rate-limit), `/api/products` (publik aktif / admin all / CRUD + soft-delete), `/api/orders` (publik buat+lihat, admin daftar+status; total dihitung server, stok kurang sekali saat verifikasi), `/api/uploads` (bukti bayar), `/api/admin` (superadmin: akun + settings).
- **Auth:** JWT `admin_token` httpOnly; produksi `SameSite=None; Secure` (lintas Vercel→Railway) + `trust proxy` 1; lokal `Lax`. Tanpa register publik.
- **Frontend tahan-banting:** `api.products/allProducts/orders/admins` dinormalisasi ke array + guard `Array.isArray` di `Home`/`Catalog` (pelajaran blank-page `.slice`).
- **Deploy:** Railway Root `server` (`npm start`, `PORT` dinamis, `.npmrc omit=dev`), Vercel Root `client` (`VITE_API_URL` URL Railway, `vercel.json` rewrite SPA). `FRONTEND_URL` = URL Vercel (CORS + cookie).
