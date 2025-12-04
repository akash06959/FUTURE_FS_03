'use client';
import { useEffect, useState, use } from 'react';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ArtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [art, setArt] = useState<any>(null);
  const [relatedArt, setRelatedArt] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      const docRef = doc(db, "artworks", id);
      const docSnap = await getDoc(docRef);

      const q = query(collection(db, "artworks"), limit(3));
      const querySnapshot = await getDocs(q);
      const related = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.id !== id);

      if (docSnap.exists()) {
        setArt(docSnap.data());
        setRelatedArt(related);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!art) return <div className="h-screen flex items-center justify-center">Art not found.</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* MAIN CONTENT */}
      <div className="p-10 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-yale-blue mb-8 transition text-sm tracking-widest uppercase">
          <ArrowLeft size={16} /> Back to Gallery
        </Link>

        {/* Removed 'items-start' and added 'items-center' to vertically center them if you prefer, or keep items-start */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Large Image */}
          <div className="relative bg-gray-50 aspect-[4/5] shadow-sm">
            <img src={art.src} alt={art.title} className="object-cover w-full h-full" />
          </div>

          {/* Details Text - FIXED: Removed "sticky top-10" */}
          <div> 
            <p className="text-yale-blue text-xs font-bold tracking-[0.2em] uppercase mb-6 border-l-2 border-yale-blue pl-4">
              {art.category}
            </p>
            
            <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight text-gray-900">
              {art.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-200 w-12"></div>
              <p className="text-lg text-gray-500 italic">by {art.artist}</p>
            </div>
            
            <div className="prose text-gray-600 leading-loose mb-10 text-sm md:text-base max-w-md">
               <p>
                {art.description || `This piece explores the relationship between structure and chaos. ${art.artist} utilizes ${art.category} techniques to challenge the viewer's perception of modern reality.`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs border-t border-gray-100 pt-8 mb-8">
              <div>
                <span className="block text-gray-400 uppercase tracking-wider mb-1">Year</span>
                <span className="font-bold">2025</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase tracking-wider mb-1">Medium</span>
                <span className="font-bold">{art.category}</span>
              </div>
              <div>
                <span className="block text-gray-400 uppercase tracking-wider mb-1">Location</span>
                <span className="font-bold">Yale Gallery A</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-yale-blue transition-colors">
              Inquire about this piece
            </button>
          </div>
        </div>
      </div>

      {/* RELATED WORKS SECTION */}
      <div className="bg-gray-50 py-20 mt-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex justify-between items-end mb-10">
            <h3 className="text-2xl font-serif">More from the Archive</h3>
            <Link href="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-2">
              View All <ArrowRight size={14}/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArt.map((item: any) => (
              <Link href={`/art/${item.id}`} key={item.id} className="group block">
                <div className="aspect-square bg-white overflow-hidden mb-4 relative">
                  <img src={item.src} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
                </div>
                <h4 className="font-serif text-lg group-hover:text-yale-blue transition">{item.title}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{item.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}