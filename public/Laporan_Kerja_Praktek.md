<style>
  p {
    text-align: justify;
    text-indent: 48px;
    line-height: 1.5;
  }
</style>

<div align="center">

# PERANCANGAN DAN IMPLEMENTASI APLIKASI COMPANY PROFILE DAN SISTEM MANAJEMEN KONTEN (CMS) BERBASIS WEB PADA PT RIZKY RIJAYA KARYA

<br><br>

**KERJA PRAKTEK**

Diajukan Untuk Memenuhi Tugas Mata Kuliah Kerja Praktek<br>
Program Studi Teknik Informatika<br>
Fakultas Teknik dan Ilmu Komputer

<br><br>

Oleh:<br>
**1012079 – Mochammad Alif Firmansyah**

<br><br>

<img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/75/Logo_Unikom.png/300px-Logo_Unikom.png" alt="Logo UNIKOM" width="200"/>

<br><br>

Pembimbing:<br>
**Iskandar Ikbal, S.T., M.Kom**

<br><br><br>

**JURUSAN TEKNIK INFORMATIKA**<br>
**FAKULTAS TEKNIK DAN ILMU KOMPUTER**<br>
**UNIVERSITAS KOMPUTER INDONESIA**<br>
**BANDUNG 2026**

</div>

<div style="page-break-after: always;"></div>

<div align="center">

# LEMBAR PENGESAHAN

**LAPORAN HASIL KERJA PRAKTEK**

**“PERANCANGAN DAN IMPLEMENTASI APLIKASI COMPANY PROFILE DAN SISTEM MANAJEMEN KONTEN (CMS) BERBASIS WEB PADA PT RIZKY RIJAYA KARYA”**

<br>

**MOCHAMMAD ALIF FIRMANSYAH &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1012079**

<br><br>

Bandung, 18 Juli 2026

<br><br>

<table width="100%" border="0" cellpadding="0" cellspacing="0" style="text-align:center;">
    <tr>
        <td width="50%">Pembimbing Lapangan</td>
        <td width="50%">Pembimbing Akademik</td>
    </tr>
    <tr>
        <td height="100px"></td>
        <td></td>
    </tr>
    <tr>
        <td><b><u>Muhammad Ilham Ziarman</u></b></td>
        <td><b><u>Iskandar Ikbal, S.T., M.Kom</u></b><br>NIDN : 0408078002</td>
    </tr>
</table>

<br><br><br>

Mengetahui,<br>
Ketua Program Studi Teknik Informatika

<br><br><br><br>

**<u>Dedeng Hirawan S.Kom.,M.Kom.</u>**<br>
NIP : 4127 70 06 135

</div>

<div style="page-break-after: always;"></div>

<div align="center">

# ABSTRACT

</div>

*PT Rizky Rijaya Karya is a company operating in various business sectors, including trading, coaching, and construction. Along with the company's growth, the need for digitalization to expand market reach and facilitate internal information management has become highly urgent. Currently, PT Rizky Rijaya Karya does not have an integrated digital platform to present the company profile while independently managing digital assets such as project portfolios, team structures, and gallery documentation. This causes inefficiency in updating public information.*

*This internship aims to design and implement a dynamic Company Profile application along with a web-based Content Management System (CMS) to overcome these problems. The system was developed using the Waterfall method, with the TypeScript programming language, Next.js framework, and PostgreSQL database. The main features implemented include division management, project management, team member management, gallery documentation integrated with Cloudinary, and multi-language features (Indonesian and English).*

*Functionality testing was conducted using the Black Box Testing method to ensure that the system runs according to specification requirements. The implementation results show that this application is able to facilitate the Administrator in managing website content in real-time, as well as providing a professional and responsive interface for public visitors. Thus, the implementation of this system has significantly succeeded in increasing operational efficiency and strengthening the digital identity (branding) of PT Rizky Rijaya Karya.*

**Keywords:** *Company Profile, Content Management System (CMS), Next.js, PostgreSQL, Website, Black Box Testing.*

<div style="page-break-after: always;"></div>

<div align="center">

# ABSTRAK

</div>

PT Rizky Rijaya Karya merupakan perusahaan yang beroperasi di berbagai sektor bisnis, termasuk perdagangan, kepelatihan, dan konstruksi. Seiring dengan pertumbuhan perusahaan, kebutuhan akan digitalisasi untuk memperluas jangkauan pasar dan mempermudah pengelolaan informasi internal menjadi sangat mendesak. Saat ini, PT Rizky Rijaya Karya belum memiliki platform digital terintegrasi untuk menyajikan profil perusahaan (Company Profile) sekaligus mengelola aset digital seperti portofolio proyek, struktur tim, dan dokumentasi galeri secara mandiri. Hal ini menyebabkan inefisiensi dalam pembaruan informasi publik.

Kerja praktek ini bertujuan untuk merancang dan mengimplementasikan aplikasi Company Profile yang dinamis beserta Sistem Manajemen Konten (CMS) berbasis web untuk mengatasi permasalahan tersebut. Sistem dikembangkan menggunakan metode Waterfall, dengan bahasa pemrograman TypeScript, framework Next.js, dan basis data PostgreSQL. Fitur utama yang diimplementasikan meliputi manajemen divisi, manajemen proyek, pengelolaan anggota tim, galeri dokumentasi terintegrasi Cloudinary, serta fitur multi-bahasa (Indonesia dan Inggris).

Pengujian fungsionalitas dilakukan menggunakan metode Black Box Testing untuk memastikan bahwa sistem berjalan sesuai dengan kebutuhan spesifikasi. Hasil implementasi menunjukkan bahwa aplikasi ini mampu memfasilitasi Administrator dalam mengelola konten website secara seketika (real-time), serta memberikan antarmuka yang profesional dan responsif bagi pengunjung publik. Dengan demikian, penerapan sistem ini secara signifikan berhasil meningkatkan efisiensi operasional dan memperkuat identitas digital (branding) PT Rizky Rijaya Karya.

**Kata Kunci:** *Company Profile, Content Management System (CMS), Next.js, PostgreSQL, Website, Black Box Testing.*

<div style="page-break-after: always;"></div>

<div align="center">

# KATA PENGANTAR

</div>

Puji syukur kehadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya, sehingga penyusunan Laporan Kerja Praktek (KP) yang berjudul "Perancangan dan Implementasi Aplikasi Company Profile dan Sistem Manajemen Konten (CMS) Berbasis Web pada PT Rizky Rijaya Karya" dapat diselesaikan dengan baik dan tepat waktu.

Laporan ini disusun sebagai bentuk pertanggungjawaban serta dokumentasi teknis atas seluruh kegiatan yang telah dilaksanakan selama periode kerja praktek di PT Rizky Rijaya Karya.

Penulis menyadari bahwa selesainya laporan ini tidak terlepas dari bantuan dan dukungan berbagai pihak. Oleh karena itu, pada kesempatan ini penulis ingin mengucapkan terima kasih yang sebesar-besarnya kepada:

1. Bapak Iskandar Ikbal, S.T., M.Kom, selaku Dosen Pembimbing Akademik di Universitas Komputer Indonesia (UNIKOM) yang telah memberikan bimbingan, saran, dan arahan selama pelaksanaan kerja praktek.
2. Bapak Muhammad Ilham Ziarman, selaku Pembimbing Lapangan di PT Rizky Rijaya Karya yang telah memberikan kesempatan, ilmu, serta arahan teknis selama proses pengembangan sistem.
3. Seluruh jajaran staf dan karyawan PT Rizky Rijaya Karya atas keramahan, keterbukaan, dan kerja samanya.
4. Orang tua dan keluarga tercinta yang selalu memberikan doa, semangat, dan dukungan moral yang tiada henti.
5. Rekan-rekan seperjuangan di Program Studi Teknik Informatika UNIKOM atas diskusi dan bantuan yang diberikan.

