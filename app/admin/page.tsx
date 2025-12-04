'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import Link from 'next/link';
import { Trash2, Pencil, Plus, Save, X, ArrowLeft } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  src: string;
  description?: string; // <--- ADDED THIS
}

export default function AdminDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Added 'description' to the form state
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
        alert("Artwork updated!");
      } else {
        await addDoc(collection(db, "artworks"), formData);
        alert("New artwork added!");
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
    if (confirm("Are you sure you want to delete this artwork?")) {
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
      description: art.description || '' // Load description if it exists
    });
    setIsEditing(art.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ title: '', artist: '', category: 'Sculpture', src: '', description: '' });
  };

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yale-blue">Curator Dashboard</h1>
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-yale-blue">
            <ArrowLeft size={16} /> Back to Live Site
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
          <div className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800">
            {isEditing ? <Pencil size={20} className="text-orange-500"/> : <Plus size={20} className="text-green-500"/>}
            {isEditing ? "Edit Artwork" : "Add New Artwork"}
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input className="border p-3 rounded bg-gray-50" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input className="border p-3 rounded bg-gray-50" placeholder="Artist" value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} required />
            <select className="border p-3 rounded bg-gray-50" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Sculpture">Sculpture</option>
              <option value="Digital">Digital</option>
              <option value="Photography">Photography</option>
              <option value="Architecture">Architecture</option>
            </select>
            <input className="border p-3 rounded bg-gray-50" placeholder="Image URL" value={formData.src} onChange={e => setFormData({...formData, src: e.target.value})} required />
            
            {/* NEW DESCRIPTION BOX */}
            <textarea 
              className="border p-3 rounded bg-gray-50 md:col-span-2 h-32" 
              placeholder="Artwork Description..." 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
            />

            <div className="md:col-span-2 flex gap-3 mt-2">
              <button type="submit" className={`flex items-center justify-center gap-2 px-6 py-3 rounded text-white font-bold w-full transition ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-yale-blue hover:bg-black'}`}>
                <Save size={18} /> {isEditing ? "Update Changes" : "Save to Gallery"}
              </button>
              {isEditing && (
                <button type="button" onClick={handleCancel} className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 text-gray-500"><X size={18} /></button>
              )}
            </div>
          </form>
        </div>

        {/* Table View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold">
              <tr>
                <th className="p-4">Artwork</th>
                <th className="p-4">Details</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {artworks.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50 transition">
                  <td className="p-4"><img src={art.src} alt={art.title} className="w-12 h-12 object-cover rounded shadow-sm" /></td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{art.title}</div>
                    <div className="text-xs text-gray-500">{art.artist} • {art.category}</div>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleEditClick(art)} className="p-2 text-blue-500 hover:bg-blue-50 rounded transition"><Pencil size={18} /></button>
                    <button onClick={() => handleDelete(art.id)} className="p-2 text-red-400 hover:bg-red-50 rounded transition"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}