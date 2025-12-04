'use client';
import { motion } from 'framer-motion'; // <--- Import this

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* We wrap the content in motion.div */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        
        {/* Animate the small top text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-yale-blue text-sm font-bold tracking-[0.3em] mb-6 uppercase"
        >
          Reimagining The Canvas
        </motion.p>

        {/* Animate the Main Title (Slower, more dramatic) */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-serif text-yale-black mb-8 leading-tight"
        >
          The Curated <br/> 
          <span className="italic text-gray-400">Void.</span>
        </motion.h1>

        {/* Animate the Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-500 max-w-lg mx-auto mb-10 text-lg leading-relaxed"
        >
          Welcome to the new digital archive of the Yale School of Art. 
          Where chaos meets curation.
        </motion.p>

        {/* Animate Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center gap-4"
        >
          <button className="bg-yale-blue text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-black transition-all duration-500">
            ENTER GALLERY
          </button>
        </motion.div>
      </div>
    </section>
  );
}