import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
      <Helmet>
        <title>Tentang Kami - ChordIDN</title>
        <meta name="description" content="Tentang ChordIDN - Koleksi chord gitar lengkap untuk para pecinta musik Indonesia." />
      </Helmet>

      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
          Tentang ChordIDN
        </h1>
        <p className="text-rose-400 font-mono text-lg">Koleksi chord gitar lengkap untuk para pecinta musik Indonesia</p>
      </header>

      <div className="prose prose-invert prose-rose max-w-none prose-headings:font-mono prose-headings:font-bold prose-headings:tracking-wide">
        <p className="text-lg text-gray-300 leading-relaxed">
          <strong>ChordIDN</strong> adalah platform digital yang menyediakan koleksi chord gitar lengkap dari berbagai artis Indonesia dan Mancanegara. Kami berkomitmen untuk memberikan akses mudah dan cepat ke ribuan chord lagu favorit Anda.
        </p>

        <h2 className="text-xl text-white mt-12 mb-6 border-b border-white/10 pb-2">Fitur Utama</h2>
        
        <div className="grid sm:grid-cols-2 gap-6 not-prose">
          <div className="p-5 border border-white/5 rounded-xl hover:border-rose-500/30 transition-colors">
            <span className="text-rose-500 font-mono font-bold text-2xl mb-2 block">1.</span>
            <h3 className="font-bold text-white text-lg mb-2">Koleksi Lengkap</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Ribuan chord dari berbagai artis Indonesia, dari klasik hingga modern.</p>
          </div>
          <div className="p-5 border border-white/5 rounded-xl hover:border-rose-500/30 transition-colors">
            <span className="text-rose-500 font-mono font-bold text-2xl mb-2 block">2.</span>
            <h3 className="font-bold text-white text-lg mb-2">Pencarian Cepat</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Temukan chord lagu favorit Anda dalam hitungan detik dengan fitur pencarian canggih & auto-suggest.</p>
          </div>
          <div className="p-5 border border-white/5 rounded-xl hover:border-rose-500/30 transition-colors">
            <span className="text-rose-500 font-mono font-bold text-2xl mb-2 block">3.</span>
            <h3 className="font-bold text-white text-lg mb-2">Responsive Design</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Akses mudah dan nyaman dari desktop maupun mobile device Anda.</p>
          </div>
          <div className="p-5 border border-white/5 rounded-xl hover:border-rose-500/30 transition-colors">
            <span className="text-rose-500 font-mono font-bold text-2xl mb-2 block">4.</span>
            <h3 className="font-bold text-white text-lg mb-2">Chord Interaktif</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Lihat chord dengan tooltip gambar diagram fretboard khusus untuk pemula yang sedang belajar.</p>
          </div>
        </div>

        <h2 className="text-xl text-white mt-12 mb-4 border-b border-white/10 pb-2">Misi Kami</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-400">
          <li>Menyediakan koleksi chord gitar yang lengkap dan terupdate</li>
          <li>Memfasilitasi pembelajaran musik melalui chord interaktif</li>
          <li>Menjaga kualitas dan akurasi chord yang disediakan</li>
          <li>Mendorong kreativitas musik di komunitas Indonesia</li>
        </ul>

        <h2 className="text-xl text-white mt-12 mb-4 border-b border-white/10 pb-2">Kontribusi Komunitas</h2>
        <p className="text-gray-300">
          ChordIDN dibangun dengan semangat berbagi pengetahuan musik. Kami mengundang komunitas musik Indonesia untuk berkontribusi.
        </p>

        <div className="flex gap-4 mt-8 not-prose">
          <Link to="/kontak" className="px-6 py-3 bg-rose-500 text-black font-bold font-mono rounded-lg hover:bg-rose-400 transition-colors">
            Kirim Chord Baru
          </Link>
          <Link to="/kontak" className="px-6 py-3 bg-transparent border border-white/20 text-white font-bold font-mono rounded-lg hover:border-white transition-colors">
            Laporkan Koreksi
          </Link>
        </div>
      </div>
    </div>
  );
}
