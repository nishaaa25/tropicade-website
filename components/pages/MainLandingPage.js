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

    useGSAP(() => {
        gsap.to(animateImageRef.current, {
            scrollTrigger: {
                trigger: animateImageRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -100,
            ease: "none"
        })
    })

    return (
        <div>
            <div className="fixed top-56 right-0">
                <Image ref={animateImageRef} src="/assets/T-Shirt.png" alt="landing-page-bg" width={500} height={500} className="object-cover z-50 h-[40vw] w-[50vw] " />
            </div>
            <LandingPage />
            <LandingPageAnimated />
        </div>
    )
}

export default MainLandingPage
