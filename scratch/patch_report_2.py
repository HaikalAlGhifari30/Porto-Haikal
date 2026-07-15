import re

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Struktur Organisasi
struktur_old = r'```mermaid\nflowchart TD\n    K\[Komisaris\].*?SPV --> S\[Sales\]\n```'
struktur_new = '''```mermaid
flowchart TD
    classDef top fill:#1e3a8a,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef mid fill:#2563eb,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef bot fill:#3b82f6,stroke:#fff,stroke-width:2px,color:#fff,rx:5px,ry:5px;
    classDef staff fill:#93c5fd,stroke:#fff,stroke-width:1px,color:#000,rx:5px,ry:5px;

    K[Komisaris]:::top --> DU[Direktur Utama]:::top
    DU --> D[Direktur]:::top
    
    D --> MA[Manager Accounting]:::mid
    D --> MP[Manager Personalia & Administrasion]:::mid
    D --> MS[Manager Sales]:::mid
    
    MA --> FA[Finance & Accounting]:::bot
    
    MP --> HR[Human Resources & General Affairs]:::bot
    MP --> SQO[SQO <br> Sales Quality Officer]:::bot
    HR --> ES[Executive Security]:::staff
    
    MS --> SPV[SPV Sales]:::bot
    SPV --> S[Sales]:::staff
```'''
content = re.sub(struktur_old, struktur_new, content, flags=re.DOTALL)

# 2. Add Analisis Kebutuhan Perangkat Keras, Lunak, Pengguna before Use Case Diagram (at Analisis Masalah)
analisis_masalah_old = r'(## 3\.1 Analisis Masalah.*?)(## 3\.2 Use Case Diagram)'
analisis_masalah_new = r'''\1
### 3.1.1 Analisis Kebutuhan Non-Fungsional
Analisis Kebutuhan Non-Fungsional berkaitan dengan spesifikasi hardware dan software yang diperlukan agar aplikasi dapat dibangun dan dijalankan dengan optimal.

#### A. Kebutuhan Perangkat Keras (Hardware)
Tabel berikut menjelaskan spesifikasi perangkat keras yang digunakan selama proses pengembangan maupun implementasi sistem.

| No | Perangkat Keras | Spesifikasi Minimal | Spesifikasi yang Digunakan |
|---|---|---|---|
| 1 | Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 |
| 2 | RAM | 4 GB | 8 GB atau 16 GB |
| 3 | Penyimpanan (Storage) | 256 GB SSD | 512 GB SSD |
| 4 | Layar / Monitor | Resolusi 1366x768 | Resolusi 1920x1080 (FHD) |
| 5 | Koneksi Internet | Stabil (Minimal 10 Mbps) | Wi-Fi / LAN |

#### B. Kebutuhan Perangkat Lunak (Software)
Tabel berikut merangkum perangkat lunak utama yang mendukung pengembangan sistem ini.

| No | Perangkat Lunak | Kegunaan |
|---|---|---|
| 1 | Sistem Operasi | Windows 10 / Windows 11 / macOS |
| 2 | Code Editor | Visual Studio Code (VS Code) |
| 3 | Web Browser | Google Chrome / Mozilla Firefox |
| 4 | Lingkungan Runtime | Node.js (versi 18+) |
| 5 | Database Management | PostgreSQL (via Supabase/Neon atau Local) & Prisma Studio |
| 6 | Version Control | Git & GitHub |

### 3.1.2 Analisis Pengguna (User)
Sistem ini dirancang untuk melayani dua tipe pengguna dengan hak akses dan kemampuan yang berbeda:

| Kategori Pengguna | Tanggung Jawab & Hak Akses | Keterangan |
|---|---|---|
| **Administrator** | Memiliki akses penuh terhadap CMS (Content Management System). Mampu melakukan operasi *Create, Read, Update, Delete* (CRUD) untuk data Perusahaan, Divisi, Tim, Proyek, dan Galeri. | Staf internal PT Rizky Rijaya Karya yang telah diautentikasi. |
| **Pengunjung (Guest)** | Hanya memiliki akses baca (*Read-only*) ke halaman Company Profile publik (Landing Page, Profil, Proyek, Galeri). | Publik, Klien, atau calon Mitra. |

\2'''
content = re.sub(analisis_masalah_old, analisis_masalah_new, content, flags=re.DOTALL)

