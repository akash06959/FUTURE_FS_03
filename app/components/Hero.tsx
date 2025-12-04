import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full bg-yale-gray flex items-center justify-center overflow-hidden">
      
      {/* Text Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-yale-blue text-sm font-bold tracking-[0.3em] mb-4 uppercase">
          Reimagining The Canvas
        </p>
        <h1 className="text-6xl md:text-8xl font-serif text-yale-black mb-8 leading-tight">
          The Curated <br/> <span className="italic text-gray-400">Void.</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
          Welcome to the new digital archive of the Yale School of Art. 
          Where chaos meets curation in a gallery of infinite white.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-yale-blue text-white px-8 py-4 text-sm tracking-widest hover:bg-black transition-colors">
            VIEW GALLERY
          </button>
        </div>
      </div>

      {/* Background Decor (Abstract Circle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-200 rounded-full opacity-50 pointer-events-none" />
    </section>
  );
}