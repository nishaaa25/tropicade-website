// hooks/useLenis.js
'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 2.5,
      smoothWheel: true,
      wheelMultiplier: 0.5,
      smoothTouch: false,
      touchMultiplier: 0.5,
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
