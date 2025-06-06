"use client";
import { useGSAP } from "@gsap/react";
import LandingPage from "./LandingPage";
import LandingPageAnimated from "./LandingPageAnimated";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OurProcess from "../OurProcess";

gsap.registerPlugin(ScrollTrigger);

const MainLandingPage = () => {
  const animateImageRef = useRef(null);
  const leafsRef = useRef(null);
  const contRef = useRef(null);
  const singleLeafRef = useRef(null);
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
        markers: true,
        invalidateOnRefresh: true,
      },
      ease: "none",
      delay: 3.5,
      immediateRender: false,
    });
    gsap.to(leafsRef.current, {
      y: "-140vh",
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
      <div className="w-full relative overflow-hidden" ref={contRef}>
        <div className="absolute top-[25vh] -right-[7vw] z-60">
          <Image
            ref={animateImageRef}
            src="/assets/T-Shirt.png"
            alt="landing-page-bg"
            width={900}
            height={900}
            className="object-contain z-50 h-[50vw] w-[70vw]"
          />
        </div>
        <LandingPage />
        <LandingPageAnimated />
      </div>
      <OurProcess />
    </div>
  );
};

export default MainLandingPage;