# 3. Add Activity Diagrams
# We append to the end of section 3.4
act_tambah = '''
### 3.4.5 Activity Diagram Kelola Profil Perusahaan
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Menu Profil Perusahaan]
    B --> C[Tekan tombol Edit Profil]
    C --> D[Ubah Visi, Misi, Teks Tentang Kami]
    D --> E[Tekan tombol Simpan]
    E --> F[Sistem memvalidasi input]
    F --> G[Sistem memperbarui tabel Settings]
    G --> H[Tampilkan notifikasi berhasil]
    H --> End((Selesai))
```

### 3.4.6 Activity Diagram Kelola Organisasi & Jabatan
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Menu Organisasi]
    B --> C[Lihat Struktur Jabatan / Hirarki]
    C --> D{Pilih Aksi?}
    D -- Tambah --> E[Input Nama Jabatan Baru & Level]
    D -- Ubah --> F[Edit Detail Jabatan Lama]
    D -- Hapus --> G[Konfirmasi Hapus Jabatan]
    E --> H[Simpan ke Database]
    F --> H
    G --> H
    H --> I[Refresh Tabel Hierarki Organisasi]
    I --> End((Selesai))
```

### 3.4.7 Activity Diagram Kelola Pengaturan Web (Settings)
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Menu Pengaturan Umum]
    B --> C[Ubah Judul Hero, Teks Footer, dan Kontak]
    C --> D[Pilih Gambar Banner Baru (Opsional)]
    D --> E[Tekan tombol Terapkan Pengaturan]
    E --> F[Sistem mengunggah gambar ke Cloudinary]
    F --> G[Sistem menyimpan pengaturan di Database]
    G --> H[Pengaturan langsung diterapkan di halaman publik]
    H --> End((Selesai))
```
'''
# Replace 3.4.5 Activity Diagram Beralih Bahasa (Pengunjung) with the new ones plus the old one
act_old = r'(### 3\.4\.5 Activity Diagram Beralih Bahasa \(Pengunjung\).*?)(## 3\.5 Sequence Diagram)'
act_new = r'''### 3.4.5 Activity Diagram Beralih Bahasa (Pengunjung)
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Halaman Landing Page]
    B --> C[Tekan tombol Bahasa (ID / EN)]
    C --> D[Sistem memuat direktori terjemahan (locale)]
    D --> E[Mengganti seluruh teks halaman secara instan]
    E --> End((Selesai))
```

### 3.4.6 Activity Diagram Kelola Profil Perusahaan
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Menu Profil Perusahaan]
    B --> C[Ubah Visi, Misi, Teks Tentang Kami]
    C --> D[Tekan tombol Simpan]
    D --> E[Sistem memvalidasi input & update tabel Settings]
    E --> F[Tampilkan notifikasi berhasil]
    F --> End((Selesai))
```

### 3.4.7 Activity Diagram Kelola Organisasi & Jabatan
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Menu Organisasi]
    B --> C{Pilih Aksi?}
    C -- Tambah --> E[Input Jabatan Baru & Level]
    C -- Ubah --> F[Edit Detail Jabatan]
    C -- Hapus --> G[Konfirmasi Hapus]
    E --> H[Simpan ke Database (Tabel Position)]
    F --> H
    G --> H
    H --> I[Refresh Tabel]
    I --> End((Selesai))
```

### 3.4.8 Activity Diagram Kelola Pengaturan Web
```mermaid
flowchart TD
    Start((Mulai)) --> B[Buka Menu Pengaturan Umum]
    B --> C[Ubah Judul Hero, Teks Footer, dan Kontak]
    C --> D[Pilih Gambar Banner Baru]
    D --> E[Tekan tombol Terapkan]
    E --> F[Sistem mengunggah ke Cloudinary & Simpan Database]
    F --> G[Halaman Publik otomatis terupdate]
    G --> End((Selesai))
```

\2'''
content = re.sub(act_old, act_new, content, flags=re.DOTALL)

