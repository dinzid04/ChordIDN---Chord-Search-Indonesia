import { useState, useEffect } from 'react';
import { Search, Menu, X, User, Info, Mail, ShieldAlert, FileText } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setQuery('');
    }
  }, [location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F1117]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-2 text-white">
          CHORD<span className="text-rose-500">IDN</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 flex-1 max-w-lg ml-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Cari chord atau lagu..."
              value={query}
              onChange={handleSearchChange}
              className="w-full bg-[#15171E] border border-white/5 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-rose-500/50 transition-colors text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </form>
          <div className="flex items-center gap-4">
            <Link to="/artis" className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-rose-500 whitespace-nowrap transition-colors">
              Artis
            </Link>
            <Link to="/tentang" className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-rose-500 whitespace-nowrap transition-colors">
              Tentang
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-1 -mr-2">
          <button 
            className="p-2 text-gray-400 hover:bg-white/5 hover:text-rose-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={cn(
        "md:hidden absolute w-full bg-[#0F1117] border-b border-white/10 transition-all duration-300 ease-in-out overflow-y-auto shadow-2xl",
        isOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 space-y-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Cari chord atau lagu..."
              value={query}
              onChange={handleSearchChange}
              className="w-full bg-[#15171E] border border-white/5 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </form>
          
          <nav className="flex flex-col gap-1 pb-4">
            <Link 
              to="/artis" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-mono">Browse Artis (A-Z)</span>
            </Link>
            <div className="h-px bg-white/5 my-2 mx-3"></div>
            <Link 
              to="/tentang" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <Info className="w-5 h-5" />
              <span className="font-mono">Tentang</span>
            </Link>
            <Link 
              to="/kontak" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-mono">Kontak</span>
            </Link>
            <Link 
              to="/privasi" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <ShieldAlert className="w-5 h-5" />
              <span className="font-mono">Privasi</span>
            </Link>
            <Link 
              to="/penolakan" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span className="font-mono">Penolakan</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
