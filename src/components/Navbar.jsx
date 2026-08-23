import React, { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Us', href: '#why-us' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Albums', href: '#albums' },
    { name: 'Client Stories', href: '#testimonials' },
    { name: 'The Editor', href: '#editor' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'apple-glass border-b border-[#2C2C2E] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#000000] border border-[#D9B36C]/40 flex items-center justify-center text-[#D9B36C] group-hover:border-[#D9B36C] transition-colors shadow-md">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-cinzel font-bold tracking-[0.15em] text-[#F5F5F7] block leading-tight">
              DIGITAL DREAM
            </span>
            <span className="text-[9px] uppercase font-cinzel tracking-[0.3em] text-[#D9B36C] block mt-0.5">
              Cinematic Wedding Films
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] hover:text-[#D9B36C] font-semibold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gold-gradient text-[#000000] text-[11px] font-cinzel font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-md shadow-[#D9B36C]/15 cursor-pointer"
          >
            <span>Check Availability</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] flex items-center justify-center cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 apple-glass border-b border-[#2C2C2E] p-6 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase font-cinzel tracking-[0.2em] text-[#F5F5F7] hover:text-[#D9B36C] py-2 border-b border-[#2C2C2E]/60"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full py-3 rounded-full bg-gold-gradient text-[#000000] font-bold text-center text-xs font-cinzel uppercase tracking-wider shadow-lg"
          >
            Check Availability
          </a>
        </div>
      )}
    </nav>
  );
}