# 4. Add Sequence Diagrams
seq_old = r'(### 3\.5\.7 Sequence Diagram Kelola Data Galeri.*?)(## 3\.6 ERD \(Entity Relationship Diagram\))'
seq_new = r'''\1
### 3.5.8 Sequence Diagram Kelola Profil Perusahaan
```mermaid
sequenceDiagram
    actor Admin
    participant Halaman Profil
    participant Database

    Admin->>Halaman Profil: Ubah Visi, Misi, dan Tentang Kami
    Admin->>Halaman Profil: Klik "Simpan Perubahan"
    Halaman Profil->>Database: Perbarui Data (UPDATE tabel settings)
    Database-->>Halaman Profil: Konfirmasi Berhasil
    Halaman Profil-->>Admin: Tampilkan Notifikasi Sukses
```

### 3.5.9 Sequence Diagram Kelola Organisasi & Jabatan
```mermaid
sequenceDiagram
    actor Admin
    participant Halaman Organisasi
    participant Database

    Admin->>Halaman Organisasi: Input Nama Jabatan & Tingkat Hierarki
    Admin->>Halaman Organisasi: Klik "Tambah Jabatan"
    Halaman Organisasi->>Database: Simpan Data (INSERT tabel position)
    Database-->>Halaman Organisasi: Kembalikan Data Jabatan Baru
    Halaman Organisasi-->>Admin: Refresh Struktur Organisasi
```

### 3.5.10 Sequence Diagram Kelola Pengaturan Web
```mermaid
sequenceDiagram
    actor Admin
    participant Halaman Pengaturan
    participant Cloudinary API
    participant Database

    Admin->>Halaman Pengaturan: Ubah Teks Hero, Footer, Kontak
    Admin->>Halaman Pengaturan: Unggah Banner Baru
    Admin->>Halaman Pengaturan: Klik "Simpan Pengaturan"
    Halaman Pengaturan->>Cloudinary API: Upload Stream Banner
    Cloudinary API-->>Halaman Pengaturan: Kembalikan URL Banner
    Halaman Pengaturan->>Database: Simpan URL & Teks (UPDATE)
    Database-->>Halaman Pengaturan: Konfirmasi Tersimpan
    Halaman Pengaturan-->>Admin: Tampilkan Notifikasi Sukses
```

\2'''
content = re.sub(seq_old, seq_new, content, flags=re.DOTALL)


# 5. Add Struktur Tabel Database under ERD
erd_old = r'(## 3\.6 ERD \(Entity Relationship Diagram\).*?)(<div style="page-break-after: always;"></div>\s*<div align="center">\s*# BAB IV)'
erd_new = r'''\1
### 3.6.1 Struktur Tabel Database
Berikut ini adalah spesifikasi struktur tabel (skema) yang digunakan dalam database PostgreSQL pada sistem ini, yang direpresentasikan menggunakan Prisma ORM.

#### 1. Tabel `User`
Digunakan untuk menyimpan kredensial Administrator CMS.
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| name | String? | Nama pengguna | Opsional |
| email | String | Email untuk login | @unique |
| password | String? | Kata sandi (di-hash) | Opsional (Disimpan via Account) |
| role | String | Peran hak akses | @default("admin") |

#### 2. Tabel `Settings`
Menyimpan konfigurasi umum website, hero banner, teks profil, dan kontak. Hanya memiliki 1 record (singleton).
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| heroTitle | String | Judul utama beranda | |
| heroSubtitle | String | Subjudul beranda | |
| heroBannerUrl | String? | URL gambar latar belakang | |
| aboutText | String? | Teks profil perusahaan | |
| visionText | String? | Teks Visi | |
| missionText | String? | Teks Misi | |
| email | String? | Kontak Email publik | |
| phone | String? | Kontak Telepon publik | |
| address | String? | Alamat kantor | |

#### 3. Tabel `BusinessSector` (Bidang Usaha)
Menyimpan data divisi atau sektor bisnis perusahaan.
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| name | String | Nama Sektor Bisnis | |
| description | String | Penjelasan sektor | |
| imageUrl | String? | Tautan gambar/ikon ilustrasi | |
| order | Int | Urutan penempatan | @default(0) |

#### 4. Tabel `Team` & `Member`
Menyimpan entitas Divisi Internal (Team) dan Anggotanya (Member).
**Tabel Team**
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| name | String | Nama Tim/Divisi | |
| slug | String | Slug URL | @unique |

**Tabel Member**
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| name | String | Nama Lengkap Karyawan | |
| photo | String? | Tautan foto profil | |
| teamId | String | Relasi ke Tabel Team | Foreign Key |
| positionId | String | Relasi ke Tabel Jabatan | Foreign Key |

#### 5. Tabel `Position` (Jabatan)
Menyimpan hierarki jabatan dalam sebuah Tim.
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| name | String | Nama Jabatan (cth: Manager) | |
| hierarchyLevel| Int | Tingkatan hierarki (makin kecil=tinggi)| |

#### 6. Tabel `Project` (Proyek)
Menyimpan data portofolio proyek yang telah diselesaikan.
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| title | String | Nama/Judul Proyek | |
| description | String? | Penjelasan proyek | |
| imageUrl | String? | Tautan gambar proyek | |
| isVisible | Boolean | Status tayang | @default(true) |

#### 7. Tabel `Gallery` (Galeri)
Menyimpan dokumentasi foto aktivitas perusahaan.
| Field | Tipe Data | Keterangan | Atribut |
|---|---|---|---|
| id | String | Primary Key | @id, @default(cuid()) |
| title | String | Judul/Nama Kegiatan | |
| category | String | Kategori (cth: Seminar) | |
| imageUrl | String | Tautan gambar dokumentasi | |

\2'''
content = re.sub(erd_old, erd_new, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
