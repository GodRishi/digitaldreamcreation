import React from 'react';
import { Camera, Award, Heart, Film, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const stats = [
  { label: 'Films Crafted', value: '150+', icon: Film },
  { label: 'Happy Couples', value: '99%', icon: Heart },
  { label: 'Years of Craft', value: '8+', icon: Camera },
  { label: 'Personal Focus', value: '100%', icon: Award }
];

export default function EditorBio() {
  return (
    <section id="editor" className="py-14 md:py-20 px-6 md:px-16 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative">
            <ThreeDCard depth={30}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden apple-glass-card border border-[#2C2C2E] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Rishav Saha - Founder & Lead Editor"
                  className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl apple-glass border border-[#2C2C2E]">
                  <h3 className="text-2xl font-serif text-[#F5F5F7]">
                    Rishav Saha
                  </h3>
                  <p className="text-[10px] font-cinzel tracking-[0.25em] uppercase text-[#D9B36C] font-semibold mt-1">
                    Founder & Lead Cinema Editor
                  </p>
                  <p className="text-xs text-[#86868B] mt-2 font-light">
                    Kolkata Headquarters • Serving Worldwide
                  </p>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Right Column: Bio Narrative & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#D9B36C] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behind The Lens</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-serif text-[#F5F5F7] leading-[1.1] mb-6">
              Driven by Story, <span className="italic font-serif text-gold-gradient font-normal">Perfected in Detail</span>
            </h2>

            <blockquote className="text-[#F5F5F7]/90 font-serif italic text-lg sm:text-xl leading-relaxed mb-6 border-l-2 border-[#D9B36C] pl-6">
              "A wedding film shouldn’t feel like a music video or a dry record of events. It should feel like an heirloom film you revisit on your 50th anniversary and feel the exact flutter in your chest."
            </blockquote>
            
            <p className="text-[#86868B] leading-relaxed text-sm sm:text-base font-light mb-8">
              For over eight years in Kolkata, I have personally edited every single frame that leaves Digital Dream Creation studio. I dedicate meticulous creative energy to build custom soundscapes and bespoke color grades for each wedding story.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl apple-glass-card border border-[#2C2C2E] shadow-xl">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center p-2">
                    <Icon className="w-5 h-5 text-[#D9B36C] mx-auto mb-2 opacity-80" />
                    <p className="text-3xl sm:text-4xl font-serif font-bold text-gold-gradient">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#86868B] mt-2 font-semibold">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
