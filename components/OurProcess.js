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
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: processDivRef.current,
      start: "top top",
      end: "+=300%",
      scrub: 2,
      pin: true,
    },
  });

  // Step 1 -> Step 2
  tl.addLabel("step1")
    .to("#text-1", { x: "-50vw", opacity: 0, duration: 1 }, "step1")
    .to("#para-1", { x: "50vw", opacity: 0, duration: 1 }, "step1")
    .to(["#img-1", "#img-3"], { opacity: 0, duration: 1 }, "step1")
    .to("#text-2", { opacity: 1, duration: 1 }, "step1")
    .to("#img-2", {borderColor: "transparent",duration: 1 }, "step1")
    .fromTo("#message", { y: "50vh", opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "step1")
    .to(".tshirt-outline", { opacity: 1, duration: 1 }, "step1")
    .to("#bottom-btn", { opacity: 0, duration: 1 }, "step1")
    .fromTo("#para-2", { y: "40vh", opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "step1");

  // Step 2 -> Step 3
  tl.addLabel("step2")
    .to("#text-2", { x: "-50vw", opacity: 0, duration: 1 }, "step2")
    .to(".tshirt-outline", { opacity: 0, duration: 1 }, "step2")
    .to("#img-2", { y: -20, scale: 0.9, opacity: 1, duration: 1 }, "step2")
    .to("#message", { y: "50vh", opacity: 0, duration: 1 }, "step2")
    .to(".black-tshirt", { opacity: 1, duration: 1 }, "step2")
    .from(["#leaves-1", "#leaves-2", "#leaves-3", "#leaves-4"], {
      rotate: 20,
      scale: 0,
      duration: 1,
    }, "step2")
    .fromTo("#text-3", { opacity: 0 }, { opacity: 1, duration: 1 }, "step2");
});


  return (
    <div
      className="w-full h-screen relative py-20 flex-center overflow-hidden"
      ref={processDivRef}
    >
      <div className="absolute top-[15vh] left-[15vh] font-bebas">
        <div className="absolute top-0 z-30" id="text-1">
          <h1 className="text-[10vw] leading-[10vw] opacity-10 relative">01</h1>
          <div>
            <p className="uppercase text-[2.4vw] leading-[2.4vw] relative w-7/12 -top-[8vh] -right-[8vh] pl-2">
              Pick your <span className="text-dark-pink-500">tee</span> &
              <span className="text-dark-pink-500">design</span>
            </p>
          </div>
        </div>
        <div className="absolute top-0 z-20 opacity-0" id="text-2">
          <h1 className="text-[10vw] leading-[10vw] opacity-10 relative">02</h1>
          <div>
            <p className="uppercase text-[2.4vw] leading-[2.4vw] relative w-8/12 -top-[8vh] -right-[8vh] pl-2">
              our <span className="text-dark-pink-500">design team</span> will
              get in touch with you
            </p>
          </div>
        </div>
        <div className="relative z-10 opacity-0" id="text-3">
          <h1 className="text-[10vw] leading-[10vw] opacity-10 relative">03</h1>
          <div>
            <p className="uppercase text-[2.4vw] leading-[2.4vw] relative w-7/12 -top-[8vh] -right-[8vh] pl-2">
              add your own
              <span className="text-dark-pink-500">photos/texts</span>
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex-center w-full gap-10">
        <div className="w-[32%] relative h-[1px] bg-white"></div>
        <div className="w-[36%] relative flex items-center justify-center h-full">
          <div
            className="min-w-58 h-58 rounded-full relative overflow-hidden ml-[30%]"
            id="img-1"
          >
            <Image
              src="/assets/product-2.png" 
              alt="alt"
              fill
              className="object-contain"
            />
          </div>  
          <div
            className="min-w-62 h-62 relative z-20 rounded-full right-[5vw] border-[15px] border-violet-400 overflow-hidden"
            id="img-2"
          >
            <Image
              src="/assets/product-4.png"
              alt="alt"
              fill
              className="object-contain scale-[1.3]"
            />
          </div>
          <div
            className="min-w-62 h-62 rounded-full relative z-30 overflow-hidden right-[10vw] border-[15px] border-violet-400"
            id="img-3"
          >
            <Image
              src="/assets/product-1.png"
              alt="alt"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-10/12 h-[68vh] absolute mt-4 tshirt-outline opacity-0 ">
            <Image
              src="/assets/outline.svg"
              alt="alt"
              fill
              className="relative object-contain"
            />
          </div>
          <div className="w-10/12 h-[60vh] absolute black-tshirt opacity-0">
            <div className="w-32 h-32 absolute right-9" id="leaves-1">
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-32 h-32 absolute -rotate-80 right-30 -top-10" id="leaves-2">
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-32 h-32 absolute -bottom-6 rotate-110 left-30" id="leaves-3">
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-34 h-34 absolute bottom-8 -rotate-180 left-10" id="leaves-4">
              <Image
                src="/assets/leaves.svg"
                alt="leaves"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-full relative h-full bottom-0 ">
              <Image
                src="/assets/black-tshirt.svg"
                alt="alt"
                fill
                className="relative object-contain"
              />
            </div>
          </div>
        </div>
        <div className="w-[32%] relative bg-white h-[1px] ml-[2vw]"></div>
      </div>
      <div className="absolute -bottom-9 w-full flex-center">
        <div className="flex-center relative">
          <h1 className="relative opacity-15 uppercase text-[12vw] leading-[12vw] font-bebas">
            OUR PROCESS
          </h1>
          <div
            className="absolute top-10 flex-between gap-7 z-10"
            id="bottom-btn"
          >
            <button className="uppercase px-3 py-1 flex-center gap-4 bg-dark-pink-500 min-w-64 font-medium text-sm ml-5">
              <span>Explore All Designs</span>
              <Image
                src="/assets/ArrowUp.svg"
                alt="arrow-up"
                width={36}
                height={36}
              />
            </button>
            <div className="flex-center w-full relative">
              <div className="w-8 h-8 rounded-full relative overflow-hidden ">
                <Image
                  src="/assets/product-2.png"
                  alt="alt"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-full relative overflow-hidden border-violet-400 right-[10%]">
                <Image
                  src="/assets/product-3.png"
                  alt="alt"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-full relative overflow-hidden border-violet-400 right-[20%]">
                <Image
                  src="/assets/product-1.png"
                  alt="alt"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-full relative overflow-hidden bg-[#333333] right-[30%]">
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
          <div
            className="absolute top-2 rounded-full rounded-br-none custom-border flex-center gap-2 mr-[5%] bg-white/5 backdrop-blur-3xl w-1/2 text-[13px] text-white p-3 opacity-0 z-20"
            id="message"
          >
            <Image
              src="/assets/product-1.png"
              alt="img"
              width={36}
              height={36}
              className="object-cover rounded-full"
            />
            <p className="mr-2">
              Hey Buddy! Let&apos;s put your custom design on your purchased
              T-Shirt
            </p>
            <p
              className="absolute bottom-[2px] right-[6px] text-[#8d8d8d] text-xs
"
            >
              01:00 AM
            </p>
          </div>
        </div>
        <div className="absolute right-[12vw] bottom-[28vh]">
          <p
            className="max-w-50 text-[0.9vw] leading-[1.3vw] font-[300] p-2 absolute"
            id="para-1"
          >
            Choose from 24+ Designs available & ready to be customised by you
          </p>
          <p
            className="max-w-50 text-[0.9vw] leading-[1.3vw] font-[300] p-2 relative opacity-0"
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
