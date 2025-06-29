import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import OurProcess from "../../OurProcess";
import VerticalScale from "../../VerticalScale";
import Link from "next/link";
import Background from "@/components/Background";
import RevealCode from "@/components/Hooks/RevealCode";
import TshirtFadeReveal from "@/components/pages/tshirtFadeReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const Landing = () => {
  const tShirtRef = useRef(null);
  const containerRef = useRef(null);
  const singleLeafRef = useRef(null);
  const leafsRef = useRef(null);
  const bottomAnime = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentState, setCurrentState] = useState("initial"); // 'initial', 'scrolled'
  const lastScrollY = useRef(0);
  const scrollTriggerRef = useRef(null);
  const lenisRef = useRef(null);

  // Get Lenis instance
  useEffect(() => {
    // Try to get Lenis instance from window or import it
    if (typeof window !== "undefined") {
      lenisRef.current = window.lenis || null;
    }
  }, []);
  const [activeButton, setActiveButton] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const firstAnime = useRef(null);
  const secondAnime = useRef(null);
  const thirdAnime = useRef(null);
  const fourthAnime = useRef(null);
  const fifthAnime = useRef(null);
  const sixthAnime = useRef(null);
  const seventhAnime = useRef(null);

  const eighthAnime = useRef(null);
  const ninthAnime = useRef(null);
  const tenthAnime = useRef(null);
  const eleventhAnime = useRef(null);
  const twelweAnime = useRef(null);
  const thirteenAnime = useRef(null);
  const fourteenAnime = useRef(null);

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setIsPlaying(!isPlaying);
    console.log(`Button ${index + 1} clicked`);
  };

  useGSAP(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sticky-content",
          start: "5% top",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      })
      .timeScale(2);
    tl.to(
      firstAnime.current,
      {
        y: -200,
        duration: 1,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      secondAnime.current,
      {
        y: -200,
        duration: 1.4,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      thirdAnime.current,
      {
        y: -200,
        duration: 1.8,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      fourthAnime.current,
      {
        y: -200,
        duration: 2.2,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      sixthAnime.current,
      {
        y: -200,
        duration: 2.6,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      seventhAnime.current,
      {
        y: -200,
        duration: 3,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      fifthAnime.current,
      {
        y: -200,
        duration: 3.4,
        ease: "back.inOut",
      },
      "variable"
    );
    tl.to(
      bottomAnime.current,
      {
        y: 200,
        duration: 3.8,
      },
      "variable"
    );
    gsap.from(tShirtRef.current, {
      y: 400,
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      delay: 0.5,
    });

    tl.to(
      eighthAnime.current,
      {
        top: "0%",
        duration: 1,
        ease: "back.inOut",
      },
      "var"
    );
    tl.to(
      ninthAnime.current,
      {
        top: "0%",
        duration: 1.4,
        ease: "back.inOut",
      },
      "var"
    );
    tl.to(
      twelweAnime.current,
      {
        top: "0%",
        duration: 1.8,
        ease: "back.inOut",
      },
      "var"
    );
    tl.to(
      thirteenAnime.current,
      {
        top: "0%",
        duration: 2.2,
        ease: "back.inOut",
      },
      "var"
    );
    tl.to(
      fourteenAnime.current,
      {
        top: "0%",
        duration: 2.6,
        ease: "back.inOut",
      },
      "var"
    );
    tl.to(
      tenthAnime.current,
      {
        top: "0%",
        duration: 3,
        ease: "back.inOut",
      },
      "var"
    );
    tl.to(
      eleventhAnime.current,
      {
        top: "0%",
        duration: 3.4,
        ease: "back.inOut",
      },
      "var"
    ),
      tl.to(
        tShirtRef.current,
        {
          y: -140,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );

    ScrollTrigger.create({
      trigger: ".sticky-wrapper",
      start: "100% bottom",
      end: "+=360vh",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Move t-shirt up faster than normal scroll and fade out at the end
        gsap.to(tShirtRef.current, {
          y: -140 - 300 * progress,
          opacity: 1 - progress,
          duration: 0.1,
          ease: "none",
        });
      },
    });
  });
  return (
    <>
      {/* Sticky wrapper with defined height for scroll distance */}
      <div className="sticky-wrapper relative" style={{ height: "180vh" }}>
        <div
          ref={containerRef}
          className="sticky-content sticky top-0 h-screen w-[95%] mx-auto overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div className="relative pt-[8vw]">
            <div className="h-fit overflow-hidden ml-[0.8vw]">
              <p ref={firstAnime} className="uppercase text-white font-bold">
                make it yours
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="firstHeading absolute top-[9.5vw]">
              <div className="h-fit overflow-hidden">
                <h1
                  ref={secondAnime}
                  className="text-[8vw] leading-[8vw] text-white font-bebas"
                >
                  custom threads
                </h1>
              </div>
              <div className="h-fit overflow-hidden">
                <h1
                  ref={thirdAnime}
                  className="text-[8vw] leading-[7.5vw] text-white font-bebas"
                >
                  your way
                </h1>
              </div>
            </div>
          </div>
          <div className="absolute h-fit overflow-hidden top-[26.5vw] ml-[0.5vw]">
            <p
              ref={sixthAnime}
              className="text-[#979797] font-[300] leading-[1.2]"
            >
              Bring your memories, faces, and moments to life — right on your
              tee.
            </p>
            <p ref={seventhAnime} className="text-[#979797] font-[300]">
              At Tropicade, we blend bold street vibes with personal stories.
            </p>
          </div>
          <div className="absolute h-fit overflow-hidden top-[31vw] ml-[0.5vw] z-400">
            <Link href="/products">
              <button
                ref={fifthAnime}
                className="bg-[#FF3A65] px-[0.5vw] flex-center gap-[0.5vw] py-[0.3vw]"
              >
                <p className="px-[0.8vw]">SHOP OUR COLLECTION</p>
                <Image
                  src="/assets/ArrowUpRight.svg"
                  alt="ButtonArrow"
                  width={40}
                  height={40}
                />
              </button>
            </Link>
          </div>
          <div
            ref={tShirtRef}
            className="absolute top-[10vw] right-[3vw] w-[55vw] h-[50vw] "
          >
            <TshirtFadeReveal isPlaying={isPlaying} />
          </div>

          <div className="h-screen w-1/2">
            <div className="relative h-[40px] overflow-hidden">
              <p
                ref={eighthAnime}
                className="uppercase text-[#FF3A65] px-[0.3vw] py-[0.3vw] bg-[#FF3A651A] text-[0.8vw] flex items-center gap-[0.5vw] ml-[0.3vw] absolute top-[100%]"
              >
                <Image
                  src="/assets/HeartStraight.svg"
                  alt="heart"
                  width={12}
                  height={12}
                />
                most favourite designs
              </p>
            </div>
            <div className="h-[150px] relative w-full overflow-hidden">
              <h1
                ref={ninthAnime}
                className="text-white whitespace-nowrap font-bebas text-[6.5vw] leading-none absolute top-[100%]"
              >
                best sellers
              </h1>
            </div>
            <div className="flex flex-col text-white h-[120px]">
              <div className="h-[20px] overflow-hidden relative">
                <span
                  ref={twelweAnime}
                  className="font-bebas text-[#828282] text-[0.9vw] leading-[0.8vw] absolute top-[100%]"
                >
                  t-shirt
                </span>
              </div>
              <div className="h-[40px] overflow-hidden relative">
                <div
                  ref={thirteenAnime}
                  className="gap-[0.5vw] flex items-center absolute top-[100%]"
                >
                  <span className="pt-[0.5vw] leading-none uppercase inline-block text-[1.2vw]">
                    bootleg
                  </span>
                  <span className="px-[0.5vw] py-[0.3vw] leading-none bg-[#EAB651]/10 text-[#EAB651] uppercase text-[0.8vw] inline-block">
                    design #2
                  </span>
                </div>
              </div>
              <div className="h-[35px] overflow-hidden relative">
                <span
                  ref={fourteenAnime}
                  className="uppercase inline-block text-[1.2vw] absolute top-[100%]"
                >
                  $ 1,250
                </span>
              </div>
            </div>
            <div className="h-[140px] relative w-full overflow-hidden">
              <div
                ref={tenthAnime}
                className="flex gap-[1vw] ml-[0.3vw] relative top-[100%]"
              >
                <button
                  onClick={() => handleButtonClick(0)}
                  className={`w-[5.5vw] h-[5.5vw] relative rounded-full border-4 cursor-pointer transition-all duration-300 ${
                    activeButton === 0
                      ? "border-[#FF3A65]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src="/assets/landingAnimation-1.png"
                    alt="t-shirt"
                    fill
                    className="rounded-full object-cover"
                  />
                </button>
                <button
                  onClick={() => handleButtonClick(1)}
                  className={`w-[5.5vw] h-[5.5vw] relative rounded-full border-4 cursor-pointer transition-all duration-300 ${
                    activeButton === 1
                      ? "border-[#FF3A65]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src="/assets/landingAnimation-2.png"
                    alt="t-shirt"
                    fill
                    className="rounded-full object-cover"
                  />
                </button>
                <button
                  onClick={() => handleButtonClick(2)}
                  className={`w-[5.5vw] h-[5.5vw] relative rounded-full border-4 cursor-pointer transition-all duration-300 ${
                    activeButton === 2
                      ? "border-[#FF3A65]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src="/assets/landingAnimation-3.png"
                    alt="t-shirt"
                    fill
                    className="rounded-full object-cover"
                  />
                </button>
              </div>
            </div>
            <div className="ml-[0.3vw] gap-[1vw] h-[50px] relative overflow-hidden">
              <button
                ref={eleventhAnime}
                className="px-[2.5vw] py-[0.5vw] gap-[1vw] bg-dark-pink-500 text-white uppercase flex-center absolute top-[100%]"
              >
                <span className="font-[500]">Explore All Designs</span>
                <Image
                  src="/assets/ArrowUp.svg"
                  alt="arrow-up"
                  width={36}
                  height={36}
                />
              </button>
            </div>
          </div>

          <div
            ref={bottomAnime}
            className="py-[1vw] flex items-center justify-evenly w-full backdrop-blur-[28px] absolute bottom-0 left-0 z-50"
          >
            <h1 className="text-[0.8vw] max-w-[7.5vw] font-[300]">
              Pick your tee & design
            </h1>
            <div className="w-[10.25vw] h-[2vw] relative">
              <Image
                src="/assets/ArrowRight.svg"
                alt="ArrowLeft"
                fill
                className="object-cover relative"
              />
            </div>
            <h1 className="text-[0.8vw] max-w-[9vw]">
              Our design team will get in touch with you
            </h1>
            <div className="w-[10.25vw] h-[2vw] relative">
              <Image
                src="/assets/ArrowRight.svg"
                alt="ArrowLeft"
                fill
                className="object-cover relative"
              />
            </div>
            <h1 className="text-[0.8vw] max-w-[7.5vw]">
              Add your own photos/texts
            </h1>
            <div className="w-[10.25vw] h-[2vw] relative">
              <Image
                src="/assets/ArrowRight.svg"
                alt="ArrowLeft"
                fill
                className="object-cover relative"
              />
            </div>
            <h1 className="text-[0.8vw] max-w-[7.5vw]">
              Delivered in 5 - 7 days
            </h1>
          </div>
        </div>
      </div>
      <OurProcess />
      <VerticalScale />
      <Background />
    </>
  );
};

export default Landing;
