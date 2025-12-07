'use client';

import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold text-yale-black tracking-tighter hover:text-yale-blue transition-colors">
          YALE <span className="text-yale-blue">ART</span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-500">
          <Link href="/#exhibitions" className="hover:text-[#FF4500] transition">EXHIBITIONS</Link>
          <Link href="/#about" className="hover:text-[#FF4500] transition">PHILOSOPHY</Link>
          <Link href="/#visit" className="hover:text-[#FF4500] transition">VISIT</Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
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
          
          <Menu className="w-6 h-6 text-yale-black cursor-pointer md:hidden" />
          
          {/* 👇 UPDATED: Links to the new page /apply */}
          <Link 
            href="/apply" 
            className="hidden md:block border border-yale-blue text-yale-blue bg-white px-6 py-2 text-xs font-bold tracking-widest hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white hover:scale-105 transition-all duration-300"
          >
            APPLY
          </Link>
        </div>
      </div>
    </nav>
  );
}