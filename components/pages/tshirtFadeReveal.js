import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import React, { useRef } from 'react'
import gsap from 'gsap'


const tshirtFadeReveal = () => {
      const tshirtRef = useRef(null);
      const tshirtRef2 = useRef(null);
      
      useGSAP(() => {
            // gsap.set(tshirtRef2.current, {clipPath: "inset(0 0 100% 0)", opacity: 0});
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            
            // Fade out first image
            tl.to(tshirtRef.current, {
                clipPath: "inset(0 0 100% 0)",
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut",
            })
            
            // // Fade in second image
            // .to(tshirtRef2.current, {
            //     clipPath: "inset(0 0 0 0)",
            //     opacity: 1,
            //     duration: 1.5,
            //     ease: "power2.inOut",
            // });
      });

  return (
    <>
      <div className='h-screen w-full flex items-center justify-center bg-black'>
        <div ref={tshirtRef2} className='h-[36vw] w-[36vw] absolute'>
        <Image 
            
            src="/assets/changedImage2.png" 
            alt="t-shirt" 
            className='object-cover'
            fill 
            priority
          />
        </div>
        <div ref={tshirtRef} className='h-[40vw] w-[40vw] absolute'>
        <Image 
            
            src="/assets/t-shirt2.png" 
            alt="t-shirt" 
            className='object-cover' 
            fill 
            priority
          />
        </div>
      </div>
    </>
  )
}

export default tshirtFadeReveal