import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { useRef } from "react"
import OurProcess from "../../OurProcess"
import VerticalScale from "../../VerticalScale"
import Link from "next/link"
import Background from "@/components/Background"

gsap.registerPlugin(ScrollTrigger)

const Landing = () => {
    const tShirtRef = useRef(null)
    const containerRef = useRef(null)
    const singleLeafRef = useRef(null)
    const leafsRef = useRef(null)
    const bottomAnime = useRef(null)

    useGSAP(() => {
        // Set will-change properties for better performance
        gsap.set([
            ".firstHeading div", ".firstHeading h1",
            ".secondHeading div", ".secondHeading h1",
            ".fifthPara div", ".fifthPara p",
            ".fifthPara-1 div", ".fifthPara-1 p",
            ".fifthPara-4 div",
            ".thirdPara", ".fourthButton button", ".buttonAnime-1",
            tShirtRef.current, bottomAnime.current
        ], {
            willChange: "transform, opacity"
        })

        // Set initial state for leafs
        gsap.set(leafsRef.current, {
            scale: 1.5,
        });

        gsap.set(singleLeafRef.current, {
            scale: 1.2,
        });

        // Set initial positions for elements that will animate in during scroll
        gsap.set([".secondHeading h1", ".secondHeading div"], {
            y: 80,
            opacity: 0
        })

        gsap.set([".fifthPara-1 p", ".fifthPara-1 div"], {
            y: 80,
            opacity: 0
        })

        gsap.set([".fifthPara-4 div"], {
            y: 60,
            opacity: 0
        })

        gsap.set([".buttonAnime-1"], {
            y: 60,
            opacity: 0
        })

        // Set initial state for fifthPara-3 pin animation - starting from further down
        gsap.set(".fifthPara-3", {
            y: 120,
            opacity: 0
        })

        // Initial animation for first heading
        gsap.from(".firstHeading div", {
            y: 100,
            duration: 2,
            ease: "power3.out",
            stagger: 0.2
        })
        gsap.from(".firstHeading h1", {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: "power3.out",
            stagger: 0.2
        })

        // Initial animation for fifthPara
        gsap.from(".fifthPara div", {
            y: 100,
            duration: 1.8,
            ease: "power3.out",
            stagger: 0.2
        })
        gsap.from(".fifthPara p", {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: "power3.out",
            stagger: 0.2
        })

        // Initial animation for thirdPara
        gsap.from(".thirdPara p", {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: "power3.out",
            stagger: 0.15
        })

        // Initial animation for fourthButton
        gsap.from(".fourthButton button", {
            opacity: 0,
            y: 100,
            duration: 1.8,
            ease: "power3.out",
            delay: 0.3
        })

        // Initial animation for T-shirt image - moving from bottom to top
        gsap.from(tShirtRef.current, {
            y: 400,
            opacity: 0,
            duration: 2,
            ease: "power3.out",
            delay: 0.5
        })


        // Scroll-triggered animations with improved timing
        ScrollTrigger.create({
            trigger: ".sticky-content",
            start: "top top",
            end: "bottom center",
            scrub: 1.5,
            ease: "power2.inOut",
            onUpdate: (self) => {
                const progress = self.progress;

                // First heading moves up and fades out (smoother timing)
                const firstHeadingProgress = Math.min(progress * 3, 1);
                gsap.to(".firstHeading h1", {
                    y: -150 * firstHeadingProgress,
                    opacity: 1 - firstHeadingProgress,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                })

                gsap.to(".firstHeading div", {
                    y: -150 * (firstHeadingProgress + 0.05),
                    opacity: 1 - firstHeadingProgress,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                })

                // Update bottomAnime animation to properly handle scroll back
                gsap.to(bottomAnime.current, {
                    y: 400 * firstHeadingProgress,
                    opacity: 1 - firstHeadingProgress,
                    duration: 0.5,
                    ease: "power2.out"
                })

                // Second heading moves up from bottom and fades in
                gsap.to(".secondHeading h1", {
                    y: 80 - (80 * progress),
                    opacity: progress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".secondHeading div", {
                    y: 80 - (160 * progress),
                    opacity: progress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // fifthPara moves up and fades out
                const fifthParaProgress = Math.min(progress * 3, 1);
                gsap.to(".fifthPara p", {
                    y: -150 * fifthParaProgress,
                    opacity: 1 - fifthParaProgress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara div", {
                    y: -150 * (fifthParaProgress + 0.05),
                    opacity: 1 - fifthParaProgress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // thirdPara moves up and fades out (smoother timing)
                const thirdParaProgress = Math.min(progress * 3, 1);
                gsap.to(".thirdPara", {
                    y: -150 * thirdParaProgress,
                    opacity: 1 - thirdParaProgress,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                })

                // fourthButton moves up and fades out (smoother timing)
                const fourthButtonProgress = Math.min(progress * 3, 1);
                gsap.to(".fourthButton button", {
                    y: -150 * fourthButtonProgress,
                    opacity: 1 - fourthButtonProgress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // T-shirt moves up during the animation
                gsap.to(tShirtRef.current, {
                    y: -140 * progress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // New content fades in from bottom with staggered timing
                const newContentDelay = Math.max(0, progress - 0.15);

                gsap.to(".fifthPara-1 p", {
                    y: 80 - (80 * newContentDelay * 1.2),
                    opacity: newContentDelay * 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara-1 div", {
                    y: 80 - (160 * newContentDelay * 1.2),
                    opacity: newContentDelay * 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // fifthPara-3 pin animation - fades in and moves up from further down
                gsap.to(".fifthPara-3", {
                    y: 120 - (120 * newContentDelay * 1.2),
                    opacity: newContentDelay * 1.5,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara-4 div", {
                    y: 60 - (60 * newContentDelay * 1.2),
                    opacity: newContentDelay * 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".buttonAnime-1", {
                    y: 60 - (60 * newContentDelay * 1.2),
                    opacity: newContentDelay * 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                })
            }
        })

        // Add separate ScrollTrigger for fast t-shirt scroll after main animation
        ScrollTrigger.create({
            trigger: ".sticky-wrapper",
            start: "100% bottom", // Start when sticky wrapper bottom is at 80%
            end: "+=360vh", // Continue for extra distance (reduced from 400vh to 360vh for 180vh total)
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                // Move t-shirt up faster than normal scroll and fade out at the end
                gsap.to(tShirtRef.current, {
                    y: -140 - (300 * progress), // Continue from where main animation ended
                    opacity: 1 - progress, // Fade out as scroll progresses
                    duration: 0.1,
                    ease: "none"
                })
            }
        })


        // Cleanup will-change on animation complete
        return () => {
            gsap.set([
                ".firstHeading div", ".firstHeading h1",
                ".secondHeading div", ".secondHeading h1",
                ".fifthPara div", ".fifthPara p",
                ".fifthPara-1 div", ".fifthPara-1 p",
                ".fifthPara-4 div",
                ".thirdPara p", ".fourthButton button", ".buttonAnime-1",
                tShirtRef.current
            ], {
                willChange: "auto"
            })
        }
    })

    return (
        <>
            {/* Sticky wrapper with defined height for scroll distance */}
            <div className="sticky-wrapper relative" style={{ height: '180vh' }}>
                <div
                    ref={containerRef}
                    className="sticky-content sticky top-0 h-screen w-[95%] mx-auto overflow-hidden"
                    style={{ willChange: 'transform' }}>
                    <div className="fifthPara relative pt-[8vw]">
                        <div className="h-fit overflow-hidden ml-[0.8vw]">
                            <p className="uppercase text-white font-bold">make it yours</p>
                        </div>
                    </div>
                    <div className="fifthPara-1 relative pt-[4vw]">
                        <div className="h-fit w-fit overflow-hidden">
                            <p className="uppercase text-[#FF3A65] px-[0.3vw] py-[0.3vw] bg-[#FF3A651A] text-[0.8vw] flex items-center gap-[0.5vw] ml-[0.3vw]">
                                <Image src="/assets/HeartStraight.svg" alt="heart" width={12} height={12} />
                                most favourite designs
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="firstHeading absolute top-[9.5vw]">
                            <div className="h-fit overflow-hidden">
                                <h1 className="text-[8vw] leading-[8vw] text-white font-bebas">custom threads</h1>
                            </div>
                            <div className="h-fit overflow-hidden">
                                <h1 className="text-[8vw] leading-[7.5vw] text-white font-bebas">your way</h1>
                            </div>
                        </div>
                        <div className="secondHeading absolute top-[15.5vw]">
                            <div className="h-fit overflow-hidden">
                                <h1 className="text-white font-bebas text-[6.5vw] leading-[6vw]">best sellers</h1>
                            </div>
                        </div>
                    </div>
                    <div className="thirdPara absolute top-[26.5vw] ml-[0.5vw]">
                        <p className="text-[#979797] font-[300] leading-[1.2]">Bring your memories, faces, and moments to life — right on your tee.</p>
                        <p className="text-[#979797] font-[300]">At Tropicade, we blend bold street vibes with personal stories.</p>
                    </div>
                    <div className="fourthButton absolute top-[31vw] ml-[0.5vw] z-400">
                        <Link href="/products">
                            <button
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

                    <div className="fifthPara-3 flex flex-col absolute top-[18vw] text-white">
                        <span className="font-bebas left-[2.5vw] text-[#828282] text-[0.9vw] leading-[0.8vw]">t-shirt</span>
                        <div className="flex-center gap-[0.5vw]">
                            <span className="uppercase inline-block text-[1.2vw]">
                                bootleg
                            </span>
                            <span className="px-[0.5vw] py-[0.3vw] bg-[#EAB651]/10 text-[#EAB651] uppercase text-[0.8vw] leading-[0.8vw] inline-block">
                                design #2
                            </span>
                        </div>
                        <span className="uppercase inline-block text-[1.2vw]">
                            $ 1,250
                        </span>
                    </div>

                    <div className="fifthPara-4 ">
                        <div className="flex gap-[1vw] absolute top-[25vw] ml-[0.3vw]">
                            <div className="w-[5.5vw] h-[5.5vw] relative">
                                <Image src="/assets/landingAnimation-1.png" alt="t-shirt" fill className="rounded-full object-cover" />
                            </div>
                            <div className="w-[5.5vw] h-[5.5vw] relative">
                                <Image src="/assets/landingAnimation-2.png" alt="t-shirt" fill className="rounded-full object-cover" />
                            </div>
                            <div className="w-[5.5vw] h-[5.5vw] relative">
                                <Image src="/assets/landingAnimation-3.png" alt="t-shirt" fill className="rounded-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[34vw] ml-[0.3vw] flex-center gap-[1vw]">
                        <button className="buttonAnime-1 px-[2.5vw] py-[0.5vw] gap-[1vw] bg-dark-pink-500 relative text-white uppercase flex-center ">
                            <span className="font-[500]">Explore All Designs</span>
                            <Image
                                src="/assets/ArrowUp.svg"
                                alt="arrow-up"
                                width={36}
                                height={36}
                            />
                        </button>
                    </div>

                    <div ref={tShirtRef} className="absolute top-[10vw] right-[3vw] w-[55vw] h-[50vw] ">
                        <Image src="/assets/t-shirt2.png" alt="t-shirt" fill className="object-contain" />
                    </div>

                    <div
                        ref={bottomAnime}
                        className="py-[1vw] flex items-center justify-evenly w-full backdrop-blur-[28px] absolute bottom-0 left-0 z-50"
                    >
                        <h1 className="text-[0.8vw] max-w-[7.5vw] font-[300]">Pick your tee & design</h1>
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
                        <h1 className="text-[0.8vw] max-w-[7.5vw]">Add your own photos/texts</h1>
                        <div className="w-[10.25vw] h-[2vw] relative">
                            <Image
                                src="/assets/ArrowRight.svg"
                                alt="ArrowLeft"
                                fill
                                className="object-cover relative"
                            />
                        </div>
                        <h1 className="text-[0.8vw] max-w-[7.5vw]">Delivered in 5 - 7 days</h1>
                    </div>
                </div>
            </div>
            <OurProcess />
            <VerticalScale />
            <Background/>
        </>
    )
}

export default Landing