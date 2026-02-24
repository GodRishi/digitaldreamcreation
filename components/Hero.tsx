import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-cinema-black">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-gray-50/40 dark:from-cinema-black dark:via-cinema-black/60 dark:to-cinema-black/30 z-10 transition-colors duration-500" />
        {/* Placeholder for Video Background - Using a high quality image for stability */}
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          alt="Cinematic Wedding Background"
          className="w-full h-full object-cover opacity-80 dark:opacity-60 scale-105 animate-slow-zoom"
        />
        <style>{`
          @keyframes slow-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .animate-slow-zoom {
            animation: slow-zoom 20s infinite alternate ease-in-out;
          }
        `}</style>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8 max-w-5xl"
        >
          <span className="inline-block py-1 px-3 border border-gold-500/30 rounded-full text-gold-600 dark:text-gold-400 text-[0.6rem] md:text-xs tracking-[0.2em] uppercase backdrop-blur-md bg-white/40 dark:bg-black/40 font-bold shadow-sm">
            Cinematic Wedding Films & Video Editing
          </span>
          
          <h1 className="font-serif text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.15] text-gray-900 dark:text-white drop-shadow-xl dark:drop-shadow-none">
            Capturing Your <span className="text-gold-500 italic font-light font-serif">Forever</span> <br className="hidden md:block" /> 
            One Frame at a Time.
          </h1>

          <p className="text-gray-800 dark:text-gray-300 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Professional <span className="text-gray-900 dark:text-white font-medium">video editing</span> and post-production services. We turn your raw footage into polished, cinematic stories with expert color grading, sound design, and narrative flow.
          </p>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center pt-6 md:pt-8 w-full md:w-auto">
            <Link
              to="/portfolio"
              className="bg-gold-500 text-white dark:text-cinema-black px-8 py-3.5 rounded-sm font-bold tracking-[0.15em] uppercase hover:bg-gold-600 dark:hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/30 flex items-center justify-center gap-3 group text-xs md:text-sm"
            >
              Watch Portfolio
              <Play size={16} className="fill-current group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-gray-900 dark:border-white/20 text-gray-900 dark:text-white px-8 py-3.5 rounded-sm font-bold tracking-[0.15em] uppercase hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-cinema-black transition-all text-xs md:text-sm backdrop-blur-sm"
            >
              Start Your Journey
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-900 dark:from-gold-500 to-transparent opacity-50"></div>
      </motion.div>
    </section>
  );
};