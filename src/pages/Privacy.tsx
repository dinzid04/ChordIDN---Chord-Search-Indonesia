import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
      <Helmet>
        <title>Kebijakan Privasi - ChordIDN</title>
        <meta name="description" content="Kebijakan Privasi ChordIDN. Menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda." />
      </Helmet>

      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
          Kebijakan Privasi
        </h1>
        <p className="text-rose-400 font-mono text-lg">Komitmen kami dalam melindungi privasi dan data Anda</p>
      </header>

      <div className="prose prose-invert prose-rose max-w-none prose-headings:font-mono prose-headings:font-bold prose-headings:tracking-wide">
        <p>Kebijakan privasi ini menjelaskan bagaimana <strong>ChordIDN</strong> mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan website kami.</p>
        
        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Informasi yang Kami Kumpulkan</h2>
        <h3 className="text-lg text-gray-200 mt-6 mb-2">Informasi Otomatis</h3>
        <p>Saat Anda mengunjungi website kami, kami secara otomatis mengumpulkan:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li>Alamat IP dan lokasi geografis</li>
          <li>Jenis browser dan sistem operasi</li>
          <li>Halaman yang Anda kunjungi dan waktu kunjungan</li>
          <li>Sumber referral (dari mana Anda datang)</li>
          <li>Data perilaku browsing (klik, scroll, dll)</li>
        </ul>

        <h3 className="text-lg text-gray-200 mt-6 mb-2">Informasi yang Anda Berikan</h3>
        <p>Informasi yang Anda berikan secara sukarela:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li>Nama dan alamat email (melalui form kontak)</li>
          <li>Pesan dan pertanyaan yang Anda kirim</li>
          <li>Kontribusi chord yang Anda bagikan</li>
          <li>Informasi lain yang Anda berikan dalam komunikasi</li>
        </ul>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Penggunaan Informasi</h2>
        <h3 className="text-lg text-gray-200 mt-6 mb-2">Tujuan Utama</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li>Menyediakan layanan website</li>
          <li>Menjawab pertanyaan dan dukungan</li>
          <li>Memperbaiki dan mengembangkan website</li>
          <li>Mengirim update penting</li>
        </ul>

        <h3 className="text-lg text-gray-200 mt-6 mb-2">Analitik & Peningkatan</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li>Menganalisis penggunaan website</li>
          <li>Mendeteksi dan mencegah penyalahgunaan</li>
          <li>Meningkatkan keamanan</li>
          <li>Personalisasi pengalaman</li>
        </ul>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Berbagi Informasi</h2>
        <p>Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga, kecuali dalam kondisi berikut:</p>
        
        <h3 className="text-lg text-gray-200 mt-6 mb-2">Dengan Persetujuan Anda</h3>
        <p className="text-gray-400">Hanya jika Anda memberikan persetujuan eksplisit untuk berbagi informasi.</p>

        <h3 className="text-lg text-gray-200 mt-6 mb-2">Kewajiban Hukum</h3>
        <p className="text-gray-400">Jika diperlukan oleh hukum atau perintah pengadilan yang sah.</p>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Keamanan Data</h2>
        <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data Anda:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li>Enkripsi data dalam transit (HTTPS)</li>
          <li>Firewall dan sistem monitoring</li>
          <li>Regular security updates</li>
          <li>Akses data terbatas pada personel tertentu</li>
        </ul>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Hubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan hak Anda terkait data, silakan hubungi kami melalui halaman <a href="/kontak" className="text-rose-500 hover:underline">Kontak</a>.</p>
        <p className="text-gray-500 mt-8 text-sm font-mono">Kebijakan privasi ini berlaku untuk ChordIDN dan semua subdomain terkait.</p>
      </div>
    </div>
  );
}
