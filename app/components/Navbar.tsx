'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react'; // Import X for closing
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // Import animations

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false); // Close menu on search
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold text-yale-black tracking-tighter hover:text-yale-blue transition-colors">
            YALE <span className="text-yale-blue">ART</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-500">
            <Link href="/#exhibitions" className="hover:text-[#FF4500] transition">EXHIBITIONS</Link>
            <Link href="/#about" className="hover:text-[#FF4500] transition">PHILOSOPHY</Link>
            <Link href="/#visit" className="hover:text-[#FF4500] transition">VISIT</Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 px-4 py-2 pr-10 text-sm border-b border-gray-300 focus:border-[#FF4500] outline-none transition-colors placeholder:text-gray-400"
              />
              <Search className="absolute right-2 w-4 h-4 text-gray-400 pointer-events-none" />
            </form>
            
            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
              <Menu className="w-6 h-6 text-yale-black cursor-pointer" />
            </button>
            
            <Link 
              href="/apply" 
              className="hidden md:block border border-yale-blue text-yale-blue bg-white px-6 py-2 text-xs font-bold tracking-widest hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white hover:scale-105 transition-all duration-300"
            >
              APPLY
            </Link>
          </div>
        </div>
      </nav>

      {/* FULL SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-yale-blue text-white flex flex-col p-10 md:hidden"
          >
            <div className="flex justify-end mb-10">
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-8 text-2xl font-serif">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/#exhibitions" onClick={() => setIsMenuOpen(false)}>Exhibitions</Link>
              <Link href="/#about" onClick={() => setIsMenuOpen(false)}>Philosophy</Link>
              <Link href="/apply" onClick={() => setIsMenuOpen(false)} className="text-[#FF4500]">Apply Now</Link>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-12 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Artworks..."
                className="w-full bg-transparent border-b border-white/30 py-4 text-xl outline-none placeholder:text-white/50"
              />
              <button type="submit" className="absolute right-0 top-4">
                <Search className="w-6 h-6 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}