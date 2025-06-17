"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VerticalScale() {
  const containerRef = useRef(null);
  const [section, setSection] = useState(""); // Start empty

  useEffect(() => {
    const triggers = [];

    // Sync with the main scroll progress
    triggers.push(
      ScrollTrigger.create({
        trigger: ".sticky-content",
        start: "top top",
        end: "bottom center",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0) {
            setSection("bestsellers");
          } else {
            setSection("");
          }
        }
      })
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: "#ourprocess",
        start: "top top",
        end: "+=200%",
        onEnter: () => setSection("ourprocess"),
        onEnterBack: () => setSection("ourprocess"),
        onLeave: () => setSection("bestsellers"),
        onLeaveBack: () => setSection("bestsellers"),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const labelText =
    section === "bestsellers"
      ? "Best Sellers"
      : section === "ourprocess"
      ? "Our Process"
      : "";

  return (
    <div
      className={`transition-opacity z-[50] duration-300 ${
        labelText ? "opacity-100" : "opacity-0"
      } fixed bottom-8 left-4 z-50`}
      ref={containerRef}
    >
      <div className="relative flex flex-col gap-1">
        <div className="w-2 border-[0.5px] border-[#7b7b7b]/40"></div>
        <div className="w-1.5 border-[0.5px] border-[#7b7b7b]/40"></div>
        <div className="w-1.5 border-[0.5px] border-[#7b7b7b]/40"></div>
        <div className="w-2 border-[0.5px] border-[#7b7b7b]"></div>
        <div className="w-1.5 border-[0.5px] border-[#7b7b7b]"></div>

        <div className="flex items-center gap-1.5">
          <div className="w-4 border-[1px] border-white"></div>
          <div className="border-[1px] border-white rounded-full h-2 w-2"></div>
          <p className="font-bebas text-[10px] text-white">{labelText}</p>
        </div>

        <div className="w-1.5 border-[0.5px] border-[#7b7b7b]"></div>
        <div className="w-2 border-[0.5px] border-[#7b7b7b]"></div>
        <div className="w-1.5 border-[0.5px] border-[#7b7b7b]/40"></div>
        <div className="w-1.5 border-[0.5px] border-[#7b7b7b]/40"></div>
        <div className="w-2 border-[0.5px] border-[#7b7b7b]/40"></div>
      </div>
    </div>
  );
} 