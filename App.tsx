import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Albums } from './components/Albums';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Reveal } from './components/ui/Reveal';
import { TESTIMONIALS } from './constants';
import { Star } from 'lucide-react';

// Landing Page that combines sections
const Home = () => (
  <>
    <Hero />
    <Portfolio />
    <Albums />
    
    {/* Testimonial Snippet */}
    <section className="py-20 md:py-24 bg-gray-100 dark:bg-cinema-charcoal transition-colors duration-500">
       <div className="container mx-auto px-6">
          <Reveal>
             <div className="text-center mb-12">
               <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-bold">What They Say</span>
               <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white mt-3 font-bold">Client Love</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
               {TESTIMONIALS.map(t => (
                 <div key={t.id} className="bg-white dark:bg-cinema-black p-8 border border-gray-200 dark:border-white/5 rounded-sm shadow-xl dark:shadow-none relative hover:-translate-y-1 transition-transform duration-300">
                    <div className="absolute -top-4 left-6 text-5xl text-gold-200 dark:text-white/5 font-serif">"</div>
                    <div className="flex gap-1 text-gold-500 mb-4 relative z-10">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic mb-6 relative z-10 font-medium leading-relaxed text-sm md:text-base">"{t.content}"</p>
                    <div className="relative z-10 border-t border-gray-100 dark:border-white/10 pt-4">
                      <h4 className="text-gray-900 dark:text-white font-serif font-bold text-base md:text-lg">{t.name}</h4>
                      <span className="text-[0.6rem] text-gold-500 uppercase tracking-wider font-bold">{t.role}</span>
                    </div>
                 </div>
               ))}
             </div>
          </Reveal>
       </div>
    </section>

    <About />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;