"use client";
import Landing from "@/components/pages/Home/Landing";
import { useRef, useEffect, createContext, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Image from "next/image";
import RevealCode from "@/components/Hooks/RevealCode";
import TshirtFadeReveal from "@/components/pages/tshirtFadeReveal";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

// Create context for loader state
export const LoaderContext = createContext();

export default function Home() {
  const loader = useRef(null);
  const blurElement = useRef(null);
  const topLeaf = useRef(null);
  const bottomLeaf = useRef(null);
  const progressBar = useRef(null);
  const progressContainer = useRef(null);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  useEffect(() => {
    // Pulse animation for blur element
    if (blurElement.current) {
      gsap.to(blurElement.current, {
        filter: "blur(10vw)",
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    }

    // Animate leafs
    if (topLeaf.current && bottomLeaf.current) {
      gsap.to(topLeaf.current, {
        y: "70vh",
        scale: 1.2,
        duration: 3,
        ease: "expo.inOut"
      });

      gsap.to(bottomLeaf.current, {
        y: "-70vh",
        scale: 1.2,
        duration: 3,
        ease: "expo.inOut"
      });
    }

    const tl = gsap.timeline({
      delay: 0.2,
      defaults: {
        ease: "hop",
      },
    });

    const counts = document.querySelectorAll(".count");

    // Animate progress bar
    tl.to(progressBar.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut"
    });

    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(".digit h1");

      tl.to(
        digits,
        {
          y: "0%",
          duration: 0.6,
          stagger: 0.05,
        },
        index * 0.6
      );

      if (index < counts.length) {
        tl.to(
          digits,
          {
            y: "-100%",
            duration: 0.6,
            stagger: 0.05,
          },
          index * 0.6 + 0.6
        );
      }
    });

    tl.to(".spinner", {
      opacity: 0,
      duration: 0.3,
    });

    // Fade out progress bar
    tl.to(progressContainer.current, {
      opacity: 0,
      duration: 0.5,
    });

    tl.to(".divider", {
      scaleY: "100%",
      duration: 0.8,
      onComplete: () =>
        gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.2 }),
    });

    // Replace cutting animation with fade effect
    tl.to(
      ".block",
      {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
      },
      "<"
    );

    tl.to(
      [".nav", ".line h1", ".line p"],
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      },
      "<"
    );

    tl.to(
      [".cta", ".cta-icon"],
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.5,
        delay: 0.3,
      },
      "<"
    );

    tl.to(
      ".cta-label p",
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        delay: 0.4,
      },
      "<"
    );

    // Add onComplete callback to signal when loader is done with increased timing
    tl.to({}, {
      duration: 0.1,
      onComplete: () => {
        setIsLoaderComplete(true);
        // Hide the loader after a small delay with fade effect
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
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoaderComplete }}>
      <div>
        {/* Loader */}
        <div className="loader" ref={loader}>
          <div className="overlay relative">
            <div className="block relative">
              <div>
                <Image ref={bottomLeaf} src="/assets/leafs.svg" alt="logo" width={300} height={300} className="object-contain absolute bottom-0 left-0" />
              </div>
            </div>
            <div className="block relative">
              <div>
                <Image ref={topLeaf} src="/assets/leafs.svg" alt="logo" width={300} height={300} className="object-contain absolute top-0 right-0" />
              </div>
            </div>
            <div
              ref={blurElement}
              className="h-[30vh] w-[30vh] bg-white blur-[15vw] absolute top-[100%] left-1/2 -translate-x-1/2 rounded-full"
            >

            </div>
          </div>

          {/* Progress Bar */}
          <div 
            ref={progressContainer}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <div 
              ref={progressBar}
              className="h-full bg-white rounded-full w-0"
            ></div>
          </div>

          <div className="counter">
            <div className="count">
              <div className="digit"><h1>0</h1></div>
              <div className="digit"><h1>0</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>2</h1></div>
              <div className="digit"><h1>7</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>6</h1></div>
              <div className="digit"><h1>5</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>9</h1></div>
              <div className="digit"><h1>8</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>9</h1></div>
              <div className="digit"><h1>9</h1></div>
            </div>
          </div>
        </div>
        {/* Page Content */}
        <Landing />
        {/* <TshirtFadeReveal /> */}
      </div>
    </LoaderContext.Provider>
  );
}