import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const albums = [
  {
    id: 'leather',
    title: 'The Heritage Leather Edition',
    subtitle: 'Full-Grain Italian Calf Leather • Gold Foil Stamping',
    description: 'Hand-crafted by master bookbinders with thick, lay-flat archival photographic pages that remain pristine and fade-proof across generations.',
    spreads: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['Lay-Flat Seamless Spines', '250gsm Archival Photographic Paper', 'Customized Monogram Stamping', 'Velvet-Lined Wooden Keepsake Box']
  },
  {
    id: 'silk',
    title: 'The Royal Silk Suite',
    subtitle: 'Kyoto Handwoven Silk • Rose-Gold Accents',
    description: 'A tactile masterpiece wrapped in rich textured silk, accompanied by a matching presentation case and custom engraved USB archival drive.',
    spreads: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: ['Pure Handwoven Silk Cover', 'Anti-Fingerprint Protective Coating', 'Matching Parent Mini-Albums', 'Bespoke Engraved Drive Box']
  }
];

export default function TimelessAlbums() {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);

  const activeAlbum = albums[selectedAlbumIndex];

  return (
    <section id="albums" className="py-20 md:py-28 px-6 md:px-16 bg-[#000000] relative overflow-hidden">
      {/* Volumetric glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#3D1417]/20 blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#D9B36C] mb-4 shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tangible 3D Heirloom Craft</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F5F5F7] leading-[1.1]">
            Timeless <span className="italic font-serif text-gold-gradient font-normal">Archival Albums</span>
          </h2>
          <p className="text-sm sm:text-base text-[#86868B] mt-4 font-light leading-relaxed max-w-xl mx-auto">
            Films capture motion, but physical albums ground your memories in touch. Handcrafted archival heirlooms designed to be passed down across generations.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D9B36C] to-transparent mx-auto mt-6 opacity-60" />
        </div>

        {/* 3D Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Photobook Viewer */}
          <div className="lg:col-span-7">
            <ThreeDCard depth={35}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden apple-glass-card border border-[#2C2C2E] shadow-2xl group">
                <img
                  src={activeAlbum.spreads[activeSpreadIndex]}
                  alt={activeAlbum.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-85" />

                {/* 3D Page Flip Control Bar */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 p-1.5 rounded-full apple-glass">
                  {activeAlbum.spreads.map((_, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setActiveSpreadIndex(sIdx)}
                      className={`px-3.5 py-1 rounded-full text-[10px] font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                        activeSpreadIndex === sIdx
                          ? 'bg-gold-gradient text-[#000000] font-bold shadow-md'
                          : 'text-[#86868B] hover:text-[#F5F5F7]'
                      }`}
                    >
                      Spread {sIdx + 1}
                    </button>
                  ))}
                </div>

                {/* Specs Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl apple-glass border border-[#D9B36C]/40 backdrop-blur-2xl flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#D9B36C]/50 flex items-center justify-center text-[#D9B36C] shadow-lg">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif text-[#F5F5F7]">
                        {activeAlbum.title}
                      </h4>
                      <p className="text-xs text-[#86868B] font-light">
                        {activeAlbum.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-cinzel tracking-[0.25em] uppercase text-[#D9B36C] font-bold hidden sm:block">
                    3D Interactive
                  </span>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Right Column: Album Switcher */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            {albums.map((album, idx) => (
              <div
                key={album.id}
                onClick={() => {
                  setSelectedAlbumIndex(idx);
                  setActiveSpreadIndex(0);
                }}
                className={`cursor-pointer p-8 rounded-2xl border transition-all ${
                  selectedAlbumIndex === idx
                    ? 'apple-glass-card border-[#D9B36C]/60 shadow-2xl shadow-[#D9B36C]/10 scale-[1.02]'
                    : 'bg-[#1C1C1E]/40 border-[#2C2C2E] hover:border-[#D9B36C]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-serif text-[#F5F5F7]">
                    {album.title}
                  </h3>
                  {selectedAlbumIndex === idx && (
                    <Sparkles className="w-4 h-4 text-[#D9B36C]" />
                  )}
                </div>

                <p className="text-xs text-[#D9B36C] font-cinzel tracking-[0.15em] font-bold mb-3">
                  {album.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#86868B] font-light leading-relaxed mb-6">
                  {album.description}
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#2C2C2E]">
                  {album.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[11px] text-[#F5F5F7]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D9B36C] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
