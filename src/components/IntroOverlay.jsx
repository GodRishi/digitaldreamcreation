import React, { useState, useEffect, useRef } from 'react';

export default function IntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);
  const hasEndedRef = useRef(false);

  const handleFinish = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 400); // 400ms soft fade transition
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      handleFinish();
      return;
    }

    // Interaction override: any scroll, touch, or click dismisses immediately
    const handleUserInteraction = () => {
      handleFinish();
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0B] overflow-hidden transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/intro.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleFinish}
          className="w-full h-full object-cover animate-aperture-zoom"
        />
        
        {/* Subtle Vignette & Gold Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B] opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#0A0A0B]/80 pointer-events-none" />
        
        {/* Subtle Branding Badge in center-bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D9B36C]/80 font-medium">
            Digital Dream Creation
          </p>
          <p className="text-[10px] text-[#A79C8C]/60 tracking-wider mt-1">
            Scroll or tap to skip
          </p>
        </div>
      </div>
    </div>
  );
}
