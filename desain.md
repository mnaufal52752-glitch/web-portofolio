# Sistem Desain

> Referensi: ReactBits (animasi), shadcn/ui (token + komponen), Fontshare (font). Tema: hitam elegan monokrom, light + dark.

## Font (Fontshare + Google)

| Peran | Font | Sumber |
|---|---|---|
| Heading | Gambetta 500/600/700 (serif) | Fontshare |
| Body | Satoshi 400/500/700 | Fontshare |
| Judul hero | DM Sans 400/500/700 | Google Fonts |
| Terminal/kode | JetBrains Mono 400/500/600 | Google Fonts |

Bobot heading diturunkan 1 tingkat dari desain awal (tidak ada lagi `800`).

## Token (`style.css` `:root` + `html.dark`)

- Semantik ala shadcn: `background/foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, plus `radius` 0.625rem dan turunannya.
- Light: putih/zinc, primary hitam `#09090b`. Dark: background `#0a0a0b`, card `#131316`, primary putih.
- Variabel lama (`--purple-*`, `--tosca-*`, `--bg-*`, `--gray-*`) dipetakan ulang ke nilai netral per tema agar komponen lama ikut monokrom tanpa ditulis ulang.
- Toggle via class `.dark` di `<html>`, tersimpan di `localStorage`, ikut sistem saat pertama, anti-kedip via script di `<head>`.

## Komponen

- **Tombol:** solid `primary`, outline transparan + border `border-active`, radius shadcn, tanpa offset shadow; ada `focus-visible` ring dan state `:disabled`.
- **Kartu (skill/projek/pilar):** `card` + border hairline + `shadow-sm`, hover angkat + `shadow-md`.
- **Banner projek:** selalu gelap (`#131316→#1c1c1f`) di kedua tema; logo 76px, SVG stroke 1.5 round, badge blur kontras.
- **Terminal:** ikut tema (`card`/`secondary`/`foreground`/`muted`), titik merah-kuning-hijau dipertahankan, font mono.
- **Form:** field `background`/`input`, fokus ring, placeholder muted, `color-scheme` light/dark untuk dropdown native.
- **Modal & toast:** `card`, backdrop hitam netral.
- **Footer:** `bg-secondary`, tanpa sisa ungu.

## Animasi (vanilla, tanpa library)

- Hero: SplitText (huruf naik stagger), nama solid, deskripsi BlurText, entrance navbar + badge.
- Terminal: boot sequence per baris (150ms) + typing loop perintah.
- Scroll spy di-throttle `requestAnimationFrame`; transisi properti spesifik (tanpa `all`).
- `prefers-reduced-motion`: semua animasi mati, konten tampil statis.

## Responsif

- 1024px: hero/about/kontak 1 kolom, projek 2 kolom. 768px: drawer menu, terminal wrap, modal/form ramping. 480px: tombol aksi vertikal, toast full-width, input 16px (anti auto-zoom iPhone).

## Web Toko (admin + grafik)

> Tailwind v4 + token monokrom yang sama (`--background/foreground/card/muted/border/primary`, light + `.dark`), tanpa library grafik.

- **Produk & Stok:** form berlabel 2 kolom (nama, kategori, harga, stok, gambar, kadaluarsa, deskripsi + checkbox katalog saat edit), pesan sukses/gagal inline, tabel responsif (produk, kategori, harga, badge stok Habis/Menipis/Aman, status, aksi).
- **Dashboard:** 4 kartu (Omzet kotor, perlu verifikasi, total pesanan, produk aktif) + `SalesChart` SVG murni: batang omzet 14 hari (status terverifikasi saja), label ringkas (`jt`/`rb`), tooltip via `<title>`, ikut tema lewat `var(--primary/muted-fg/border)`.
- **Keuntungan:** yang tampil omzet kotor + catatan jujur (tanpa HPP); laba bersih butuh kolom modal per produk (belum ada).
