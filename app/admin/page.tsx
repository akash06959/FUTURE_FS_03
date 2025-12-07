'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import Link from 'next/link';
import { Trash2, Pencil, Plus, Save, X, ArrowLeft, Search } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  src: string;
  description?: string;
}

export default function AdminDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', artist: '', category: 'Sculpture', src: '', description: '' });
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const fetchArt = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "artworks"));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Artwork[];
    setArtworks(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchArt();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const docRef = doc(db, "artworks", isEditing);
        await updateDoc(docRef, formData);
        alert("Archive updated.");
      } else {
        await addDoc(collection(db, "artworks"), formData);
        alert("New piece cataloged.");
      }
      setFormData({ title: '', artist: '', category: 'Sculpture', src: '', description: '' });
      setIsEditing(null);
      fetchArt();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving data");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently remove this piece from the archive?")) {
      await deleteDoc(doc(db, "artworks", id));
      fetchArt();
    }
  };

  const handleEditClick = (art: Artwork) => {
    setFormData({ 
      title: art.title, 
      artist: art.artist, 
      category: art.category, 
      src: art.src,
      description: art.description || '' 
    });
    setIsEditing(art.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ title: '', artist: '', category: 'Sculpture', src: '', description: '' });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-xl animate-pulse">Accessing Archive...</div>;

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-black pb-6">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">Internal System</p>
            <h1 className="text-4xl md:text-5xl font-serif">Curator Dashboard</h1>
          </div>
          <Link href="/" className="group flex items-center gap-3 text-xs font-bold tracking-widest uppercase mt-4 md:mt-0 hover:text-yale-accent transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Gallery
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* LEFT COLUMN: THE FORM */}
          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <div className="flex items-center gap-2 mb-8 text-xl font-serif italic">
                {isEditing ? <Pencil size={20} className="text-yale-accent"/> : <Plus size={20} className="text-gray-400"/>}
                {isEditing ? "Edit Metadata" : "Catalog New Piece"}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <input 
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-lg font-serif outline-none focus:border-yale-accent transition-colors placeholder:text-gray-300" 
                    placeholder="Artwork Title" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    required 
                  />
                  <input 
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm outline-none focus:border-yale-accent transition-colors placeholder:text-gray-300" 
                    placeholder="Artist Name" 
                    value={formData.artist} 
                    onChange={e => setFormData({...formData, artist: e.target.value})} 
                    required 
                  />
                  
                  <div className="relative">
                    <select 
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-sm outline-none focus:border-yale-accent transition-colors appearance-none cursor-pointer" 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="Sculpture">Sculpture</option>
                      <option value="Digital">Digital</option>
                      <option value="Photography">Photography</option>
                      <option value="Architecture">Architecture</option>
                    </select>
                    <div className="absolute right-0 top-3 pointer-events-none text-gray-400">▼</div>
                  </div>

                  <input 
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm outline-none focus:border-yale-accent transition-colors placeholder:text-gray-300" 
                    placeholder="Image URL (Unsplash/Direct Link)" 
                    value={formData.src} 
                    onChange={e => setFormData({...formData, src: e.target.value})} 
                    required 
                  />
                  
                  <textarea 
                    className="w-full bg-gray-50 border-none p-4 text-sm leading-relaxed outline-none focus:ring-1 focus:ring-yale-accent transition-all resize-none" 
                    placeholder="Curatorial Description..." 
                    rows={6}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    required 
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 ${isEditing ? 'bg-yale-accent' : 'bg-black hover:bg-yale-accent'}`}>
                    <Save size={16} /> {isEditing ? "Save Changes" : "Add to Collection"}
                  </button>
                  
                  {isEditing && (
                    <button type="button" onClick={handleCancel} className="px-4 border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors">
                      <X size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: THE TABLE */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif">Archive Inventory</h3>
              <div className="text-xs font-bold tracking-widest text-gray-400">{artworks.length} ITEMS</div>
            </div>

            <div className="border-t border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead className="text-xs uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="py-4 font-normal">Preview</th>
                    <th className="py-4 font-normal">Metadata</th>
                    <th className="py-4 font-normal text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {artworks.map((art) => (
                    <tr key={art.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-6 pr-4 align-top w-24">
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          <img src={art.src} alt={art.title} className="object-cover w-full h-full group-hover:scale-110 transition duration-700 grayscale group-hover:grayscale-0" />
                        </div>
                      </td>
                      <td className="py-6 px-4 align-top">
                        <div className="font-serif text-xl mb-1">{art.title}</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{art.artist}</div>
                        <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-gray-200 text-gray-500">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-6 pl-4 align-top text-right">
                        <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEditClick(art)}
                            className="text-gray-400 hover:text-yale-accent transition-colors" 
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(art.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {artworks.length === 0 && (
                <div className="py-20 text-center text-gray-300 italic font-serif">
                  The archive is currently empty.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
