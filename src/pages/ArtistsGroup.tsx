import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArtistsGroup } from '../lib/api';
import { Helmet } from 'react-helmet-async';

export default function ArtistsGroup() {
  const { group } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArtistsGroup(group || 'ALL').then(res => {
      setData(res);
      setLoading(false);
    }).catch(console.error);
  }, [group]);

  if (loading) {
    return <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;
  }

  const pageTitle = `Daftar Artis (${data?.group || 'Semua'}) | ChordIDN`;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Daftar artis dan band musik di ChordIDN untuk abjad ${data?.group || 'Semua'}.`} />
      </Helmet>

      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-mono font-bold text-white tracking-tight">
          Daftar Artis
        </h1>
        <p className="text-rose-400 font-mono text-sm">{data?.total}</p>
      </header>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {data?.groups?.map((g: any, idx: number) => (
          <Link
            key={`${g.url}-${idx}`}
            to={g.path}
            className={`w-10 h-10 flex items-center justify-center border rounded-lg font-mono font-bold transition-all ${g.group === data.group ? 'border-rose-500 text-rose-500' : 'border-white/5 text-gray-400 hover:border-rose-500/50 hover:text-rose-400'}`}
          >
            {g.group}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.artists?.map((artist: any, idx: number) => (
          <Link 
            key={idx} 
            to={artist.path}
            className="flex flex-col p-4 rounded-xl border border-white/5 hover:bg-white/5 hover:border-rose-500/30 transition-all group items-center text-center gap-2"
          >
            <span className="font-mono font-bold text-gray-300 truncate w-full group-hover:text-rose-400 transition-colors">{artist.name}</span>
            <span className="text-[10px] text-gray-500 font-mono">{artist.song_count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
