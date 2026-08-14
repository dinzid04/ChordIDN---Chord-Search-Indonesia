import { POPULAR_SEARCHES } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hash, Flame, BookOpen, Crown } from 'lucide-react';
import { fetchHome } from '../lib/api';
import { truncateText } from '../lib/utils';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHome().then(res => {
      setData(res);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) {
    return <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <Helmet>
        <title>ChordIDN - Platform Kunci Gitar & Lirik Lagu Terlengkap</title>
        <meta name="description" content="Situs penyedia chord gitar dan lirik lagu Indonesia maupun mancanegara terlengkap, chord dasar mudah, dan autoscroll." />
      </Helmet>

      <section className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white leading-tight">
          ChordIDN - Situs Chord Gitar & Lirik Lagu Terlengkap Indonesia
        </h1>
        
        {/* Search Bar for Home Page */}
        <div className="pt-4 pb-2">
          <form onSubmit={(e) => {
            e.preventDefault();
            const val = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
            if (val.trim()) window.location.href = `/search?q=${encodeURIComponent(val.trim())}`;
          }} className="relative max-w-2xl">
            <input
              type="text"
              name="q"
              placeholder="Cari chord, lagu, atau artis favoritmu di sini..."
              className="w-full bg-[#15171E] border border-white/10 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-rose-500/50 transition-colors shadow-xl"
            />
            <SearchIcon className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
            <button type="submit" className="absolute right-2 top-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-full font-mono text-sm font-bold transition-colors">
              Cari
            </button>
          </form>
          
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mr-2">Sering Dicari:</span>
              {POPULAR_SEARCHES.map((term, idx) => (
                <Link 
                  key={idx} 
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1 bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/5 rounded-full text-[10px] font-mono transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-gray-300 font-mono text-sm md:text-base leading-relaxed mt-4">
          <p>
            Selamat datang di <span className="text-rose-500 font-bold">ChordIDN</span>, website terbaik untuk mencari chord gitar dan lirik lagu Indonesia maupun mancanegara. Kami menyediakan ribuan koleksi kunci gitar dasar yang mudah dipelajari, dilengkapi dengan lirik lagu dari berbagai artis dan band favorit Anda.
          </p>
          <p>
            Database kami mencakup berbagai genre musik populer seperti dangdut, campursari, pop, rock, reggae, punk, dan masih banyak lagi. Tidak hanya lagu berbahasa Indonesia, kami juga memiliki koleksi chord dari lagu berbahasa Inggris, Korea, Malaysia, serta bahasa daerah seperti Jawa, Minang, Bali, dan Batak.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-mono font-bold text-white mt-8 mb-4">Fitur Lengkap untuk Belajar Gitar</h2>
        <div className="space-y-4 text-gray-300 font-mono text-sm md:text-base leading-relaxed">
          <p>
            Setiap hari kami terus mengupdate koleksi chord terbaru dari lagu-lagu hits terkini maupun lagu nostalgia yang selalu dirindukan. Untuk memudahkan pencarian, gunakan menu navigasi berdasarkan huruf depan nama artis atau band, atau manfaatkan kotak pencarian yang telah kami siapkan.
          </p>
          <p>
            Fitur transpose chord memungkinkan Anda mengatur tinggi rendah nada sesuai dengan kemampuan vokal. Dengan fitur autoscroll, halaman chord akan otomatis scroll ke bawah dengan kecepatan yang dapat diatur, sangat membantu saat Anda fokus memainkan gitar tanpa perlu menggeser layar secara manual.
          </p>
        </div>

        <div className="bg-rose-500/10 border-l-4 border-rose-500/50 rounded-r-xl p-6 mt-8">
          <h3 className="text-rose-400 font-bold text-lg mb-2">Penting!</h3>
          <p className="text-rose-200/80 font-mono text-sm leading-relaxed">
            Website ini hanya menyediakan chord gitar dan lirik lagu sebagai sarana pembelajaran musik. Kami tidak menyediakan download MP3 atau file audio lagu. Mari dukung artis dan musisi favorit dengan membeli album original mereka dan subscribe channel YouTube resmi.
          </p>
        </div>

        <p className="text-gray-400 font-mono text-sm md:text-base leading-relaxed mt-6 italic">
          Terima kasih telah mengunjungi ChordIDN. Semoga website ini membantu Anda dalam belajar gitar dan menikmati musik. Selamat bernyanyi dan bermain gitar!
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
        <section>
          <div className="flex items-center justify-start gap-2 mb-6">
            <Flame className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-mono font-bold tracking-widest uppercase text-rose-500">Daftar Lagu Terbaru</h2>
          </div>
          <div className="flex flex-col gap-0">
            {data?.latest_songs?.slice(0, 15).map((song: any, idx: number) => (
              <Link 
                key={`${song.url}-${idx}`} 
                to={song.path}
                className="flex items-center justify-between py-3 border-b border-white/5 hover:border-rose-500/30 transition-all group last:border-0"
              >
                <div className="flex items-center gap-4 overflow-hidden flex-1 min-w-0 mr-4">
                  <span className="text-rose-500/50 font-mono font-bold text-xs w-6 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="font-mono text-gray-300 text-sm truncate group-hover:text-rose-400 transition-colors">{truncateText(song.title, 38)}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 shrink-0 group-hover:text-gray-400">{song.artist}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <div className="flex gap-4 items-start">
            <div className="shrink-0 mt-1">
              <BookOpen className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-lg font-mono font-bold text-yellow-500 mb-2">Tips Belajar Gitar</h3>
              <p className="text-gray-400 font-mono leading-relaxed text-sm">
                Kami menyediakan chord kunci gitar dasar (mayor, minor, seventh) yang mudah dipelajari pemula. 
                Untuk lagu yang lebih kompleks, kami juga menyediakan variasi chord sesuai dengan nada asli lagunya. 
                Gunakan fitur transpose untuk menyesuaikan kunci dengan vokal Anda.
              </p>
            </div>
          </div>

          {Object.entries(data?.sections || {}).map(([title, links]: [string, any]) => (
            <div key={title}>
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-4 h-4 text-gray-500" />
                <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold">{title}</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {links.map((link: any, idx: number) => (
                  <li key={`${link.url}-${idx}`}>
                    <Link to={link.path} className="text-gray-400 hover:text-rose-400 flex items-center gap-3 transition-colors text-sm py-1">
                      <span className="w-1.5 h-px bg-rose-500/50" />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-4 h-4 text-yellow-500/70" />
              <h2 className="text-xs uppercase tracking-widest text-yellow-500/70 font-bold">Artis Terpopuler</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {data?.popular_artists?.map((artist: any, idx: number) => (
                <Link
                  key={`${artist.url}-${idx}`}
                  to={artist.path}
                  className="px-3 py-1.5 rounded-full border border-white/10 text-[10px] uppercase font-mono tracking-wider text-gray-400 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                >
                  {artist.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5">
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Browse By Artist</h2>
            <div className="flex flex-wrap gap-2">
              {data?.browse_by_artist?.map((group: any, idx: number) => (
                <Link
                  key={`${group.url}-${idx}`}
                  to={group.path}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 font-mono text-xs text-gray-400 hover:bg-white/5 hover:border-rose-500/50 hover:text-rose-400 transition-all"
                >
                  {group.group}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
