import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { useRef } from "react"
import OurProcess from "../OurProcess"
import VerticalScale from "../VerticalScale"

gsap.registerPlugin(ScrollTrigger)

const Landing = () => {
    const tShirtRef = useRef(null)
    const containerRef = useRef(null)
    const singleLeafRef = useRef(null)
    const leafsRef = useRef(null)

    useGSAP(() => {
        // Set will-change properties for better performance
        gsap.set([
            ".firstHeading div", ".firstHeading h1",
            ".secondHeading div", ".secondHeading h1",
            ".fifthPara div", ".fifthPara p",
            ".fifthPara-1 div", ".fifthPara-1 p",
            ".fifthPara-3 div", ".fifthPara-3 span", ".fifthPara-4 div",
            ".thirdPara p", ".fourthButton button", ".buttonAnime-1",
            tShirtRef.current
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

        // Initial animation for first heading
        gsap.from(".firstHeading div", {
            y: 100,
            duration: 1.8,
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
            y: 200,
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
                const firstHeadingProgress = Math.min(progress * 4, 1);
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
                gsap.to(".fifthPara p", {
                    y: -150 * progress,
                    opacity: 1 - progress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara div", {
                    y: -150 * (progress + 0.05),
                    opacity: 1 - progress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // thirdPara moves up and fades out (smoother timing)
                const thirdParaProgress = Math.min(progress * 4, 1);
                gsap.to(".thirdPara p", {
                    y: -150 * thirdParaProgress,
                    opacity: 1 - thirdParaProgress,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out"
                })

                // fourthButton moves up and fades out (smoother timing)
                const fourthButtonProgress = Math.min(progress * 4, 1);
                gsap.to(".fourthButton button", {
                    y: -150 * fourthButtonProgress,
                    opacity: 1 - fourthButtonProgress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // T-shirt moves up during the animation
                gsap.to(tShirtRef.current, {
                    y: -80 * progress,
                    duration: 0.3,
                    ease: "power2.out"
                })

                // New content fades in from bottom with staggered timing
                const newContentDelay = Math.max(0, progress - 0.2);

                gsap.to(".fifthPara-1 p", {
                    y: 80 - (80 * newContentDelay * 1.25),
                    opacity: newContentDelay * 1.25,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara-1 div", {
                    y: 80 - (160 * newContentDelay * 1.25),
                    opacity: newContentDelay * 1.25,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara-3 div", {
                    y: 60 - (60 * newContentDelay * 1.25),
                    opacity: newContentDelay * 1.25,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".fifthPara-3 span", {
                    y: 60 - (60 * newContentDelay * 1.25),
                    opacity: newContentDelay * 1.25,
                    duration: 0.3,
                    ease: "power2.out",
                    stagger: 0.1
                })

                gsap.to(".fifthPara-4 div", {
                    y: 60 - (60 * newContentDelay * 1.25),
                    opacity: newContentDelay * 1.25,
                    duration: 0.3,
                    ease: "power2.out"
                })

                gsap.to(".buttonAnime-1", {
                    y: 60 - (60 * newContentDelay * 1.25),
                    opacity: newContentDelay * 1.25,
                    duration: 0.3,
                    ease: "power2.out"
                })
            }
        })

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

        // Cleanup will-change on animation complete
        return () => {
            gsap.set([
                ".firstHeading div", ".firstHeading h1",
                ".secondHeading div", ".secondHeading h1",
                ".fifthPara div", ".fifthPara p",
                ".fifthPara-1 div", ".fifthPara-1 p",
                ".fifthPara-3 div", ".fifthPara-3 span", ".fifthPara-4 div",
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
            <div className="sticky-wrapper" style={{ height: '200vh' }}>
                <div
                    ref={containerRef}
                    className="sticky-content sticky top-0 h-screen w-full overflow-hidden"
                    style={{ willChange: 'transform' }}>
                    <div className="fifthPara px-10 pt-24">
                        <div className="h-fit overflow-hidden">
                            <p className="uppercase text-white">make it yours</p>
                        </div>
                    </div>
                    <div className="fifthPara-1 px-10 pt-24">
                        <div className="h-fit w-fit overflow-hidden">
                            <p className="uppercase text-[#FF3A65] px-4 py-2 bg-[#FF3A651A] font-light opacity-0 flex items-center gap-2">
                                <Image src="/assets/HeartStraight.svg" alt="heart" width={18} height={18} />
                                most favourite designs
                            </p>
                        </div>
                    </div>
                    <div className="flex px-10">
                        <div className="firstHeading absolute top-[7rem] left-8">
                            <div className="h-fit overflow-hidden">
                                <h1 className="text-9xl leading-none text-white font-bebas">custom streetwear</h1>
                            </div>
                            <div className="h-fit overflow-hidden">
                                <h1 className="text-9xl leading-none text-white font-bebas">your way</h1>
                            </div>
                        </div>
                        <div className="secondHeading absolute top-[16rem] left-8">
                            <div className="h-fit overflow-hidden">
                                <h1 className="text-white font-bebas text-9xl opacity-0">best sellers</h1>
                            </div>
                        </div>
                    </div>
                    <div className="thirdPara absolute top-[24rem] left-10">
                        <p className="text-white font-light">Bring your memories, faces, and moments to life — right on your tee.</p>
                        <p className="text-white font-light">At Tropicade, we blend bold street vibes with personal stories.</p>
                    </div>
                    <div className="fourthButton px-10 absolute top-[28rem]">
                        <button className="px-10 py-2 rounded-full bg-[#FF3A65] text-white uppercase font-light">
                            shop our collection
                        </button>
                    </div>
                    <div className="fifthPara-3 px-10">
                        <div className="flex flex-col absolute top-[19.5rem] left-10 opacity-0 text-white">
                            <span className="font-bebas opacity-0 left-10 text-white text-lg">t-shirt</span>
                            <div className="flex gap-2">
                                <span className="uppercase inline-block">
                                    bootleg
                                </span>
                                <span className="px-2 py-1 bg-[#EAB6511A] text-[#EAB651] uppercase text-xs inline-block">
                                    design #2
                                </span>
                            </div>
                            <span className="uppercase inline-block">
                                $ 1,250
                            </span>
                        </div>
                    </div>
                    <div className="fifthPara-4 px-10">
                        <div className="flex gap-4 absolute top-[26rem] left-10 opacity-0">
                            <Image src="/assets/landingAnimation-1.png" alt="t-shirt" width={100} height={100} className="rounded-full object-cover" />
                            <Image src="/assets/landingAnimation-2.png" alt="t-shirt" width={100} height={100} className="rounded-full object-cover" />
                            <Image src="/assets/landingAnimation-3.png" alt="t-shirt" width={100} height={100} className="rounded-full object-cover" />
                        </div>
                    </div>
                    <button className="buttonAnime-1 px-10 py-4 bg-[#FF3A65] absolute top-[34rem] left-10 text-white uppercase font-light opacity-0 flex items-center gap-2">
                        EXPLORE ALL DESIGNS
                        <Image src="/assets/ArrowLeft.svg" alt="arrow" width={52} height={52} />
                    </button>

                    <div ref={tShirtRef} className="absolute top-24 right-10 w-[50vw] h-[50vw]">
                        <Image src="/assets/t-shirt2.png" alt="t-shirt" width={300} height={300} className="w-full h-full object-contain" />
                    </div>
                </div>
            </div>
            <OurProcess />
            <VerticalScale />
            <div className="fixed -bottom-52 -right-[15vw] -z-20">
                <div className="leaf-img h-[30vw] w-[40vw]">
                    <Image
                        ref={singleLeafRef}
                        src="/assets/singleleaf.svg"
                        alt="landing-page-bg"
                        width={900}
                        height={900}
                        className="object-contain z-50 h-full w-full mix-blend-screen"
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
        </>
    )
}

export default Landing