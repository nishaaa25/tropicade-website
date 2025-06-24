"use client";
import { useGSAP } from "@gsap/react";
import SplitType from 'split-type';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";
import Background from "@/components/Background";

gsap.registerPlugin(ScrollTrigger);
const AboutCards = () => {
  const cardsData = [
    {
      id: 1,
      title:
        "Amazing print quality & the reflected design is far more better than I expected. Loved it! We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "JOHN",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50",
    },
    {
      id: 2,
      title:
        "We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "SARAH",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50",
    },
    {
      id: 3,
      title:
        "Amazing print quality & the reflected design is far more better than I expected. Loved it! We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "MIKE",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50",
    },
    {
      id: 4,
      title:
        "We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "EMILY",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50",
    },
    {
      id: 5,
      title:
        "We're a small team based in Tallinn, Estonia: a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life.",
      author: "EMILY",
      company: "T-SHIRT",
      designation: "DESIGNER",
      avatar: "/api/placeholder/50/50",
    },
  ];

  const testRef = useRef();
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      // Set initial state for all cards
      gsap.set(cardRefs.current, {
        y: 200,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testRef.current,
          start: "top 60%",
        },
      });

      // Animate center card first (index 2)
      tl.to(cardRefs.current[2], {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
      // Then animate side cards (index 1 and 3)
      .to([cardRefs.current[1], cardRefs.current[3]], {
        y: 0,
        opacity: 0.5,
    
        duration: 1,
        ease: "power 2.out",
        stagger: 0.1,
      }, "-=0.4")
      // Finally animate outer cards (index 0 and 4)
      .to([cardRefs.current[0], cardRefs.current[4]], {
        y: 0,
        opacity: 0.5,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      }, "-=0.6");
    },
    { scope: testRef }
  );

  return (
    <div className="h-screen w-full overflow-hidden  flex-center relative" ref={testRef}>
      <Background/>
      <div className=" flex-center gap-4 relative h-full w-[120%] pt-[15vh]">
        {cardsData.map((item, index) => {
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={` relative bg-[#24022C] p-4 ${
                index === 2
                  ? "bottom-[9vh] w-100 xxl:w-120  h-[65vh]"
                  : index === 1 || index === 3
                  ? "bottom-[8vh] h-[55vh] w-80 xxl:w-100 "
                  : "bottom-0 h-[55vh] w-80"
              }`}
            >
              <p className="text-sm font-extralight xxl:text-lg xxl:leading-[24px]">{item.title}</p>
              <div className="py-6 flex gap-4">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src="/assets/landingAnimation-1.png"
                    fill
                    className="rounded-full object-cover"
                    alt="Profile"
                  />
                </div>
                <div className="uppercase w-fit flex flex-col justify-center gap-2">
                  <p className="uppercase leading-none font-bebas text-xs opacity-50">
                    {item.company}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="leading-none inline-block">BOOTLEG</p>
                    <p className="px-2 leading-none py-1 text-xs text-[#EAB651] bg-[#EAB6511A] inline-block">
                      {item.designation}
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src="/assets/anchor.svg"
                alt="Anchor Image"
                width={200}
                height={100}
                className="object-cover absolute bottom-0 right-0"
              />
            </div>
          );
        })}
      </div>
      {/* <div className="h-[400px] w-[400px] rounded-full bg-[#CF2379] blur-[10vw] absolute -bottom-[20vh] right-[20vw]"></div>
      <div className="absolute w-100 h-100 -bottom-[20vh] -right-[10vw] mix-blend-color
      ">
        <Image
          src="/assets/leaves.svg"
          alt="alt"
          fill
          className="object-contain relative -rotate-45"
        />
      </div> */}
    </div>
  );
};

export default AboutCards;