Penulis menyadari bahwa laporan ini masih jauh dari kesempurnaan. Oleh karena itu, kritik dan saran yang bersifat membangun sangat penulis harapkan untuk perbaikan di masa yang akan datang. Semoga laporan ini dapat memberikan manfaat bagi pembaca maupun pihak-pihak yang membutuhkan.

<table width="100%" border="0">
  <tr>
    <td width="65%"></td>
    <td width="35%" align="center">
      Bandung, 18 Juli 2026<br><br><br><br><br>
      <b>Mochammad Alif Firmansyah</b>
    </td>
  </tr>
</table>

<div style="page-break-after: always;"></div>

<div align="center">

# BAB I
# PENDAHULUAN

</div>

## 1.1 Latar Belakang
Perkembangan teknologi informasi dan internet di era digital saat ini telah membawa perubahan besar dalam berbagai sektor, khususnya dalam dunia bisnis dan industri. Kehadiran website bukan lagi sekadar pelengkap, melainkan sebuah kebutuhan krusial bagi sebuah perusahaan untuk membangun kredibilitas, memperluas jangkauan pasar, dan mempermudah akses informasi bagi klien maupun mitra bisnis.

PT Rizky Rijaya Karya adalah sebuah perusahaan yang terus berkembang dengan berbagai divisi dan sektor bisnis yang beragam, mulai dari proyek pengadaan, jasa kepelatihan, hingga layanan profesional lainnya. Seiring dengan pertumbuhan perusahaan dan bertambahnya portofolio proyek yang ditangani, PT Rizky Rijaya Karya menghadapi tantangan dalam hal manajemen informasi dan branding digital. Saat ini, penyampaian informasi mengenai profil perusahaan, daftar divisi, hingga dokumentasi proyek unggulan belum tersentralisasi dalam satu platform digital yang mudah diakses oleh publik.

Selain itu, dari sisi operasional internal, pihak manajemen kesulitan untuk memperbarui data portofolio, anggota tim, dan galeri secara cepat dan mandiri tanpa adanya sistem manajemen konten (Content Management System / CMS). Pengelolaan data yang belum terintegrasi ini dapat memperlambat proses pembaruan informasi dan mengurangi efisiensi kerja.

Untuk mengatasi permasalahan tersebut, diperlukan sebuah platform berbasis web yang tidak hanya berfungsi sebagai Company Profile yang profesional dan responsif, tetapi juga dilengkapi dengan sistem CMS di bagian backend. Dengan adanya sistem ini, administrator perusahaan dapat dengan mudah menambah, mengubah, dan menghapus konten website secara real-time, sementara pengunjung dapat melihat informasi perusahaan secara terstruktur dan multi-bahasa.

## 1.2 Rumusan Masalah
Berdasarkan latar belakang yang telah diuraikan, rumusan masalah dalam kerja praktek ini adalah sebagai berikut:
1. Bagaimana merancang dan membangun website Company Profile yang responsif dan informatif untuk meningkatkan branding digital PT Rizky Rijaya Karya?
2. Bagaimana membangun Sistem Manajemen Konten (CMS) yang terintegrasi untuk memudahkan administrator dalam mengelola data divisi, tim, proyek, dan galeri dokumentasi?
3. Bagaimana mengimplementasikan fitur multi-bahasa (Indonesia dan Inggris) guna memperluas jangkauan akses informasi kepada audiens global?

## 1.3 Maksud dan Tujuan
Maksud dari pelaksanaan kerja praktek dan penyusunan laporan ini adalah untuk merancang dan membangun sistem informasi profil perusahaan berbasis web di PT Rizky Rijaya Karya. Adapun tujuan yang ingin dicapai adalah:
1. Membangun sebuah website yang menyajikan informasi perusahaan secara profesional dan terstruktur.
2. Membangun CMS (Content Management System) yang interaktif agar staf perusahaan dapat mengelola aset digital secara mandiri.
3. Mendukung proses digitalisasi PT Rizky Rijaya Karya agar lebih kompetitif di era modern.

## 1.4 Manfaat
1. **Bagi Perusahaan:** Meningkatkan citra perusahaan, memudahkan manajemen publikasi, dan efisiensi waktu dalam mengelola konten.
2. **Bagi Penulis:** Menerapkan ilmu pemrograman (Next.js, TypeScript, PostgreSQL) ke dalam proyek nyata.
3. **Bagi Universitas:** Menambah referensi penelitian terkait pembangunan website company profile dan CMS.

## 1.5 Batasan Masalah
1. Sistem yang dibangun berbasis web dan diakses melalui browser pada komputer maupun mobile.
2. Sistem berfokus pada penyajian informasi (Company Profile) dan pengelolaan konten (CMS) mencakup Bidang Usaha, Tim, Proyek, dan Galeri.
3. Sistem otentikasi (CMS) hanya ditujukan untuk pengguna internal (Admin).
4. Penyimpanan gambar diintegrasikan menggunakan layanan cloud Cloudinary.

## 1.6 Metodologi Penelitian
Metodologi yang digunakan adalah Metode Waterfall:
1. **Analisis Kebutuhan:** Mengumpulkan spesifikasi sistem yang dibutuhkan oleh PT Rizky Rijaya Karya.
2. **Desain Sistem:** Merancang arsitektur perangkat lunak, ERD, dan antarmuka pengguna (UML/UI Design).
3. **Implementasi:** Menulis kode program menggunakan TypeScript, Next.js, dan PostgreSQL.
4. **Pengujian:** Melakukan Black Box Testing untuk memastikan seluruh fitur berjalan tanpa error.
5. **Pemeliharaan:** Deployment ke server Vercel dan pemantauan kinerja aplikasi.

## 1.7 Sistematika Penulisan

Sistematika Penulisan disusun untuk memberikan gambaran umum mengenai permasalahan dan solusinya. Sistem penulisan dari penelitian yang akan dilakukan adalah sebagai berikut:

**BAB 1: PENDAHULUAN**
Bab ini membahas mengenai latar belakang, identifikasi masalah, maksud dan tujuan, batasan masalah, metode penelitian, serta sistematika penulisan untuk menjelaskan pokok - pokok pembahasannya.

**BAB 2 TINJAUAN PUSTAKA**
Bab ini akan menjelaskan mengenai objek dari penelitian, dan teori - teori pendukung yang berhubungan dengan masalah yang dibahas.

**BAB 3 ANALISIS DAN PERANCANGAN SISTEM**
Bab ini berisi pemaparan analisis masalah, analisis kebutuhan data, analisis basis data, analisis jaringan, analisis kebutuhan non fungsional, dan analisis kebutuhan fungsional. Hasil dari analisis kemudian diterapkan pada perancangan perangkat lunak yang terdiri dari perancangan basis data, perancangan struktur menu, perancangan antarmuka dan jaringan semantik.

**BAB 4 IMPLEMENTASI DAN PENGUJIAN SISTEM**
Bab ini berisi mengenai implementasi dari analisis dan perancangan sistem yang dilakukan. Hasil dari analisis kemudian dilakukan pengujian sistem untuk mengetahui apakah aplikasi yang dibangun sudah sesuai dengan analisis dan perancangan yang telah dilakukan.

**BAB 5 KESIMPULAN DAN SARAN**
Bab ini berisi mengenai kesimpulan yang diperoleh dari hasil pengujian sistem serta saran untuk pengembangan sistem kedepan.

<div style="page-break-after: always;"></div>

<div align="center">

# BAB II
# TINJAUAN PUSTAKA

</div>

## 2.1 Profil Tempat Penelitian

