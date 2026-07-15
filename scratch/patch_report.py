import re

file_path = r'C:\Users\Haikal Al-Ghifari\.gemini\antigravity-ide\brain\0240c856-ae86-439c-99ef-f59155cc5327\Laporan_Lengkap.md'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Logo UNIKOM
text = text.replace('![Logo UNIKOM](https://unikom.ac.id/img/logo_unikom_kuning.png)', '<img src="https://upload.wikimedia.org/wikipedia/id/thumb/7/75/Logo_Unikom.png/300px-Logo_Unikom.png" alt="Logo UNIKOM" width="200"/>')

# 2. TTD Kanan
ttd_old = '''<div align="right">
Bandung, .................... 2025

<br><br><br>

Mochammad Alif Firmansyah
</div>'''
ttd_new = '''<table width="100%" border="0">
  <tr>
    <td width="65%"></td>
    <td width="35%" align="center">
      Bandung, .................... 2025<br><br><br><br><br>
      <b>Mochammad Alif Firmansyah</b>
    </td>
  </tr>
</table>'''
text = text.replace(ttd_old, ttd_new)

# 3. Logo RRK
text = text.replace('*(Masukkan Gambar Logo PT Rizky Rijaya Karya / logo RRK.png yang Anda unggah di sini)*', '<img src="/public/logo RRK.png" alt="Logo PT RRK" width="200"/><br>*(Catatan: Sesuaikan path logo dengan letak gambar asli di perangkat/server Anda)*')

# 4. Use Case Actor to Stickman (Using sequenceDiagram actor instead for better display or just keep it since Mermaid Use Case has no stickman)
# Let's change the use case to use standard journey or sequence diagram if possible? No, flowchart is better for Use Case Diagram. We will explain to the user Mermaid doesn't support stickmen in flowcharts.

# 5. Tambahan Bab 2 (2.2 - 2.9)
# Add some more text to Bab 2.
bab2_more_text = """
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
"""

text = re.sub(r'## 2\.2 Konsep Dasar Sistem Informasi.*?## 3\.1 Analisis Masalah', bab2_more_text + '\n<div style="page-break-after: always;"></div>\n\n<div align="center">\n\n# BAB III\n# PEMBAHASAN\n\n</div>\n\n## 3.1 Analisis Masalah', text, flags=re.DOTALL)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
