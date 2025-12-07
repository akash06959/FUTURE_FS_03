'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { SectionWrapper } from '../components/SectionWrapper';

export default function ApplyPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate a network request
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <main>
      <Navbar />
      
      {/* Reusing SectionWrapper for consistency, but with a different image */}
      <SectionWrapper bgImage="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000" opacity="95">
        <div className="max-w-2xl mx-auto pt-20">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <p className="text-yale-blue text-xs font-bold tracking-[0.3em] uppercase mb-6">Admissions 2026</p>
            <h1 className="text-5xl font-serif mb-6">Submit Your Portfolio</h1>
            <p className="text-gray-500 leading-relaxed">
              We do not look for perfection. We look for potential. 
              Show us your chaos, your structure, and your voice.
            </p>
          </div>

          {/* The Form */}
          {status === 'success' ? (
            <div className="bg-green-50 p-10 text-center border border-green-100">
              <h3 className="text-2xl font-serif text-green-800 mb-4">Application Received.</h3>
              <p className="text-green-600 mb-8">We will review your portfolio. Expect a decision by March 1st.</p>
              <a href="/" className="text-xs font-bold uppercase tracking-widest border-b border-green-800 pb-1 hover:text-green-500 hover:border-green-500 transition">Return Home</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 shadow-2xl border-t-4 border-yale-blue">
              
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border-b border-gray-200 py-3 text-xl font-serif outline-none focus:border-yale-accent transition-colors placeholder:text-gray-200"
                  placeholder="Jane Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full border-b border-gray-200 py-3 text-xl font-serif outline-none focus:border-yale-accent transition-colors placeholder:text-gray-200"
                  placeholder="jane@example.com"
                />
              </div>

              {/* Portfolio Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Portfolio URL</label>
                <input 
                  type="url" 
                  required 
                  className="w-full border-b border-gray-200 py-3 text-xl font-serif outline-none focus:border-yale-accent transition-colors placeholder:text-gray-200"
                  placeholder="https://behance.net/jane..."
                />
              </div>

              {/* Statement */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Artist Statement</label>
                <textarea 
                  required 
                  rows={4}
                  className="w-full border border-gray-200 p-4 text-sm leading-relaxed outline-none focus:border-yale-accent transition-colors resize-none"
                  placeholder="Tell us about your process..."
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-yale-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Uploading...' : 'Submit Application'}
              </button>

            </form>
          )}
        </div>
      </SectionWrapper>
    </main>
  );
}

