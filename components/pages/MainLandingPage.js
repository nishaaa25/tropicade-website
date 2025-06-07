"use client";
import { useGSAP } from "@gsap/react";
import LandingPage from "./LandingPage";
import LandingPageAnimated from "./LandingPageAnimated";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OurProcess from "../OurProcess";
import VerticalScale from "../VerticalScale";

gsap.registerPlugin(ScrollTrigger);

const MainLandingPage = () => {
  const animateImageRef = useRef(null);
  const leafsRef = useRef(null);
  const contRef = useRef(null);
  const singleLeafRef = useRef(null);
  const customCursor = useRef();

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX - customCursor.current.clientWidth / 2;
      const y = e.clientY - customCursor.current.clientHeight / 2;
      gsap.to(customCursor.current, {
        x,
        y,
        duration: 1.5,
        ease: "expo.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  });
  useGSAP(() => {
    gsap.set(animateImageRef.current, {
      y: 600,
      opacity: 0,
    });

    gsap.set(leafsRef.current, {
      scale: 1.5,
    });

    gsap.set(singleLeafRef.current, {
      scale: 1.2,
    });

    const tl = gsap.timeline();
    tl.to(
      animateImageRef.current,
      {
        y: 0,
        duration: 3,
        opacity: 1,
        ease: "expo.inOut",
        delay: 0.5,
      },
      "he"
    );

    tl.to(
      leafsRef.current,
      {
        scale: 1,
        duration: 3,
        ease: "expo.inOut",
        delay: 0.5,
      },
      "he"
    );

    tl.to(
      singleLeafRef.current,
      {
        scale: 1,
        duration: 3,
        ease: "expo.inOut",
        delay: 0.5,
      },
      "he"
    );

    gsap.to(animateImageRef.current, {
      y: -120,
      scrollTrigger: {
        trigger: contRef.current,
        start: "top top",
        end: "bottom 120%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      ease: "none",
      delay: 3.5,
      immediateRender: false,
    });

    gsap.to(animateImageRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: contRef.current,
        start: "bottom 90%",
        end: "bottom 140%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      ease: "none",
      immediateRender: false,
    });

    gsap.to(leafsRef.current, {
      y: "-120vh",
      scrollTrigger: {
        trigger: leafsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      ease: "none",
      immediateRender: false,
    });
  });
  return (
    <div className="w-full">
      <div className="fixed -bottom-120 -left-[20vw] -z-10">
        <Image
          ref={leafsRef}
          src="/assets/leafs.svg"
          alt="landing-page-bg"
          width={900}
          height={900}
          className="object-contain z-50 h-[50vw] w-[50vw]"
        />
      </div>
      <div className="fixed -bottom-52 -right-[15vw] -z-10">
        <div className="leaf-img h-[30vw] w-[40vw]">
          <Image
            ref={singleLeafRef}
            src="/assets/singleleaf.svg"
            alt="landing-page-bg"
            width={900}
            height={900}
            className="object-contain z-50 h-full w-full mix-blend-screen"
          />
        </div>
        <div className="h-[60vh] fixed top-1/2 -translate-y-1/2 -right-10 w-[60vh] rounded-full blur-[200px] bg-[#32033F]"></div>
        <div className="h-[60vh] fixed top-[80%] left-1/2 -translate-x-1/2 w-[60vh] rounded-full blur-[200px] bg-[#CF2379]"></div>
      </div>
      <div className="fixed top-[25vh] -right-[7vw] z-60 tshirt">
        <Image
          ref={animateImageRef}
          src="/assets/T-Shirt.png"
          alt="landing-page-bg"
          width={900}
          height={900}
          className="object-contain z-50 h-[50vw] w-[70vw]"
        />
        <div
          ref={customCursor}
          className="customCursor fixed top-0 left-0 pointer-events-none z-90 h-34 w-34 rounded-full  flex items-center justify-center bg-white/10  backdrop-blur-sm border-3"
        >
          <p className="grotesk uppercase text-xs text-white z-10 font-bebas px-4 text-center">
            Click to View Details
          </p>
        </div>
      </div>
      <div className="w-full relative overflow-hidden" ref={contRef}>
        <div id="hero">
          <LandingPage />
        </div>
        <div id="bestsellers">
          <LandingPageAnimated />
        </div>
      </div>
      <div id="ourprocess">
        <OurProcess />
      </div>
      <VerticalScale />
    </div>
  );
};

export default MainLandingPage;
