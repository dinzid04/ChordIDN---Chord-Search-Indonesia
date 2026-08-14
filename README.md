<div align="center">
  <img src="https://raw.githubusercontent.com/dinzid04/dinzid04/main/github-contribution-grid-snake.svg" alt="Snake animation" width="100%" />
</div>

<div align="center">
  <h1>🎸 ChordIDN</h1>
  <p><b>Platform Kunci Gitar & Lirik Lagu Terlengkap Indonesia.</b></p>
  
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
</div>

<br/>

## 📖 Pengenalan

**ChordIDN** adalah sebuah website *open-source* penyedia chord gitar dan lirik lagu (sebelumnya bernama Chordtela, direbrand). Didesain dengan sangat elegan menggunakan dark-mode dan dilengkapi berbagai fitur keren untuk mempermudah pengalaman bermain gitar.

## 🚀 Fitur Utama

- ✅ **Auto-Scroll** - Lirik dan chord akan turun secara otomatis (kecepatannya bisa diatur).
- ✅ **Transpose Chord** - Merubah nada dasar dengan mudah.
- ✅ **Interactive Chord** - Tap pada chord apa saja untuk melihat gambar bentuk kunci gitarnya (menghindari chord yang terpotong di layar HP).
- ✅ **YouTube Auto-Player** - Pemutar musik/video otomatis dari YouTube menyesuaikan judul lagunya.
- ✅ **Clean UI & Dark Mode** - Tampilan yang modern, *seamless*, dan *eye-catching*.
- ✅ **SEO Friendly** - Struktur meta data yang optimal.

## 📂 Struktur Proyek

```text
├── server.ts             # Backend Express (Scraper & API Endpoints)
├── index.html            # Entry point HTML
├── package.json          # Dependencies & Scripts
├── tailwind.config.js    # Konfigurasi TailwindCSS
├── src/
│   ├── main.tsx          # React Root
│   ├── App.tsx           # React Router Setup
│   ├── index.css         # Global Styles
│   ├── components/       # Komponen Reusable (Navbar, Footer, Layouts)
│   ├── pages/            # Halaman Web (Home, Detail, Search, dll)
│   └── lib/              # Fungsi Utility (API fetcher, Transpose logic, Image map)
```

## 🛠️ Instalasi & Tutorial Recode

Bagi yang ingin melakukan *recoding* atau menjalankannya di server lokal, silakan ikuti langkah-langkah berikut:

**1. Clone Repository**
```bash
git clone https://github.com/dinzid04/ChordIDN.git
cd ChordIDN
```

**2. Instalasi Dependency**
Pastikan kamu memiliki Node.js terinstall di perangkatmu.
```bash
npm install
```

**3. Jalankan Mode Development**
Skrip ini akan menyalakan Backend (Express) di Port 3000 dan mengaktifkan HMR (Vite).
```bash
npm run dev
```
Buka browser dan akses `http://localhost:3000`.

**4. Build untuk Production**
```bash
npm run build
npm start
```

## 📞 Kontak Developer

Jika ada pertanyaan atau ingin berkontribusi, jangan ragu untuk menghubungi:

<p>
  <a href="https://instagram.com/gadingkencana_04"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram" /></a>
  <a href="https://github.com/dinzid04"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

---

## 📝 Lisensi

Proyek ini berada di bawah lisensi **MIT License**. Silakan gunakan, ubah, dan distribusikan dengan bebas, namun tetap sertakan kredit kepada developer aslinya.
