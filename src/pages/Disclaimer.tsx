import { Helmet } from 'react-helmet-async';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
      <Helmet>
        <title>Penolakan (Disclaimer) - ChordIDN</title>
        <meta name="description" content="Batasan tanggung jawab dan penolakan (disclaimer) penggunaan website ChordIDN." />
      </Helmet>

      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
          Penolakan (Disclaimer)
        </h1>
        <p className="text-rose-400 font-mono text-lg">Batasan tanggung jawab dan penggunaan website</p>
      </header>

      <div className="bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded-r-lg">
        <p className="text-rose-200 text-sm font-mono font-bold">
          PENTING: Harap baca penolakan ini dengan seksama sebelum menggunakan ChordIDN.
        </p>
      </div>

      <div className="prose prose-invert prose-rose max-w-none prose-headings:font-mono prose-headings:font-bold prose-headings:tracking-wide">
        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Penerimaan Penolakan</h2>
        <p>Dengan mengakses dan menggunakan <strong>ChordIDN</strong>, Anda menerima dan menyetujui untuk terikat oleh syarat-syarat penolakan ini. Jika Anda tidak setuju dengan bagian mana pun dari penolakan ini, Anda tidak boleh menggunakan website ini.</p>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">"Sebagaimana Adanya"</h2>
        <p>ChordIDN disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li>Website akan selalu tersedia</li>
          <li>Informasi akurat 100%</li>
          <li>Konten bebas dari kesalahan</li>
          <li>Website bebas dari virus</li>
          <li>Fitur berfungsi sempurna</li>
        </ul>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Konten dan Akurasi Chord</h2>
        <h3 className="text-lg text-gray-200 mt-6 mb-2">Sumber Konten</h3>
        <p className="text-gray-400">Chord dan lirik yang disediakan berasal dari berbagai sumber publik dan kontribusi pengguna. Kami tidak mengklaim kepemilikan atas konten ini.</p>

        <h3 className="text-lg text-gray-200 mt-6 mb-2">Akurasi Tidak Dijamin</h3>
        <p className="text-gray-400">Meskipun kami berusaha menyediakan chord yang akurat, kesalahan dapat terjadi. Chord mungkin bervariasi tergantung pada versi lagu, aransemen, atau preferensi pemain.</p>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Hak Kekayaan Intelektual</h2>
        <p>ChordIDN menghormati hak kekayaan intelektual pihak ketiga. Namun:</p>
        <ul className="list-disc pl-6 space-y-1 text-gray-400">
          <li><strong>Konten Musik:</strong> Chord dan lirik lagu dilindungi oleh hak cipta. Penggunaan untuk tujuan komersial memerlukan izin dari pemegang hak cipta.</li>
          <li><strong>Konten Website:</strong> Desain, kode, dan konten website ChordIDN dilindungi oleh hak cipta. Dilarang mengcopy tanpa izin.</li>
        </ul>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Batasan Tanggung Jawab</h2>
        <p>Dalam batas maksimal yang diizinkan oleh hukum, ChordIDN dan afiliasinya tidak bertanggung jawab atas kerugian finansial, kerusakan reputasi, gangguan bisnis, kesalahan teknis, maupun link eksternal yang ada di dalam website kami.</p>

        <h2 className="text-xl text-white mt-8 mb-4 border-b border-white/10 pb-2">Penggunaan Website</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div>
            <h3 className="text-green-400 font-bold mb-2 font-mono">Yang Boleh Dilakukan</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-400 text-sm">
              <li>Mengakses konten untuk penggunaan pribadi</li>
              <li>Berbagi link ke chord</li>
              <li>Menggunakan untuk belajar musik</li>
              <li>Mengirim saran perbaikan</li>
            </ul>
          </div>
          <div>
            <h3 className="text-rose-400 font-bold mb-2 font-mono">Yang Dilarang Dilakukan</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-400 text-sm">
              <li>Menggunakan untuk tujuan komersial tanpa izin</li>
              <li>Menyalin konten secara massal</li>
              <li>Mengganggu operasional website</li>
              <li>Menggunakan bot atau automated tools</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-500 mt-12 text-sm font-mono border-t border-white/10 pt-4">Dengan menggunakan ChordIDN, Anda mengakui telah membaca, memahami, dan menyetujui penolakan ini.</p>
      </div>
    </div>
  );
}
