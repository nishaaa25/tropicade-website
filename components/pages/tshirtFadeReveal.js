import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'


const tshirtFadeReveal = ( {isPlaying} ) => {
      const tshirtRef = useRef(null);
      const tshirtRef2 = useRef(null);
      const timelineRef = useRef(null);
      // const [isPlaying, setIsPlaying] = useState(false);
      
      useGSAP(() => {
            // Create timeline but don't play it automatically
            timelineRef.current = gsap.timeline({ paused: true });
            
            // Fade out first image with clipPath and blur effect for smooth transition
            timelineRef.current.to(tshirtRef.current, {
                clipPath: "inset(0 0 100% 0)",
                filter: "blur(2px)",
                duration: 1.5,
                ease: "power2.inOut",
            })
            // Reset blur after animation
            .set(tshirtRef.current, {
                filter: "blur(0px)"
            });
      });

      const handleButtonClick = () => {
            if (timelineRef.current) {
                  if (isPlaying) {
                        // If animation is playing forward, reverse it
                        timelineRef.current.reverse();
                  } else {
                        // If animation is not playing or reversed, play it forward
                        timelineRef.current.play();
                  }
                  // setIsPlaying(!isPlaying);
            }
      };
      handleButtonClick()

  return (
    <>
      <div className='h-screen w-full flex items-center justify-center'>
        <div ref={tshirtRef2} className='h-[50vw] w-[45vw] absolute left-[49.4%] -translate-x-1/2'>
        <Image 
            
            src="/assets/changedImage2.png" 
            alt="t-shirt" 
            className='object-cover'
            fill 
            priority
          />
        </div>
        <div ref={tshirtRef} className='h-[50vw] w-[50vw] absolute left-1/2 -translate-x-1/2'>
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