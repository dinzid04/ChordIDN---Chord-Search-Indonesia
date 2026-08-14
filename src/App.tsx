import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Artist from './pages/Artist';
import ArtistsGroup from './pages/ArtistsGroup';

import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0A0B0E] text-[#E2E8F0] font-sans selection:bg-rose-500/30">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4 pb-12 md:p-8 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/chord/:artistSlug/:songSlug" element={<Detail />} />
            <Route path="/artis/:slug" element={<Artist />} />
            <Route path="/artis" element={<ArtistsGroup />} />
            <Route path="/artis/group/:group" element={<ArtistsGroup />} />
            
            <Route path="/tentang" element={<About />} />
            <Route path="/kontak" element={<Contact />} />
            <Route path="/privasi" element={<Privacy />} />
            <Route path="/penolakan" element={<Disclaimer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
