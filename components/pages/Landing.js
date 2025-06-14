import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const Landing = () => {
    const tShirtRef = useRef(null)
    useGSAP(() => {
        // Initial animation for first heading
        gsap.from(".firstHeading div", {
            y: 100,
            duration: 2,
            ease: "expo.inOut",
            stagger: 0.6
        })
        gsap.from(".firstHeading h1", {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "expo.inOut",
            stagger: 0.6
        })

        // Initial animation for fifthPara
        gsap.from(".fifthPara div", {
            y: 100,
            duration: 2,
            ease: "expo.inOut",
            stagger: 0.6
        })
        gsap.from(".fifthPara p", {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "expo.inOut",
            stagger: 0.6
        })

        // Initial animation for thirdPara
        gsap.from(".thirdPara p", {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "expo.inOut",
            stagger: 0.6
        })

        // Initial animation for fourthButton
        gsap.from(".fourthButton button", {
            opacity: 0,
            y: 100,
            duration: 2,
            ease: "expo.inOut",
            stagger: 0.6
        })

        // Pin animation with scroll trigger
        ScrollTrigger.create({
            trigger: ".container",
            start: "top top",
            end: "bottom bottom",
            pin: true,
            onUpdate: (self) => {
                const progress = self.progress;

                // First heading moves up and fades out (much faster animation - completes at 30% progress)
                const firstHeadingProgress = Math.min(progress * 3.33, 1);
                gsap.to(".firstHeading h1", {
                    y: -200 * firstHeadingProgress,
                    opacity: 1 - firstHeadingProgress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                gsap.to(".firstHeading div", {
                    y: -200 * (firstHeadingProgress + .1),
                    opacity: 1 - firstHeadingProgress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // Second heading moves up from bottom and fades in
                gsap.to(".secondHeading h1", {
                    y: 100 - (100 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                gsap.to(".secondHeading div", {
                    y: 100 - (200 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // fifthPara moves up and fades out
                gsap.to(".fifthPara p", {
                    y: -200 * progress,
                    opacity: 1 - progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                gsap.to(".fifthPara div", {
                    y: -200 * (progress + .1),
                    opacity: 1 - progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // thirdPara moves up and fades out (much faster animation - completes at 30% progress)
                const thirdParaProgress = Math.min(progress * 3.33, 1);
                gsap.to(".thirdPara p", {
                    y: -200 * thirdParaProgress,
                    opacity: 1 - thirdParaProgress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // fourthButton moves up and fades out (much faster animation - completes at 30% progress)
                const fourthButtonProgress = Math.min(progress * 3.33, 1);
                gsap.to(".fourthButton button", {
                    y: -200 * fourthButtonProgress,
                    opacity: 1 - fourthButtonProgress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // T-shirt moves up during the animation
                gsap.to(tShirtRef.current, {
                    y: -100 * progress,
                    duration: 0.1,
                    ease: "none"
                })

                // fifthPara-1 moves up from bottom and fades in
                gsap.to(".fifthPara-1 p", {
                    y: 100 - (100 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                gsap.to(".fifthPara-1 div", {
                    y: 100 - (200 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // fifthPara-2 moves up from bottom and fades in
                gsap.to(".fifthPara-2 span", {
                    y: 100 - (100 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // fifthPara-3 moves up from bottom and fades in
                gsap.to(".fifthPara-3 div", {
                    y: 100 - (100 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // fifthPara-4 moves up from bottom and fades in
                gsap.to(".fifthPara-4 div", {
                    y: 100 - (100 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })

                // buttonAnime-1 moves up from bottom and fades in
                gsap.to(".buttonAnime-1", {
                    y: 100 - (100 * progress),
                    opacity: progress,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none"
                })
            }
        })
    })

    return (
        <>
            <div className="container h-[180vh] relative w-full space-y-4">
                <div className="fifthPara px-10 pt-28">
                    <div className="h-fit overflow-hidden">
                        <p className="uppercase text-white">make it yours</p>
                    </div>
                </div>
                <div className="fifthPara-1 px-10 pt-28">
                    <div className="h-fit overflow-hidden">
                        <p className="uppercase text-white font-light opacity-0">most favourite designs</p>
                    </div>
                </div>
                <div className="flex px-10">
                    <div className="firstHeading absolute top-[7rem] left-10">
                        <div className="h-fit overflow-hidden">
                            <h1 className="text-9xl leading-none text-white font-bebas">custom streetwear</h1>
                        </div>
                        <div className="h-fit overflow-hidden">
                            <h1 className="text-9xl leading-none text-white font-bebas">your way</h1>
                        </div>
                    </div>
                    <div className="secondHeading absolute top-[17.5rem] left-8">
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
                <div className="fifthPara-2 px-10">
                    <span className="font-bebas opacity-0 absolute top-[20rem] left-10">t-shirt</span>
                </div>
                <div className="fifthPara-3 px-10">
                    <div className="flex flex-col absolute top-[22rem] left-10 opacity-0">
                        <div className="flex gap-2">
                            <span className="uppercase">
                                bootleg
                            </span>
                            <span className="px-2 py-1 bg-[#FF3A65] text-white uppercase text-xs">
                                design #2
                            </span>
                        </div>
                        <span className="uppercase">
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
                <button className="buttonAnime-1 px-10 py-4 bg-[#FF3A65] absolute top-[34rem] left-10 text-white uppercase font-light opacity-0">
                    EXPLORE ALL DESIGNS
                </button>

                <div ref={tShirtRef} className="absolute top-24 right-10 w-[50vw] h-[50vw]">
                    <Image src="/assets/t-shirt2.png" alt="t-shirt" width={300} height={300} className="w-full h-full object-contain" />
                </div>
            </div>
        </>
    )
}

export default Landing