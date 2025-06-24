'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger);

export default function Background() {
    const singleLeafRef = useRef(null);
    const leafsRef = useRef(null);

    useGSAP(() => {
        // Add leaf animations
        const tl = gsap.timeline();
        tl.to(
            leafsRef.current,
            {
                scale: 1,
                duration: 3,
                ease: "expo.inOut",
                delay: 0.5,
            },
            "he"
        );

        tl.to(
            singleLeafRef.current,
            {
                scale: 1,
                duration: 3,
                ease: "expo.inOut",
                delay: 0.5,
            },
            "he"
        );

        // Add scroll-triggered leaf animation
        gsap.to(leafsRef.current, {
            y: "-120vh",
            scrollTrigger: {
                trigger: leafsRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
            },
            ease: "none",
            immediateRender: false,
        });
    });
    return (
        <div className="h-full w-full absolute top-0 left-0 z-[-1]">
            <div className="fixed -bottom-52 -right-[15vw] -z-20">
                <div className="leaf-img h-[30vw] w-[40vw]">
                    <Image
                        ref={singleLeafRef}
                        src="/assets/singleleaf.svg"
                        alt="landing-page-bg"
                        width={900}
                        height={900}
                        className="object-contain z-50 h-full w-full"
                    />
                </div>
                <div className="h-[60vh] fixed top-1/2 -translate-y-1/2 -right-10 w-[60vh] rounded-full blur-[200px] bg-[#32033F]"></div>
                <div className="h-[60vh] fixed top-[80%] left-1/2 -translate-x-1/2 w-[60vh] rounded-full blur-[200px] bg-[#CF2379]"></div>
            </div>
            <div className="fixed -bottom-120 -left-[20vw] -z-10">
                <Image
                    ref={leafsRef}
                    src="/assets/leafs.svg"
                    alt="landing-page-bg"
                    width={900}
                    height={900}
                    className="object-contain z-50 h-[50vw] w-[50vw]"
                />
            </div>
        </div>
    );
}