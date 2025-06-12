import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

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

    // Refs for LandingPage content
    const textAnimeOne = useRef(null);
    const textAnimeTwo = useRef(null);
    const textAnimeThree = useRef(null);
    const subBlogAnime = useRef(null);
    const buttonAnime = useRef(null);
    const tshirtRef = useRef(null);
    
    // New ref for the three images container
    const threeImagesRef = useRef(null);

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
            "description": "Bootleg Design #2 - Our most popular streetwear design loved by thousands of customers worldwide.",
            "buttonText": "EXPLORE ALL DESIGNS",
            "price": "$1,250",
            "category": "TSHIRT"
        }
    ];

    // Initialize heading split
    useGSAP(() => {
        splitHeading(headings.current);
        if (textAnimeOne.current) splitHeading(textAnimeOne.current);
        if (textAnimeTwo.current) splitHeading(textAnimeTwo.current);
        if (textAnimeThree.current) splitHeading(textAnimeThree.current);
        if (subBlogAnime.current) splitHeading(subBlogAnime.current);
        
        // Initially hide the three images
        if (threeImagesRef.current) {
            gsap.set(threeImagesRef.current, { opacity: 0, y: 30 });
        }
    }, { scope: cardContainerRef.current });

    // For ScrollAnimation
    useEffect(() => {
        if (!isIntroCompleted) return;
        const handleWheel = (d) => {
            if (isAnimating) return;

            const { wheelDelta: wD } = d;

            // If we're at the last section and scrolling down, allow normal scroll
            if (crrScroll === data.length - 1 && wD < 0) {
                return; // Let the browser handle normal scrolling
            }

            // If we're at the first section and scrolling up, prevent scroll
            if (crrScroll === 0 && wD > 0) {
                d.preventDefault();
                return;
            }

            d.preventDefault();
            setIsAnimating(true);
            const floatTl = gsap.timeline({
                onComplete: () => setIsAnimating(false),
            });

            if (wD > 0) {
                // Scrolling up - text should come from bottom to top
                splitAllHeadings();
                changeCount('-');

                // T-shirt animation for scroll up - return to original position
                gsap.to(tshirtRef.current, {
                    y: 0,
                    duration: 4,
                    ease: 'expo.inOut'
                });

                floatTl
                    .to('.date span', { yPercent: 100, duration: 0.3 })
                    .to(['.heading span', '.text-anime span', '.sub-blog span'], {
                        yPercent: 100,
                        duration: 0.4,
                        opacity: .3,
                        ease: 'power2.inOut',
                        stagger: 0.01,
                        onComplete: () => setMonitor(Math.random())
                    }, '<')
                    .set('.date span', { yPercent: -100 })
                    .to('.date span', {
                        yPercent: 0,
                        duration: 0.3
                    }, '<+0.05')
            } else {
                // Scrolling down - text should come from top to bottom
                splitAllHeadings();
                changeCount('+');

                // T-shirt animation for scroll down - lift up slightly
                gsap.to(tshirtRef.current, {
                    y: -70,
                    duration: 4,
                    ease: 'expo.inOut'
                });

                floatTl
                    .to('.date span', { yPercent: 100, duration: 0.3 })
                    .to(['.heading span', '.text-anime span', '.sub-blog span'], {
                        yPercent: -100,
                        duration: 0.4,
                        opacity: .3,
                        ease: 'power2.inOut',
                        stagger: 0.01,
                        onComplete: () => setMonitor(Math.random())
                    }, '<')
                    .set('.date span', { yPercent: -100 })
                    .to('.date span', {
                        yPercent: 0,
                        duration: 0.3
                    }, '<+0.05');
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isAnimating, crrScroll, isIntroCompleted, data.length]);

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
        if (buttonAnime.current) buttonAnime.current.textContent = data[crrScroll].buttonText;

        splitAllHeadings();

        const isScrollingUp = prevCrrScroll > crrScroll;
        // When scrolling down, text comes from top (negative yPercent)
        // When scrolling up, text comes from bottom (positive yPercent)
        const animateDirection = isScrollingUp ? -100 : 100;

        gsap.from(['.heading span', '.text-anime span', '.sub-blog span'], {
            yPercent: animateDirection,
            duration: 0.4,
            opacity: 1,
            ease: 'power2.out',
            stagger: 0.01
        });

        // Handle three images visibility based on current scroll
        if (threeImagesRef.current) {
            if (crrScroll === 1) {
                // Show images in step 2
                gsap.to(threeImagesRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    delay: 0.3 // Small delay after text animation
                });
            } else {
                // Hide images in step 1
                gsap.to(threeImagesRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
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
            gsap.set(span, { display: 'inline-block', pointerEvents: 'none' });
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
        <main className="w-full h-screen overflow-hidden relative">
            <div ref={cardContainerRef} className='card-section w-full h-screen relative overflow-hidden'>
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
                    <div ref={tshirtRef} className="w-[50vw] h-[50vw] relative">
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
                            <p ref={textAnimeOne} className="text-anime font-bold text-sm text-white">
                                MAKE IT YOURS
                            </p>
                        </div>

                        <div className="h-fit overflow-hidden font-bebas">
                            <h1 ref={textAnimeTwo} className="text-anime text-9xl leading-none text-white">
                                CUSTOM STREETWEAR.
                            </h1>
                        </div>

                        <div className="h-fit overflow-hidden font-bebas mb-4">
                            <h1 ref={textAnimeThree} className="text-anime text-9xl leading-none text-white">
                                YOUR WAY
                            </h1>
                        </div>

                        <div className="h-fit overflow-hidden my-2 mb-6">
                            <p ref={subBlogAnime} className="sub-blog font-thin opacity-70 py-2 text-white text-sm max-w-2xl">
                                Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.
                            </p>
                        </div>

                        {/* Three Images - Only visible in step 2 */}
                        <div ref={threeImagesRef} className="flex gap-6 mb-8 opacity-0">
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
                            <button ref={buttonAnime} className="bg-[#FF3A65] px-8 py-4 text-white text-lg font-medium hover:bg-[#e6335a] transition-colors">
                                SHOP OUR COLLECTION →
                            </button>
                        </div>

                        {/* Process Steps */}
                        <div className="py-4 flex items-center justify-evenly w-full backdrop-blur-[28px] absolute bottom-0 left-0 z-60">
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
                </div>
            </div>
        </main>
    );
};

export default Landing;