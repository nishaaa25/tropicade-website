"use client";
import Landing from "@/components/pages/Home/Landing";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Home() {
  const loader = useRef(null);

  useEffect(() => {
    // If page already loaded (when using fast refresh or SSR), trigger immediately
    const animateLoader = () => {
      if (loader.current) {
        gsap.to(loader.current, {
          y: "-100%",
          duration: .5,
          ease: "expo.inOut"
        });
      }
    };

    if (document.readyState === "complete") {
      animateLoader();
    } else {
      window.addEventListener("load", animateLoader);
      return () => window.removeEventListener("load", animateLoader);
    }
  }, []);

  return (
    <div>
      {/* Loader */}
      <div
        ref={loader}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#160017] transition-all"
      >
      </div>

      {/* Page Content */}
      <Landing />
    </div>
  );
}
