# Althaf Ivander Luthf — Portfolio

Portofolio mahasiswa psikologi dengan pengalaman desain visual, produksi konten, dokumentasi acara, audio, organisasi, dan riset. Website ini memuat 15 proyek dari Student Portfolio di Notion.

Tema visualnya terinspirasi Patrick Jane dalam *The Mentalist*: teh, catatan observasi, dan hubungan antarpetunjuk. Warna krem, hijau gelap, dan burgundy dipadukan dengan foto serta dokumentasi proyek asli.

## Melihat website

<!-- PORTFOLIO_WEB_START -->
Tautan website akan terisi otomatis di sini setelah publikasi pertama berhasil melalui GitHub Pages.
<!-- PORTFOLIO_WEB_END -->

[Halaman HTML](https://yogurtgen.github.io/Portofolio/) · [Sumber di Notion](https://app.notion.com/p/29cb940dc0d080d8b21fc9db13bab1d8)

Untuk melihat website di komputer, unduh repository lalu buka `index.html` di browser.

## Publikasi gratis dengan GitHub Pages

1. Unggah isi folder ini ke repository publik di GitHub, termasuk folder `.github` dan `assets`.
2. Buka **Settings → Pages**, lalu pilih **GitHub Actions** pada bagian **Source**.
3. Di tab **Actions**, pilih **Publish portfolio and update website link**, lalu klik **Run workflow** pada branch utama jika publikasi belum berjalan.

Workflow menerbitkan website dan menambahkan tautan **Buka website portofolio** ke README menggunakan alamat yang dikembalikan GitHub Pages. Username, nama repository, dan URL tidak perlu diisi dalam berkas konfigurasi. Perubahan berikutnya pada branch utama akan diterbitkan otomatis.

Alamat bawaan GitHub Pages berbentuk `https://username.github.io/nama-repository/`. Repository bernama `username.github.io` memakai alamat `https://username.github.io/`. Lihat [panduan GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Pembaruan tautan README menggunakan commit dari GitHub Actions. Jika aturan repository melarang commit otomatis pada branch utama, salin URL yang muncul di ringkasan publikasi dan ubah tautan README secara manual. Pertahankan penanda `PORTFOLIO_WEB_START` dan `PORTFOLIO_WEB_END` untuk pembaruan otomatis berikutnya.

## Isi dan fitur

- Profil dan bidang studi Althaf.
- Meja observasi dengan pilihan Visual, Kolaborasi, dan Cerita yang menyaring proyek terkait.
- Arsip 15 proyek dengan pencarian dan filter kategori.
- Detail peran, alat, dokumentasi, serta tautan sumber untuk setiap proyek.
- Riwayat pengalaman dari 2020 hingga 2026.
- Kontak email, LinkedIn, Instagram, dan YouTube.
- Tata letak untuk desktop dan ponsel, navigasi keyboard, serta dukungan pengurangan gerakan.

Website menggunakan HTML, CSS, dan JavaScript tanpa proses build. Gambar dan font disimpan lokal, sehingga tampilan serta interaksi proyek dapat berjalan tanpa internet. Tautan ke layanan eksternal memerlukan koneksi.

## Struktur repository

```text
.
├── index.html           # Halaman utama
├── README.md            # Panduan repository
├── .github/workflows/
│   └── pages.yml        # Publikasi dan tautan web otomatis
├── BRIEF.md             # Arahan desain
├── assets/
│   ├── site.css         # Tata letak dan tampilan
│   ├── site.js          # Pencarian, filter, dialog, dan navigasi
│   ├── projects.js      # Data proyek dan tautan dokumentasi
│   ├── fonts.css        # Font lokal
│   ├── scrollcraft.js   # Mesin gerakan scroll
│   ├── scrollcraft.css
│   └── ...              # Gambar, font, dan favicon
└── notes/               # Catatan aset dan pemeriksaan tampilan
```

Untuk memperbarui profil, ubah `index.html`. Data dan dokumentasi proyek berada di `assets/projects.js`; tampilan di `assets/site.css`. Simpan gambar tambahan di `assets/` dan gunakan path relatif agar website tetap dapat dibuka langsung.

## Sumber dan aset

Isi portofolio berasal dari [Student Portfolio di Notion](https://app.notion.com/p/29cb940dc0d080d8b21fc9db13bab1d8) dan merupakan salinan lokal. Perubahan di Notion tidak otomatis memperbarui website.

Potret Patrick Jane dibuat sebagai ilustrasi digital untuk tema website. Dokumentasi proyek berasal dari portofolio Althaf. Cormorant Garamond dan DM Sans disertakan dengan lisensi SIL Open Font License di folder `notes/`.

Rincian BEM KM dan PKM-RSH mengikuti informasi yang tersedia di sumber. Entri yang belum memiliki detail ditandai pada dialog proyek.

## Kontak

[Email](mailto:vanderluth@outlook.com) · [LinkedIn](https://www.linkedin.com/in/althaf-ivander-luthf-245b53378) · [Instagram](https://www.instagram.com/fensuder) · [YouTube](https://www.youtube.com/@fensulix)
