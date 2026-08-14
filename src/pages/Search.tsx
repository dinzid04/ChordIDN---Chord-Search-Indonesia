import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { fetchSearch } from '../lib/api';
import { truncateText } from '../lib/utils';
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const navigate = useNavigate();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('chordidn_search_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchSearch(query, page).then(res => {
        setData(res);
        setLoading(false);
        
        // Save to history
        setHistory(prev => {
          const newHistory = [query, ...prev.filter(q => q.toLowerCase() !== query.toLowerCase())].slice(0, 10);
          localStorage.setItem('chordidn_search_history', JSON.stringify(newHistory));
          return newHistory;
        });
        
      }).catch(console.error);
    } else {
      setData(null);
      setLoading(false);
    }
  }, [query, page]);

  const removeHistory = (qToRemove: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(q => q !== qToRemove);
      localStorage.setItem('chordidn_search_history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('chordidn_search_history');
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  if (loading) {
    return <div className="flex justify-center py-24"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;
  }

  const pageTitle = query ? `Pencarian: ${query} | ChordIDN` : 'Pencarian | ChordIDN';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Hasil pencarian chord gitar dan lirik lagu untuk kata kunci: ${query || 'lagu'} di ChordIDN.`} />
      </Helmet>

      {!query ? (
        <div className="space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-mono font-bold text-white uppercase tracking-tight">
              Pencarian
            </h1>
            <p className="text-gray-400 font-mono text-sm">Cari lagu atau artis favoritmu.</p>
          </header>
          
          {history.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Riwayat Pencarian
                </h2>
                <button onClick={clearHistory} className="text-[10px] uppercase font-mono text-gray-500 hover:text-rose-500">
                  Hapus Semua
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {history.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <Link to={`/search?q=${encodeURIComponent(h)}`} className="flex-1 py-3 text-gray-300 font-mono text-sm hover:text-rose-400">
                      {h}
                    </Link>
                    <button onClick={() => removeHistory(h)} className="p-2 text-gray-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-mono font-bold text-white uppercase tracking-tight">
              {data?.header || 'Hasil Pencarian'}
            </h1>
            <p className="text-gray-400 font-mono text-sm">Menampilkan halaman {page} dari {data?.total_pages || 1} untuk <span className="text-rose-500 font-bold">"{query}"</span></p>
          </header>

          {data?.results?.length > 0 ? (
            <div className="flex flex-col gap-0 border-y border-white/5 py-2">
              {data.results.map((item: any, idx: number) => (
                <Link 
                  key={idx} 
                  to={item.path}
                  className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all group px-4 -mx-4 rounded-xl overflow-hidden"
                >
                  <div className="flex flex-col overflow-hidden flex-1 min-w-0 mr-4">
                    <span className="font-mono font-bold text-gray-300 truncate group-hover:text-rose-400 transition-colors">{truncateText(item.title, 38)}</span>
                    <span className="font-mono text-xs text-gray-500 mt-1 truncate">{item.artist}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 shrink-0 group-hover:text-rose-500 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>{data?.message || 'Tidak ada hasil yang ditemukan.'}</p>
            </div>
          )}

          {data?.total_pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="p-2 bg-transparent border border-white/10 rounded-lg text-gray-400 hover:text-rose-500 hover:border-rose-500 disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:border-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="font-mono text-gray-300 text-sm">
                {page} / {data.total_pages}
              </span>

              <button 
                disabled={!data?.has_next}
                onClick={() => handlePageChange(page + 1)}
                className="p-2 bg-transparent border border-white/10 rounded-lg text-gray-400 hover:text-rose-500 hover:border-rose-500 disabled:opacity-50 disabled:hover:text-gray-400 disabled:hover:border-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