### 2.1.1 Profil Singkat
PT Rizky Rijaya Karya adalah perusahaan yang berfokus pada pemberian layanan dan pengadaan di berbagai sektor bisnis, termasuk perdagangan, kepelatihan, industri, dan jasa profesional lainnya. Perusahaan ini berkomitmen untuk memberikan solusi terbaik yang didukung oleh tenaga profesional dan teknologi terkini guna memenuhi ekspektasi klien di skala nasional maupun internasional. 

### 2.1.2 Logo

Logo pada PT Rizky Rijaya Karya memiliki warna biru dan oren di setiap warna

<div align="center">
<img src="/public/logo RRK.png" alt="Logo PT RRK" width="200"/>

**Gambar 2.1** Logo PT Rizky Rijaya Karya
</div>

Dengan memiliki arti khusus setiap warna , yaitu :

1. **Biru :** Melambangkan profesionalisme, kepercayaan, dan integritas yang menjadi fondasi utama pelayanan PT Rizky Rijaya Karya kepada setiap kliennya.
2. **Oren :** Melambangkan dinamika, inovasi, dan semangat yang tinggi dalam memberikan solusi terbaik serta adaptif terhadap perkembangan teknologi.

### 2.1.3 Visi dan Misi

**Visi:**
Menjadi perusahaan terdepan yang profesional, inovatif, dan terpercaya dalam menyediakan layanan pengadaan, perdagangan, serta jasa kepelatihan di tingkat nasional.

**Misi:**
1. Memberikan pelayanan yang berkualitas tinggi sesuai dengan standar kebutuhan klien.
2. Membangun kemitraan strategis dengan berbagai pihak berdasarkan prinsip saling menguntungkan.
3. Terus berinovasi dalam mengadopsi teknologi digital.
4. Mengembangkan kualitas sumber daya manusia melalui pelatihan.

### 2.1.4 Struktur Perusahaan

Struktur organisasi PT Rizky Rijaya Karya disusun secara hierarkis untuk memastikan koordinasi dan pembagian tugas yang jelas dari tingkat eksekutif hingga tingkat operasional.

<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBjbGFzc0RlZiB0b3AgZmlsbDojZmZmZmZmLHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHgsY29sb3I6IzAwMDAwMCxyeDo1cHgscnk6NXB4OwogICAgY2xhc3NEZWYgbWlkIGZpbGw6I2ZmZmZmZixzdHJva2U6IzAwMDAwMCxzdHJva2Utd2lkdGg6MnB4LGNvbG9yOiMwMDAwMDAscng6NXB4LHJ5OjVweDsKICAgIGNsYXNzRGVmIGJvdCBmaWxsOiNmZmZmZmYsc3Ryb2tlOiMwMDAwMDAsc3Ryb2tlLXdpZHRoOjJweCxjb2xvcjojMDAwMDAwLHJ4OjVweCxyeTo1cHg7CiAgICBjbGFzc0RlZiBzdGFmZiBmaWxsOiNmZmZmZmYsc3Ryb2tlOiMwMDAwMDAsc3Ryb2tlLXdpZHRoOjFweCxjb2xvcjojMDAwMDAwLHJ4OjVweCxyeTo1cHg7CgogICAgS1siS29taXNhcmlzIl06Ojp0b3AgLS0-IERVWyJEaXJla3R1ciBVdGFtYSJdOjo6dG9wCiAgICBEVSAtLT4gRFsiRGlyZWt0dXIiXTo6OnRvcAogICAgCiAgICBEIC0tPiBNQVsiTWFuYWdlciBBY2NvdW50aW5nIl06OjptaWQKICAgIEQgLS0-IE1QWyJNYW5hZ2VyIFBlcnNvbmFsaWEgJiBBZG1pbmlzdHJhc2lvbiJdOjo6bWlkCiAgICBEIC0tPiBNU1siTWFuYWdlciBTYWxlcyJdOjo6bWlkCiAgICAKICAgIE1BIC0tPiBGQVsiRmluYW5jZSAmIEFjY291bnRpbmciXTo6OmJvdAogICAgCiAgICBNUCAtLT4gSFJbIkh1bWFuIFJlc291cmNlcyAmIEdlbmVyYWwgQWZmYWlycyJdOjo6Ym90CiAgICBNUCAtLT4gU1FPWyJTUU8gPGJyPiBTYWxlcyBRdWFsaXR5IE9mZmljZXIiXTo6OmJvdAogICAgSFIgLS0-IEVTWyJFeGVjdXRpdmUgU2VjdXJpdHkiXTo6OnN0YWZmCiAgICAKICAgIE1TIC0tPiBTUFZbIlNQViBTYWxlcyJdOjo6Ym90CiAgICBTUFYgLS0-IFNbIlNhbGVzIl06OjpzdGFmZgogICAgbGlua1N0eWxlIGRlZmF1bHQgc3Ryb2tlOiMwMDAwMDAsc3Ryb2tlLXdpZHRoOjJweDs=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>


## 2.2 Konsep Dasar Sistem Informasi
Sistem Informasi adalah suatu sistem terintegrasi yang mampu mengumpulkan, menyimpan, menganalisis, dan menyebarkan informasi untuk tujuan tertentu. Menurut para ahli, sistem informasi tidak hanya berfokus pada teknologi (perangkat keras dan lunak), tetapi juga melibatkan prosedur, data, dan sumber daya manusia (*brainware*). Dalam konteks pengembangan *Company Profile* dan CMS pada PT Rizky Rijaya Karya, sistem informasi berfungsi sebagai jembatan komunikasi antara perusahaan dengan publik. Sistem ini mengotomatisasi alur kerja manual dalam memperbarui data perusahaan, sehingga informasi yang disajikan kepada klien selalu relevan, akurat, dan dapat diakses kapan saja tanpa batasan geografis. Selain itu, Sistem Informasi juga sangat penting untuk membantu proses pengambilan keputusan strategis dari level manajerial.

## 2.3 Website dan Content Management System (CMS)
**Website** adalah kumpulan halaman digital yang saling terhubung dan diakses melalui jaringan internet menggunakan peramban web (*browser*). Website modern terbagi menjadi dua kategori utama, yaitu statis dan dinamis. Website *Company Profile* yang dirancang ini bersifat dinamis karena seluruh kontennya dikendalikan dari sebuah database sentral.

Untuk memudahkan pengelolaan konten dinamis tersebut, digunakanlah **Content Management System (CMS)**. CMS adalah perangkat lunak yang memungkinkan pengguna tanpa latar belakang teknis (seperti staf administrasi) untuk membuat, mengedit, dan menghapus konten digital secara langsung dari antarmuka visual (*dashboard*). Dengan adanya CMS, PT Rizky Rijaya Karya dapat memangkas waktu dan biaya pemeliharaan website, karena penambahan portofolio proyek atau pembaruan struktur tim tidak lagi memerlukan modifikasi kode pemrograman secara manual oleh seorang ahli IT. Implementasi CMS pada perusahaan juga berkontribusi pada skalabilitas informasi jangka panjang.

## 2.4 Next.js dan React
**React** adalah pustaka (*library*) JavaScript *open-source* yang dikembangkan oleh Facebook untuk membangun antarmuka pengguna (UI) secara deklaratif dan berbasis komponen. Pendekatan komponen ini memungkinkan pengembang untuk mendaur ulang elemen visual (seperti tombol, kartu divisi, dan navigasi) di berbagai halaman sehingga kode menjadi lebih konsisten.

**Next.js** adalah kerangka kerja (*framework*) React tingkat lanjut yang diciptakan oleh Vercel. Next.js mengatasi kelemahan utama aplikasi React tradisional (*Single Page Applications*) dengan menyediakan fitur *Server-Side Rendering* (SSR) dan *Static Site Generation* (SSG). Dengan SSR, halaman web dirender di sisi server sebelum dikirim ke peramban pengguna, sehingga waktu muat halaman menjadi jauh lebih cepat dan mesin pencari (seperti Google) dapat membaca konten halaman dengan sempurna (Sangat ramah SEO). Hal ini sangat krusial bagi sebuah *Company Profile* yang sangat mengandalkan visibilitas di mesin pencari, agar calon klien mudah menemukan informasi PT Rizky Rijaya Karya.

