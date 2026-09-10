# Aktivitas Terakhir

> Diperbarui: 10 September 2026. Repo: https://github.com/mnaufal52752-glitch/web-portofolio — Live: https://web-portofolio-black-beta.vercel.app/ — Web Toko: https://github.com/mnaufal52752-glitch/web-toko — Live: https://web-toko-beige.vercel.app/ (backend Railway).

## Status Sekarang

- Portofolio `main` di `fa3fcc5` (Live Demo SecureShop → web-toko). Web-toko `main` di `f412564` (admin rapi + grafik). Keduanya sinkron `origin/main`, working tree bersih.
- Backend Railway `/api/health` → `{"ok":true}`; cookie produksi `SameSite=None; Secure`; login `superadmin` masuk dashboard.

## Riwayat Perubahan (portofolio, 15 commit terakhir)

| Commit | Isi |
|---|---|
| `fa3fcc5` | Live Demo SecureShop ke web-toko Vercel |
| `d8c7496` | Lanjut docs ke judul tab |
| `4a3030a` | Selaraskan README dengan desain monokrom + dokumentasi |
| `ac7bce6` | Tambah dokumentasi: last activity, agents, desain, architecture |
| `8af2bf5` | Nama hero solid ikut tema (perbaiki teks hilang di light mode) |
| `2579e51` | Kilau nama light mode disesuaikan |
| `148aefb` | Nama hero monokrom kontras |
| `da1e23d` | Responsif HP/tablet + sisa ungu footer/toast ke tema |
| `aaf524b` | Bug teks terminal tak muncul (class `boot` tidak dilepas) |
| `f834e61` | Form ikut tema + animasi boot terminal + entrance navbar |
| `b915f36` | Tombol monokrom + animasi smooth (rAF, transisi spesifik) |
| `8e70b45` | Projek ikut tema + logo elegan + shield ikut terminal |
| `a4237c1` | Hero DM Sans tanpa border + terminal monokrom |
| `7abc94a` | Hitam elegan Fase 1: Gambetta + token monokrom |
| `0445c55` | Heading diringankan + animasi hero ala ReactBits |
| `cf98873` | Token shadcn light/dark + Clash Display + Satoshi + toggle |

Commit awal (`6a4daa1`) ada di history remote sebelum daftar di atas.

## Web Toko (repo `mnaufal52752-glitch/web-toko`, 7 commit)

| Commit | Isi |
|---|---|
| `f412564` | Admin rapi + grafik omzet 14 hari |
| `6dde3eb` | `.npmrc` peredam warning npm |
| `70a98e1` | `trust proxy` untuk Railway |
| `4ec4365` | Cookie `None+Secure` + anti blank-page array |
| `e01c624` | `client/vercel.json` rewrite SPA |
| `b9069b7` | Scaffold React + Express + Supabase |

## Cara Verifikasi

1. Buka URL live, hard reload (Ctrl+Shift+R).
2. Cek toggle terang/gelap, animasi hero + terminal, formasi HP (360px) dan tablet (768px).
3. Setiap `git push` ke `main` otomatis redeploy di Vercel (±1–2 menit).
