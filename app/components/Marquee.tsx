'use client';
import { motion } from 'framer-motion';

export default function Marquee() {
  return (
    <div className="bg-yale-blue text-white py-4 overflow-hidden border-y border-white/10">
      <motion.div 
        className="flex whitespace-nowrap text-xs font-bold tracking-[0.2em] uppercase"
        animate={{ x: [0, -1000] }} // Moves left forever
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {/* Repeat the text multiple times so it loops smoothly */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8">
            Yale School of Art • Fall Exhibitions 2025 • Admissions Open • 
          </span>
        ))}
      </motion.div>
    </div>
  );
}