"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Loader = ({ onComplete }) => {
  const loader = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    // Add onComplete callback to signal when loader is done
    tl.to({}, {
      duration: 0.1,
      onComplete: () => {
        if (onComplete) onComplete();
        // Hide the loader after a small delay
        gsap.to(loader.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (loader.current) {
              loader.current.style.display = 'none';
            }
          }
        });
      }
    });
  }, [onComplete]);

  return (
    <div className="loader flex items-center justify-center h-full w-full" ref={loader}>
      <div className="flex items-center justify-center">
        <div className="w-[50px] h-[50px] border border-white border-t-white/[0.125] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;