import React from 'react';
import { ALBUMS } from '../constants';
import { Reveal } from './Reveal';
import { AlbumItem } from '../types';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Albums = () => {
  return (
    <section className="py-20 md:py-24 bg-gray-50 dark:bg-cinema-dark transition-colors duration-500">
      <div className="container mx-auto px-6">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-white/5 pb-6">
            <div className="max-w-2xl">
              <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-bold">Premium Photobooks</span>
              <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mt-3 font-bold">Timeless Albums</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed text-base font-light">
                Our luxury albums are hand-crafted to preserve your memories for generations. 
                Printed on archival paper with leather and silk binding options.
              </p>
            </div>
            <Link to="/contact" className="hidden md:flex items-center gap-2 text-gold-500 hover:text-gray-900 dark:hover:text-white transition-colors pb-1 font-medium tracking-wide text-sm">
              <span>Request Album Guide</span>
              <BookOpen size={18} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {ALBUMS.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
            <Link to="/contact" className="inline-flex items-center gap-2 text-gold-500 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold text-sm">
              <span>Request Album Guide</span>
              <ArrowRight size={18} />
            </Link>
        </div>
      </div>
    </section>
  );
};

const AlbumCard: React.FC<{ album: AlbumItem }> = ({ album }) => {
  return (
    <Reveal>
      <div className="group cursor-pointer">
        <div className="relative aspect-[4/5] bg-white dark:bg-gray-800 p-3 md:p-3 shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-black/50 transform transition-all duration-500 group-hover:-translate-y-2 rounded-sm border border-gray-100 dark:border-white/5">
          {/* Album Cover Effect */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-white/5 transform rotate-1 scale-[0.98] z-0 rounded-sm transition-transform duration-500 group-hover:rotate-2"></div>
          <div className="relative z-10 w-full h-full overflow-hidden bg-gray-900 rounded-sm">
             <img 
               src={album.coverUrl} 
               alt={album.title} 
               className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>
             
             <div className="absolute bottom-0 left-0 p-5 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
               <span className="block text-gold-400 text-[0.65rem] tracking-[0.25em] uppercase mb-2 font-semibold">{album.year}</span>
               <h3 className="font-serif text-2xl md:text-2xl text-white mb-1.5 leading-tight">{album.clientNames}</h3>
               <p className="text-gray-300 text-xs italic font-light tracking-wide">{album.title}</p>
             </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};