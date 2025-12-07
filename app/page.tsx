import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtGallery from './components/ArtGallery';
import { SectionWrapper } from './components/SectionWrapper';
import Marquee from './components/Marquee'; // 👈 IMPORT MARQUEE

export default function Home() {
  return (
    <main>
      <Navbar />

      <SectionWrapper bgImage="https://images.unsplash.com/photo-1594750873177-2292f75b060d?q=80&w=2000" opacity="80">
        <Hero />
      </SectionWrapper>

      {/* 👇 ADD MARQUEE HERE */}
      <Marquee />

      <SectionWrapper id="about" bgImage="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2000" opacity="95">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yale-blue text-sm font-bold tracking-[0.3em] uppercase mb-8">The Philosophy</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">
            Art is not what you see,<br/>
            <span className="italic text-gray-400">but what you make others see.</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed font-serif">
            The Yale School of Art is a graduate school that grants the Master of Fine Arts degree. 
            We believe in the power of the empty canvas and the disciplined chaos of creation.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper id="exhibitions" bgImage="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2000" opacity="90">
        <ArtGallery />
      </SectionWrapper>

      {/* SECTION 4: ADMISSIONS (ID = visit) */}
      <SectionWrapper id="visit" bgImage="https://images.unsplash.com/photo-1507643179173-61786aa903a7?q=80&w=2000" opacity="85">
        <div className="grid md:grid-cols-2 gap-16 items-center bg-white p-12 md:p-20 shadow-2xl border-l-8 border-yale-blue">
          <div>
            <h3 className="text-4xl font-serif mb-6">Admissions 2026</h3>
            <p className="text-gray-500 mb-8 leading-loose">
              Applications for the 2026 academic year are now open. 
              Join a legacy of artists who have redefined the modern era.
              Interviews begin in March.
            </p>
            
            {/* 👇 UPDATED: Now links to the new Apply Page */}
            <a href="/apply" className="inline-block bg-black text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-yale-accent hover:scale-105 transition-all duration-300">
              Start Application
            </a>

          </div>
          <div className="hidden md:block text-right opacity-20">
            <h4 className="font-bold text-9xl text-black">04</h4>
          </div>
        </div>
      </SectionWrapper>

    </main>
  );
}