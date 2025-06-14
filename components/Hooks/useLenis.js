// hooks/useLenis.js
'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.03,
      duration: 3,
      smoothWheel: true,
      wheelMultiplier: 0.4,
      smoothTouch: false,
      touchMultiplier: 1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // cleanup on unmount
    };
  }, []);
};