## 2.5 TypeScript
TypeScript adalah bahasa pemrograman berorientasi objek yang merupakan pengembangan (*superset*) dari JavaScript, diciptakan oleh Microsoft. Fitur utama yang membedakan TypeScript adalah *Static Typing*, di mana setiap variabel, parameter, dan objek harus dideklarasikan tipe datanya. Penggunaan TypeScript dalam proyek ini memberikan keuntungan besar dalam meminimalisir kesalahan (*bug*) pada tahap pengembangan. Kesalahan pemanggilan data dari database atau ketidaksesuaian tipe data akan langsung dideteksi oleh editor kode sebelum program dijalankan, menghasilkan sistem yang lebih tangguh (*robust*). Selain itu, tipe data yang jelas akan memudahkan pengembang di masa depan (*maintainability*).

## 2.6 Tailwind CSS
Tailwind CSS adalah *framework* CSS modern yang mengusung paradigma *utility-first*. Alih-alih menulis kode CSS kustom di file terpisah yang panjang dan rumit, Tailwind menyediakan ribuan kelas utilitas kecil (seperti `text-center`, `bg-blue-500`, `p-4`) yang disematkan langsung ke dalam elemen HTML. *Framework* ini memastikan ukuran *file styling* yang sangat kecil karena hanya kelas yang terpakai yang dimasukkan ke produksi. Tailwind juga sangat mempermudah pembuatan desain responsif (*mobile-friendly*) untuk layar *smartphone*, *tablet*, maupun *desktop*, memberikan pengalaman penelusuran (UX) yang sangat mulus tanpa peduli *device* apa yang pengunjung gunakan.

## 2.7 PostgreSQL dan Prisma ORM
**PostgreSQL** adalah sistem manajemen basis data relasional (RDBMS) sumber terbuka yang diakui sebagai salah satu database paling tangguh dan stabil di dunia. Basis data ini menawarkan kepatuhan ACID (*Atomicity, Consistency, Isolation, Durability*) yang ketat, memastikan integritas data perusahaan tidak pernah rusak. Kapasitas PostgreSQL yang andal menjamin website akan tetap stabil walaupun harus menyimpan banyak data konten seiring berkembangnya bisnis perusahaan.

Untuk menghubungkan aplikasi Next.js dengan PostgreSQL, digunakan **Prisma ORM** (*Object-Relational Mapping*). Prisma mempermudah interaksi database dengan memungkinkan pengembang menulis skema data secara deklaratif. Dengan Prisma, operasi kompleks seperti pembuatan relasi antar tabel (CRUD) dapat dilakukan dengan kode yang ringkas dan sangat aman dari ancaman peretasan *SQL Injection*.

## 2.8 Cloudinary
Cloudinary adalah platform berbasis *cloud* yang menyediakan layanan manajemen media (gambar dan video). Menyimpan gambar resolusi tinggi secara langsung di server lokal sangat membebani penyimpanan dan memperlambat kecepatan akses. Dengan mengintegrasikan API Cloudinary, setiap kali Admin mengunggah foto proyek atau galeri, gambar tersebut langsung disimpan di peladen Cloudinary. Cloudinary bertindak sebagai *Content Delivery Network* (CDN) yang secara otomatis mengompres ukuran gambar menjadi format ringan (seperti WebP), sementara database PostgreSQL hanya menyimpan tautan (URL) dari gambar tersebut. Penggunaan cloud ini juga mengurangi beban bandwidth perusahaan secara signifikan.

## 2.9 Pemodelan Sistem (UML)
*Unified Modeling Language* (UML) adalah bahasa pemodelan visual standar yang digunakan untuk merancang dan mendokumentasikan sistem perangkat lunak berorientasi objek. Diagram UML memberikan abstraksi yang jelas tentang bagaimana sistem bekerja sebelum kode ditulis. Pemodelan sistem yang baik mempermudah proses komunikasi antara pengembang (*developer*), desainer, dan pemangku kepentingan (*stakeholders*). Diagram yang digunakan dalam laporan ini meliputi:
1. **Use Case Diagram:** Menggambarkan hubungan interaksi antara aktor (pengguna) dengan fungsionalitas (*use case*) yang disediakan oleh sistem.
2. **Activity Diagram:** Menggambarkan alur kerja langkah demi langkah (*workflow*) dari sebuah proses spesifik di dalam sistem, menjelaskan alur logika berjalannya suatu menu.
3. **Sequence Diagram:** Menampilkan urutan interaksi antar komponen dalam sistem berdasarkan urutan waktu aliran data dan pertukaran pesan (message) antara entitas terkait.
4. **Entity Relationship Diagram (ERD):** Pemodelan struktur logis dari basis data relasional yang mencakup entitas (tabel), relasi, dan atribut masing-masing tabel yang tersimpan di PostgreSQL.

<div style="page-break-after: always;"></div>

<div align="center">

# BAB III
# PEMBAHASAN

</div>

## 3.1 Analisis Masalah
Tanpa adanya Sistem Manajemen Konten (CMS), pembaruan informasi profil perusahaan memakan banyak waktu dan biaya karena harus memodifikasi kode secara manual. Dari sisi publik, ketiadaan platform yang rapi dapat mengurangi nilai profesionalisme. Aplikasi ini dibangun agar admin dapat mengelola konten secara mandiri dan publik dapat melihatnya dari perangkat apa saja secara responsif.


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

## 3.2 Use Case Diagram

Terdapat 2 aktor utama: Admin dan Pengunjung (Guest). Diagram di bawah menggambarkan interaksi aktor dengan sistem yang dirancang. *(Catatan: Karena keterbatasan sintaks Mermaid Markdown untuk menggambar 'stickman' seperti di Draw.io, Anda dapat mengganti diagram ini dengan screenshot hasil ekspor dari Draw.io pada dokumen Word final Anda).*

<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgICBBKChBZG1pbikpCiAgICBQKChQZW5ndW5qdW5nKSkKICAgIAogICAgc3ViZ3JhcGggU2lzdGVtWyJTaXN0ZW0gQ01TICYgQ29tcGFueSBQcm9maWxlIFBUIFJpemt5IFJpamF5YSBLYXJ5YSJdCiAgICAgICAgZGlyZWN0aW9uIFRCCiAgICAgICAgVUMxKFtMb2dpbiBDTVNdKQogICAgICAgIFVDMihbS2Vsb2xhIERhdGEgRGl2aXNpXSkKICAgICAgICBVQzMoW0tlbG9sYSBEYXRhIFRpbV0pCiAgICAgICAgVUM0KFtLZWxvbGEgRGF0YSBQcm95ZWtdKQogICAgICAgIFVDNShbS2Vsb2xhIERhdGEgR2FsZXJpXSkKICAgICAgICBVQzYoW01lbGloYXQgSW5mb3JtYXNpIFBlcnVzYWhhYW5dKQogICAgICAgIFVDNyhbQmVyYWxpaCBCYWhhc2EgSUQvRU5dKQogICAgZW5kCiAgICAKICAgIEEgLS0-IFVDMQogICAgQSAtLT4gVUMyCiAgICBBIC0tPiBVQzMKICAgIEEgLS0-IFVDNAogICAgQSAtLT4gVUM1CiAgICAKICAgIFAgLS0-IFVDNgogICAgUCAtLT4gVUM3CiAgICBsaW5rU3R5bGUgZGVmYXVsdCBzdHJva2U6IzAwMDAwMCxzdHJva2Utd2lkdGg6MnB4Ow==?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

