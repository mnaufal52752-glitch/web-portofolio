# Web Portofolio — Naufal Althafa

Portofolio statis: Web Developer & Cyber Security Specialist. Dibangun dengan HTML + CSS + JavaScript murni, tanpa build step. Tema hitam elegan monokrom (light + dark + toggle). Font: Gambetta (heading), Satoshi (body), DM Sans (judul hero), JetBrains Mono (terminal). Siap deploy ke Vercel.

**Repo:** https://github.com/mnaufal52752-glitch/web-portofolio

## Struktur

```
index.html   # Struktur + konten (hero, tentang, skills, projek, workflow, kontak)
style.css    # Token shadcn light/dark + komponen + animasi + responsif
script.js    # Tema, entrance, animasi hero, navbar, terminal, filter, modal, form, counter
vercel.json  # cleanUrls + security headers
desain.md / architecture.md / agents.md / last activity.md  # Dokumentasi
```

## Jalankan Lokal

Buka `index.html` langsung di browser, atau:

```bash
npx serve .
```

## Deploy ke Vercel (Dashboard)

1. Buka https://vercel.com → Login with GitHub
2. Add New → Project → Import `web-portofolio`
3. Framework Preset: `Other`, Root: `./`, Build Command: kosong, Output: `./`
4. Deploy → dapat URL `https://web-portofolio-xxx.vercel.app`

Setiap `git push` ke branch `main` akan auto-redeploy.

## Kustomisasi Cepat

- Ganti judul/deskripsi projek di `index.html` pada `.project-card` (atribut `data-overview` dan `data-security` otomatis masuk modal).
- Tambah skill di `.skills-grid`, tambah projek di `.projects-grid` dengan `data-category="web|cyber|fullstack"`.
- Kontak: email `m.naufal52752@gmail.com`, GitHub `mnaufal52752-glitch`, WA `082196989025`.

## Keamanan

Header di `vercel.json`: `nosniff`, `DENY` frame, `Referrer-Policy` ketat, `Permissions-Policy` minimal, dan `Content-Security-Policy` yang mengizinkan Google Fonts + Fontshare + inline style/script yang dipakai halaman ini.
