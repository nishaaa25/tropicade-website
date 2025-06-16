"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import LandingPageImageOne from "@/public/assets/landingAnimation-1.png";
import LandingPageImageTwo from "@/public/assets/landingAnimation-2.png";
import LandingPageImageThree from "@/public/assets/landingAnimation-3.png";
import splitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VFX } from "@vfx-js/core";

gsap.registerPlugin(ScrollTrigger);

const LandingPageAnimated = ({ onImageChange }) => {
  const mostLikedRef = useRef(null);
  const bestSellersRef = useRef(null);
  const tShirtRef = useRef(null);
  const imagesRef = useRef(null);
  const buttonRef = useRef(null);
  const mostLikedDivRef = useRef(null);
  const bestSellersDivRef = useRef(null);
  const tShirtDivRef = useRef(null);
  const imagesDivRef = useRef(null);
  const buttonDivRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleImageClick = (newImageSrc, index) => {
    setActiveImageIndex(index);
    onImageChange(newImageSrc);

    // Find the T-shirt element in the parent component
    const tshirtElement = document.querySelector('.tshirt img');
    if (tshirtElement) {
      // Get computed styles to preserve exact dimensions
      const computedStyle = window.getComputedStyle(tshirtElement);
      const rect = tshirtElement.getBoundingClientRect();
      
      // Store original styles with computed values - capture the actual CSS classes
      const originalClasses = tshirtElement.className;
      const originalSrc = tshirtElement.src;
      
      // Store original inline styles
      const originalInlineStyles = tshirtElement.style.cssText;

      const vfx = new VFX();
      vfx.add(tshirtElement, { 
        shader: "glitch",
        overflow: 0,
        transparent: true,
      });
      
      // Remove the effect after a short duration and change the image
      setTimeout(() => {
        vfx.remove(tshirtElement);
        // Change the image source
        tshirtElement.src = newImageSrc;
        // Restore original classes and inline styles completely
        tshirtElement.className = originalClasses;
        tshirtElement.style.cssText = originalInlineStyles;
      }, 2000);
    }
  };

  useGSAP(() => {
    // Split text immediately and hide it
    const splitBestSellers = new splitType(bestSellersRef.current, {
      type: "words",
    });
    const splitTShirt = new splitType(tShirtRef.current, { type: "words" });

    // Hide all elements immediately before any animation
    gsap.set([
      splitBestSellers.words,
      splitTShirt.words,
      imagesRef.current,
      buttonRef.current,
      mostLikedDivRef.current,
      bestSellersDivRef.current,
      tShirtDivRef.current,
      imagesDivRef.current,
      buttonDivRef.current
    ], {
      y: 20,
      opacity: 0,
      scale: 0.99,
      visibility: "visible",
      force3D: true,
      willChange: "transform, opacity"
    });

    // Create the entrance animation timeline
    const entranceTl = gsap.timeline({ 
      paused: true,
      defaults: {
        ease: "power2.out",
        duration: 0.5
      }
    });

    // First wave - header elements
    entranceTl.to([
      mostLikedDivRef.current,
      bestSellersDivRef.current
    ], {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.08,
      duration: 0.4,
      clearProps: "willChange"
    });

    // Second wave - main text
    entranceTl.to([
      splitBestSellers.words,
      splitTShirt.words
    ], {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.03,
      duration: 0.4,
      clearProps: "willChange"
    }, "-=0.2");

    // Third wave - images and button
    entranceTl.to([
      imagesRef.current,
      buttonRef.current,
      tShirtDivRef.current,
      imagesDivRef.current,
      buttonDivRef.current
    ], {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.05,
      duration: 0.4,
      clearProps: "willChange"
    }, "-=0.1");

    // Store the timeline in a ref for access in event handlers
    animationRef.current = entranceTl;

    // Set up ScrollTrigger for pinning with reduced scroll distance
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=10%",
      pin: true,
      pinSpacing: false,
      onEnter: () => {
        if (!hasAnimated) {
          requestAnimationFrame(() => {
            animationRef.current.play(0);
            setHasAnimated(true);
          });
        }
      },
      onLeaveBack: () => {
        if (hasAnimated) {
          animationRef.current.reverse();
          setHasAnimated(false);
        }
      }
    });

    // Listen for the exit animation completion from LandingPage
    const handleExitComplete = () => {
      if (!hasAnimated) {
        requestAnimationFrame(() => {
          animationRef.current.play(0);
          setHasAnimated(true);
        });
      }
    };

    window.addEventListener('landingPageExitComplete', handleExitComplete);

    // Cleanup
    return () => {
      window.removeEventListener('landingPageExitComplete', handleExitComplete);
      scrollTrigger.kill();
    };
  });

  return (
    <div ref={containerRef} className="h-screen w-full relative best-seller overflow-hidden">
      <div className="absolute top-[50%] -translate-y-1/2 w-1/2 flex flex-col ml-[4vw]">
        <div ref={mostLikedDivRef} className="h-fit overflow-hidden">
          <p className="px-3 py-[6px] relative flex-center w-fit mb-1 bg-[#FF3A651A] text-[#ff3a65] items-center gap-3">
            <Image
              src="/assets/HeartStraight.svg"
              alt="ArrowRight"
              width={12}
              height={12}
            />
            <span className="text-xs leading-[10px]">MOST LIKED DESIGNS</span>
          </p>
        </div>
        <div ref={bestSellersDivRef} className="h-fit overflow-hidden mb-5">
          <h1
            ref={bestSellersRef}
            className="text-8xl font-bebas text-white "
          >
            BEST SELLERS
          </h1>
        </div>
        <div ref={tShirtDivRef} className="h-fit overflow-hidden w-full">
          <p className="uppercase text-[#828282] text-sm font-bebas">TSHIRT</p>
          <div className="flex items-center gap-3 mr-auto uppercase">
            <p className="text-xl ">Bootleg</p>
            <div className="text-[#EAB651] bg-[#eab651]/10 px-3 py-[1px]">DESIGN #2</div>
          </div>
          <p className="text-xl">$1,250</p>
        </div>
        <div ref={imagesDivRef} className="h-fit overflow-hidden mb-6">
          <div ref={imagesRef} className="flex gap-4 py-8">
            <button 
              onClick={() => handleImageClick("/assets/changedImage.png", 0)}
              className={`w-25 h-25 relative rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 ${
                activeImageIndex === 0 
                  ? 'border-4 border-red-500' 
                  : 'border-4 border-white/10'
              }`}
            >
              <Image
                src={LandingPageImageOne}
                alt="LandingPageImageOne"
                className="object-cover"
                fill
              />
            </button>
            <button 
              onClick={() => handleImageClick("/assets/changedImage1.png", 1)}
              className={`w-25 h-25 relative rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 ${
                activeImageIndex === 1 
                  ? 'border-4 border-red-500' 
                  : 'border-4 border-white/10'
              }`}
            >
              <Image
                src={LandingPageImageTwo}
                alt="LandingPageImageTwo"
                className="object-cover"
                fill
              />
            </button>
            <button 
              onClick={() => handleImageClick("/assets/changedImage2.png", 2)}
              className={`w-25 h-25 relative rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 ${
                activeImageIndex === 2 
                  ? 'border-4 border-red-500' 
                  : 'border-4 border-white/10'
              }`}
            >
              <Image
                src={LandingPageImageThree}
                alt="LandingPageImageThree"
                className="object-cover"
                fill
              />
            </button>
          </div>
        </div>
        <div
          ref={buttonDivRef}
          className="relative flex items-center justify-start gap-5"
          id="bottom-btn"
        >
          <button
            className="uppercase px-4 py-2 flex-center gap-4 bg-dark-pink-500 min-w-64 font-medium text-sm"
            ref={buttonRef}
          >
            <span>Explore All Designs</span>
            <Image
              src="/assets/ArrowUp.svg"
              alt="arrow-up"
              width={36}
              height={36}
            />
          </button>
          <div className="flex-center relative">
            <div className="w-9 h-9 rounded-full relative overflow-hidden ">
              <Image
                src="/assets/product-2.png"
                alt="alt"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-9 h-9 rounded-full relative overflow-hidden border-violet-400 right-[10%]">
              <Image
                src="/assets/product-3.png"
                alt="alt"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-9 h-9 rounded-full relative overflow-hidden border-violet-400 right-[20%]">
              <Image
                src="/assets/product-1.png"
                alt="alt"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-9 h-9 rounded-full relative overflow-hidden bg-[#333333] right-[30%]">
              <Image
                src="/assets/product-1.png"
                alt="alt"
                fill
                className="object-contain"
              />
              <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex-center text-sm">
                +24
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageAnimated;