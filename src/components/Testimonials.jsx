import React from 'react';
import { Quote, Star, Sparkles } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const testimonials = [
  {
    quote: "Rishav didn't just record our wedding—he captured the soul of our families. Watching our film six months later still brings tears to our eyes. The color grading and music integration are unmatched.",
    author: "Ananya & Aarav",
    wedding: "Royal Bengali Wedding, Kolkata",
    year: "December 2024",
    rating: 5
  },
  {
    quote: "Working with a single lead editor made all the difference. Rishav understood our story deeply and turned hours of raw celebration into a masterpiece. Every single frame feels intentional.",
    author: "Meera & Vikram",
    wedding: "Vedic Village Destination Wedding",
    year: "November 2024",
    rating: 5
  },
  {
    quote: "The archival album and 4K film package were worth every rupee. Our parents were blown away by the quality. We cannot recommend Digital Dream Creation enough!",
    author: "Pooja & Dev",
    wedding: "ITC Sonar Grand Celebration",
    year: "February 2024",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 px-6 md:px-16 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#D9B36C] mb-4 shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Praise</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F5F5F7] leading-[1.1]">
            Client <span className="italic font-serif text-gold-gradient font-normal">Love Stories</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D9B36C] to-transparent mx-auto mt-6 opacity-60" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <ThreeDCard key={index} depth={20}>
              <div className="relative h-full p-8 sm:p-10 rounded-2xl apple-glass-card border border-[#2C2C2E] card-hover-effect flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Background Watermark Quote */}
                <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-[#2C2C2E]/20 pointer-events-none" />

                <div>
                  {/* Quote Icon & Stars */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#2C2C2E] flex items-center justify-center text-[#D9B36C]">
                      <Quote className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D9B36C] text-[#D9B36C]" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-[#F5F5F7] font-serif italic text-lg sm:text-xl leading-relaxed mb-8">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="pt-6 border-t border-[#2C2C2E]/80">
                  <h4 className="text-lg font-serif text-[#F5F5F7] font-semibold">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#D9B36C] font-cinzel tracking-wider mt-1">
                    {item.wedding}
                  </p>
                  <p className="text-[10px] text-[#86868B] mt-1 font-mono">
                    {item.year}
                  </p>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>

      </div>
    </section>
  );
}
