import React, { useState, useEffect } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { Reveal } from './ui/Reveal';
import { Play, X } from 'lucide-react';
import { VideoItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Films' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'reel', label: 'Reels' },
  { id: 'event', label: 'Events' },
];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-cinema-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-bold">Our Masterpieces</span>
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mt-3 mb-5 font-bold">Selected Works</h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs md:text-sm tracking-[0.1em] uppercase pb-2 border-b-2 transition-all duration-300 font-semibold ${
                activeCategory === cat.id 
                  ? 'border-gold-500 text-gold-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <PortfolioCard 
              key={item.id} 
              item={item} 
              onClick={() => setSelectedVideo(item)}
            />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
           <div className="text-center text-gray-500 py-12 text-base font-light italic">No videos found in this category.</div>
        )}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-sm shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-gold-500 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              
              <video 
                src={selectedVideo.videoUrl} 
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PortfolioCard: React.FC<{ item: VideoItem; onClick: () => void }> = ({ item, onClick }) => {
  return (
    <Reveal>
      <div 
        onClick={onClick}
        className="group relative overflow-hidden rounded-sm cursor-pointer shadow-lg hover:shadow-2xl dark:shadow-none transition-shadow duration-300 bg-gray-50 dark:bg-transparent pb-4 dark:pb-0"
      >
        {/* Thumbnail */}
        <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-900 relative rounded-t-sm dark:rounded-sm">
           <img 
             src={item.thumbnailUrl} 
             alt={item.title} 
             className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-100 dark:opacity-80 group-hover:opacity-100 dark:group-hover:opacity-60"
           />
           {/* Play Button Overlay */}
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 hover:bg-gold-500 hover:border-gold-500">
               <Play className="fill-white text-white w-5 h-5 ml-1" />
             </div>
           </div>
           {/* Duration Badge */}
           {item.duration && (
             <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-0.5 text-[0.65rem] font-bold text-white rounded-sm tracking-wide">
               {item.duration}
             </div>
           )}
        </div>

        {/* Info */}
        <div className="pt-4 px-4 md:px-2 dark:pt-3">
          <div className="flex items-center justify-between mb-2">
             <span className="text-[0.6rem] text-gold-600 dark:text-gold-500 uppercase tracking-[0.2em] font-bold border border-gold-200 dark:border-gold-500/20 px-1.5 py-0.5 rounded-sm">{item.category}</span>
          </div>
          <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-tight">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed font-medium">{item.description}</p>
        </div>
      </div>
    </Reveal>
  );
};