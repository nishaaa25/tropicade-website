"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function OurProcess() {
  const processDivRef = useRef();

  useGSAP(() => {
    // Clear any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === processDivRef.current) {
        trigger.kill();
      }
    });

    // Initial entrance animation
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: processDivRef.current,
        start: "top center",
        end: "top -10%",
        scrub: 2,
      },
    });

    tl1
      .from("#text-1 h1", {
        y: 200,
        ease: "power1.out",
        duration: 2,
      })
      .from(
        "#text-1 p",
        {
          y: 400,
          ease: "power1.out",
          duration: 2,
        },
        "<"
      )
      .from(
        ".img-cont .product",
        {
          skewY: -10,
          y: 200,
          ease: "power1.out",
          stagger: 0.2,
          duration: 2,
        },
        "<0.2"
      )
      .to(
        ".clip-1",
        {
          width: "100%",
          ease: "power1.out",
          duration: 4,
        },
        "<0.2"
      )
      .to(
        ".clip-2",
        {
          clipPath: "inset(0 0 0 0%)",
          ease: "power1.out",
          duration: 4,
        },
        "<0"
      )
      .from(
        "#para-1",
        {
          x: "50vw",
          ease: "power1.out",
          duration: 2,
        },
        "<0.2"
      )
      .from(".bottom-text", {
        y: 200,
        ease: "power1.out",
        duration: 2,
      });

    // Main scroll-controlled timeline for step transitions
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: processDivRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1, // This ensures smooth scroll-based animation
      }
    });

    // Step 1 to Step 2 transition (25% - 33% of scroll)
    mainTimeline
      .to("#text-1", { x: "-50vw", opacity: 0, duration: 1, ease: "power2.inOut" })
      .to("#para-1", { x: "50vw", opacity: 0, duration: 1, ease: "power2.inOut" }, "<")
      .to(["#img-1", "#img-3"], { opacity: 0, duration: 1, ease: "power2.inOut" }, "<")
      .to("#text-2", { opacity: 1, duration: 1, ease: "power2.inOut" }, "<")
      .to(
        "#img-2 .main-product",
        {
          scale: 1,
          duration: 1,
          ease: "power2.inOut"
        },
        "<"
      )
      .fromTo(
        "#message",
        { y: "50vh", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "<"
      )
      .to(".tshirt-outline", { opacity: 1, duration: 1, ease: "power2.inOut" }, "<")
      .fromTo(
        "#img-2",
        { borderRadius: "50%" },
        {
          borderRadius: "0%",
          ease: "power2.inOut",
          duration: 1,
        },
        "<"
      )
      .to("#bottom-btn", { opacity: 0, duration: 1, ease: "power2.inOut" }, "<")
      .fromTo(
        "#para-2",
        { y: "40vh", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "<"
      )
      
      // Add some pause between transitions
      .to({}, { duration: 0.5 })
      
      // Step 2 to Step 3 transition (66% - 75% of scroll)
      .to("#text-2", { x: "-50vw", opacity: 0, duration: 1, ease: "power2.inOut" })
      .to("#para-2", { x: "50vw", opacity: 0, duration: 1, ease: "power2.inOut" }, "<")
      .to(
        "#img-2 .main-product",
        { scale: 1, duration: 1, ease: "power2.inOut" },
        "<"
      )
      .to(".tshirt-outline", { scale: 0, opacity: 0, duration: 1, ease: "power2.inOut" }, "<")
      .to("#message", { y: "50vh", opacity: 0, duration: 1, ease: "power2.inOut" }, "<")
      .to(".black-tshirt", { opacity: 1, duration: 1, ease: "power2.inOut" }, "<")
      .from(
        ["#leaves-1", "#leaves-2", "#leaves-3", "#leaves-4"],
        {
          rotate: 90,
          scale: 0,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.1
        },
        "<"
      )
      .fromTo(
        "#text-3",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" },
        "<"
      );
  });

  return (
    <div
      className="w-full h-screen relative py-[4.17vw] flex-center overflow-hidden"
      ref={processDivRef}
      id="ourprocess"
    >
      <div className="absolute top-[15vh] left-[15vh] font-bebas text-div">
        <div className="absolute top-0 z-30" id="text-1">
          <h1 className="text-[10vw] leading-[10vw] opacity-15 relative">01</h1>
          <div>
            <p className="uppercase text-[2.4vw] leading-[2.4vw] relative w-7/12 -top-[8vh] -right-[8vh] pl-[0.42vw]">
              Pick your <span className="text-dark-pink-500">tee</span> &
              <span className="text-dark-pink-500">design</span>
            </p>
          </div>
        </div>
        <div className="absolute top-0 z-20 opacity-0" id="text-2">
          <h1 className="text-[10vw] leading-[10vw] opacity-15 relative">02</h1>
          <div>
            <p className="uppercase text-[2.4vw] leading-[2.4vw] relative w-8/12 -top-[8vh] -right-[8vh] pl-[0.42vw]">
              our <span className="text-dark-pink-500">design team</span> will
              get in touch with you
            </p>
          </div>
        </div>
        <div className="relative z-10 opacity-0" id="text-3">
          <h1 className="text-[10vw] leading-[10vw] opacity-15 relative">03</h1>
          <div>
            <p className="uppercase text-[2.4vw] leading-[2.4vw] relative w-7/12 -top-[8vh] -right-[8vh] pl-[0.42vw]">
              add your own
              <span className="text-dark-pink-500">photos/texts</span>
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex-center w-full gap-[2.08vw]">
        <div className="w-[32%] relative flex items-center">
          <div className="w-[0.42vw] relative h-[0.02vw] bg-white clip-1 div-1"></div>
          <div className="w-[0.83vw] h-[0.83vw] rounded-full bg-white gradient-1"></div>
        </div>

        <div className="w-[36%] relative flex items-center justify-center h-full img-cont">
          <div
            className="min-w-[12.08vw] h-[12.08vw] rounded-full relative overflow-hidden ml-[30%] product"
            id="img-1"
          >
            <Image
              src="/assets/product-2.png"
              alt="alt"
              width={0}
              height={0}
              sizes="12.08vw"
              className="object-contain w-full h-full"
            />
          </div>
          <div
            className="min-w-[15.92vw] h-[15.92vw] relative z-20 right-[5vw] rounded-full overflow-hidden product"
            id="img-2"
          >
            <Image
              src="/assets/product-4.png"
              alt="alt"
              width={0}
              height={0}
              sizes="15.92vw"
              className="object-contain main-product scale-[1.4] w-full h-full"
            />
          </div>
          <div
            className="min-w-[12.92vw] h-[12.92vw] rounded-full relative z-30 overflow-hidden right-[10vw] border-[0.31vw] border-violet-400 product"
            id="img-3"
          >
            <Image
              src="/assets/product-1.png"
              alt="alt"
              width={0}
              height={0}
              sizes="12.92vw"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="w-10/12 h-[68vh] absolute mt-[0.83vw] tshirt-outline opacity-0">
            <Image
              src="/assets/outline.svg"
              alt="alt"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 83.33vw"
              className="relative object-contain w-full h-full"
            />
          </div>
          <div className="w-10/12 h-[65vh] absolute black-tshirt opacity-0">
            <div className="w-[6.67vw] h-[6.67vw] absolute right-[1.88vw]" id="leaves-1">
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                width={0}
                height={0}
                sizes="6.67vw"
                className="object-contain w-full h-full"
              />
            </div>
            <div
              className="w-[6.67vw] h-[6.67vw] absolute -rotate-80 right-[6.25vw] -top-[2.08vw]"
              id="leaves-2"
            >
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                width={0}
                height={0}
                sizes="6.67vw"
                className="object-contain w-full h-full"
              />
            </div>
            <div
              className="w-[6.67vw] h-[6.67vw] absolute -bottom-[1.25vw] rotate-110 left-[6.25vw]"
              id="leaves-3"
            >
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                width={0}
                height={0}
                sizes="6.67vw"
                className="object-contain w-full h-full"
              />
            </div>
            <div
              className="w-[6.67vw] h-[6.67vw] absolute bottom-[1.67vw] -rotate-180 left-[2.08vw]"
              id="leaves-4"
            >
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                width={0}
                height={0}
                sizes="6.67vw"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-full relative h-full bottom-0 ">
              <Image
                src="/assets/black-tshirt.svg"
                alt="alt"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 83.33vw"
                className="relative object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="w-[32%] relative bg-white h-[0.02vw] ml-[2vw] clip-2"></div>
      </div>
      <div className="absolute -bottom-[1.88vw] w-full flex-center">
        <div className="flex-center relative">
          <h1 className="relative opacity-15 uppercase text-[12vw] leading-[12vw] font-bebas bottom-text">
            OUR PROCESS
          </h1>
          <div
            className="absolute top-[2.08vw] flex-between gap-[1.46vw] z-10"
            id="bottom-btn"
          >
            <button className="uppercase px-[0.63vw] py-[0.21vw] flex-center gap-[0.83vw] bg-dark-pink-500 min-w-[13.33vw] font-medium text-[.7vw] ml-[1.04vw]">
              <span>Explore All Designs</span>
              <Image
                src="/assets/ArrowUp.svg"
                alt="arrow-up"
                width={0}
                height={0}
                sizes="2.5vw"
                className="w-[2.5vw] h-[2.5vw]"
              />
            </button>
            <div className="flex-center w-full relative">
              <div className="w-[1.67vw] h-[1.67vw] rounded-full relative overflow-hidden ">
                <Image
                  src="/assets/product-2.png"
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="1.67vw"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-[1.67vw] h-[1.67vw] rounded-full relative overflow-hidden border-violet-400 right-[10%]">
                <Image
                  src="/assets/product-3.png"
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="1.67vw"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-[1.67vw] h-[1.67vw] rounded-full relative overflow-hidden border-violet-400 right-[20%]">
                <Image
                  src="/assets/product-1.png"
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="1.67vw"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-[1.67vw] h-[1.67vw] rounded-full relative overflow-hidden bg-[#333333] right-[30%]">
                <Image
                  src="/assets/product-1.png"
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="1.67vw"
                  className="object-contain w-full h-full"
                />
                <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex-center text-[0.29vw]">
                  +24
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute top-[0.42vw] rounded-full rounded-br-none custom-border flex-center gap-[0.42vw] mr-[5%] bg-white/5 backdrop-blur-sm w-1/2 text-[0.27vw] text-white p-[0.63vw] opacity-0 z-20"
            id="message"
          >
            <Image
              src="/assets/product-1.png"
              alt="img"
              width={0}
              height={0}
              sizes="2.5vw"
              className="object-cover rounded-full w-[2.5vw] h-[2.5vw]"
            />
            <p className="mr-[0.42vw] text-sm">
              Hey Buddy! Let&apos;s put your custom design on your purchased
              T-Shirt
            </p>
            <p
              className="absolute bottom-[0.04vw] right-[0.13vw] text-[#8d8d8d] text-[0.25vw]
"
            >
              01:00 AM
            </p>
          </div>
        </div>
        <div className="absolute right-[12vw] bottom-[28vh]">
          <p
            className="max-w-[10.42vw] text-[0.9vw] leading-[1.3vw] font-[300] p-[0.42vw] absolute"
            id="para-1"
          >
            Choose from 24+ Des igns available & ready to be customised by you
          </p>
          <p
            className="max-w-[10.42vw] text-[0.9vw] leading-[1.3vw] font-[300] p-[0.42vw] relative opacity-0"
            id="para-2"
          >
            We will get in touch with you once you have made a purchase to
            understand the designs
          </p>
        </div>
      </div>
    </div>
  );
}