import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Branding */}
        <Link href="/" className="text-2xl font-serif font-bold text-yale-black tracking-tighter hover:text-yale-blue transition-colors">
          YALE <span className="text-yale-blue">ART</span>
        </Link>

        {/* Center: Links (Hidden on mobile) */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-500">
          <Link href="#" className="hover:text-yale-blue transition">EXHIBITIONS</Link>
          <Link href="#" className="hover:text-yale-blue transition">ARTISTS</Link>
          <Link href="#" className="hover:text-yale-blue transition">VISIT</Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-yale-blue" />
          <Menu className="w-6 h-6 text-yale-black cursor-pointer md:hidden" />
          <button className="hidden md:block border border-yale-blue text-yale-blue px-6 py-2 text-xs font-bold tracking-widest hover:bg-yale-blue hover:text-white transition-all">
            APPLY
          </button>
        </div>
      </div>
    </nav>
  );
}