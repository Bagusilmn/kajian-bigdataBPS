# Kajian Big Data BPS

Platform web untuk pengelolaan dan publikasi kajian Big Data pada Badan Pusat Statistik (BPS).

Aplikasi ini mendukung proses pengelolaan kajian mulai dari pembuatan kajian, pengajuan, proses review oleh reviewer, persetujuan direktur, hingga publikasi kajian pada halaman publik.

---

## 📌 Tentang Project

**Kajian Big Data BPS** merupakan aplikasi berbasis web yang dikembangkan untuk mendukung pengelolaan dan publikasi kajian Big Data.

Sistem memiliki beberapa role pengguna dengan hak akses yang berbeda, yaitu:

- **Admin**
- **User/Penulis**
- **Reviewer**
- **Direktur**

Alur utama kajian:

```text
User
  │
  ▼
Membuat Kajian
  │
  ▼
Submit Kajian
  │
  ▼
Reviewer
  │
  ├── Revisi ──────► User
  │
  └── Lolos
        │
        ▼
     Direktur
        │
        ├── Revisi ──► User
        │
        └── Approve
              │
              ▼
           Publish
              │
              ▼
        Halaman Publik
✨ Fitur
🌐 Public
Beranda
Daftar kajian
Detail kajian
Pencarian kajian
Filter kajian berdasarkan kategori
Detail kategori
SEO metadata
JSON-LD structured data
Bahasa Indonesia dan Bahasa Inggris pada halaman publik
👤 User
Dashboard
Membuat kajian
Mengedit kajian
Menghapus kajian
Upload cover kajian
Rich Text Editor
Upload gambar
Upload PDF
Gallery gambar
Embed video
Embed content
Embed GitHub Repository
Embed GitLab Repository
Callout
Preview kajian
Pengelolaan status kajian
🔎 Reviewer
Melihat daftar kajian
Mengambil kajian untuk direview
Melakukan review
Memberikan catatan/revisi
Menyetujui kajian
Mengembalikan kajian untuk revisi
👔 Direktur
Melihat kajian
Memeriksa hasil review
Memberikan persetujuan
Mengembalikan kajian untuk revisi
Mengelola publikasi kajian
🛠️ Admin
Dashboard administrasi
Manajemen user
Manajemen kategori
Manajemen kajian
Monitoring data
🧰 Tools & Technologies

Project ini dikembangkan menggunakan beberapa tools dan teknologi berikut.

Backend
Tools	Keterangan
Laravel	Framework backend utama
PHP	Bahasa pemrograman backend
MySQL	Database
Eloquent ORM	Pengelolaan data database
Laravel Inertia	Integrasi backend Laravel dengan React
Frontend
Tools	Keterangan
React.js	Library frontend
Inertia.js	Penghubung Laravel dan React
Vite	Development server dan production build
Tailwind CSS	Styling dan responsive UI
Quill Editor	Rich Text Editor
Development Tools
Tools	Keterangan
Visual Studio Code	Code editor
Git	Version control
GitLab	Repository dan source control
GitHub	Repository / backup source code
Laragon	Local development environment
phpMyAdmin	Database management
NPM	Package management frontend
Composer	Package management PHP
📁 Struktur Project
kajian-bigdataBPS/
│
├── app/
│   ├── Http/
│   ├── Models/
│   └── Support/
│
├── bootstrap/
│
├── config/
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── public/
│
├── resources/
│   └── js/
│       ├── Components/
│       ├── Contexts/
│       ├── Pages/
│       └── i18n.js
│
├── routes/
│
├── storage/
│   └── app/
│       └── public/
│
├── tests/
│
├── .env.example
├── artisan
├── composer.json
├── package.json
└── vite.config.js
⚙️ Requirements

Sebelum menjalankan project, pastikan tools berikut sudah tersedia:

PHP 8.x
Composer
Node.js
NPM
MySQL / MariaDB
Git

Untuk penggunaan lokal, dapat menggunakan:

Laragon
XAMPP
atau environment Laravel lainnya
🚀 Cara Menjalankan Project
1. Clone Repository

Clone repository project:

git clone <URL_REPOSITORY>

Masuk ke folder project:

cd kajian-bigdataBPS
2. Install Dependency Backend

Jalankan:

composer install

Perintah ini akan menginstall seluruh dependency Laravel yang terdapat pada composer.json.

3. Install Dependency Frontend

Jalankan:

npm install

Perintah ini akan menginstall dependency React, Vite, Tailwind CSS, dan library frontend lainnya.

🔧 Konfigurasi Environment
4. Membuat File .env

Copy file .env.example menjadi .env.

Windows PowerShell
Copy-Item .env.example .env
Linux / macOS
cp .env.example .env
5. Konfigurasi Database

Buka file:

.env

Kemudian sesuaikan konfigurasi database:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kajian_bigdata_bps
DB_USERNAME=root
DB_PASSWORD=

Sesuaikan:

DB_DATABASE
DB_USERNAME
DB_PASSWORD

dengan database yang digunakan.

🗄️ Database
6. Membuat Database

Jika database belum tersedia, buat database melalui phpMyAdmin atau MySQL.

Contoh:

CREATE DATABASE kajian_bigdata_bps;
7. Import Database

Project menggunakan file SQL hasil export database.

Contoh:

kajian_bigdata_bps.sql

Import file tersebut melalui:

phpMyAdmin → Database → Import → Choose File → Go

Atau menggunakan MySQL CLI:

mysql -u root -p kajian_bigdata_bps < kajian_bigdata_bps.sql

File SQL digunakan untuk memulihkan struktur dan data database project.

🔑 Generate Application Key
8. Generate APP_KEY

Jalankan:

php artisan key:generate

Perintah ini akan membuat APP_KEY pada file .env.

🖼️ Storage
9. Restore File Upload

File upload aplikasi disimpan pada:

storage/app/public/

Struktur:

storage/app/public/
│
├── categories/
│
└── studies/
    ├── content/
    └── covers/

Untuk deployment atau pemindahan project, gunakan backup:

storage-app-public.zip

Extract isi backup ke:

storage/app/public/
10. Membuat Storage Link

Setelah file storage tersedia, jalankan:

php artisan storage:link

Laravel akan membuat symbolic link:

public/storage
       │
       ▼
storage/app/public

Dengan demikian file seperti gambar dan PDF dapat diakses oleh aplikasi.

🧹 Clear Cache

Setelah konfigurasi selesai, jalankan:

php artisan optimize:clear

Perintah ini digunakan untuk membersihkan cache Laravel sehingga konfigurasi terbaru dapat digunakan.

▶️ Menjalankan Project

Project membutuhkan Laravel dan Vite.

11. Menjalankan Laravel

Buka terminal:

php artisan serve

Server Laravel akan berjalan pada:

http://127.0.0.1:8000
12. Menjalankan Vite

Buka terminal baru pada folder project:

npm run dev

Vite akan menjalankan development server untuk frontend.

Biarkan terminal Vite tetap berjalan selama proses development.

🌐 Akses Aplikasi

Setelah Laravel dan Vite berjalan, buka:

http://127.0.0.1:8000
🏗️ Production Build

Untuk membuat asset production, jalankan:

npm run build

Perintah tersebut akan menjalankan:

vite build

dan:

vite build --ssr resources/js/ssr.jsx

Hasil build frontend berada pada:

public/build/

Sedangkan hasil SSR berada pada:

bootstrap/ssr/
🔐 Security

Project menerapkan beberapa mekanisme keamanan.

Content Sanitization

Konten HTML dari Rich Text Editor diproses menggunakan:

app/Support/StudyContentSanitizer.php

Sanitizer digunakan untuk mencegah:

<script>
Event handler berbahaya
javascript: URL
URL berbahaya
iframe yang tidak diperbolehkan
atribut editor dengan URL berbahaya

Konten kajian lama juga disanitasi ketika dibaca.

Sandboxed Preview

Preview pada halaman Create dan Edit menggunakan sandboxed iframe.

Hal ini bertujuan agar HTML draft tidak dapat menjalankan script pada halaman utama aplikasi.

JSON-LD Security

Structured data JSON-LD menggunakan escaping karakter khusus sebelum dimasukkan ke dalam <script>.

Hal ini membantu mencegah penyisipan script melalui:

Judul kajian
Ringkasan kajian
Nama penulis
🧪 Testing

Untuk menjalankan seluruh test Laravel:

php artisan test

Untuk menjalankan test sanitizer secara khusus:

php artisan test --filter=StudyContentSanitizerTest

Test tersebut mencakup pengujian:

Penghapusan script
Penghapusan event handler
Validasi URL
Validasi konten editor
Sanitasi legacy study content
🔄 Useful Laravel Commands
Clear semua cache
php artisan optimize:clear
Clear configuration
php artisan config:clear
Clear route
php artisan route:clear
Clear view
php artisan view:clear
Storage link
php artisan storage:link
Database migration
php artisan migrate
📦 Deployment Files

Untuk kebutuhan deployment atau backup, siapkan:

Deployment/
│
├── kajian_bigdata_bps.sql
│
├── storage-app-public.zip
│
└── Source Code
    └── Git Repository
Database
kajian_bigdata_bps.sql

Digunakan untuk memulihkan database beserta data project.

Storage
storage-app-public.zip

Berisi file upload aplikasi:

storage/app/public/
├── categories/
└── studies/
    ├── content/
    └── covers/
⚠️ Important

Jangan memasukkan file berikut ke repository:

.env
*.sql
storage-app-public.zip

Tambahkan ke .gitignore:

.env
*.sql
storage-app-public.zip

File .env dapat berisi informasi sensitif seperti credential database.

✅ Deployment Checklist

Sebelum aplikasi digunakan di server:

Source Code
 Repository berhasil di-clone
 composer install
 npm install
 .env sudah dikonfigurasi
 APP_KEY tersedia
Database
 Database sudah dibuat
 Database SQL sudah di-import
 Konfigurasi .env sudah benar
Storage
 storage/app/public sudah dipulihkan
 Folder categories tersedia
 Folder studies/content tersedia
 Folder studies/covers tersedia
 php artisan storage:link sudah dijalankan
Build
 php artisan optimize:clear
 npm run build
Testing
 Halaman public dapat dibuka
 Login dapat digunakan
 Dashboard dapat dibuka
 Create kajian berjalan
 Edit kajian berjalan
 Upload gambar berjalan
 Upload PDF berjalan
 Gallery berjalan
 Embed berjalan
 Reviewer dapat mengambil kajian
 Review berjalan
 Approval direktur berjalan
 Publikasi kajian berjalan
👨‍💻 Development

Project ini dikembangkan sebagai bagian dari kegiatan Magang Nasional di Badan Pusat Statistik (BPS) pada Direktorat Metodologi Statistik dan Sains Data, dengan fokus pada pengembangan platform web untuk pengelolaan dan publikasi kajian Big Data.

📄 License

Project ini merupakan aplikasi untuk kebutuhan internal dan penggunaannya mengikuti kebijakan serta ketentuan yang berlaku pada Badan Pusat Statistik.


### Yang menurutku paling pas untuk repository kamu

README ini sudah membedakan dengan jelas:

**Repository**
```text
Source Code
README.md

Backup deployment

kajian_bigdata_bps.sql
storage-app-public.zip