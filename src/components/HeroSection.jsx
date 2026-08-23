import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronDown, ArrowRight, Play, Pause, Layers, Crosshair } from 'lucide-react';

const TOTAL_FRAMES = 120;

// Interactive 3D Camera Feature Hotspots
const HOTSPOTS = [
  {
    id: 'lens',
    frameRange: [0, 35],
    x: 48,
    y: 42,
    title: 'Anamorphic Vintage Glass',
    desc: 'Custom-adapted 1970s Cinema Lenses producing organic flares & creamy oval bokeh.'
  },
  {
    id: 'shutter',
    frameRange: [30, 75],
    x: 56,
    y: 38,
    title: '180° Rotary Shutter',
    desc: 'Pure mechanical shutter cadence for authentic filmic motion blur and rhythmic pacing.'
  },
  {
    id: 'sensor',
    frameRange: [70, 105],
    x: 42,
    y: 52,
    title: 'Bespoke Color Sensor',
    desc: 'Calibrated specifically for rich Indian skin tones, vibrant royal silks, and shadow detail.'
  },
  {
    id: 'chassis',
    frameRange: [90, 119],
    x: 62,
    y: 60,
    title: 'Precision Machined Rig',
    desc: 'Hand-assembled magnesium chassis ensuring zero frame jitter during high-energy celebrations.'
  }
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const loadedFlagsRef = useRef(new Array(TOTAL_FRAMES).fill(false));
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const dragStartXRef = useRef(0);
  const dragStartFrameRef = useRef(0);

  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);

  // Drawing routine with Retina resolution scaling
  const drawFrame = (targetIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drawIndex = targetIndex;
    if (!loadedFlagsRef.current[drawIndex]) {
      let found = -1;
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (targetIndex - offset >= 0 && loadedFlagsRef.current[targetIndex - offset]) {
          found = targetIndex - offset;
          break;
        }
        if (targetIndex + offset < TOTAL_FRAMES && loadedFlagsRef.current[targetIndex + offset]) {
          found = targetIndex + offset;
          break;
        }
      }
      if (found !== -1) drawIndex = found;
    }

    const img = imagesRef.current[drawIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();

    setCurrentFrameIndex(drawIndex);
  };

  // Preload frames in direct numerical order
  useEffect(() => {
    let isMounted = true;
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/assets/frames/frame-${frameNum}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i - 1] = img;
        loadedFlagsRef.current[i - 1] = true;
        count++;
        setLoadedCount(count);

        if (i === 1) {
          drawFrame(0);
        }

        if (count === TOTAL_FRAMES) {
          setIsFullyLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsFullyLoaded(true);
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive canvas sizing with Retina devicePixelRatio support
  useEffect(() => {
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }

      const pCanvas = particleCanvasRef.current;
      if (pCanvas) {
        pCanvas.width = window.innerWidth * dpr;
        pCanvas.height = window.innerHeight * dpr;
        pCanvas.style.width = `${window.innerWidth}px`;
        pCanvas.style.height = `${window.innerHeight}px`;
      }

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3D Particles Background Effect
  useEffect(() => {
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      speedY: Math.random() * 0.3 - 0.15,
      speedX: Math.random() * 0.3 - 0.15
    }));

    let animationId;
    const renderParticles = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 179, 108, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D9B36C';
        ctx.fill();
      });

      ctx.restore();
      animationId = requestAnimationFrame(renderParticles);
    };

    renderParticles();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Scroll Scrubbing Listener (Compact 125vh height for instant, seamless transition)
  useEffect(() => {
    if (isPlayingAuto) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      setScrollProgress(progress);

      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;
        if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetIndex);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlayingAuto]);

  // Interactive Mouse Tilt & Drag
  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartXRef.current;
      const frameDelta = Math.floor((deltaX / window.innerWidth) * TOTAL_FRAMES * 1.5);
      let newFrame = dragStartFrameRef.current + frameDelta;
      newFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, newFrame));
      currentFrameRef.current = newFrame;
      drawFrame(newFrame);
      return;
    }

    const { innerWidth, innerHeight } = window;
    const rotY = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 6;
    const rotX = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * -6;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartFrameRef.current = currentFrameRef.current;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleAutoPlay = () => {
    if (isPlayingAuto) {
      clearInterval(autoPlayIntervalRef.current);
      setIsPlayingAuto(false);
    } else {
      setIsPlayingAuto(true);
      autoPlayIntervalRef.current = setInterval(() => {
        currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
        drawFrame(currentFrameRef.current);
      }, 50);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative w-full h-[125vh] bg-[#000000] overflow-hidden select-none"
    >
      {/* Dark Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-radial from-[#D9B36C]/10 via-[#3D1417]/20 to-transparent blur-[180px] pointer-events-none" />

      {/* Particle Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
      />

      {/* Sticky Hero Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1200px]">
        
        {/* Frame Preload Pill */}
        {!isFullyLoaded && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full apple-glass text-xs text-[#F5F5F7] flex items-center gap-3 shadow-2xl">
            <Sparkles className="w-4 h-4 text-[#D9B36C] animate-spin" />
            <span className="font-cinzel tracking-widest uppercase text-[10px]">
              Loading Cinema Rig ({loadedCount}/{TOTAL_FRAMES})
            </span>
          </div>
        )}

        {/* 3D Interactive Canvas Stage */}
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            transformStyle: 'preserve-3d',
          }}
          className="w-full h-full relative cursor-grab active:cursor-grabbing"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Hotspot Markers */}
          {HOTSPOTS.map((spot) => {
            const isVisible =
              currentFrameIndex >= spot.frameRange[0] &&
              currentFrameIndex <= spot.frameRange[1];

            if (!isVisible) return null;

            const isSelected = activeHotspot?.id === spot.id;

            return (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute z-30 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(isSelected ? null : spot);
                  }}
                  className="relative group flex items-center justify-center cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full bg-[#D9B36C]/20 border border-[#D9B36C] animate-ping absolute" />
                  <span className="w-6 h-6 rounded-full bg-[#000000] border-2 border-[#D9B36C] text-[#D9B36C] flex items-center justify-center text-[10px] font-bold shadow-lg shadow-[#D9B36C]/40 group-hover:scale-125 transition-transform">
                    <Crosshair className="w-3 h-3" />
                  </span>
                </button>

                {isSelected && (
                  <div className="absolute left-8 top-0 w-64 p-4 rounded-2xl apple-glass-card border border-[#D9B36C]/60 shadow-2xl z-40 text-left animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-cinzel uppercase tracking-widest text-[#D9B36C]">
                        3D Cinema Detail
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-xs text-[#86868B] hover:text-[#F5F5F7]"
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="text-base font-serif text-[#F5F5F7] font-semibold mb-1">
                      {spot.title}
                    </h4>
                    <p className="text-xs text-[#86868B] font-light leading-relaxed">
                      {spot.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Floating Control Dock */}
          <div className="absolute top-28 right-6 md:right-16 z-30 flex items-center gap-2 p-2 rounded-2xl apple-glass shadow-2xl">
            <button
              onClick={toggleAutoPlay}
              className="px-4 py-2 rounded-xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] hover:border-[#D9B36C] text-xs font-cinzel tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5 text-[#D9B36C]" /> : <Play className="w-3.5 h-3.5 text-[#D9B36C]" />}
              <span>{isPlayingAuto ? 'Pause 360' : '3D Auto Spin'}</span>
            </button>

            <div className="px-3 py-2 text-right border-l border-[#2C2C2E]">
              <span className="text-[9px] font-cinzel uppercase tracking-widest text-[#D9B36C] block">
                Frame Index
              </span>
              <span className="text-xs font-mono text-[#F5F5F7]">
                {(currentFrameIndex + 1).toString().padStart(3, '0')} / {TOTAL_FRAMES}
              </span>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-[#000000]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#000000]/40 to-[#000000]/90 pointer-events-none" />

        {/* Hero Content Overlay */}
        <div
          style={{
            transform: `translateZ(50px) rotateX(${tilt.x * 0.4}deg) rotateY(${tilt.y * 0.4}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
          className={`absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-20 max-w-7xl mx-auto transition-all duration-700 pointer-events-none ${
            scrollProgress >= 0
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full apple-glass mb-5 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#D9B36C] animate-pulse" />
              <span className="font-cinzel text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#D9B36C] font-bold">
                Kolkata Cinema Studio • Handcrafted Cinematic Films
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#F5F5F7] leading-[1.05] tracking-tight mb-5">
              Capturing Your <span className="italic font-serif text-gold-gradient font-normal">Forever</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#86868B] font-light leading-relaxed mb-8 max-w-2xl">
              Elevating intimate wedding stories into bespoke cinematic films. Hand-graded color tones, organic acoustic soundscapes, and archival storytelling.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gold-gradient text-[#000000] font-bold text-xs font-cinzel tracking-[0.2em] uppercase shadow-2xl shadow-[#D9B36C]/20 hover:brightness-110 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full apple-glass text-[#F5F5F7] hover:border-[#D9B36C]/60 text-xs font-cinzel tracking-[0.2em] font-semibold uppercase transition-all cursor-pointer shadow-xl"
              >
                <Play className="w-3.5 h-3.5 text-[#D9B36C] fill-current" />
                <span>Watch Selected Films</span>
              </a>
            </div>
          </div>

          {/* Scroll & Drag Hint */}
          <div className="absolute bottom-6 right-8 md:right-20 hidden sm:flex items-center gap-4 font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#86868B]">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass">
              <Layers className="w-3 h-3 text-[#D9B36C]" /> Drag to spin 3D
            </span>
            <ChevronDown className="w-4 h-4 text-[#D9B36C] animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
