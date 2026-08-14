import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-12 bg-[#0A0B0E]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase flex items-center gap-1 text-white">
            CHORD<span className="text-rose-500">IDN</span>
          </Link>
          <p className="text-gray-500 text-[10px] font-mono">&copy; {new Date().getFullYear()} ChordIDN. All rights reserved.</p>
        </div>
        
        <nav className="flex items-center gap-4 text-xs font-mono text-gray-500">
          <Link to="/tentang" className="hover:text-rose-500 transition-colors">Tentang</Link>
          <Link to="/kontak" className="hover:text-rose-500 transition-colors">Kontak</Link>
          <Link to="/privasi" className="hover:text-rose-500 transition-colors">Privasi</Link>
          <Link to="/penolakan" className="hover:text-rose-500 transition-colors">Penolakan</Link>
        </nav>
      </div>
    </footer>
  );
}