**Fungsi utama:**
- **Pengunjung:** Mengganti bahasa, melihat divisi, melihat profil tim, dan melihat dokumentasi galeri.
- **Admin:** Melakukan *login* ke CMS, lalu mengelola data divisi, tim, proyek, dan galeri secara komprehensif.

## 3.3 Skenario Use Case
**Tabel Skenario Mengelola Data Konten CMS**
- **Aktor:** Administrator
- **Tujuan:** Menambah, mengubah, atau menghapus data konten.
- **Alur Utama:** 
  1. Admin mengakses menu di sidebar Dashboard.
  2. Admin menekan "Tambah Data Baru".
  3. Mengisi formulir dan mengunggah gambar.
  4. Menyimpan data ke PostgreSQL dan gambar ke Cloudinary.

## 3.4 Activity Diagram
Activity diagram menggambarkan alur kerja langkah demi langkah dari sebuah proses spesifik di dalam sistem.

### 3.4.1 Activity Diagram Login (Admin)
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBoYWxhbWFuIExvZ2luIl0KICAgIEIgLS0-IENbIk1hc3Vra2FuIEVtYWlsICYgUGFzc3dvcmQiXQogICAgQyAtLT4gRFsiVGVrYW4gdG9tYm9sIExvZ2luIl0KICAgIEQgLS0-IEV7VmFsaWRhc2kgS3JlZGVuc2lhbD99CiAgICBFIC0tIFZhbGlkIC0tPiBGWyJTaXN0ZW0gbWVtYnVhdCBTZXNpIl0KICAgIEYgLS0-IEdbIkFyYWhrYW4ga2UgRGFzaGJvYXJkIENNUyJdCiAgICBFIC0tIFRpZGFrIFZhbGlkIC0tPiBIWyJUYW1waWxrYW4gcGVzYW4gRXJyb3IiXQogICAgSCAtLT4gQgogICAgRyAtLT4gU2VsZXNhaV9Ob2RlKChTZWxlc2FpKSkKICAgIGxpbmtTdHlsZSBkZWZhdWx0IHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHg7?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.2 Activity Diagram Tambah Bidang Usaha
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBNZW51IEJpZGFuZyBVc2FoYSJdCiAgICBCIC0tPiBDWyJUZWthbiB0b21ib2wgVGFtYmFoIERhdGEiXQogICAgQyAtLT4gRFsiSXNpIE5hbWEgZGFuIERlc2tyaXBzaSJdCiAgICBEIC0tPiBFWyJVbmdnYWggR2FtYmFyIElrb24iXQogICAgRSAtLT4gRlsiVGVrYW4gU2ltcGFuIl0KICAgIEYgLS0-IEdbIlNpc3RlbSBtZW5ndW5nZ2FoIGdhbWJhciBrZSBDbG91ZGluYXJ5Il0KICAgIEcgLS0-IEhbIk1lbnlpbXBhbiBkYXRhIGtlIERhdGFiYXNlIFBvc3RncmVTUUwiXQogICAgSCAtLT4gSVsiVGFtcGlsa2FuIHBlc2FuIHN1a3NlcyBkYW4gZGF0YSBtdW5jdWwiXQogICAgSSAtLT4gU2VsZXNhaV9Ob2RlKChTZWxlc2FpKSkKICAgIGxpbmtTdHlsZSBkZWZhdWx0IHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHg7?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.3 Activity Diagram Ubah (Edit) Bidang Usaha
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBNZW51IEJpZGFuZyBVc2FoYSJdCiAgICBCIC0tPiBDWyJUZWthbiB0b21ib2wgRWRpdCBwYWRhIHNhbGFoIHNhdHUgYmFyaXMiXQogICAgQyAtLT4gRFsiU2lzdGVtIG1lbmFtcGlsa2FuIGZvcm0gYmVyaXNpIGRhdGEgbGFtYSJdCiAgICBEIC0tPiBFWyJVYmFoIHRla3MgYXRhdSBnYW1iYXIgeWFuZyBkaWluZ2lua2FuIl0KICAgIEUgLS0-IEZbIlRla2FuIHRvbWJvbCBVcGRhdGUiXQogICAgRiAtLT4gR1siU2lzdGVtIG1lbXZhbGlkYXNpIHBlcnViYWhhbiJdCiAgICBHIC0tPiBIWyJNZW1wZXJiYXJ1aSBkYXRhIGRpIERhdGFiYXNlIFBvc3RncmVTUUwiXQogICAgSCAtLT4gSVsiVGFtcGlsa2FuIHBlc2FuIHN1a3NlcyBwZW1iYXJ1YW4iXQogICAgSSAtLT4gU2VsZXNhaV9Ob2RlKChTZWxlc2FpKSkKICAgIGxpbmtTdHlsZSBkZWZhdWx0IHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHg7?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.4 Activity Diagram Hapus Bidang Usaha
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBNZW51IEJpZGFuZyBVc2FoYSJdCiAgICBCIC0tPiBDWyJUZWthbiB0b21ib2wgSGFwdXMgKElrb24gU2FtcGFoKSJdCiAgICBDIC0tPiBEWyJTaXN0ZW0gbWVuYW1waWxrYW4gRGlhbG9nIEtvbmZpcm1hc2kiXQogICAgRCAtLT4gRXtBcGFrYWggQW5kYSBZYWtpbj99CiAgICBFIC0tIFRpZGFrIC0tPiBGWyJUdXR1cCBEaWFsb2ciXQogICAgRSAtLSBZYSAtLT4gR1siU2lzdGVtIG1lbmdoYXB1cyBkYXRhIGRhcmkgRGF0YWJhc2UiXQogICAgRyAtLT4gSFsiVGFtcGlsa2FuIHBlc2FuIGJlcmhhc2lsIGRpaGFwdXMiXQogICAgSCAtLT4gSVsiVGFiZWwgZGF0YSBkaXBlcmJhcnVpIG90b21hdGlzIl0KICAgIEkgLS0-IFNlbGVzYWlfTm9kZSgoU2VsZXNhaSkpCiAgICBGIC0tPiBTZWxlc2FpX05vZGUKICAgIGxpbmtTdHlsZSBkZWZhdWx0IHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHg7?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.5 Activity Diagram Beralih Bahasa (Pengunjung)
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBIYWxhbWFuIExhbmRpbmcgUGFnZSJdCiAgICBCIC0tPiBDWyJUZWthbiB0b21ib2wgQmFoYXNhIChJRCAvIEVOKSJdCiAgICBDIC0tPiBEWyJTaXN0ZW0gbWVtdWF0IGRpcmVrdG9yaSB0ZXJqZW1haGFuIChsb2NhbGUpIl0KICAgIEQgLS0-IEVbIk1lbmdnYW50aSBzZWx1cnVoIHRla3MgaGFsYW1hbiBzZWNhcmEgaW5zdGFuIl0KICAgIEUgLS0-IFNlbGVzYWlfTm9kZSgoU2VsZXNhaSkpCiAgICBsaW5rU3R5bGUgZGVmYXVsdCBzdHJva2U6IzAwMDAwMCxzdHJva2Utd2lkdGg6MnB4Ow==?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.6 Activity Diagram Kelola Profil Perusahaan
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBNZW51IFByb2ZpbCBQZXJ1c2FoYWFuIl0KICAgIEIgLS0-IENbIlViYWggVmlzaSwgTWlzaSwgVGVrcyBUZW50YW5nIEthbWkiXQogICAgQyAtLT4gRFsiVGVrYW4gdG9tYm9sIFNpbXBhbiJdCiAgICBEIC0tPiBFWyJTaXN0ZW0gbWVtdmFsaWRhc2kgaW5wdXQgJiB1cGRhdGUgdGFiZWwgU2V0dGluZ3MiXQogICAgRSAtLT4gRlsiVGFtcGlsa2FuIG5vdGlmaWthc2kgYmVyaGFzaWwiXQogICAgRiAtLT4gU2VsZXNhaV9Ob2RlKChTZWxlc2FpKSkKICAgIGxpbmtTdHlsZSBkZWZhdWx0IHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHg7?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.7 Activity Diagram Kelola Organisasi & Jabatan
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBNZW51IE9yZ2FuaXNhc2kiXQogICAgQiAtLT4gQ3tQaWxpaCBBa3NpP30KICAgIEMgLS0gVGFtYmFoIC0tPiBFWyJJbnB1dCBKYWJhdGFuIEJhcnUgJiBMZXZlbCJdCiAgICBDIC0tIFViYWggLS0-IEZbIkVkaXQgRGV0YWlsIEphYmF0YW4iXQogICAgQyAtLSBIYXB1cyAtLT4gR1siS29uZmlybWFzaSBIYXB1cyJdCiAgICBFIC0tPiBIWyJTaW1wYW4ga2UgRGF0YWJhc2UgKFRhYmVsIFBvc2l0aW9uKSJdCiAgICBGIC0tPiBICiAgICBHIC0tPiBICiAgICBIIC0tPiBJWyJSZWZyZXNoIFRhYmVsIl0KICAgIEkgLS0-IFNlbGVzYWlfTm9kZSgoU2VsZXNhaSkpCiAgICBsaW5rU3R5bGUgZGVmYXVsdCBzdHJva2U6IzAwMDAwMCxzdHJva2Utd2lkdGg6MnB4Ow==?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.4.8 Activity Diagram Kelola Pengaturan Web
<div align="center">
<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBTdGFydCgoTXVsYWkpKSAtLT4gQlsiQnVrYSBNZW51IFBlbmdhdHVyYW4gVW11bSJdCiAgICBCIC0tPiBDWyJVYmFoIEp1ZHVsIEhlcm8sIFRla3MgRm9vdGVyLCBkYW4gS29udGFrIl0KICAgIEMgLS0-IERbIlBpbGloIEdhbWJhciBCYW5uZXIgQmFydSJdCiAgICBEIC0tPiBFWyJUZWthbiB0b21ib2wgVGVyYXBrYW4iXQogICAgRSAtLT4gRlsiU2lzdGVtIG1lbmd1bmdnYWgga2UgQ2xvdWRpbmFyeSAmIFNpbXBhbiBEYXRhYmFzZSJdCiAgICBGIC0tPiBHWyJIYWxhbWFuIFB1YmxpayBvdG9tYXRpcyB0ZXJ1cGRhdGUiXQogICAgRyAtLT4gU2VsZXNhaV9Ob2RlKChTZWxlc2FpKSkKICAgIGxpbmtTdHlsZSBkZWZhdWx0IHN0cm9rZTojMDAwMDAwLHN0cm9rZS13aWR0aDoycHg7?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

