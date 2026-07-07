## PRD (Product Requirements Document)

## Project

**Personal Portfolio Website**


# 1. Overview

Website ini adalah portofolio pribadi yang bertujuan untuk memperkenalkan diri, mendokumentasikan perjalanan belajar, pengalaman, dan karya yang telah dibuat.

Website harus memberikan kesan profesional, modern, dan personal tanpa terlihat seperti template perusahaan.

Target pengunjung:

- Recruiter
- HR
- Developer
- Teman
- Pengunjung umum

---

# 2. Goals

Tujuan utama website:

- Memperkenalkan diri.
- Menampilkan perjalanan belajar.
- Menampilkan pengalaman.
- Menampilkan portofolio.
- Menjadi dokumentasi perkembangan sebagai developer dan network engineer.

---

# 3. Design Principles

## Minimal

- Banyak whitespace.
- Layout bersih dan sederhana.
- Tidak ramai.
- Fokus pada konten.

## Modern

- Layout modern.
- Transisi halus.
- Animasi ringan.
- Responsive.

## Personal

Website harus terasa personal, bukan corporate landing page.

## Readability

Konten harus mudah dibaca.

Gunakan ukuran font, spacing, dan hierarchy yang jelas.

---

# 4. Visual Style

## Color theme

tema: dark gruvbox IDE

## Typography

Prioritaskan keterbacaan.

Gunakan maksimal dua jenis font.

Heading harus memiliki hierarchy yang jelas.

---

## Layout

Gunakan layout modern dengan banyak ruang kosong.

Setiap section harus memiliki jarak yang konsisten.

---

# 5. Navigation Structure

Menu utama:

- Home
- About Me
- Experience
- Portfolio

Submenu Portfolio:

- Ringkasan

Catatan:

- Gunakan nama **Portfolio**, bukan **Project**.

---

# 6. Scope

AI hanya mengerjakan halaman berikut.

## Home
## About Me
## Experience

# 7. Out of Scope

AI **TIDAK BOLEH** mengubah:

- Router
- Navigation logic
- History API
- Fetch logic
- State management
- JavaScript architecture
- Folder structure
- File structure

tanpa izin.

Logic aplikasi akan dikerjakan secara manual.

---

# 8. Technology

Website menggunakan:

- HTML
- CSS
- Vanilla JavaScript

Tidak menggunakan framework/library.
Tidak menambahkan dependency baru.

---

# 9. Coding Guidelines

Kode harus:

- Bersih
- Konsisten
- Mudah dibaca
- Mudah dirawat
- persingkat jika memungkinkan
Gunakan nama class yang deskriptif.

Hindari CSS yang duplikat.

Gunakan struktur yang sederhana.

---

# 10. Responsive Design

Website harus berjalan baik pada:

- Mobile
- Tablet
- Laptop
- Desktop

Layout tidak boleh rusak pada ukuran layar kecil.

---

# 11. Accessibility

Perhatikan:

- Semantic HTML
- Hierarchy heading
- Alt text jika menggunakan gambar
- Focus state pada tombol dan link

---

# 12. Performance

Prioritaskan:

- DOM sederhana
- CSS efisien
- Animasi ringan
- Tidak menggunakan library

---

# 13. Expected Deliverables

AI hanya menghasilkan:

- Struktur HTML
- Styling CSS
- Konten halaman

AI tidak membuat atau mengubah logic JavaScript kecuali diminta secara eksplisit.

---

# 14. Instructions for AI

Saat mengerjakan task:

- Jangan mengubah arsitektur project.
- minta izin jika ada saran.
- Jangan mengubah router.
- Jangan mengubah struktur folder.
- Fokus pada UI dan UX.
- Buat kode yang mudah dikembangkan.
- Hindari overengineering.
- Ikuti gaya desain yang minimalis, modern, dan personal.

Jika membutuhkan perubahan pada logic aplikasi, jangan langsung mengimplementasikannya. Berikan rekomendasi terlebih dahulu.