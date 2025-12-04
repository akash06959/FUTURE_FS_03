'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  src: string;
}

const CATEGORIES = ["All", "Sculpture", "Digital", "Photography", "Architecture"];

export default function ArtGallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // <--- New State

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

  // Filter logic
  const filteredArt = selectedCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === selectedCategory);

  if (loading) return <div className="p-20 text-center">Loading Gallery...</div>;

  return (
    <section className="py-24 bg-white text-yale-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6 gap-4">
          <h2 className="text-4xl font-serif">Student Exhibitions</h2>
          
          {/* FILTER BUTTONS */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 text-xs uppercase tracking-widest border rounded-full transition-all 
                  ${selectedCategory === cat 
                    ? 'bg-yale-blue text-white border-yale-blue' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-yale-blue'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredArt.map((art) => (
            // WRAP IN LINK FOR MISSION 2
            <Link href={`/art/${art.id}`} key={art.id} className="group cursor-pointer block">
              <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4">
                 {art.src && <img 
                   src={art.src} 
                   alt={art.title}
                   className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition duration-700"
                 />}
              </div>
              <h3 className="text-xl font-serif font-bold group-hover:text-yale-blue transition-colors">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.artist}</p>
              <p className="text-xs text-yale-blue mt-1 uppercase tracking-wider">{art.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}