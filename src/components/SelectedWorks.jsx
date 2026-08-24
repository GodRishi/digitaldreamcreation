import React, { useState, useEffect } from 'react';
import { Play, X, Clock, MapPin, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const INITIAL_FILMS = [
  {
    id: 1,
    slotKey: 'portfolio-video-1',
    title: 'Aarav & Ananya',
    category: 'Weddings',
    location: 'Royal Bengal Palace, Kolkata',
    duration: '4:20 Min',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    tagline: 'A royal traditional Bengali celebration brimming with rich color, emotion, and sacred heritage.',
    year: '2024'
  },
  {
    id: 2,
    slotKey: 'portfolio-video-2',
    title: 'Vikram & Meera',
    category: 'Weddings',
    location: 'Vedic Village Resort, Rajarhat',
    duration: '5:15 Min',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    tagline: 'Lakeside vows framed by sunset gold, acoustic sitar melodies, and intimate family moments.',
    year: '2024'
  },
  {
    id: 3,
    slotKey: 'portfolio-video-3',
    title: 'Rohan & Shreya',
    category: 'Engagements',
    location: 'Princep Ghat & Hooghly River, Kolkata',
    duration: '2:50 Min',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    tagline: 'Vintage colonial romance framed along Kolkata’s iconic riverfront architecture.',
    year: '2024'
  },
  {
    id: 4,
    slotKey: 'portfolio-video-4',
    title: 'Dev & Pooja',
    category: 'Weddings',
    location: 'ITC Sonar, Kolkata',
    duration: '6:10 Min',
    thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    tagline: 'Grand royal wedding featuring bespoke orchestral scoring and rich filmic color grading.',
    year: '2023'
  },
  {
    id: 5,
    slotKey: 'portfolio-video-5',
    title: 'Karan & Riya',
    category: 'Engagements',
    location: 'Eco Park Glass House, New Town',
    duration: '3:05 Min',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    tagline: 'Modern minimalist love story bathed in golden hour reflections and quiet dialogue.',
    year: '2023'
  },
  {
    id: 6,
    slotKey: 'portfolio-video-6',
    title: 'Siddharth & Priya',
    category: 'Weddings',
    location: 'The Oberoi Grand, Kolkata',
    duration: '4:45 Min',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    tagline: 'Timeless luxury meets vibrant modern festivities under grand courtyard crystal chandeliers.',
    year: '2023'
  }
];

export default function SelectedWorks() {
  const [films, setFilms] = useState(INITIAL_FILMS);
  const [activeTab, setActiveTab] = useState('All');
  const [activeModalFilm, setActiveModalFilm] = useState(null);

  // Fetch updated video URLs and thumbnail URLs from /api/videos manifest
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) return;
        const data = await res.json();
        
        if (data.slots && data.slots.length > 0) {
          setFilms(prevFilms => {
            return prevFilms.map(film => {
              const updatedSlot = data.slots.find(s => s.slotKey === film.slotKey);
              if (updatedSlot) {
                return {
                  ...film,
                  videoUrl: updatedSlot.videoUrl || film.videoUrl,
                  thumbnail: updatedSlot.thumbnailUrl || film.thumbnail
                };
              }
              return film;
            });
          });
        }
      } catch (err) {
        // Fallback to initial state if API unavailable
      }
    };

    fetchVideos();
  }, []);

  const filteredFilms = activeTab === 'All'
    ? films
    : films.filter(film => film.category === activeTab);

  const closeModal = () => {
    setActiveModalFilm(null);
  };

  return (
    <section id="portfolio" className="py-14 md:py-20 px-6 md:px-16 bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#D9B36C] mb-4 shadow-xl">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F5F5F7] leading-[1.1]">
              Selected <span className="italic font-serif text-gold-gradient font-normal">Cinematic Works</span>
            </h2>
          </div>

          {/* Segment Control Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full apple-glass shadow-2xl">
            {['All', 'Weddings', 'Engagements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-7 py-2.5 rounded-full text-[10px] uppercase font-cinzel tracking-[0.25em] transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gold-gradient text-[#000000] font-bold shadow-lg shadow-[#D9B36C]/20'
                    : 'text-[#86868B] hover:text-[#F5F5F7]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredFilms.map((film) => (
            <ThreeDCard key={film.id} depth={20}>
              <div
                onClick={() => setActiveModalFilm(film)}
                className="group cursor-pointer rounded-2xl apple-glass-card border border-[#2C2C2E] overflow-hidden card-hover-effect flex flex-col h-full shadow-2xl"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#000000]">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-90" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#000000]/85 border border-[#D9B36C]/70 text-[#D9B36C] flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-gold-gradient group-hover:text-[#000000] transition-all shadow-2xl">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#000000]/90 border border-[#2C2C2E] text-[10px] text-[#F5F5F7] font-mono flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3 h-3 text-[#D9B36C]" />
                    <span>{film.duration}</span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-cinzel tracking-[0.2em] text-[#D9B36C] font-semibold mb-3">
                      <span className="uppercase">{film.category}</span>
                      <span className="text-[#86868B]">{film.year}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-[#F5F5F7] group-hover:text-gold-gradient transition-colors mb-3">
                      {film.title}
                    </h3>
                    <p className="text-xs text-[#86868B] font-light leading-relaxed mb-6">
                      {film.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2C2C2E]/80 flex items-center gap-2 text-xs text-[#86868B] font-light">
                    <MapPin className="w-3.5 h-3.5 text-[#D9B36C] shrink-0" />
                    <span className="truncate">{film.location}</span>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {activeModalFilm && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-[#000000]/95 backdrop-blur-2xl animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl apple-glass-card border border-[#D9B36C]/40 rounded-2xl overflow-hidden shadow-2xl"
          >
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-[#2C2C2E] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-cinzel tracking-[0.25em] text-[#D9B36C]">
                  {activeModalFilm.category} • {activeModalFilm.year}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#F5F5F7]">
                  {activeModalFilm.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-11 h-11 rounded-full bg-[#000000] border border-[#2C2C2E] text-[#86868B] hover:text-[#F5F5F7] hover:border-[#D9B36C] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-[16/9] w-full bg-black">
              {activeModalFilm.videoUrl.includes('youtube.com') || activeModalFilm.videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={activeModalFilm.videoUrl}
                  title={activeModalFilm.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeModalFilm.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 md:p-8 bg-[#000000] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#86868B]">
                <MapPin className="w-4 h-4 text-[#D9B36C]" />
                <span>{activeModalFilm.location}</span>
              </div>
              <a
                href="#contact"
                onClick={closeModal}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gold-gradient text-[#000000] text-xs font-bold uppercase font-cinzel tracking-[0.15em] hover:brightness-110 transition-all cursor-pointer"
              >
                Inquire For Similar Film
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
