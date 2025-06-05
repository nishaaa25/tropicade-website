"use client"
import { useGSAP } from "@gsap/react"
import LandingPage from "./LandingPage"
import LandingPageAnimated from "./LandingPageAnimated"
import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const MainLandingPage = () => {
    const animateImageRef = useRef(null)
    const leafsRef = useRef(null)
    const singleLeafRef = useRef(null)
    useGSAP(() => {
        gsap.set(animateImageRef.current, {
            y: 600,
            opacity: 0
        });

        gsap.set(leafsRef.current, {
            scale: 1.5
        });

        gsap.set(singleLeafRef.current, {
            scale: 1.2
        });

        const tl = gsap.timeline();
        tl.to(animateImageRef.current, {
            y: 0,
            duration: 3,
            opacity: 1,
            ease: "expo.inOut",
            delay: 0.5
        }, "he");

        tl.to(leafsRef.current, {
            scale: 1,
            duration: 3,
            ease: "expo.inOut",
            delay: 0.5
        }, "he");

        tl.to(singleLeafRef.current, {
            scale: 1,
            duration: 3,
            ease: "expo.inOut",
            delay: 0.5
        }, "he");

        gsap.to(animateImageRef.current, {
            y: -100,
            scrollTrigger: {
                trigger: animateImageRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true
            },
            ease: "none",
            delay: 3.5,
            immediateRender: false
        });
        gsap.to(leafsRef.current, {
            y: "-130vh",
            scrollTrigger: {
                trigger: leafsRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true
            },
            ease: "none",
            immediateRender: false
        })

    })

    return (
        <div>
            <div className="fixed top-40 right-0 z-50">
                <Image ref={animateImageRef} src="/assets/T-Shirt.png" alt="landing-page-bg" width={900} height={900} className="object-contain z-50 h-[44vw] w-[54vw]" />
            </div>
            <div className="fixed -bottom-80 -left-40 -z-10">
                <Image ref={leafsRef} src="/assets/leafs.svg" alt="landing-page-bg" width={900} height={900} className="object-contain z-50 h-[35vw] w-[45vw]" />
            </div>
            <div className="fixed -bottom-52 -right-30 -z-10">
                <Image ref={singleLeafRef} src="/assets/singleleaf.svg" alt="landing-page-bg" width={900} height={900} className="object-contain z-50 h-[25vw] w-[35vw]" />
            </div>
            <LandingPage />
            <LandingPageAnimated />
        </div>
    )
}

export default MainLandingPage