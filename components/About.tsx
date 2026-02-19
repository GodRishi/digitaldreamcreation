import React from 'react';
import { Reveal } from './ui/Reveal';
import { Camera, Heart, Film } from 'lucide-react';

export const About = () => {
  return (
    <section className="py-20 md:py-24 bg-gray-50 dark:bg-cinema-black relative overflow-hidden transition-colors duration-500">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-200/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Grid */}
          <div className="relative order-2 lg:order-1">
            <Reveal>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <img 
                  src="https://picsum.photos/600/800?random=20" 
                  alt="Founder working" 
                  className="rounded-sm w-full h-40 md:h-56 object-cover mt-8 md:mt-10 shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
                <img 
                  src="https://picsum.photos/600/800?random=21" 
                  alt="Editing station" 
                  className="rounded-sm w-full h-40 md:h-56 object-cover shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
                <img 
                  src="https://picsum.photos/600/800?random=22" 
                  alt="Wedding couple" 
                  className="rounded-sm w-full h-40 md:h-56 object-cover shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
                <img 
                  src="https://picsum.photos/600/800?random=23" 
                  alt="Editing suite" 
                  className="rounded-sm w-full h-40 md:h-56 object-cover mt-[-2rem] md:mt-[-2.5rem] shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-bold">The Editor</span>
              <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mt-3 mb-6 font-bold leading-tight">Rishav Saha & <br/><span className="text-gray-500 dark:text-gray-500 italic">Digital Dream Creation</span></h2>
              
              <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base md:text-lg font-light leading-relaxed">
                <p>
                  Founded 2 years ago, <span className="text-gray-900 dark:text-white font-semibold">Digital Dream Creation</span> was born from a simple yet powerful belief: every love story deserves to be told like a cinema masterpiece.
                </p>
                <p>
                  Specializing in premium video editing, we transform raw footage into emotional, authentic, and visually stunning films. We don't just edit; we weave emotions into timeless stories, ensuring every cut, transition, and color grade perfectly matches the vibe of your special day.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
                <div className="bg-white dark:bg-white/5 p-5 rounded-sm border border-gray-200 dark:border-white/5 text-center hover:border-gold-500/50 transition-all shadow-lg hover:shadow-xl dark:shadow-none hover:-translate-y-1">
                  <Film className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <h4 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">50+</h4>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500 font-bold">Films Crafted</span>
                </div>
                 <div className="bg-white dark:bg-white/5 p-5 rounded-sm border border-gray-200 dark:border-white/5 text-center hover:border-gold-500/50 transition-all shadow-lg hover:shadow-xl dark:shadow-none hover:-translate-y-1">
                  <Heart className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <h4 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">100%</h4>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500 font-bold">Happy Couples</span>
                </div>
                 <div className="bg-white dark:bg-white/5 p-5 rounded-sm border border-gray-200 dark:border-white/5 text-center hover:border-gold-500/50 transition-all shadow-lg hover:shadow-xl dark:shadow-none hover:-translate-y-1">
                  <Camera className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <h4 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">2+</h4>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-500 font-bold">Years Exp.</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};