'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // 1. SCROLL LISTENER: Detects if page has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-serif font-bold text-yale-black tracking-tighter hover:text-[#FF4500] transition-colors z-50">
            YALE <span className="text-[#FF4500]">ART</span>
          </Link>

          {/* DESKTOP LINKS - Fades out on transparent header for cleaner look, or keep visible */}
          <div className={`hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] transition-colors ${isScrolled ? 'text-gray-500' : 'text-gray-800'}`}>
            <Link href="/#exhibitions" className="hover:text-[#FF4500] transition">EXHIBITIONS</Link>
            <Link href="/#about" className="hover:text-[#FF4500] transition">PHILOSOPHY</Link>
            <Link href="/#visit" className="hover:text-[#FF4500] transition">VISIT</Link>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-6">
            
            {/* 2. EXPANDING SEARCH BAR */}
            <div className="flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-transparent border-b border-gray-800 text-sm outline-none mr-4"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className={`w-5 h-5 transition-colors ${isSearchOpen ? 'text-[#FF4500]' : 'text-gray-800'}`} />
              </button>
            </div>
            
            {/* MOBILE MENU TOGGLE */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
              <Menu className="w-6 h-6 text-black" />
            </button>
            
            {/* APPLY BUTTON */}
            <Link 
              href="/apply" 
              className={`hidden md:block border px-6 py-2 text-xs font-bold tracking-widest transition-all duration-300 ${
                isScrolled 
                  ? 'border-yale-blue text-yale-blue hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              APPLY
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col justify-center items-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6">
              <X className="w-8 h-8 text-black hover:text-[#FF4500] transition" />
            </button>

            <div className="flex flex-col gap-10 text-center">
              <Link href="/#exhibitions" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif hover:text-[#FF4500] transition">Exhibitions</Link>
              <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif hover:text-[#FF4500] transition">Philosophy</Link>
              <Link href="/#visit" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif hover:text-[#FF4500] transition">Visit</Link>
              <Link href="/apply" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif text-[#FF4500] font-bold">Apply Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
