import React from 'react';
import { Camera, Instagram, Youtube, Video, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0B] border-t border-[#2A2622] pt-16 pb-12 px-6 md:px-16 text-[#A79C8C]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#2A2622]/60">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#161412] border border-[#D9B36C]/40 flex items-center justify-center text-[#D9B36C]">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-lg font-serif text-[#F3EEE4] font-semibold tracking-wide">
                DIGITAL DREAM CREATION
              </span>
            </div>
            <p className="text-xs text-[#A79C8C] leading-relaxed max-w-sm font-light mb-6">
              Boutique wedding cinema studio based in Kolkata. Crafting timeless films and heirloom physical albums for discerning couples across India & worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#161412] border border-[#2A2622] text-[#F3EEE4] hover:border-[#D9B36C] hover:text-[#D9B36C] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#161412] border border-[#2A2622] text-[#F3EEE4] hover:border-[#D9B36C] hover:text-[#D9B36C] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#161412] border border-[#2A2622] text-[#F3EEE4] hover:border-[#D9B36C] hover:text-[#D9B36C] flex items-center justify-center transition-colors"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D9B36C] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#why-us" className="hover:text-[#F3EEE4] transition-colors">Why Digital Dream</a></li>
              <li><a href="#portfolio" className="hover:text-[#F3EEE4] transition-colors">Selected Films</a></li>
              <li><a href="#albums" className="hover:text-[#F3EEE4] transition-colors">Archival Albums</a></li>
              <li><a href="#testimonials" className="hover:text-[#F3EEE4] transition-colors">Client Reviews</a></li>
              <li><a href="#editor" className="hover:text-[#F3EEE4] transition-colors">Meet Rishav Saha</a></li>
              <li><a href="#contact" className="hover:text-[#F3EEE4] transition-colors">Enquire Availability</a></li>
            </ul>
          </div>

          {/* Col 3: Studio Details */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-[#D9B36C] font-semibold mb-4">
              Kolkata Headquarters
            </h4>
            <p className="text-xs text-[#A79C8C] leading-relaxed mb-3">
              Southern Avenue, Ballygunge<br />
              Kolkata, West Bengal 700029
            </p>
            <p className="text-xs text-[#F3EEE4] font-mono">
              +91 98300 12345 • hello@digitaldreamcreation.com
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A79C8C]">
          <p>© {new Date().getFullYear()} Digital Dream Creation. All rights reserved. Crafted for couples who cherish storytelling.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#D9B36C] hover:underline uppercase tracking-wider font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
