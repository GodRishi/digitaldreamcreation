import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small Gold Cursor Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#D9B36C] pointer-events-none z-50 transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#D9B36C]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            isClicking ? 0.7 : isHovered ? 1.8 : 1
          })`,
        }}
      />

      {/* Outer 3D Halo Ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#D9B36C]/40 pointer-events-none z-50 transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            isClicking ? 0.8 : isHovered ? 1.5 : 1
          })`,
          borderColor: isHovered ? '#D9B36C' : 'rgba(217, 179, 108, 0.4)',
          backgroundColor: isHovered ? 'rgba(217, 179, 108, 0.08)' : 'transparent',
        }}
      />
    </>
  );
}
