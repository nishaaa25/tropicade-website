import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import OurProcess from '../OurProcess';

const Landing = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [crrScroll, setCrrScroll] = useState(0);
    const [prevCrrScroll, setPrevCrrScroll] = useState(crrScroll);
    const [monitor, setMonitor] = useState(0);
    const [isIntroCompleted, setIsIntroCompleted] = useState(true);

    // Refs for Landing Page content
    const headings = useRef(null);
    const subHeadingRef = useRef(null);
    const hoverRef = useRef(null);
    const cardContainerRef = useRef(null);
    const loaderCounterRef = useRef(null);
    const wrapperRef = useRef(null);

    // Refs for LandingPage content
    const textAnimeOne = useRef(null);
    const textAnimeTwo = useRef(null);
    const textAnimeThree = useRef(null);
    const subBlogAnime = useRef(null);
    const buttonAnime = useRef(null);
    const buttonAnimeTwo = useRef(null); // New ref for second button
    const tshirtRef = useRef(null);
    const processStepsRef = useRef(null);

    // New ref for the three images container
    const threeImagesRef = useRef(null);
    // New ref for additional text above images
    const additionalTextRef = useRef(null);
    // New refs for step 2 additional text elements
    const categoryRef = useRef(null);
    const productNameRef = useRef(null);
    const designTagRef = useRef(null);
    const priceRef = useRef(null);

    const data = [
        {
            "heading": "MAKE IT YOURS",
            "subHeading": "CUSTOM STREETWEAR.",
            "thirdHeading": "YOUR WAY",
            "description": "Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.",
            "buttonText": "SHOP OUR COLLECTION"
        },
        {
            "heading": "MOST LIKED DESIGNS",
            "subHeading": "BEST SELLERS",
            "thirdHeading": "",
            "description": "",
            "buttonText": "EXPLORE ALL DESIGNS",
            "price": "$1,250",
            "category": "TSHIRT",
            "additionalText": "Choose from our most popular designs"
        }
    ];

    // Initialize heading split
    useGSAP(() => {
        splitHeading(headings.current);
        if (textAnimeOne.current) splitHeading(textAnimeOne.current);
        if (textAnimeTwo.current) splitHeading(textAnimeTwo.current);
        if (textAnimeThree.current) splitHeading(textAnimeThree.current);
        if (subBlogAnime.current) splitHeading(subBlogAnime.current);
        if (additionalTextRef.current) splitHeading(additionalTextRef.current);

        // Initially hide the three images and additional text
        if (threeImagesRef.current) {
            gsap.set(threeImagesRef.current, { opacity: 0, y: 30 });
        }
        if (additionalTextRef.current) {
            gsap.set(additionalTextRef.current, { opacity: 0, y: 20 });
        }

        // Initially hide step 2 additional text elements
        if (categoryRef.current) {
            gsap.set(categoryRef.current, { opacity: 0, y: 20 });
        }
        if (productNameRef.current) {
            gsap.set(productNameRef.current, { opacity: 0, y: 20 });
        }
        if (designTagRef.current) {
            gsap.set(designTagRef.current, { opacity: 0, y: 20 });
        }
        if (priceRef.current) {
            gsap.set(priceRef.current, { opacity: 0, y: 20 });
        }

        // Set initial button positions
        if (buttonAnimeTwo.current) {
            gsap.set(buttonAnimeTwo.current, { opacity: 0, y: 20 });
        }
    }, { scope: cardContainerRef.current });

    // For ScrollAnimation
    useEffect(() => {
        if (!isIntroCompleted) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const viewportHeight = window.innerHeight;
                    const stickyThreshold = viewportHeight * 2; // 200vh
                    
                    // Handle sticky positioning - Use sticky instead of fixed/absolute
                    if (cardContainerRef.current) {
                        gsap.set(cardContainerRef.current, {
                            position: 'sticky',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            zIndex: 10
                        });
                    }
                    
                    // Only handle scroll within the sticky section
                    if (scrollTop >= 0 && scrollTop < stickyThreshold) {
                        // Adjusted scroll thresholds - animation starts earlier
                        const scrollProgress = scrollTop / viewportHeight; // 0 to 2
                        // Animation starts at 0.3vh (30% of viewport) instead of 1vh
                        const targetStep = scrollProgress >= 0.3 ? 1 : 0;
                        
                        // Only trigger animation if we're changing steps and not already animating
                        if (targetStep !== crrScroll && !isAnimating) {
                            setIsAnimating(true);
                            
                            const isScrollingDown = targetStep > crrScroll;
                            
                            const floatTl = gsap.timeline({
                                onComplete: () => {
                                    setIsAnimating(false);
                                },
                            });

                            if (isScrollingDown) {
                                // Scrolling down - moving to step 2
                                splitAllHeadings();
                                setCrrScroll(1);

                                // T-shirt animation for scroll down - lift up slightly
                                gsap.to(tshirtRef.current, {
                                    y: -70,
                                    duration: 1.2,
                                    ease: 'power2.inOut'
                                });

                                floatTl
                                    .to('.date span', { 
                                        yPercent: 100, 
                                        duration: 0.6,
                                        ease: 'power2.inOut'
                                    })
                                    .to(['.heading span', '.text-anime span', '.sub-blog span', '.additional-text span'], {
                                        yPercent: -100,
                                        duration: 0.8,
                                        opacity: 0.3,
                                        ease: 'power2.inOut',
                                        stagger: 0.02,
                                        onComplete: () => setMonitor(Math.random())
                                    }, '<')
                                    .set('.date span', { yPercent: -100 })
                                    .to('.date span', {
                                        yPercent: 0,
                                        duration: 0.6,
                                        ease: 'power2.out'
                                    }, '<+0.1');
                            } else {
                                // Scrolling up - moving to step 1
                                splitAllHeadings();
                                setCrrScroll(0);

                                // T-shirt animation for scroll up - return to original position
                                gsap.to(tshirtRef.current, {
                                    y: 0,
                                    duration: 1.2,
                                    ease: 'power2.inOut'
                                });

                                gsap.to(buttonAnimeTwo.current, {
                                    opacity: 0,
                                    y: 20,
                                    duration: 0.6,
                                    ease: 'power2.inOut'
                                });

                                floatTl
                                    .to('.date span', { 
                                        yPercent: 100, 
                                        duration: 0.6,
                                        ease: 'power2.inOut'
                                    })
                                    .to(['.heading span', '.text-anime span', '.sub-blog span', '.additional-text span'], {
                                        yPercent: 100,
                                        duration: 0.8,
                                        opacity: 0.3,
                                        ease: 'power2.inOut',
                                        stagger: 0.02,
                                        onComplete: () => setMonitor(Math.random())
                                    }, '<')
                                    .set('.date span', { yPercent: -100 })
                                    .to('.date span', {
                                        yPercent: 0,
                                        duration: 0.6,
                                        ease: 'power2.out'
                                    }, '<+0.1');
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isAnimating, crrScroll, isIntroCompleted]);

    // To Change Data
    useEffect(() => {
        if (!isIntroCompleted) return;

        // Update main heading
        headings.current.textContent = data[crrScroll].heading;

        // Update other content based on current slide
        if (textAnimeOne.current) textAnimeOne.current.textContent = data[crrScroll].heading;
        if (textAnimeTwo.current) textAnimeTwo.current.textContent = data[crrScroll].subHeading;
        if (textAnimeThree.current) textAnimeThree.current.textContent = data[crrScroll].thirdHeading;
        if (subBlogAnime.current) subBlogAnime.current.textContent = data[crrScroll].description;
        if (additionalTextRef.current) additionalTextRef.current.textContent = data[crrScroll].additionalText || '';

        splitAllHeadings();

        const isScrollingUp = prevCrrScroll > crrScroll;
        // When scrolling down, text comes from top (negative yPercent)
        // When scrolling up, text comes from bottom (positive yPercent)
        const animateDirection = isScrollingUp ? -100 : 100;

        gsap.from(['.heading span', '.text-anime span', '.sub-blog span', '.additional-text span'], {
            yPercent: animateDirection,
            duration: 0.8,
            opacity: 1,
            ease: 'power2.out',
            stagger: 0.02
        });

        // Handle three images and additional text visibility based on current scroll
        if (threeImagesRef.current && additionalTextRef.current) {
            if (crrScroll === 1) {
                // Show step 2 additional text elements with staggered animation
                const tl = gsap.timeline({ delay: 0.3 }); // Reduced delay for smoother transition

                tl.to(categoryRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                })
                    .to([productNameRef.current, designTagRef.current], {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        stagger: 0.1
                    }, '-=0.3')
                    .to(priceRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, '-=0.3')
                    .to(additionalTextRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power2.out'
                    }, '-=0.2')
                    .to(threeImagesRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    }, '-=0.4')
                    .to(buttonAnimeTwo.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, '-=0.3');
            } else {
                // Hide step 2 additional text elements and images with smoother animation
                const hideTl = gsap.timeline();
                
                hideTl.to([categoryRef.current, productNameRef.current, designTagRef.current, priceRef.current, additionalTextRef.current], {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    stagger: 0.03
                })
                .to(threeImagesRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '<')
                .to(buttonAnimeTwo.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '<');
            }
        }

        subHeadingRef.current.textContent = data[crrScroll].subHeading;
        setPrevCrrScroll(crrScroll);
    }, [monitor, isIntroCompleted]);

    function splitHeading(element) {
        if (!element || !element.textContent) return;
        const chars = element.textContent.split('');
        element.textContent = '';
        chars.forEach((char) => {
            const span = document.createElement('span');
            gsap.set(span, { 
                display: 'inline-block', 
                pointerEvents: 'none',
                willChange: 'transform'
            });
            span.textContent = char === ' ' ? '\u00A0' : char;
            element.appendChild(span);
        });
    }

    function splitAllHeadings() {
        splitHeading(headings.current);
        if (textAnimeOne.current) splitHeading(textAnimeOne.current);
        if (textAnimeTwo.current) splitHeading(textAnimeTwo.current);
        if (textAnimeThree.current) splitHeading(textAnimeThree.current);
        if (subBlogAnime.current) splitHeading(subBlogAnime.current);
        if (additionalTextRef.current) splitHeading(additionalTextRef.current);
    }

    function changeCount(option) {
        setCrrScroll(prev => {
            if (option === '+') {
                return prev < data.length - 1 ? prev + 1 : prev;
            } else {
                return prev > 0 ? prev - 1 : prev;
            }
        });
    }

    return (
        <>
            {/* Wrapper with 200vh height for sticky behavior */}
            <div ref={wrapperRef} className="w-full relative" style={{ height: '200vh' }}>
                <main ref={cardContainerRef} className="w-full h-screen overflow-hidden sticky top-0 z-10">
                    <div className='card-section w-full h-screen relative overflow-hidden'>
                        {/* Hidden elements for animation reference */}
                        <div className="img-con overflow-visible pointer-events-none h-0 w-0 fixed opacity-0 -z-10">
                            <p className='date overflow-hidden text-sm'>
                                <span ref={subHeadingRef} className='block w-20 text-base text-center'>CUSTOM STREETWEAR.</span>
                            </p>
                        </div>

                        <div ref={hoverRef} className="title-con fixed opacity-0 -z-10 overflow-hidden">
                            <h1 ref={headings} className='heading whitespace-nowrap leading-none overflow-hidden text-[22vw] uppercase font-thin text-[#f33a3a] flex font-bebas'>MAKE IT YOURS</h1>
                        </div>

                        {/* T-shirt Image - Absolute positioned */}
                        <div className="absolute right-12 top-[20%] transform z-10">
                            <div ref={tshirtRef} className="w-[50vw] h-[50vw] relative" style={{ willChange: 'transform' }}>
                                <Image
                                    src="/assets/T-Shirt.png"
                                    alt="T-Shirt"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Main Content - Left Aligned */}
                        <div className="flex items-center justify-start w-full h-full px-12 pt-20">
                            <div className="text-left w-full">
                                <div className="h-fit overflow-hidden">
                                    <p ref={textAnimeOne} className="text-anime font-bold text-sm text-white" style={{ willChange: 'transform' }}>
                                        MAKE IT YOURS
                                    </p>
                                </div>

                                <div className="h-fit overflow-hidden font-bebas">
                                    <h1 ref={textAnimeTwo} className="text-anime text-9xl leading-none text-white" style={{ willChange: 'transform' }}>
                                        CUSTOM STREETWEAR.
                                    </h1>
                                </div>

                                <div className="h-fit overflow-hidden font-bebas">
                                    <h1 ref={textAnimeThree} className="text-anime text-9xl leading-none text-white" style={{ willChange: 'transform' }}>
                                        YOUR WAY
                                    </h1>
                                </div>

                                <div className="h-fit overflow-hidden my-2 mb-2">
                                    <p ref={subBlogAnime} className="sub-blog font-thin opacity-70 py-2 text-white text-sm max-w-2xl" style={{ willChange: 'transform' }}>
                                        Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.
                                    </p>
                                </div>

                                {/* Additional text above images - Only visible in step 2 */}
                                <div className="h-fit overflow-hidden mb-3">
                                    <div style={{ display: crrScroll === 1 ? 'block' : 'none' }}>
                                        <p ref={categoryRef} className='font-bebas opacity-50 text-white' style={{ willChange: 'transform' }}>T SHIRT</p>
                                        <div className='flex gap-2 items-center'>
                                            <p ref={productNameRef} className='text-lg text-white' style={{ willChange: 'transform' }}>BOOTLEG</p>
                                            <p ref={designTagRef} className='px-4 text-xs py-1 bg-[#EAB6511A] text-[#EAB651]' style={{ willChange: 'transform' }}>DESIGN #2</p>
                                        </div>
                                        <p ref={priceRef} className='text-lg font-bebas text-white' style={{ willChange: 'transform' }}>$ 1,250</p>
                                    </div>
                                    <div className="h-fit overflow-hidden">
                                        <p ref={additionalTextRef} className="additional-text font-medium text-white text-base" style={{ willChange: 'transform' }}>
                                        </p>
                                    </div>
                                </div>

                                {/* Three Images - Only visible in step 2 */}
                                <div
                                    ref={threeImagesRef}
                                    className="flex gap-6 mb-4"
                                    style={{ 
                                        display: crrScroll === 1 ? 'flex' : 'none',
                                        willChange: 'transform'
                                    }}
                                >
                                    <div className="w-24 h-24 relative rounded-full overflow-hidden">
                                        <Image
                                            src="/assets/landingAnimation-1.png" // Replace with your actual image paths
                                            alt="Design 1"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="w-24 h-24 relative rounded-full overflow-hidden">
                                        <Image
                                            src="/assets/landingAnimation-2.png" // Replace with your actual image paths
                                            alt="Design 2"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="w-24 h-24 relative rounded-full overflow-hidden">
                                        <Image
                                            src="/assets/landingAnimation-3.png" // Replace with your actual image paths
                                            alt="Design 3"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="mb-16">
                                    {/* Button for Step 1 */}
                                    <button
                                        ref={buttonAnime}
                                        className="bg-[#FF3A65] text-white text-lg font-medium hover:bg-[#e6335a] transition-colors px-8 py-4"
                                        style={{ display: crrScroll === 0 ? 'inline-block' : 'none' }}
                                    >
                                        SHOP OUR COLLECTION →
                                    </button>

                                    {/* Button for Step 2 */}
                                    <button
                                        ref={buttonAnimeTwo}
                                        className="bg-[#FF3A65] text-white text-lg font-medium hover:bg-[#e6335a] transition-colors px-8 py-4"
                                        style={{ 
                                            display: crrScroll === 1 ? 'inline-block' : 'none',
                                            willChange: 'transform'
                                        }}
                                    >
                                        EXPLORE ALL DESIGNS →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Process Steps - Changed from sticky to absolute positioning */}
                        <div ref={processStepsRef} className="absolute bottom-0 left-0 w-full py-4 flex items-center justify-evenly backdrop-blur-[28px] z-60">
                            <h1 className="text-sm max-w-30 font-[300]">Pick your tee & design</h1>
                            <div className="w-41 h-8 relative">
                                <Image
                                    src="/assets/ArrowRight.svg"
                                    alt="ArrowLeft"
                                    fill
                                    className="object-cover relative"
                                />
                            </div>
                            <h1 className="text-sm max-w-36">
                                Our design team will get in touch with you
                            </h1>
                            <div className="w-41 h-8 relative">
                                <Image
                                    src="/assets/ArrowRight.svg"
                                    alt="ArrowLeft"
                                    fill
                                    className="object-cover relative"
                                />
                            </div>
                            <h1 className="text-sm max-w-30">Add your own photos/texts</h1>
                            <div className="w-41 h-8 relative">
                                <Image
                                    src="/assets/ArrowRight.svg"
                                    alt="ArrowLeft"
                                    fill
                                    className="object-cover relative"
                                />
                            </div>
                            <h1 className="text-sm max-w-30">Delivered in 5 - 7 days</h1>
                        </div>
                    </div>
                </main>
            </div>
            
            {/* OurProcess without background color - will scroll normally after sticky section */}
            <div id="our-process" className="relative">
                <OurProcess />
            </div>
        </>
    );
};

export default Landing;