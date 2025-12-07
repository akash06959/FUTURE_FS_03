// app/components/Footer.tsx

// Notice there is NO 'default' word here. just 'export function'
export function Footer() {
    return (
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-serif font-bold text-xl tracking-tighter">YALE <span className="text-yale-blue">ART</span></h4>
            <p className="text-xs text-gray-400 mt-2">© 2025 Rebranded Archive.</p>
          </div>
          
          <div className="flex gap-8 text-xs font-bold tracking-widest text-gray-500 uppercase">
            <a href="#" className="hover:text-[#FF4500] transition">Instagram</a>
            <a href="#" className="hover:text-[#FF4500] transition">Twitter</a>
            <a href="#" className="hover:text-[#FF4500] transition">Exhibitions</a>
          </div>
        </div>
      </footer>
    );
  }