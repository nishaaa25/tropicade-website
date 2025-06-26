"use client";
import Landing from "@/components/pages/Home/Landing";
import { useRef, useEffect, createContext, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import Image from "next/image";
import RevealCode from "@/components/Hooks/RevealCode";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

// Create context for loader state
export const LoaderContext = createContext();

export default function Home() {
  const loader = useRef(null);
  const blurElement = useRef(null);
  const topLeaf = useRef(null);
  const bottomLeaf = useRef(null);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  useEffect(() => {
    // Pulse animation for blur element
    if (blurElement.current) {
      gsap.to(blurElement.current, {
        filter: "blur(10vw)",
        duration: 1,
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
        duration: 5,
        ease: "expo.inOut"
      });

      gsap.to(bottomLeaf.current, {
        y: "-70vh",
        scale: 1.2,
        duration: 5,
        ease: "expo.inOut"
      });
    }

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    const counts = document.querySelectorAll(".count");

    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(".digit h1");

      tl.to(
        digits,
        {
          y: "0%",
          duration: 1,
          stagger: 0.075,
        },
        index * 1
      );

      if (index < counts.length) {
        tl.to(
          digits,
          {
            y: "-100%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1 + 1
        );
      }
    });

    tl.to(".spinner", {
      opacity: 0,
      duration: 0.3,
    });

    tl.to(
      ".word img",
      {
        y: "0%",
        duration: 1,
      },
      "<"
    );

    tl.to(".divider", {
      scaleY: "100%",
      duration: 1,
      onComplete: () =>
        gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
    });

    tl.to("#word-1 img", {
      y: "100%",
      duration: 1,
      delay: 0.3,
    });

    tl.to(
      "#word-2 img",
      {
        y: "-100%",
        duration: 1,
      },
      "<"
    );

    tl.to(
      ".block",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.75,
        onStart: () =>
          gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" }),
      },
      "<"
    );

    tl.to(
      [".nav", ".line h1", ".line p"],
      {
        y: "0%",
        duration: 1.5,
        stagger: 0.2,
      },
      "<"
    );

    tl.to(
      [".cta", ".cta-icon"],
      {
        scale: 1,
        duration: 1.5,
        stagger: 0.75,
        delay: 0.75,
      },
      "<"
    );

    tl.to(
      ".cta-label p",
      {
        y: "0%",
        duration: 1.5,
        delay: 0.5,
      },
      "<"
    );

    // Add onComplete callback to signal when loader is done
    tl.to({}, {
      duration: 0.1,
      onComplete: () => {
        setIsLoaderComplete(true);
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
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoaderComplete }}>
      <div>
        {/* Loader */}
        {/* <div className="loader" ref={loader}>
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

          <div className="intro-logo">
            <div className="word" id="word-1">
              <Image src="/assets/tropicade.svg" alt="Tropicade" width={329} height={108} className="tropicade-svg relative left-1/2 -translate-y-full" style={{clipPath: "inset(0 50% 0 0)"}} />
            </div>
            <div className="word" id="word-2">
              <Image src="/assets/tropicade.svg" alt="Tropicade" width={329} height={108} className="tropicade-svg relative right-1/2 translate-y-full" style={{clipPath: "inset(0 0 0 50%)"}} />
            </div>
          </div>

          <div className="divider"></div>

          <div className="spinner-container">
            <div className="spinner"></div>
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
        </div> */}
        {/* Page Content */}
        <Landing />
        {/* <RevealCode /> */}
      </div>
    </LoaderContext.Provider>
  );
}