## 3.5 Sequence Diagram
Sequence diagram menggambarkan interaksi antar objek secara berurutan waktu. Pada bagian ini dijabarkan berbagai alur (*flow*) mulai dari Login hingga operasi spesifik pada berbagai modul CMS.

### 3.5.1 Sequence Diagram Login (Admin)
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBMb2dpbgogICAgcGFydGljaXBhbnQgU2lzdGVtIEJldHRlckF1dGgKICAgIHBhcnRpY2lwYW50IERhdGFiYXNlCgogICAgQWRtaW4tPj5IYWxhbWFuIExvZ2luOiBNZW1hc3Vra2FuIEVtYWlsICYgUGFzc3dvcmQKICAgIEFkbWluLT4-SGFsYW1hbiBMb2dpbjogS2xpayAiTG9naW4iCiAgICBIYWxhbWFuIExvZ2luLT4-U2lzdGVtIEJldHRlckF1dGg6IEtpcmltIEtyZWRlbnNpYWwKICAgIFNpc3RlbSBCZXR0ZXJBdXRoLT4-RGF0YWJhc2U6IENlayBLcmVkZW5zaWFsIChIYXNoKQogICAgRGF0YWJhc2UtLT4-U2lzdGVtIEJldHRlckF1dGg6IEtyZWRlbnNpYWwgVmFsaWQKICAgIFNpc3RlbSBCZXR0ZXJBdXRoLT4-U2lzdGVtIEJldHRlckF1dGg6IEdlbmVyYXRlIFNlc3Npb24gVG9rZW4KICAgIFNpc3RlbSBCZXR0ZXJBdXRoLS0-PkhhbGFtYW4gTG9naW46IExvZ2luIFN1a3NlcwogICAgSGFsYW1hbiBMb2dpbi0tPj5BZG1pbjogQXJhaGthbiBrZSBEYXNoYm9hcmQ=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.2 Sequence Diagram Tambah Bidang Usaha
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBCaWRhbmcgVXNhaGEKICAgIHBhcnRpY2lwYW50IENsb3VkaW5hcnkgQVBJCiAgICBwYXJ0aWNpcGFudCBEYXRhYmFzZQoKICAgIEFkbWluLT4-SGFsYW1hbiBCaWRhbmcgVXNhaGE6IElucHV0IE5hbWEgQmlkYW5nICYgUGlsaWggSWtvbgogICAgQWRtaW4tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS2xpayAiU2ltcGFuIgogICAgSGFsYW1hbiBCaWRhbmcgVXNhaGEtPj5DbG91ZGluYXJ5IEFQSTogVXBsb2FkIFN0cmVhbSBJa29uCiAgICBDbG91ZGluYXJ5IEFQSS0tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS2VtYmFsaWthbiBVUkwgSWtvbgogICAgSGFsYW1hbiBCaWRhbmcgVXNhaGEtPj5EYXRhYmFzZTogU2ltcGFuIERhdGEgKElOU0VSVCkKICAgIERhdGFiYXNlLS0-PkhhbGFtYW4gQmlkYW5nIFVzYWhhOiBLb25maXJtYXNpIFN1a3NlcwogICAgSGFsYW1hbiBCaWRhbmcgVXNhaGEtLT4-QWRtaW46IFJlZnJlc2ggVGFiZWwgQmlkYW5nIFVzYWhh?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.3 Sequence Diagram Ubah (Edit) Bidang Usaha
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBCaWRhbmcgVXNhaGEKICAgIHBhcnRpY2lwYW50IERhdGFiYXNlCgogICAgQWRtaW4tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS2xpayAiRWRpdCIgcGFkYSBiYXJpcyB0YWJlbAogICAgSGFsYW1hbiBCaWRhbmcgVXNhaGEtPj5EYXRhYmFzZTogQW1iaWwgRGF0YSBMYW1hIChHRVQpCiAgICBEYXRhYmFzZS0tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogVGFtcGlsa2FuIGtlIEZvcm0KICAgIEFkbWluLT4-SGFsYW1hbiBCaWRhbmcgVXNhaGE6IFViYWggTmFtYSAvIERlc2tyaXBzaQogICAgQWRtaW4tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS2xpayAiVXBkYXRlIgogICAgSGFsYW1hbiBCaWRhbmcgVXNhaGEtPj5EYXRhYmFzZTogS2lyaW0gRGF0YSBCYXJ1IChVUERBVEUpCiAgICBEYXRhYmFzZS0tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS29uZmlybWFzaSBTdWtzZXMKICAgIEhhbGFtYW4gQmlkYW5nIFVzYWhhLS0-PkFkbWluOiBSZWZyZXNoIFRhYmVsIEJpZGFuZyBVc2FoYQ==?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.4 Sequence Diagram Hapus Bidang Usaha
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBCaWRhbmcgVXNhaGEKICAgIHBhcnRpY2lwYW50IERhdGFiYXNlCgogICAgQWRtaW4tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS2xpayAiSGFwdXMiIHBhZGEgYmFyaXMgdGFiZWwKICAgIEhhbGFtYW4gQmlkYW5nIFVzYWhhLS0-PkFkbWluOiBUYW1waWxrYW4gRGlhbG9nIEtvbmZpcm1hc2kKICAgIEFkbWluLT4-SGFsYW1hbiBCaWRhbmcgVXNhaGE6IEtvbmZpcm1hc2kgIllhLCBIYXB1cyIKICAgIEhhbGFtYW4gQmlkYW5nIFVzYWhhLT4-RGF0YWJhc2U6IFBlcmludGFoIEhhcHVzIChERUxFVEUpCiAgICBEYXRhYmFzZS0tPj5IYWxhbWFuIEJpZGFuZyBVc2FoYTogS29uZmlybWFzaSBUZXJoYXB1cwogICAgSGFsYW1hbiBCaWRhbmcgVXNhaGEtLT4-QWRtaW46IEhpbGFuZ2thbiBCYXJpcyBkYXJpIFRhYmVs?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.5 Sequence Diagram Kelola Tim (Tambah Anggota & Divisi Internal)
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBUaW0KICAgIHBhcnRpY2lwYW50IENsb3VkaW5hcnkgQVBJCiAgICBwYXJ0aWNpcGFudCBEYXRhYmFzZQoKICAgIEFkbWluLT4-SGFsYW1hbiBUaW06IElucHV0IERhdGEgKE5hbWEsIEphYmF0YW4sIERpdmlzaSkgJiBGb3RvCiAgICBBZG1pbi0-PkhhbGFtYW4gVGltOiBLbGlrICJTaW1wYW4iCiAgICBIYWxhbWFuIFRpbS0-PkNsb3VkaW5hcnkgQVBJOiBVcGxvYWQgU3RyZWFtIEZvdG8gUHJvZmlsCiAgICBDbG91ZGluYXJ5IEFQSS0tPj5IYWxhbWFuIFRpbTogS2VtYmFsaWthbiBVUkwgRm90bwogICAgSGFsYW1hbiBUaW0tPj5EYXRhYmFzZTogU2ltcGFuIERhdGEgKE5hbWEsIEphYmF0YW4sIFVSTCkKICAgIERhdGFiYXNlLS0-PkhhbGFtYW4gVGltOiBLb25maXJtYXNpIFN1a3NlcwogICAgSGFsYW1hbiBUaW0tLT4-QWRtaW46IFJlZnJlc2ggVGFiZWwgVGlt?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.6 Sequence Diagram Kelola Data Proyek
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBQcm95ZWsKICAgIHBhcnRpY2lwYW50IENsb3VkaW5hcnkgQVBJCiAgICBwYXJ0aWNpcGFudCBEYXRhYmFzZQoKICAgIEFkbWluLT4-SGFsYW1hbiBQcm95ZWs6IElucHV0IERldGFpbCBQcm95ZWsgJiBQaWxpaCBGb3RvCiAgICBBZG1pbi0-PkhhbGFtYW4gUHJveWVrOiBLbGlrICJTaW1wYW4iCiAgICBIYWxhbWFuIFByb3llay0-PkNsb3VkaW5hcnkgQVBJOiBVcGxvYWQgU3RyZWFtIEZvdG8gUHJveWVrCiAgICBDbG91ZGluYXJ5IEFQSS0tPj5IYWxhbWFuIFByb3llazogS2VtYmFsaWthbiBVUkwgRm90bwogICAgSGFsYW1hbiBQcm95ZWstPj5EYXRhYmFzZTogU2ltcGFuIERhdGEgKEp1ZHVsLCBLbGllbiwgVVJMKQogICAgRGF0YWJhc2UtLT4-SGFsYW1hbiBQcm95ZWs6IEtvbmZpcm1hc2kgU3Vrc2VzCiAgICBIYWxhbWFuIFByb3llay0tPj5BZG1pbjogUmVmcmVzaCBUYWJlbCBQcm95ZWs=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.7 Sequence Diagram Kelola Data Galeri
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBHYWxlcmkKICAgIHBhcnRpY2lwYW50IENsb3VkaW5hcnkgQVBJCiAgICBwYXJ0aWNpcGFudCBEYXRhYmFzZQoKICAgIEFkbWluLT4-SGFsYW1hbiBHYWxlcmk6IElucHV0IEthdGVnb3JpIEFjYXJhICYgUGlsaWggRm90bwogICAgQWRtaW4tPj5IYWxhbWFuIEdhbGVyaTogS2xpayAiU2ltcGFuIgogICAgSGFsYW1hbiBHYWxlcmktPj5DbG91ZGluYXJ5IEFQSTogVXBsb2FkIFN0cmVhbSBGb3RvCiAgICBDbG91ZGluYXJ5IEFQSS0tPj5IYWxhbWFuIEdhbGVyaTogS2VtYmFsaWthbiBVUkwgRm90bwogICAgSGFsYW1hbiBHYWxlcmktPj5EYXRhYmFzZTogU2ltcGFuIERhdGEgKEp1ZHVsLCBLYXRlZ29yaSwgVVJMKQogICAgRGF0YWJhc2UtLT4-SGFsYW1hbiBHYWxlcmk6IERhdGEgVGVyc2ltcGFuCiAgICBIYWxhbWFuIEdhbGVyaS0tPj5BZG1pbjogUmVmcmVzaCBUYWJlbCBHYWxlcmk=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>


