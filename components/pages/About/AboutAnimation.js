"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutAnimation = () => {
  const contRef = useRef();
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contRef.current,
          start: "top 90%",
        },
      });
      tl.from(["#heading", "#bar", "#para-text-1", "#para-text-2"], {
        y: 200,
        opacity: 0,
        ease: "expo.inOut",
        stagger: 0.3, duration: 3
      });
    },
    { scope: contRef }
  );
  return (
    <div className="h-screen w-full px-20 pt-28" ref={contRef}>
      <div className="flex justify-between items-center">
        <h1 className="font-bebas text-4xl" id="heading">
          What sets us apart?
        </h1>
        <div className="h-[1px] w-[500px] bg-white" id="bar"></div>
        <p className="flex flex-col gap-2 w-1/3 opacity-70">
          <span className="text-sm font-light" id="para-text-1">
            Bold, high-quality designs inspired by ‘80s-‘90s streetwear culture,
            printed with premium DTG technology for lasting color and detail.
          </span>
          <span className="text-sm font-light" id="para-text-2">
            Whether you&apos;re looking to express yourself, surprise someone
            with a unique gift, or create custom tees for your crew.
          </span>
        </p>
      </div>
      <div className="h-[70vh] flex flex-col justify-center relative">
        <h1 className="font-bebas text-8xl opacity-50">
          Tropicade is where your style becomes
        </h1>
        <h1 className="font-bebas text-8xl opacity-50">the main story</h1>
        <Image
          src="/assets/anchor.svg"
          alt="Anchor Image"
          width={200}
          height={100}
          className="object-cover absolute top-20 left-0"
        />
      </div>
    </div>
  );
};

export default AboutAnimation;
