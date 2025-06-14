import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import OurProcess from '../OurProcess';

const Landing = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [crrScroll, setCrrScroll] = useState(0);
    const [prevCrrScroll, setPrevCrrScroll] = useState(0);
    const [monitor, setMonitor] = useState(0);
    const [isIntroCompleted, setIsIntroCompleted] = useState(false);
    const [animationQueue, setAnimationQueue] = useState([]);
    const [isStepAnimationComplete, setIsStepAnimationComplete] = useState(true);
    const [cursorText, setCursorText] = useState('');
    const [scrollLocked, setScrollLocked] = useState(false);
    const [lastScrollTime, setLastScrollTime] = useState(0);

    // Refs
    const refs = {
        headings: useRef(null),
        subHeadingRef: useRef(null),
        cardContainerRef: useRef(null),
        wrapperRef: useRef(null),
        customCursor: useRef(null),
        textAnimeOne: useRef(null),
        textAnimeTwo: useRef(null),
        textAnimeThree: useRef(null),
        subBlogAnime: useRef(null),
        buttonAnime: useRef(null),
        buttonAnimeTwo: useRef(null),
        tshirtRef: useRef(null),
        processStepsRef: useRef(null),
        threeImagesRef: useRef(null),
        additionalTextRef: useRef(null),
        categoryRef: useRef(null),
        productNameRef: useRef(null),
        designTagRef: useRef(null),
        priceRef: useRef(null)
    };

    const data = [
        {
            heading: "MAKE IT YOURS",
            subHeading: "CUSTOM STREETWEAR.",
            thirdHeading: "YOUR WAY",
            description: "Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.",
            buttonText: "SHOP OUR COLLECTION"
        },
        {
            heading: "MOST LIKED DESIGNS",
            subHeading: "BEST SELLERS",
            thirdHeading: "",
            description: "",
            buttonText: "EXPLORE ALL DESIGNS",
            price: "$1,250",
            category: "TSHIRT"
        }
    ];

    useEffect(() => {
        const moveCursor = (e) => {
            const x = e.clientX - refs.customCursor.current.clientWidth / 2;
            const y = e.clientY - refs.customCursor.current.clientHeight / 2;
            gsap.to(refs.customCursor.current, { x, y, duration: 1.5, ease: "expo.out" });
        };

        const handleMouseEnter = (e) => {
            const hoverText = e.target.getAttribute('data-cursor-text');
            if (hoverText) {
                setCursorText(hoverText);
                gsap.to(refs.customCursor.current, { width: "100px", height: "100px", duration: 0.3, ease: "power2.out" });
            }
        };

        const handleMouseLeave = (e) => {
            const hoverText = e.target.getAttribute('data-cursor-text');
            if (hoverText) {
                setCursorText("");
                gsap.to(refs.customCursor.current, { width: "24px", height: "24px", duration: 0.3, ease: "power2.out" });
            }
        };

        window.addEventListener("mousemove", moveCursor);
        const hoverElements = document.querySelectorAll('[data-cursor-text]');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            hoverElements.forEach(element => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    const splitHeading = (element) => {
        if (!element?.textContent) return;
        const chars = element.textContent.split('');
        element.textContent = '';
        chars.forEach((char) => {
            const span = document.createElement('span');
            gsap.set(span, { display: 'inline-block', pointerEvents: 'none', willChange: 'transform' });
            span.textContent = char === ' ' ? '\u00A0' : char;
            element.appendChild(span);
        });
    };

    const splitAllHeadings = () => {
        [refs.headings, refs.textAnimeOne, refs.textAnimeTwo, refs.textAnimeThree, refs.subBlogAnime, refs.additionalTextRef].forEach(ref => {
            if (ref.current) splitHeading(ref.current);
        });
    };

    useGSAP(() => {
        splitAllHeadings();

        const elementsToHide = [refs.threeImagesRef, refs.additionalTextRef, refs.categoryRef, refs.productNameRef, refs.designTagRef, refs.priceRef, refs.buttonAnimeTwo];
        elementsToHide.forEach(ref => {
            if (ref.current) gsap.set(ref.current, { opacity: 0, y: 20 });
        });

        if (refs.processStepsRef.current) gsap.set(refs.processStepsRef.current, { y: 0, opacity: 1 });

        const introTl = gsap.timeline({
            onComplete: () => {
                setIsIntroCompleted(true);
                setIsStepAnimationComplete(true);
            }
        });

        gsap.set(['.text-anime span', '.sub-blog span'], { yPercent: 100, opacity: 0 });
        gsap.set([refs.buttonAnime.current, refs.tshirtRef.current], { opacity: 0, y: 100 });

        introTl
            .to('.text-anime span', { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.005 })
            .to('.sub-blog span', { yPercent: 0, opacity: 1, duration: 0.25, ease: 'power3.out', stagger: 0.003 }, '-=0.2')
            .to(refs.buttonAnime.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, '-=0.15')
            .to(refs.tshirtRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4');
    }, { scope: refs.cardContainerRef.current });

    useEffect(() => {
        if (isStepAnimationComplete && animationQueue.length > 0) {
            const nextAction = animationQueue[0];
            setAnimationQueue(prev => prev.slice(1));
            executeStepAnimation(nextAction);
        }
    }, [isStepAnimationComplete, animationQueue]);

    const executeStepAnimation = (targetStep) => {
        if (targetStep === crrScroll || !isStepAnimationComplete) return;

        setIsStepAnimationComplete(false);
        setIsAnimating(true);
        setScrollLocked(true);

        const isScrollingDown = targetStep > crrScroll;
        const floatTl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                setIsStepAnimationComplete(true);
                setScrollLocked(false);
            },
        });

        setCrrScroll(targetStep);

        // Faster initial movement for better responsiveness
        gsap.to(refs.tshirtRef.current, { 
            y: isScrollingDown ? -70 : 0, 
            duration: 0.3, 
            ease: 'power2.inOut' 
        });

        gsap.to(refs.processStepsRef.current, { 
            y: isScrollingDown ? 100 : 0, 
            opacity: isScrollingDown ? 0 : 1, 
            duration: 0.3, 
            ease: 'power2.inOut' 
        });

        if (!isScrollingDown) {
            gsap.to(refs.buttonAnimeTwo.current, { 
                opacity: 0, 
                y: 20, 
                duration: 0.2, 
                ease: 'power2.inOut' 
            });
        }

        floatTl
            .to('.date span', { 
                yPercent: 100, 
                duration: 0.2, 
                ease: 'power2.inOut' 
            })
            .to(['.heading span', '.text-anime span', '.sub-blog span', '.additional-text span'], {
                yPercent: isScrollingDown ? -100 : 100,
                duration: 0.25,
                opacity: 0.3,
                ease: 'power2.inOut',
                stagger: 0.003,
                onComplete: () => setMonitor(Math.random())
            }, '<')
            .set('.date span', { yPercent: -100 })
            .to('.date span', { 
                yPercent: 0, 
                duration: 0.2, 
                ease: 'power2.out' 
            }, '<+0.02');
    };

    useEffect(() => {
        if (!isIntroCompleted) return;

        let ticking = false;
        const scrollThrottle = 150; // Increased throttle time for better control
        const maxScrollSpeed = 30; // Reduced max scroll speed for smoother transitions
        let scrollTimeout;

        const handleScroll = (e) => {
            const currentTime = Date.now();
            
            // Prevent scroll if animation is running
            if (scrollLocked || !isStepAnimationComplete) {
                e.preventDefault();
                return false;
            }

            // Clear any existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Throttle scroll events more aggressively
            if (currentTime - lastScrollTime < scrollThrottle) {
                e.preventDefault();
                return false;
            }

            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const viewportHeight = window.innerHeight;

                    if (refs.cardContainerRef.current) {
                        gsap.set(refs.cardContainerRef.current, {
                            position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 10
                        });
                    }

                    // Only handle scroll within the animation section
                    if (scrollTop >= 0 && scrollTop < viewportHeight * 2) {
                        const scrollProgress = scrollTop / viewportHeight;
                        const targetStep = scrollProgress >= 0.5 ? 1 : 0;

                        if (targetStep !== crrScroll && isStepAnimationComplete && !scrollLocked) {
                            setLastScrollTime(currentTime);
                            
                            // Add a small delay before executing the animation
                            scrollTimeout = setTimeout(() => {
                                executeStepAnimation(targetStep);
                            }, 50);
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleWheel = (e) => {
            const currentTime = Date.now();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            
            // Only control wheel events within the animation section
            if (scrollTop >= 0 && scrollTop < viewportHeight * 2) {
                // Prevent fast scrolling by limiting wheel delta
                if (Math.abs(e.deltaY) > maxScrollSpeed) {
                    e.preventDefault();
                    return false;
                }
                
                if (scrollLocked || !isStepAnimationComplete || (currentTime - lastScrollTime < scrollThrottle)) {
                    e.preventDefault();
                    return false;
                }
            }
        };

        const handleTouchMove = (e) => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            
            // Only control touch events within the animation section
            if (scrollTop >= 0 && scrollTop < viewportHeight * 2) {
                if (scrollLocked || !isStepAnimationComplete) {
                    e.preventDefault();
                    return false;
                }
            }
        };

        const handleKeyDown = (e) => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            
            // Only control keyboard events within the animation section
            if (scrollTop >= 0 && scrollTop < viewportHeight * 2) {
                if ((scrollLocked || !isStepAnimationComplete) && 
                    (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === ' ')) {
                    e.preventDefault();
                    return false;
                }
            }
        };

        // Add scroll behavior control
        const preventFastScroll = (e) => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            
            // Within animation section, control scroll behavior
            if (scrollTop >= 0 && scrollTop < viewportHeight * 2) {
                if (scrollLocked || isAnimating) {
                    window.scrollTo(0, scrollTop);
                    e.preventDefault();
                    return false;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: false });
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('scrollend', preventFastScroll, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scrollend', preventFastScroll);
        };
    }, [isAnimating, crrScroll, isIntroCompleted, isStepAnimationComplete, scrollLocked, lastScrollTime]);

    useEffect(() => {
        if (!isIntroCompleted || monitor === 0) return;

        refs.headings.current.textContent = data[crrScroll].heading;
        [refs.textAnimeOne, refs.textAnimeTwo, refs.textAnimeThree, refs.subBlogAnime, refs.additionalTextRef].forEach((ref, i) => {
            if (ref.current) {
                const keys = ['heading', 'subHeading', 'thirdHeading', 'description', 'additionalText'];
                ref.current.textContent = data[crrScroll][keys[i]] || '';
            }
        });

        splitAllHeadings();

        const isScrollingUp = prevCrrScroll > crrScroll;
        const animateDirection = isScrollingUp ? -100 : 100;

        gsap.killTweensOf(['.heading span', '.text-anime span', '.sub-blog span', '.additional-text span']);
        gsap.fromTo(['.heading span', '.text-anime span', '.sub-blog span', '.additional-text span'],
            { yPercent: animateDirection, opacity: 0 },
            { yPercent: 0, duration: 0.3, opacity: 1, ease: 'power3.out', stagger: 0.005 }
        );

        const step2Elements = [refs.categoryRef, refs.productNameRef, refs.designTagRef, refs.priceRef, refs.threeImagesRef, refs.buttonAnimeTwo];
        gsap.killTweensOf(step2Elements.map(ref => ref.current));

        if (crrScroll === 1) {
            const tl = gsap.timeline({ delay: 0.15 });
            step2Elements.forEach((ref, i) => {
                if (ref.current) {
                    const delay = i < 4 ? `-=${0.15 - i * 0.03}` : '-=0.15';
                    tl.fromTo(ref.current, 
                        { opacity: 0, y: i === 4 ? 30 : 20 }, 
                        { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, 
                        i === 0 ? undefined : delay
                    );
                }
            });
        } else {
            gsap.to(step2Elements.map(ref => ref.current).filter(Boolean), {
                opacity: 0, y: 20, duration: 0.2, ease: 'power3.inOut', stagger: 0.005
            });
        }

        refs.subHeadingRef.current.textContent = data[crrScroll].subHeading;
        setPrevCrrScroll(crrScroll);
    }, [monitor, isIntroCompleted]);

    return (
        <>
            <div ref={refs.wrapperRef} className="w-full relative" style={{ height: '200vh' }}>
                <main ref={refs.cardContainerRef} className="w-full h-screen overflow-hidden sticky top-0 z-10">
                    <div className='card-section w-full h-screen relative overflow-hidden'>
                        <div className="img-con overflow-visible pointer-events-none h-0 w-0 fixed opacity-0 -z-10">
                            <p className='date overflow-hidden text-sm'>
                                <span ref={refs.subHeadingRef} className='block w-20 text-base text-center'>CUSTOM STREETWEAR.</span>
                            </p>
                        </div>

                        <div className="title-con fixed opacity-0 -z-10 overflow-hidden">
                            <h1 ref={refs.headings} className='heading whitespace-nowrap leading-none overflow-hidden text-[22vw] uppercase font-thin text-[#f33a3a] flex font-bebas'>MAKE IT YOURS</h1>
                        </div>

                        <div className="absolute right-12 top-[20%] transform z-10">
                            <div ref={refs.tshirtRef} className="w-[50vw] h-[50vw] relative" style={{ willChange: 'transform' }}>
                                <Image src="/assets/T-Shirt.png" alt="T-Shirt" fill className="object-contain" />
                            </div>
                        </div>

                        <div className="flex items-center justify-start w-full h-full px-12">
                            <div className="text-left w-full">
                                <div className="h-fit overflow-hidden">
                                    <p ref={refs.textAnimeOne} className="text-anime font-bold text-sm text-white" style={{ willChange: 'transform' }}>
                                        MAKE IT YOURS
                                    </p>
                                </div>

                                <div className="h-fit overflow-hidden font-bebas">
                                    <h1 ref={refs.textAnimeTwo} className="text-anime text-9xl leading-none text-white" style={{ willChange: 'transform' }}>
                                        CUSTOM STREETWEAR.
                                    </h1>
                                </div>

                                <div className="h-fit overflow-hidden font-bebas">
                                    <h1 ref={refs.textAnimeThree} className="text-anime text-9xl leading-none text-white" style={{ willChange: 'transform' }}>
                                        YOUR WAY
                                    </h1>
                                </div>

                                <div className="h-fit overflow-hidden my-2 mb-2">
                                    <p ref={refs.subBlogAnime} className="sub-blog font-thin opacity-70 py-2 text-white text-sm max-w-2xl" style={{ willChange: 'transform' }}>
                                        Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.
                                    </p>
                                </div>

                                <div className="h-fit overflow-hidden mb-3">
                                    <div style={{ display: crrScroll === 1 ? 'block' : 'none' }}>
                                        <p ref={refs.categoryRef} className='font-bebas opacity-50 text-white' style={{ willChange: 'transform' }}>T SHIRT</p>
                                        <div className='flex gap-2 items-center'>
                                            <p ref={refs.productNameRef} className='text-lg text-white' style={{ willChange: 'transform' }}>BOOTLEG</p>
                                            <p ref={refs.designTagRef} className='px-4 text-xs py-1 bg-[#EAB6511A] text-[#EAB651]' style={{ willChange: 'transform' }}>DESIGN #2</p>
                                        </div>
                                        <p ref={refs.priceRef} className='text-lg font-bebas text-white' style={{ willChange: 'transform' }}>$ 1,250</p>
                                    </div>
                                    <div className="h-fit overflow-hidden">
                                        <p ref={refs.additionalTextRef} className="additional-text font-medium text-white text-base" style={{ willChange: 'transform' }}>
                                        </p>
                                    </div>
                                </div>

                                <div ref={refs.threeImagesRef} className="flex gap-6 mb-4" style={{ display: crrScroll === 1 ? 'flex' : 'none', willChange: 'transform' }}>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-24 h-24 relative rounded-full overflow-hidden">
                                            <Image src={`/assets/landingAnimation-${i}.png`} alt={`Design ${i}`} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-16">
                                    <button ref={refs.buttonAnime} className="bg-[#FF3A65] text-white text-lg font-medium hover:bg-[#e6335a] transition-colors px-8 py-4" style={{ display: crrScroll === 0 ? 'inline-block' : 'none' }}>
                                        SHOP OUR COLLECTION →
                                    </button>

                                    <button ref={refs.buttonAnimeTwo} className="bg-[#FF3A65] text-white text-lg font-medium hover:bg-[#e6335a] transition-colors px-8 py-4" style={{ display: crrScroll === 1 ? 'inline-block' : 'none', willChange: 'transform' }}>
                                        EXPLORE ALL DESIGNS →
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div ref={refs.processStepsRef} className="absolute bottom-0 left-0 w-full py-4 px-12 flex items-center justify-between backdrop-blur-[28px] z-60" style={{ willChange: 'transform' }}>
                            <h1 className="text-sm max-w-30 font-[300]">Pick your tee & design</h1>
                            <div className="w-41 h-8 relative">
                                <Image src="/assets/ArrowRight.svg" alt="ArrowLeft" fill className="object-cover relative" />
                            </div>
                            <h1 className="text-sm max-w-36">Our design team will get in touch with you</h1>
                            <div className="w-41 h-8 relative">
                                <Image src="/assets/ArrowRight.svg" alt="ArrowLeft" fill className="object-cover relative" />
                            </div>
                            <h1 className="text-sm max-w-30">Add your own photos/texts</h1>
                            <div className="w-41 h-8 relative">
                                <Image src="/assets/ArrowRight.svg" alt="ArrowLeft" fill className="object-cover relative" />
                            </div>
                            <h1 className="text-sm max-w-30">Delivered in 5 - 7 days</h1>
                        </div>
                    </div>
                </main>
            </div>

            <div id="our-process" className="relative">
                <OurProcess />
            </div>
            <Image ref={refs.customCursor} src="/assets/customCursor.svg" alt="custom cursor" width={24} height={24} className="customCursor fixed top-0 left-0 pointer-events-none z-90" />
        </>
    );
};

export default Landing;