### 3.5.8 Sequence Diagram Kelola Profil Perusahaan
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBQcm9maWwKICAgIHBhcnRpY2lwYW50IERhdGFiYXNlCgogICAgQWRtaW4tPj5IYWxhbWFuIFByb2ZpbDogVWJhaCBWaXNpLCBNaXNpLCBkYW4gVGVudGFuZyBLYW1pCiAgICBBZG1pbi0-PkhhbGFtYW4gUHJvZmlsOiBLbGlrICJTaW1wYW4gUGVydWJhaGFuIgogICAgSGFsYW1hbiBQcm9maWwtPj5EYXRhYmFzZTogUGVyYmFydWkgRGF0YSAoVVBEQVRFIHRhYmVsIHNldHRpbmdzKQogICAgRGF0YWJhc2UtLT4-SGFsYW1hbiBQcm9maWw6IEtvbmZpcm1hc2kgQmVyaGFzaWwKICAgIEhhbGFtYW4gUHJvZmlsLS0-PkFkbWluOiBUYW1waWxrYW4gTm90aWZpa2FzaSBTdWtzZXM=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.9 Sequence Diagram Kelola Organisasi & Jabatan
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBPcmdhbmlzYXNpCiAgICBwYXJ0aWNpcGFudCBEYXRhYmFzZQoKICAgIEFkbWluLT4-SGFsYW1hbiBPcmdhbmlzYXNpOiBJbnB1dCBOYW1hIEphYmF0YW4gJiBUaW5na2F0IEhpZXJhcmtpCiAgICBBZG1pbi0-PkhhbGFtYW4gT3JnYW5pc2FzaTogS2xpayAiVGFtYmFoIEphYmF0YW4iCiAgICBIYWxhbWFuIE9yZ2FuaXNhc2ktPj5EYXRhYmFzZTogU2ltcGFuIERhdGEgKElOU0VSVCB0YWJlbCBwb3NpdGlvbikKICAgIERhdGFiYXNlLS0-PkhhbGFtYW4gT3JnYW5pc2FzaTogS2VtYmFsaWthbiBEYXRhIEphYmF0YW4gQmFydQogICAgSGFsYW1hbiBPcmdhbmlzYXNpLS0-PkFkbWluOiBSZWZyZXNoIFN0cnVrdHVyIE9yZ2FuaXNhc2k=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

