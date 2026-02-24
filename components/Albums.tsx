import React from 'react';
import { ALBUMS } from '../constants';
import { Reveal } from './Reveal';
import { AlbumItem } from '../types';
import { BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
  const Wrapper = album.driveLink ? 'a' : 'div';
  const linkProps = album.driveLink 
    ? { href: album.driveLink, target: '_blank', rel: 'noopener noreferrer' } 
    : {};

  return (
    <Reveal>
      <Wrapper {...linkProps} className="group cursor-pointer block">
        {/* Image Container */}
        <div className="relative aspect-[3/2] bg-zinc-900 rounded-sm overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-white/5">
             <img 
               src={album.coverUrl} 
               alt={album.title} 
               className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
             />
             
             {/* External Link Icon */}
             {album.driveLink && (
               <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:bg-gold-500 transition-colors">
                   <ExternalLink size={14} />
                 </div>
               </div>
             )}
        </div>

        {/* Text Content Below */}
        <div className="px-1">
           <div className="flex justify-between items-center mb-1">
              <span className="text-gold-600 dark:text-gold-500 text-[0.65rem] tracking-[0.2em] uppercase font-bold">{album.year}</span>
           </div>
           <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{album.clientNames}</h3>
           <p className="text-gray-500 dark:text-gray-400 text-sm font-light flex items-center gap-2">
             {album.title}
             {album.driveLink && <ExternalLink size={12} className="opacity-50" />}
           </p>
        </div>
      </Wrapper>
    </Reveal>
  );
};