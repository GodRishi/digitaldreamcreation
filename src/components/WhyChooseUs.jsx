import React from 'react';
import { UserCheck, Film, ShieldCheck, BookOpen, Sparkles, Check } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const differentiators = [
  {
    number: '01',
    icon: UserCheck,
    title: 'One Lead Editor. Single Creative Vision.',
    proofPoint: 'No outsourcing or junior handoffs. Rishav personally shapes every frame, cut, and audio beat so your wedding film carries a single, cohesive artistic signature.',
    badge: '100% Personal Commitment'
  },
  {
    number: '02',
    icon: Film,
    title: 'Cinematic Color & Acoustic Sound Design.',
    proofPoint: 'Beyond raw chronological assembly. Rich filmic color grading, ambient sound layering, and custom musical scoring elevate quiet glances into unforgettable cinema.',
    badge: '4K HDR Master Grading'
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'End-to-End Master Craftsmanship.',
    proofPoint: 'Every film receives dedicated creative energy, meticulous pacing, and unhurried color and sound design crafted to capture the true atmosphere of your celebration.',
    badge: 'Bespoke Creative Focus'
  },
  {
    number: '04',
    icon: BookOpen,
    title: 'Archival Keepsake & Master Delivery.',
    proofPoint: 'Delivered in pristine 4K digital master formats alongside bespoke Italian leather and handwoven silk-bound physical albums built to endure across generations.',
    badge: '50-Year Archival Guarantee'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-14 md:py-20 px-6 md:px-16 bg-[#000000] relative overflow-hidden">
      {/* Volumetric Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#3D1417]/20 blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full apple-glass text-[10px] uppercase font-cinzel tracking-[0.3em] text-[#D9B36C] mb-4 shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Uncompromised Craft</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F5F5F7] leading-[1.1]">
            Why Couples Choose <span className="italic font-serif text-gold-gradient font-normal">Digital Dream</span>
          </h2>
          <p className="text-sm sm:text-base text-[#86868B] mt-3 font-light max-w-xl mx-auto leading-relaxed">
            The difference between raw event recording and a timeless cinematic heirloom lies in four non-negotiable principles.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D9B36C] to-transparent mx-auto mt-6 opacity-60" />
        </div>

        {/* 4 Differentiator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <ThreeDCard key={index} depth={25}>
                <div className="group relative h-full p-8 sm:p-10 rounded-2xl apple-glass-card border border-[#2C2C2E] card-hover-effect flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Large Background Watermark Number */}
                  <span className="absolute -top-4 right-6 font-cinzel text-7xl md:text-8xl font-bold text-[#2C2C2E]/40 group-hover:text-[#D9B36C]/10 transition-colors pointer-events-none select-none">
                    {item.number}
                  </span>

                  <div>
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000000] border border-[#2C2C2E] text-[9px] font-cinzel tracking-widest text-[#D9B36C] uppercase mb-6">
                      <Check className="w-3 h-3 text-[#D9B36C]" />
                      <span>{item.badge}</span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#2C2C2E] group-hover:border-[#D9B36C]/60 flex items-center justify-center text-[#D9B36C] shadow-lg shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F5F7] group-hover:text-gold-gradient transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Proof Point */}
                    <p className="text-[#86868B] leading-relaxed text-sm sm:text-base font-light">
                      {item.proofPoint}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#2C2C2E]/80 flex items-center justify-between text-[10px] font-cinzel tracking-[0.2em] uppercase text-[#D9B36C]">
                    <span>Guaranteed Signature</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9B36C]" />
                  </div>
                </div>
              </ThreeDCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
