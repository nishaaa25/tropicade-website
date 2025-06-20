"use client";
import { useGSAP } from "@gsap/react";
import LandingPage from "./LandingPage";
import LandingPageAnimated from "./LandingPageAnimated";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OurProcess from "../../OurProcess";
import VerticalScale from "../../VerticalScale";

gsap.registerPlugin(ScrollTrigger);

const MainLandingPage = () => {
  const animateImageRef = useRef(null);
  const leafsRef = useRef(null);
  const contRef = useRef(null);
  const singleLeafRef = useRef(null);
  const customCursor = useRef();
  const cursorCircle = useRef();
  const [cursorText, setCursorText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tshirtImage, setTshirtImage] = useState("/assets/T-Shirt.png");

  const handleTshirtImageChange = (newImageSrc) => {
    setTshirtImage(newImageSrc);
  };

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

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100));
      setScrollProgress(scrollPercent);
    };

    const handleMouseEnter = (e) => {
      const hoverText = e.target.getAttribute('data-cursor-text');
      if (hoverText) {
        setCursorText(hoverText);
        gsap.to(customCursor.current, {
          width: "100px",
          height: "100px",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = (e) => {
      const hoverText = e.target.getAttribute('data-cursor-text');
      if (hoverText) {
        setCursorText("");
        gsap.to(customCursor.current, {
          width: "24px",
          height: "24px",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", handleScroll);

    const hoverElements = document.querySelectorAll('[data-cursor-text]');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useGSAP(() => {
    // Set initial state with will-change for better performance
    gsap.set(animateImageRef.current, {
      y: 800,
      opacity: 0,
      force3D: true,
      transformOrigin: "center center",
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
        ease: "power3.out",
        delay: 0.5,
        force3D: true,
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

    // Smooth scroll-triggered animation with optimized settings
    gsap.to(animateImageRef.current, {
      y: -120,
      scrollTrigger: {
        trigger: contRef.current,
        start: "top top",
        end: "bottom 120%",
        scrub: 2,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
      ease: "none",
      force3D: true,
      immediateRender: false,
    });

    // Ultra-smooth fade out animation with buttery smooth movement
    gsap.to(animateImageRef.current, {
      y: -600,
      opacity: 0,
      scrollTrigger: {
        trigger: contRef.current,
        start: "bottom 90%",
        end: "bottom 140%",
        scrub: 4,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
      ease: "power3.out",
      force3D: true,
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
      <div className="fixed top-[20vh] right-[3vw] z-60 tshirt">
        <Image
          ref={animateImageRef}
          src={tshirtImage}
          alt="landing-page-bg"
          width={900}
          height={900}
          className="object-contain z-50 h-[50vw] w-fit will-change-transform cursor-pointer"
          data-cursor-text="View T-Shirt Details"
        />
        <Image
          ref={customCursor}
          src="/assets/customCursor.svg"
          alt="custom cursor"
          width={24}
          height={24}
          className="customCursor fixed top-0 left-0 pointer-events-none z-90"
        />
      </div>
      <div className="w-full relative overflow-hidden" ref={contRef}>
        <div id="hero">
          <LandingPage />
        </div>
        <div id="bestsellers">
          <LandingPageAnimated onImageChange={handleTshirtImageChange} />
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