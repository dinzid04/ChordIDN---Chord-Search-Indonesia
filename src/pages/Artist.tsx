import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArtist } from '../lib/api';
import { truncateText } from '../lib/utils';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Artist() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchArtist(slug).then(res => {
        setData(res);
        setLoading(false);
      }).catch(console.error);
    }
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;
  }

  const pageTitle = `Chord ${data?.artist || 'Artis'} | ChordIDN`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Kumpulan chord gitar dan lirik lagu dari artis ${data?.artist || ''} terlengkap di ChordIDN.`} />
      </Helmet>

      <nav className="flex items-center gap-2 text-[10px] text-gray-500 overflow-x-auto whitespace-nowrap pb-2 uppercase tracking-widest font-bold">
        <Link to="/" className="hover:text-rose-500 flex items-center gap-1"><HomeIcon className="w-3 h-3"/> Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/artis" className="hover:text-rose-500">Artis</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-400">{data?.artist}</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-4xl font-mono font-bold text-white tracking-tight">
          {data?.artist}
        </h1>
        {data?.song_count && (
          <p className="text-rose-500 font-mono text-sm font-bold">{data.song_count}</p>
        )}
      </header>

      <div className="flex flex-col gap-0 border-y border-white/5 py-2">
        {data?.songs?.map((song: any, idx: number) => (
          <Link 
            key={idx} 
            to={song.path}
            className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all group px-4 -mx-4 rounded-xl"
          >
            <div className="flex items-center gap-4 overflow-hidden flex-1 min-w-0">
              <span className="text-rose-500/50 font-mono font-bold text-xs w-6 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
              <span className="font-mono font-bold text-gray-300 truncate group-hover:text-rose-400 transition-colors">{truncateText(song.title, 38)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
