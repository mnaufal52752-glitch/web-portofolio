# Catatan Pekerjaan (Agents)

> Daftar permintaan pemilik repo dan status pengerjaannya. Bahasa: Indonesia.

## Selesai

1. **Push ke GitHub** — `git init`, commit awal 3 file, remote `web-portofolio`, push `main`. ✅
2. **Deploy Vercel** — panduan dashboard + `vercel.json` + `README.md`. Live: `web-portofolio-black-beta.vercel.app`. ✅
3. **Isi 6 contoh projek** — SecureShop, WebSec Scanner, AuthGate, FastLanding, NetWatch, ShieldAPI. ✅
4. **Perbaiki `style.css` rusak** — background ganda, duplikat aturan, floating-shield mobile. ✅
5. **Redesign referensi ReactBits + shadcn + Fontshare** — token shadcn, font Clash Display + Satoshi, toggle terang/gelap. ✅
6. **Hitam elegan monokrom** — Gambetta serif + Satoshi, 56 aksen ungu/tosca dinetralkan ke zinc. ✅
7. **Hero DM Sans + terminal monokrom** — border nama dihapus, terminal ikut tema. ✅
8. **Projek + modal + shield ikut tema, logo elegan** — banner gelap, SVG stroke 1.5, badge kontras. ✅
9. **Tombol jelas + animasi smooth** — varian solid, focus ring, rAF scroll spy, transisi spesifik. ✅
10. **Form ikut tema + boot terminal + entrance navbar**. ✅
11. **Bug teks terminal hilang** — class `boot` tidak dilepas (`aaf524b`). ✅
12. **Responsif HP/tablet** — drawer, wrap terminal, modal, toast, anti auto-zoom iPhone. ✅
13. **Nama hero solid** — gradient-teks rapuh dihapus (`8af2bf5`). ✅
14. **Dokumentasi repo** — `last activity.md`, `agents.md`, `desain.md`, `architecture.md` (`ac7bce6`). ✅
15. **README selaras desain** — monokrom, font, daftar docs, CSP Fontshare (`4a3030a`). ✅
16. **Judul tab** — menjadi `Portofolio Naufal` (`72e3ca1`). ✅
17. **Sambung Live Demo SecureShop** — tombol demo + modal ke `https://web-toko-beige.vercel.app` (`fa3fcc5`). ✅

## Web Toko (repo terpisah: `mnaufal52752-glitch/web-toko`)

> Frontend `client/` (React Vite + Tailwind, Vercel) + backend `server/` (Express, Railway) + Supabase Postgres. Di-ignore dari repo ini via `.gitignore`.

18. **Scaffold + push** — React + Express + Supabase, QRIS statis, login khusus admin (`b9069b7`), tambah `client/vercel.json` rewrite SPA (`e01c624`), push `main`. ✅
19. **Database + GRANT** — `schema.sql` di-Run, bucket `payment-proofs`/`product-images`; tambah GRANT `service_role` + `SELECT anon` karena tabel SQL mentah tanpa hak akses (error 403 `42501`). ✅
20. **Env lokal** — `JWT_SECRET` 96 char generate, `ADMIN_USER/PASS`, E2E lulus (order, total server-side, stok 10→8, soft-delete), kredensial env dihapus pasca-boot. ✅
21. **Deploy Railway** — Root Directory `server` (Railpack gagal dari root), 5 Variables (tanpa `PORT`, tanpa `ADMIN_*`), Generate Domain, `/api/health` ok. ✅
22. **Deploy Vercel** — Root `client`, `VITE_API_URL` = URL Railway (pernah salah: placeholder `api.example.com` + tanpa `https://` + tipe Secret → 500/MSA: hapus-recreate Config + redeploy). ✅
23. **Blank-page `.slice`** — `Home.jsx` crash saat respons bukan array; perbaiki env + normalisasi array `api.js` + guard `Array.isArray` (`4ec4365`). ✅
24. **Login mental** — cookie `SameSite=Lax` tidak terkirim lintas domain; jadi `None+Secure` saat produksi, `trust proxy` 1 (rate-limit Railway), `clearCookie` samakan opsi (`4ec4365`, `70a98e1`). ✅
25. **Admin rapi + grafik** — form produk berlabel + tabel + badge stok, Dashboard kartu Omzet kotor + `SalesChart` SVG 14 hari (`f412564`). Laba bersih belum ada (tanpa HPP). ✅

## Tertunda / Tidak Jadi

- Ganti nama web (hanya judul tab) — **tidak jadi**, judul lama dipertahankan.
- Kilau nama — dilemahkan lalu **dihapus** (kalah dengan keterbacaan).

## Aturan Kerja yang Disepakati

- Mode rencana = hanya membaca + bertanya, tanpa mengubah file.
- Mode eksekusi = ubah file, verifikasi (`node --check`), commit + push.
- Setiap perubahan diverifikasi di light + dark dan HP sebelum dinyatakan selesai.