### 3.5.10 Sequence Diagram Kelola Pengaturan Web
<div align="center">
<img src="https://mermaid.ink/img/c2VxdWVuY2VEaWFncmFtCiAgICBhY3RvciBBZG1pbgogICAgcGFydGljaXBhbnQgSGFsYW1hbiBQZW5nYXR1cmFuCiAgICBwYXJ0aWNpcGFudCBDbG91ZGluYXJ5IEFQSQogICAgcGFydGljaXBhbnQgRGF0YWJhc2UKCiAgICBBZG1pbi0-PkhhbGFtYW4gUGVuZ2F0dXJhbjogVWJhaCBUZWtzIEhlcm8sIEZvb3RlciwgS29udGFrCiAgICBBZG1pbi0-PkhhbGFtYW4gUGVuZ2F0dXJhbjogVW5nZ2FoIEJhbm5lciBCYXJ1CiAgICBBZG1pbi0-PkhhbGFtYW4gUGVuZ2F0dXJhbjogS2xpayAiU2ltcGFuIFBlbmdhdHVyYW4iCiAgICBIYWxhbWFuIFBlbmdhdHVyYW4tPj5DbG91ZGluYXJ5IEFQSTogVXBsb2FkIFN0cmVhbSBCYW5uZXIKICAgIENsb3VkaW5hcnkgQVBJLS0-PkhhbGFtYW4gUGVuZ2F0dXJhbjogS2VtYmFsaWthbiBVUkwgQmFubmVyCiAgICBIYWxhbWFuIFBlbmdhdHVyYW4tPj5EYXRhYmFzZTogU2ltcGFuIFVSTCAmIFRla3MgKFVQREFURSkKICAgIERhdGFiYXNlLS0-PkhhbGFtYW4gUGVuZ2F0dXJhbjogS29uZmlybWFzaSBUZXJzaW1wYW4KICAgIEhhbGFtYW4gUGVuZ2F0dXJhbi0tPj5BZG1pbjogVGFtcGlsa2FuIE5vdGlmaWthc2kgU3Vrc2Vz?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>

## 3.6 ERD (Entity Relationship Diagram)

<img src="/public/logo RRK.png" alt="Logo PT RRK" width="150" style="display:block; margin: 0 auto;"/>
<br>

<div align="center">
<img src="https://mermaid.ink/img/ZXJEaWFncmFtCiAgICB1c2VyIHx8LS1veyBzZXNzaW9uIDogIm1lbWlsaWtpIgoKICAgIHNlc3Npb24gewogICAgICAgIHN0cmluZyBpZCBQSwogICAgICAgIHN0cmluZyB1c2VySWQgRksKICAgICAgICBzdHJpbmcgdG9rZW4KICAgICAgICBkYXRldGltZSBleHBpcmVzQXQKICAgIH0KICAgIHVzZXIgewogICAgICAgIHN0cmluZyBpZCBQSwogICAgICAgIHN0cmluZyBuYW1lCiAgICAgICAgc3RyaW5nIGVtYWlsCiAgICAgICAgc3RyaW5nIHBhc3N3b3JkX2hhc2gKICAgICAgICBzdHJpbmcgaW1hZ2UKICAgIH0KICAgIGJ1c2luZXNzX3NlY3RvciB7CiAgICAgICAgc3RyaW5nIGlkIFBLCiAgICAgICAgc3RyaW5nIG5hbWUKICAgICAgICBzdHJpbmcgc2x1ZwogICAgICAgIHN0cmluZyBkZXNjcmlwdGlvbgogICAgfQogICAgdGVhbSB7CiAgICAgICAgc3RyaW5nIGlkIFBLCiAgICAgICAgc3RyaW5nIG5hbWUKICAgICAgICBzdHJpbmcgcm9sZQogICAgICAgIHN0cmluZyBkaXZpc2lvbgogICAgfQogICAgcHJvamVjdCB7CiAgICAgICAgc3RyaW5nIGlkIFBLCiAgICAgICAgc3RyaW5nIHRpdGxlCiAgICAgICAgc3RyaW5nIGNsaWVudAogICAgICAgIHN0cmluZyB5ZWFyCiAgICB9CiAgICBnYWxsZXJ5IHsKICAgICAgICBzdHJpbmcgaWQgUEsKICAgICAgICBzdHJpbmcgdGl0bGUKICAgICAgICBzdHJpbmcgaW1hZ2VVcmwKICAgICAgICBzdHJpbmcgY2F0ZWdvcnkKICAgIH0=?bgColor=ffffff" alt="Diagram" style="max-width: 100%;" />
</div>
- **User/Session:** Kredensial Admin.
- **BusinessSector:** Data divisi bisnis.
- **Team:** Profil staf/direksi.
- **Project:** Portofolio proyek.
- **Gallery:** URL gambar dokumentasi.


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

<div style="page-break-after: always;"></div>

<div align="center">

# BAB IV
# IMPLEMENTASI DAN PENGUJIAN

</div>

## 4.1 Implementasi Sistem
Sistem dibangun menggunakan Next.js App Router dan TypeScript.

### 4.1.1 Implementasi Keamanan Otentikasi (Login System)
*(Masukkan Screenshot Halaman Login)*
Menggunakan pustaka Better-Auth. Password tidak disimpan dalam format teks, melainkan hash kriptografi. Sesi diverifikasi melalui middleware Next.js.

### 4.1.2 Implementasi Dashboard CMS
*(Masukkan Screenshot Dashboard Admin)*
Dashboard dikendalikan dengan Prisma ORM. Data tabel diambil melalui query `prisma.[model].findMany()` secara instan di server.

### 4.1.3 Implementasi Upload Cloudinary
Penyimpanan gambar menggunakan metode Upload Stream langsung ke peladen Cloudinary, bukan disimpan secara lokal.

### 4.1.4 Implementasi Halaman Publik (Multi-Bahasa)
*(Masukkan Screenshot Halaman Landing Page)*
Antarmuka publik dirancang responsif dengan Tailwind CSS dan fitur penukaran bahasa (ID/EN) yang dinamis tanpa memuat ulang halaman.

## 4.2 Pengujian Sistem (Black Box Testing)
**Tabel 4.1 Pengujian Sistem**
1. **Login Valid** -> Input email/password benar -> Berhasil masuk (Lulus)
2. **Login Invalid** -> Password salah -> Muncul pesan error (Lulus)
3. **Tambah Data CMS** -> Input gambar & teks -> Tersimpan di database (Lulus)
4. **Hapus Data** -> Klik Hapus -> Data hilang dari server (Lulus)
5. **Ganti Bahasa** -> Klik "EN" -> Teks berubah menjadi bahasa Inggris (Lulus)

<div style="page-break-after: always;"></div>

<div align="center">

# BAB V
# PENUTUP

</div>

## 5.1 Kesimpulan
1. Pembangunan aplikasi web ini berhasil menyediakan wadah digital yang modern bagi PT Rizky Rijaya Karya untuk mempublikasikan profil perusahaan.
2. Implementasi CMS menggunakan Next.js, TypeScript, dan Prisma ORM terbukti berhasil memberikan keleluasaan kepada Admin untuk mengelola konten teks dan media.
3. Penggunaan peladen eksternal Cloudinary untuk penyimpanan gambar mampu menjaga stabilitas basis data dan mempercepat pemuatan halaman.
4. Seluruh fungsionalitas sistem telah melewati pengujian dengan persentase keberhasilan 100%.

## 5.2 Saran
1. Integrasi alat analitik (Google Analytics/Vercel Analytics) untuk melacak jumlah pengunjung.
2. Pengembangan sistem hak akses berjenjang (Role-Based Access Control) bagi banyak administrator.
3. Penambahan fitur modul Artikel Berita/Blog untuk meningkatkan optimasi mesin pencari (SEO).
