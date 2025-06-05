"use client"
import Image from "next/image"
import { useRef } from "react"
import LandingPageImageOne from "@/public/assets/landingAnimation-1.png"
import LandingPageImageTwo from "@/public/assets/landingAnimation-2.png"
import LandingPageImageThree from "@/public/assets/landingAnimation-3.png"
import splitType from "split-type"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const LandingPageAnimated = () => {

    const mostLikedRef = useRef(null)
    const bestSellersRef = useRef(null)
    const tShirtRef = useRef(null)
    const imagesRef = useRef(null)
    const buttonRef = useRef(null)
    const mostLikedDivRef = useRef(null)
    const bestSellersDivRef = useRef(null)
    const tShirtDivRef = useRef(null)
    const imagesDivRef = useRef(null)
    const buttonDivRef = useRef(null)

    useGSAP(() => {
        const splitBestSellers = new splitType(bestSellersRef.current, { type: "words" })
        const splitTShirt = new splitType(tShirtRef.current, { type: "words" })

        gsap.from([splitBestSellers.words, splitTShirt.words, imagesRef.current, buttonRef.current], {
            y: 600,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            stagger: 0.05,
            scrollTrigger: {
                trigger: bestSellersRef.current,
                start: "top 95%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })

        gsap.from([mostLikedDivRef.current, bestSellersDivRef.current, tShirtDivRef.current, imagesDivRef.current, buttonDivRef.current], {
            y: 100,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            stagger: 0.05,
            scrollTrigger: {
                trigger: bestSellersRef.current,
                start: "top 95%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })
        
    })

    return (
        <div className="h-screen w-full relative">
            <div className="absolute top-[45%] -translate-y-1/2">
                <div ref={mostLikedDivRef} className="h-fit overflow-hidden">
                    <p className="px-6 py-2 relative flex w-fit my-4 left-14 bg-[#FF3A651A] items-center gap-4">
                        <Image src="/assets/HeartStraight.svg" alt="ArrowRight" width={20} height={20} className="opacity-0" />
                        <span>MOST LIKED DESIGNS</span>
                    </p>
                </div>
                <div ref={bestSellersDivRef} className="h-fit overflow-hidden">
                    <h1 ref={bestSellersRef} className="text-8xl font-bold text-white px-12">BEST SELLERS</h1>
                </div>
                <div ref={tShirtDivRef} className="h-fit overflow-hidden">
                    <p ref={tShirtRef} className="text-white px-12 flex flex-col relative left-1">
                        <span className="opacity-40">T SHIRT</span>
                        <span className="flex gap-2 items-center">
                            <span className="text-xl">BOOTLEG</span>
                            <span className="bg-[#EAB6511A] text-[#EAB651] px-4 py-1 text-sm">DESIGN #2</span>
                        </span>
                        <span className="text-xl">$1250</span>
                    </p>
                </div>
                <div ref={imagesDivRef} className="h-fit overflow-hidden">
                    <div ref={imagesRef} className="flex gap-4 px-12 py-8">
                        <Image src={LandingPageImageOne} alt="LandingPageImageOne" className="rounded-full" width={100} height={100} />
                        <Image src={LandingPageImageTwo} alt="LandingPageImageTwo" className="rounded-full" width={100} height={100} />
                        <Image src={LandingPageImageThree} alt="LandingPageImageThree" className="rounded-full" width={100} height={100} />
                    </div>
                </div>
                <div ref={buttonDivRef} className="h-fit overflow-hidden">
                    <button ref={buttonRef} className="bg-[#FF3A65] px-6 py-4 flex items-center gap-2 relative left-12">
                        <p className="px-3">EXPLORE ALL DESIGNS</p>
                        <Image src="/assets/ArrowLeft.svg" alt="ButtonArrow" width={60} height={60} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LandingPageAnimated
