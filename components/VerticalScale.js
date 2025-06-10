"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VerticalScale() {
  const containerRef = useRef(null);
  const [section, setSection] = useState("hero"); // Start with hero

  useEffect(() => {
    const triggers = [];

    triggers.push(
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        onEnter: () => setSection("hero"),
        onEnterBack: () => setSection("hero"),
      })
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: "#bestsellers",
        start: "top center",
        end: "bottom center",
        onEnter: () => setSection("bestsellers"),
        onEnterBack: () => setSection("bestsellers"),
        onLeave: () => setSection("default"),
        onLeaveBack: () => setSection("default"),
      })
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: "#ourprocess",
        start: "top center",
        end: "bottom center",
        onEnter: () => setSection("ourprocess"),
        onEnterBack: () => setSection("ourprocess"),
        onLeave: () => setSection("default"),
        onLeaveBack: () => setSection("default"),
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
      className={`transition-opacity duration-300 ${
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