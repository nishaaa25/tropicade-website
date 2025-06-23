"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import HistoryBackBtn from "@/components/HistoryBackBtn";

gsap.registerPlugin(ScrollTrigger);

const AboutHome = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      tl.from("#back-btn", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: "power2.out",
      })
        .from(
          "#headtext h1",
          {
            y: 100,
            opacity: 0,
            clipPath: "inset(0 0 90% 0)",
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.3,
          },
          "-=0.2"
        )
        .from(
          ["#paratext-1", "#paratext-2", "#header-img"],
          {
            y: "50vh",
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
          },
          "<"
        );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="h-screen w-full relative about-header">
      <div id="back-btn">
        <HistoryBackBtn text="Back" />
      </div>

      <div id="headtext">
        <h1 className="font-bebas absolute top-48 left-20 text-8xl h-fit overflow-hidden">
          custom t-shirts that combine
        </h1>
        <h1 className="font-bebas absolute top-72 right-20 text-8xl h-fit overflow-hidden">
          quality, creativity, & personality.
        </h1>
      </div>

      <div className="flex-center gap-10 absolute bottom-20 left-20 right-20">
        <p className="w-[40%] font-extralight flex flex-col gap-4 text-sm opacity-70">
          <span id="paratext-1">
            was born in 2024 with a clear vision: to create custom t-shirts that
            combine quality, creativity, and personality. After in depth market
            research and a close look at the competition, we realized one thing:
            most custom apparel out there lacks originality and attention to
            detail. We knew we could do better.
          </span>
          <span id="paratext-2">
            We&apos;re a small team based in Tallinn, Estonia: a manager
            handling production and customer care, two dedicated designers who
            work one-on-one with clients to bring their ideas to life, and a
            creative agency managing our marketing and socials.
          </span>
        </p>
        <div className="w-[60%] h-[30vh] relative" id="header-img">
          <Image
            src="/assets/about-landing.png"
            alt="about"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
