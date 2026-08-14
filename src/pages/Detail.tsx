import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Play, Pause, ChevronRight, Home as HomeIcon } from 'lucide-react';
import { fetchDetail } from '../lib/api';
import { truncateText } from '../lib/utils';
import { transposeText } from '../lib/transpose';
import { chordImage } from '../lib/chords';
import { Helmet } from 'react-helmet-async';

export default function Detail() {
  const { artistSlug, songSlug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [transposeStep, setTransposeStep] = useState(0);
  const [showOriginal, setShowOriginal] = useState(true);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const scrollIntervalRef = useRef<number | null>(null);

  const [activeChord, setActiveChord] = useState<{ chord: string, img: string, x: number, y: number } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDetail(`/chord/${artistSlug}/${songSlug}`).then(res => {
      setData(res);
      setLoading(false);
      setTransposeStep(0);
      setIsScrolling(false);
      
      const query = encodeURIComponent(`${res.artist} ${res.title} official audio`);
      fetch(`/api/youtube?q=${query}`)
        .then(r => r.json())
        .then(d => {
          if (d.videoId) setYoutubeId(d.videoId);
        })
        .catch(() => {});
    }).catch(console.error);
  }, [artistSlug, songSlug]);

  useEffect(() => {
    if (isScrolling) {
      scrollIntervalRef.current = window.setInterval(() => {
        window.scrollBy({ top: scrollSpeed, left: 0, behavior: 'smooth' });
      }, 50);
    } else {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isScrolling, scrollSpeed]);

  useEffect(() => {
    const handleScroll = () => setActiveChord(null);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;
  }

  const handleTranspose = (dir: 1 | -1) => {
    let next = transposeStep + dir;
    if (next > 11) next = -11;
    if (next < -11) next = 11;
    setTransposeStep(next);
  };

  const displayChords = transposeText(data.chord_text, transposeStep);
  const displayOriginalChords = data.original_chord_text ? transposeText(data.original_chord_text, transposeStep) : '';

  const handleChordClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'SPAN' && target.classList.contains('chord-word')) {
      const chord = target.innerText;
      
      if (activeChord && activeChord.chord === chord) {
        setActiveChord(null);
        return;
      }
      
      const img = chordImage(chord);
      if (img) {
        const tooltipWidth = 140; 
        let x = e.clientX;
        
        if (x < tooltipWidth / 2 + 16) {
          x = tooltipWidth / 2 + 16;
        } else if (x > window.innerWidth - tooltipWidth / 2 - 16) {
          x = window.innerWidth - tooltipWidth / 2 - 16;
        }

        setActiveChord({ 
          chord, 
          img, 
          x, 
          y: e.clientY 
        });
      }
    } else {
      setActiveChord(null);
    }
  };

  const renderChordText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      
      const isChordLine = /^[\sA-G#bm\d\/\(\)-]+$/.test(line) && line.trim().length > 0;
      
      if (isChordLine) {
        
        const formattedLine = line.replace(/\b([A-G][#b]?(?:(?:maj|min|dim|aug|sus|add|m)\d*|\d+)*)(?=[\s()\-/,:;]|$)/g, '<span class="text-rose-500 font-bold cursor-pointer hover:underline hover:text-white transition-colors chord-word">$1</span>');
        return <div key={i} className="min-h-[1.5em]" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      return <div key={i} className="min-h-[1.5em]">{line}</div>;
    });
  };

  const pageTitle = `Chord ${data.title} - ${data.artist} | ChordIDN`;
  const pageDesc = `Kunci gitar dan lirik lagu ${data.title} oleh ${data.artist}. Mainkan chord dasar yang mudah dipelajari dari ChordIDN.`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-32">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>

      <nav className="flex items-center gap-2 text-[10px] text-gray-500 overflow-x-auto whitespace-nowrap pb-2 uppercase tracking-widest font-bold">
        <Link to="/" className="hover:text-rose-500 flex items-center gap-1"><HomeIcon className="w-3 h-3"/> Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={data.artist_path} className="hover:text-rose-500">{data.artist}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">{data.title}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-mono font-bold text-white leading-tight">
          {data.title}
        </h1>
        <h2 className="text-xl md:text-2xl font-serif italic text-rose-400 tracking-wide">
          {data.artist}
        </h2>
        {data.capo && (
          <div className="inline-block mt-4 px-3 py-1 bg-white/5 border border-white/10 text-white text-[10px] uppercase font-bold rounded">
            {data.capo}
          </div>
        )}
      </header>

      {youtubeId && (
        <div className="aspect-video w-full max-w-2xl mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${youtubeId}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      )}

      <div className="sticky top-16 z-40 bg-[#0F1117] py-3 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex flex-row items-center justify-between sm:justify-start gap-4 w-full overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-gray-500 font-bold">Transpose</span>
            <div className="flex items-center rounded-lg overflow-hidden">
              <button onClick={() => handleTranspose(-1)} className="px-2 py-1 text-gray-400 hover:text-rose-500 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-6 text-center font-mono font-bold text-rose-500 text-sm">
                {transposeStep > 0 ? `+${transposeStep}` : transposeStep}
              </span>
              <button onClick={() => handleTranspose(1)} className="px-2 py-1 text-gray-400 hover:text-rose-500 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block shrink-0"></div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest text-gray-500 font-bold">Autoscroll</span>
            <div className="flex items-center gap-2">
              <input 
                type="range" 
                min="1" max="5" 
                value={scrollSpeed} 
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                className="w-16 sm:w-24 accent-rose-500"
              />
              <button 
                onClick={() => setIsScrolling(!isScrolling)}
                className={`p-1.5 rounded-lg transition-colors ${isScrolling ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
              >
                {isScrolling ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
            </div>
          </div>

          {data.original_chord_text && (
            <>
              <div className="w-px h-4 bg-white/10 hidden sm:block shrink-0 ml-auto"></div>
              <div className="shrink-0 sm:ml-0 ml-auto">
                <button 
                  onClick={() => setShowOriginal(!showOriginal)}
                  className={`px-2 py-1 text-xs font-bold font-mono transition-all ${showOriginal ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
                >
                  {showOriginal ? 'Tutup Original' : 'Original Chord'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto pt-4 pb-12" onClick={handleChordClick}>
        <div className="font-mono text-sm md:text-base whitespace-pre leading-loose text-[#E2E8F0]">
          {renderChordText(displayChords)}
        </div>
        
        {showOriginal && data.original_chord_text && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-rose-500 font-bold font-mono mb-6 uppercase tracking-widest text-sm">=== Original Chord ===</h3>
            <div className="font-mono text-sm md:text-base whitespace-pre leading-loose text-[#E2E8F0]">
              {renderChordText(displayOriginalChords)}
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
        {data.artist_collection && data.artist_collection.length > 0 && (
          <section>
            <h3 className="text-lg font-mono font-bold text-rose-500 mb-4 uppercase tracking-widest">Chord Lain dari {data.artist}</h3>
            <div className="flex flex-col gap-1">
              {data.artist_collection.map((item: any, idx: number) => (
                <Link key={idx} to={item.path || item.url.replace('https://chordtela.web.id', '')} className="py-2 hover:text-white transition-all flex items-center justify-between gap-4 group border-b border-white/5 last:border-0 overflow-hidden">
                  <span className="font-mono text-gray-400 text-sm truncate flex-1 min-w-0 group-hover:text-rose-400 transition-colors">{truncateText(item.title, 38)}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600 shrink-0 group-hover:text-rose-500 transition-colors" />
                </Link>
              ))}
            </div>
            <Link 
              to={`/artis/${artistSlug}`} 
              className="mt-4 py-2 text-rose-500 hover:text-rose-400 font-mono text-sm inline-flex items-center gap-1 transition-colors group"
            >
              Lihat semua chord dari {data.artist} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        )}

        {data.related && data.related.length > 0 && (
          <section>
            <h3 className="text-lg font-mono font-bold text-rose-500 mb-4 uppercase tracking-widest">Rekomendasi Lainnya</h3>
            <div className="flex flex-col gap-1">
              {data.related.map((item: any, idx: number) => (
                <Link key={idx} to={item.path || item.url.replace('https://chordtela.web.id', '')} className="py-2 hover:text-white transition-all flex items-center justify-between gap-4 group border-b border-white/5 last:border-0 overflow-hidden">
                  <span className="font-mono text-gray-400 text-sm truncate flex-1 min-w-0 group-hover:text-rose-400 transition-colors">{truncateText(item.title, 38)}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600 shrink-0 group-hover:text-rose-500 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {activeChord && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[110%] drop-shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          style={{ left: activeChord.x, top: activeChord.y }}
        >
          <div className="bg-white p-1 rounded-xl shadow-2xl border-4 border-rose-500">
            <img src={activeChord.img} alt={`Chord ${activeChord.chord}`} className="h-32 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
