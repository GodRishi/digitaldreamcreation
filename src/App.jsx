import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IntroOverlay from './components/IntroOverlay';
import HeroSection from './components/HeroSection';
import WhyChooseUs from './components/WhyChooseUs';
import SelectedWorks from './components/SelectedWorks';
import TimelessAlbums from './components/TimelessAlbums';
import Testimonials from './components/Testimonials';
import EditorBio from './components/EditorBio';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Hidden Admin Route (Unlinked on public site)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F7] relative selection:bg-[#D9B36C] selection:text-[#000000]">
      {/* 3D Interactive Follower Cursor */}
      <CustomCursor />

      {/* 1. Page-Load Video Intro Overlay */}
      <IntroOverlay onComplete={() => setIntroFinished(true)} />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Single Path Flow */}
      <main>
        {/* 2. Hero Section with 3D Spatial Canvas Scrubbing */}
        <HeroSection />

        {/* 3. Why Digital Dream Creation (Differentiators & Conviction) */}
        <WhyChooseUs />

        {/* 4. Selected Works (Portfolio 3D Grid with Filters & Video Modal) */}
        <SelectedWorks />

        {/* 5. Timeless Albums (Physical Photobook Showcase) */}
        <TimelessAlbums />

        {/* 6. Client Love (Testimonials) */}
        <Testimonials />

        {/* 7. The Editor (Rishav Saha Profile & Stats) */}
        <EditorBio />

        {/* 8. Enquiry / Contact Section */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
