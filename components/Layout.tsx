import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink as NavLinkType } from '../types';
import { Menu, X, Instagram, Facebook, Mail, Phone, ArrowUp, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', path: NavLinkType.HOME },
  { name: 'Portfolio', path: NavLinkType.PORTFOLIO },
  { name: 'Albums', path: NavLinkType.ALBUMS },
  { name: 'About', path: NavLinkType.ABOUT },
  { name: 'Contact', path: NavLinkType.CONTACT },
];

// Custom Logo Component to ensure high quality and no broken links
const BrandLogo = ({ className, idSuffix }: { className?: string, idSuffix: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      {/* Top Arc: Left to Right */}
      <path id={`curveTop${idSuffix}`} d="M 25,100 A 75,75 0 0,1 175,100" fill="transparent" />
      {/* Bottom Arc: Left to Right */}
      <path id={`curveBottom${idSuffix}`} d="M 25,100 A 75,75 0 0,0 175,100" fill="transparent" />
    </defs>
    
    {/* Background Circle */}
    <circle cx="100" cy="100" r="98" className="fill-white dark:fill-cinema-black stroke-gold-500/50 stroke-[2px]" />
    
    {/* Inner decorative circle */}
    <circle cx="100" cy="100" r="78" className="fill-transparent stroke-gold-500/20 stroke-[1px]" />

    {/* Top Text: EDITING */}
    <text className="fill-gray-900 dark:fill-white font-serif font-bold tracking-[0.25em] text-[18px]" style={{ textAnchor: "middle" }} dy="-5">
      <textPath href={`#curveTop${idSuffix}`} startOffset="50%">
        EDITING
      </textPath>
    </text>
    
    {/* Bottom Text: REMASTERED */}
    {/* Using dy to position it inside/along the bottom arc */}
    <text className="fill-gray-900 dark:fill-white font-serif font-bold tracking-[0.25em] text-[16px]" style={{ textAnchor: "middle" }} dy="18">
      <textPath href={`#curveBottom${idSuffix}`} startOffset="50%">
        REMASTERED
      </textPath>
    </text>
    
    {/* Center Stack */}
    <text x="100" y="85" textAnchor="middle" className="fill-gray-900 dark:fill-white font-serif font-bold text-[22px] leading-none">DIGITAL</text>
    <text x="100" y="108" textAnchor="middle" className="fill-gray-900 dark:fill-white font-serif font-bold text-[22px] leading-none">DREAM</text>
    <text x="100" y="132" textAnchor="middle" className="fill-gold-500 font-sans font-bold text-[10px] tracking-[0.2em] uppercase">CREATION</text>
  </svg>
);

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-cinema-black dark:text-white relative transition-colors duration-500">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-cinema-black/95 backdrop-blur-md py-3 shadow-lg border-b border-gray-200 dark:border-white/5' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <BrandLogo 
              className="w-12 h-12 md:w-14 md:h-14 shadow-sm group-hover:rotate-12 transition-transform duration-500" 
              idSuffix="Nav" 
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base md:text-lg tracking-wider text-gray-900 dark:text-white drop-shadow-md">DIGITAL DREAM</span>
              <span className="text-[0.55rem] tracking-[0.3em] text-gold-500 uppercase font-medium">Creation</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-semibold hover:text-gold-500 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-gold-500 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full ${
                  location.pathname === link.path ? 'text-gold-500 after:w-full' : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/contact"
              className="bg-gold-500 hover:bg-gold-600 text-white dark:text-cinema-black px-5 py-2 rounded-sm font-bold text-[0.65rem] tracking-widest uppercase transition-all shadow-md hover:shadow-gold-500/20"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md text-gray-900 dark:text-white transition-colors border border-gray-200 dark:border-white/10"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="text-gray-900 dark:text-white hover:text-gold-500 transition-colors p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-cinema-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-serif font-bold text-gray-900 dark:text-white hover:text-gold-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 flex gap-8">
                 <a href="https://www.instagram.com/digital_dream_creation" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gold-500 hover:scale-110 transition-all"><Instagram size={24} /></a>
                 <a href="https://www.facebook.com/profile.php?id=100088564732367" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gold-500 hover:scale-110 transition-all"><Facebook size={24} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-cinema-dark border-t border-gray-200 dark:border-white/5 pt-12 pb-8 transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
               <div className="flex items-center gap-4 mb-6">
                <BrandLogo 
                  className="w-14 h-14 md:w-16 md:h-16 shadow-sm" 
                  idSuffix="Footer" 
                />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl text-gray-900 dark:text-white">DIGITAL DREAM</span>
                  <span className="text-[0.6rem] tracking-[0.4em] text-gold-500 uppercase font-bold">Creation</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                Crafting timeless memories through cinematic storytelling and video editing. Based in Kolkata, available globally.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/digital_dream_creation" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gold-500 hover:text-white dark:hover:text-cinema-black transition-all transform hover:scale-110">
                  <Instagram size={16} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100088564732367" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gold-500 hover:text-white dark:hover:text-cinema-black transition-all transform hover:scale-110">
                  <Facebook size={16} />
                </a>
                <a href="mailto:saharishav.1940@gmail.com" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gold-500 hover:text-white dark:hover:text-cinema-black transition-all transform hover:scale-110">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-base text-gold-500 mb-6 font-bold">Quick Links</h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                <li><Link to="/portfolio" className="hover:text-gold-500 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">Wedding Films</Link></li>
                <li><Link to="/albums" className="hover:text-gold-500 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">Premium Albums</Link></li>
                <li><Link to="/about" className="hover:text-gold-500 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-gold-500 dark:hover:text-white transition-colors hover:translate-x-1 inline-block">Enquire</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base text-gold-500 mb-6 font-bold">Contact</h3>
              <ul className="space-y-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                <li className="flex items-start gap-3 group">
                   <Phone size={14} className="mt-1 text-gold-500 group-hover:scale-110 transition-transform" />
                   <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">+91 62916 45907</span>
                </li>
                <li className="flex items-start gap-3 group">
                   <Mail size={14} className="mt-1 text-gold-500 group-hover:scale-110 transition-transform" />
                   <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors break-all">saharishav.1940@gmail.com</span>
                </li>
                 <li className="flex items-start gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div>
                   <span>Available for video editing projects</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-[0.65rem] md:text-xs text-gray-500 font-medium">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Digital Dream Creation. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">Designed with <span className="text-red-500">❤️</span> By Rishi Saha</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp - Uses separate number */}
      <a
        href="https://wa.me/919339316872"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 md:p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center ring-4 ring-white/10 dark:ring-black/10"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M16.42 14.13C16.22 14.03 15.22 13.54 15.04 13.47C14.86 13.4 14.73 13.36 14.6 13.54C14.47 13.73 14.1 14.17 14 14.29C13.89 14.41 13.78 14.42 13.58 14.32C13.38 14.22 12.74 14.01 11.98 13.34C11.39 12.81 11 12.16 10.88 11.95C10.77 11.74 10.88 11.64 10.98 11.54C11.07 11.45 11.18 11.31 11.28 11.19C11.39 11.07 11.42 10.99 11.49 10.85C11.56 10.71 11.52 10.59 11.47 10.48C11.42 10.37 11.05 9.45 10.89 9.08C10.74 8.72 10.59 8.77 10.48 8.77C10.38 8.77 10.27 8.76 10.15 8.76C10.03 8.76 9.84 8.81 9.67 9C9.5 9.18 9.04 9.61 9.04 10.49C9.04 11.37 9.68 12.22 9.77 12.35C9.87 12.47 11.08 14.34 12.94 15.15C13.38 15.34 13.73 15.46 14 15.54C14.46 15.69 14.88 15.67 15.22 15.62C15.6 15.56 16.39 15.14 16.55 14.68C16.71 14.22 16.71 13.83 16.66 13.74C16.6 13.66 16.51 13.6 16.42 13.5V14.13Z" />
        </svg>
      </a>
      
      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-40 bg-gray-800 dark:bg-cinema-charcoal hover:bg-gold-500 hover:text-white dark:hover:text-cinema-black border border-white/10 text-white p-3 rounded-full transition-colors hidden md:flex items-center justify-center shadow-lg"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};