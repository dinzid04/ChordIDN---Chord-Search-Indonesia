import { Helmet } from 'react-helmet-async';
import { Mail, Clock, MessageSquare, AlertTriangle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
      <Helmet>
        <title>Kontak Kami - ChordIDN</title>
        <meta name="description" content="Hubungi tim ChordIDN. Punya pertanyaan atau ingin berkontribusi mengirimkan chord baru? Silakan kontak kami." />
      </Helmet>

      <header className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
          Kontak Kami
        </h1>
        <p className="text-rose-400 font-mono text-lg">Punya pertanyaan atau ingin berkontribusi?</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-8">
          <section className="bg-[#15171E] p-6 rounded-2xl border border-white/5">
            <h2 className="text-xl font-mono font-bold text-white mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-rose-500" />
              Informasi Kontak
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Pertanyaan Umum</h3>
                <a href="mailto:info@chordidn.com" className="text-lg text-rose-400 hover:text-rose-300 transition-colors">
                  info@chordidn.com
                </a>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Kontribusi Chord</h3>
                <a href="mailto:chord@chordidn.com" className="text-lg text-rose-400 hover:text-rose-300 transition-colors">
                  chord@chordidn.com
                </a>
              </div>
            </div>
          </section>

          <section className="bg-[#15171E] p-6 rounded-2xl border border-white/5">
            <h2 className="text-xl font-mono font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-500" />
              Waktu Respon
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Kami berusaha merespon semua pesan dalam <strong className="text-white">24-48 jam</strong> pada hari kerja.
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-mono font-bold text-white border-b border-white/10 pb-4">Pertanyaan Umum (FAQ)</h2>
          
          <div className="space-y-4">
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Kirim Chord Baru
              </h3>
              <p className="text-gray-400 text-sm">
                Kirim melalui email <strong>chord@chordidn.com</strong> dengan format teks (txt) yang rapi dan jelas.
              </p>
            </div>
            
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                ChordIDN Gratis?
              </h3>
              <p className="text-gray-400 text-sm">
                Ya, sepenuhnya gratis untuk semua pecinta musik dan gitaris tanpa pungutan biaya apapun.
              </p>
            </div>
            
            <div className="border-b border-white/5 pb-4">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Lapor Kesalahan (Koreksi)
              </h3>
              <p className="text-gray-400 text-sm">
                Kirim email ke info@chordidn.com dengan menyertakan URL lagu dan detail kesalahan (lirik/chord) yang ditemukan.
              </p>
            </div>
            
            <div className="pt-2">
              <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Request Chord
              </h3>
              <p className="text-gray-400 text-sm">
                Kirim permintaan (request) lagu terbaru atau lagu lama melalui kontak email kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
