import { useGSAP } from "@gsap/react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const LandingPage = () => {
    const splitTextOne = useRef(null)
    const textAnimeOne = useRef(null)
    const textAnimeTwo = useRef(null)
    const textAnimeThree = useRef(null)
    const subBlogAnime = useRef(null)
    const buttonAnime = useRef(null)


    useGSAP(() => {

        const tl = gsap.timeline();
        tl.from(splitTextOne.chars, {
            y: 100,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            stagger: 0.1
        })
        tl.from(textAnimeTwo.current, {
            y: 100,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            delay: -1.5
        })
        tl.from(textAnimeThree.current, {
            y: 100,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            delay: -1.7
        })
        tl.from(subBlogAnime.current, {
            y: 100,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            delay: -1.7
        })
        tl.from(buttonAnime.current, {
            y: 100,
            duration: 2,
            opacity: 0,
            ease: "expo.inOut",
            delay: -1.7
        })
        
    })


    return (
        <div className='w-full relative h-[90vh] px-16 pt-12'>
            
            <p ref={textAnimeOne} className="font-bold pb-4">MAKE IT YOURS</p>
            
            <h1 ref={textAnimeTwo} className="text-8xl font-bold text-white">CUSTOM STREETWEAR</h1>
            <h1 ref={textAnimeThree} className="text-8xl font-bold text-white">YOUR WAY</h1>
            <p ref={subBlogAnime} className="font-thin w-[40%] opacity-50 py-4">Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.</p>

            <button ref={buttonAnime} className="bg-[#FF3A65] rounded-full px-4 py-2 flex gap-6">
                <p className="px-3">SHOP OUR COLLECTION</p>
                <Image src="/assets/ButtonArrowRotated.svg" alt="ButtonArrow" width={20} height={20} />
            </button>

            <div className="h-[10vh] flex items-center justify-evenly w-full backdrop-blur-sm absolute bottom-0 left-0">
               <h1 className="text-xs">Pick your tee & design</h1>
               <Image src="/assets/ArrowLeft.svg" alt="ArrowLeft" width={45} height={45} />
               <h1 className="text-xs">Our design team will get in touch with you</h1>
               <Image src="/assets/ArrowLeft.svg" alt="ArrowLeft" width={45} height={45} />
               <h1 className="text-xs">Add your own photos/texts</h1>
               <Image src="/assets/ArrowLeft.svg" alt="ArrowLeft" width={45} height={45} />
               <h1 className="text-xs">Delivered in 5 - 7 days</h1>
            </div>
        </div>
    )
}

export default LandingPage
