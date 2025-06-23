"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AboutAnimation = () => {
  const contRef = useRef();
  const titleRef = useRef();
  const titleLine1 = useRef(null);
  const titleLine2 = useRef(null);

  useGSAP(
    () => {
      const split1 = new SplitType(titleLine1.current, {
        types: "chars",
        tagName: "span",
      });
      const split2 = new SplitType(titleLine2.current, {
        types: "chars",
        tagName: "span",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contRef.current,
          start: "top 90%",
        },
      });
      tl.from(["#heading", "#bar", "#para-text-1", "#para-text-2"], {
        y: 200,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.3,
        duration: 3,
      });

      gsap.from([...split1.chars, ...split2.chars], {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 10%",
          scrub: 1,
        },
        opacity: 0.2,
        stagger: 0.03,
        duration: 3,
        ease: "expo.out",
      });
    },
    { scope: contRef }
  );
  return (
    <div className="w-full px-20 " ref={contRef}>
      <div className="flex justify-between items-center pt-[10vh] pb-[5vh]">
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
      <div className="h-[50vh] flex flex-col justify-center relative">
        <Image
          src="/assets/anchor.svg"
          alt="Anchor Image"
          width={200}
          height={100}
          className="object-cover relative top-[10vh] left-0"
        />
        <div className="relative" ref={titleRef}>
          <h1 className="font-bebas text-8xl" ref={titleLine1}>
            Tropicade is where your style becomes
          </h1>
          <h1 className="font-bebas text-8xl" ref={titleLine2}>
            the main story
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AboutAnimation;
