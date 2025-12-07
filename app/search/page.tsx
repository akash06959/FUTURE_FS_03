'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { SectionWrapper } from '../components/SectionWrapper';
import { motion } from 'framer-motion';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  src: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredArt, setFilteredArt] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "artworks"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Artwork[];
        setArtworks(items);
      } catch (error) {
        console.error("Error fetching art:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArt();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredArt([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = artworks.filter(art => 
      art.title.toLowerCase().includes(searchTerm) ||
      art.artist.toLowerCase().includes(searchTerm) ||
      art.category.toLowerCase().includes(searchTerm)
    );
    setFilteredArt(filtered);
  }, [query, artworks]);

  return (
    <main>
      <Navbar />
      
      <SectionWrapper bgImage="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000" opacity="95">
        <div className="max-w-7xl mx-auto pt-20 pb-24">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              {query ? `Search Results for "${query}"` : 'Search'}
            </h1>
            {query && (
              <p className="text-gray-500">
                {filteredArt.length === 0 
                  ? 'No artworks found.' 
                  : `Found ${filteredArt.length} ${filteredArt.length === 1 ? 'artwork' : 'artworks'}`}
              </p>
            )}
            {!query && (
              <p className="text-gray-500">Enter a search term to find artworks.</p>
            )}
          </div>

          {/* Results */}
          {loading ? (
            <div className="p-20 text-center">Loading...</div>
          ) : filteredArt.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredArt.map((art, index) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <Link href={`/art/${art.id}`} className="group cursor-pointer block">
                    <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4">
                      {art.src && <img 
                        src={art.src} 
                        alt={art.title}
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-700"
                      />}
                    </div>
                    <h3 className="text-xl font-serif font-bold group-hover:text-[#FF4500] transition-colors">{art.title}</h3>
                    <p className="text-sm text-gray-500">{art.artist}</p>
                    <p className="text-xs text-yale-blue mt-1 uppercase tracking-wider">{art.category}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-8">No artworks match your search.</p>
              <Link 
                href="/#exhibitions" 
                className="inline-block border border-yale-blue text-yale-blue px-6 py-2 text-xs font-bold tracking-widest hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white transition-all duration-300"
              >
                Browse All Artworks
              </Link>
            </div>
          ) : null}
        </div>
      </SectionWrapper>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main>
        <Navbar />
        <SectionWrapper bgImage="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000" opacity="95">
          <div className="max-w-7xl mx-auto pt-20 pb-24">
            <div className="p-20 text-center">Loading...</div>
          </div>
        </SectionWrapper>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}

