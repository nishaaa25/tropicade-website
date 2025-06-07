"use client";
import Image from "next/image";
import { useRef } from "react";
import LandingPageImageOne from "@/public/assets/landingAnimation-1.png";
import LandingPageImageTwo from "@/public/assets/landingAnimation-2.png";
import LandingPageImageThree from "@/public/assets/landingAnimation-3.png";
import splitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingPageAnimated = () => {
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

  useGSAP(() => {
    const splitBestSellers = new splitType(bestSellersRef.current, {
      type: "words",
    });
    const splitTShirt = new splitType(tShirtRef.current, { type: "words" });

    gsap.from(
      [
        splitBestSellers.words,
        splitTShirt.words,
        imagesRef.current,
        buttonRef.current,
      ],
      {
        y: 600,
        duration: 2,
        opacity: 0,
        ease: "expo.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: bestSellersRef.current,
          start: "top 95%",
          end: "+=100%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".best-seller",
        start: "top top",
        end: "+=100%",
        pin: true,
        stagger: 0.05,
        toggleActions: "play none none reverse",
      },
    });
    tl.from(
      [
        mostLikedDivRef.current,
        bestSellersDivRef.current,
        tShirtDivRef.current,
        imagesDivRef.current,
        buttonDivRef.current,
      ],
      {
        y: 100,
        duration: 2,
        opacity: 0,
        ease: "expo.inOut",
      }
    );
  });

  return (
    <div className="h-screen w-full relative best-seller">
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
            <div className="w-25 h-25 relative rounded-full overflow-hidden border-dark-pink-500 border-3">
              <Image
                src={LandingPageImageOne}
                alt="LandingPageImageOne"
                className="object-cover"
                fill
              />
            </div>
            <div className="w-25 h-25 relative rounded-full overflow-hidden border-4 border-white/10">
              <Image
                src={LandingPageImageTwo}
                alt="LandingPageImageTwo"
                className="object-cover"
                fill
              />
            </div>
            <div className="w-25 h-25 relative rounded-full overflow-hidden border-4 border-white/10">
              <Image
                src={LandingPageImageThree}
                alt="LandingPageImageThree"
                className="object-cover"
                fill
              />
            </div>
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
