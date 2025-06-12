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

    const data = [
        {
            "imgs": [
                "https://images.prismic.io/cusp/43da11bd-03f5-426f-804b-c79112adf8a3_sprout.jpg?auto=compress,format",
                "https://images.prismic.io/cusp/48913ed9-381d-4479-b04a-5237fe136c15_sprout-l.jpg?auto=compress,format",
                "https://images.prismic.io/cusp/8dbf3f4c-f6ac-4072-9b4e-b4297a29c711_sprout-r.jpg?auto=compress,format"
            ],
            "heading": "MAKE IT YOURS",
            "subHeading": "CUSTOM STREETWEAR.",
            "thirdHeading": "YOUR WAY",
            "description": "Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.",
            "buttonText": "SHOP OUR COLLECTION"
        },
        {
            "imgs": [
                "https://images.prismic.io/cusp/ca9636a5-0dec-45e7-ad5a-d32bb15ac63f_factory_preview_main.jpg?auto=compress,format",
                "https://images.prismic.io/cusp/1b58ec60-cc78-443c-9ea0-3b6622d20b60_factory_preview_2.jpg?auto=compress,format",
                "https://images.prismic.io/cusp/b34eee83-cf04-49b5-a714-a044af9aea20_factory_preview_1.jpg?auto=compress,format"
            ],
            "heading": "BEST SELLERS",
            "subHeading": "MOST LIKED",
            "thirdHeading": "DESIGNS",
            "description": "Bootleg Design #2 - Our most popular streetwear design loved by thousands of customers worldwide.",
            "buttonText": "EXPLORE ALL DESIGNS",
            "price": "$1,250",
            "category": "TSHIRT"
        },
        {
            "imgs": [
                "https://images.prismic.io/cusp/6a352978-a03a-4a25-98ab-50f46a0f50a7_iStock-915736424-min.jpg?auto=compress,format",
                "https://images.prismic.io/cusp/599686f4-7005-457d-8241-be3488929964_light_0024-min.jpg?auto=compress,format",
                "https://images.prismic.io/cusp/a465858d-8638-41ed-b9e3-2f6dbbc984a5_iStock-1015958068-min.jpg?auto=compress,format"
            ],
            "heading": "PREMIUM QUALITY",
            "subHeading": "HANDCRAFTED",
            "thirdHeading": "STREETWEAR",
            "description": "Experience the perfect blend of comfort and style with our premium quality materials and expert craftsmanship.",
            "buttonText": "VIEW COLLECTION"
        }
    ];

    // Initialize heading split
    useGSAP(() => {
        splitHeading(headings.current);
        if (textAnimeOne.current) splitHeading(textAnimeOne.current);
        if (textAnimeTwo.current) splitHeading(textAnimeTwo.current);
        if (textAnimeThree.current) splitHeading(textAnimeThree.current);
        if (subBlogAnime.current) splitHeading(subBlogAnime.current);
    }, { scope: cardContainerRef.current });

    // For ScrollAnimation
    useEffect(() => {
        if (!isIntroCompleted) return;
        const handleWheel = (d) => {
            if (isAnimating) return;

            setIsAnimating(true);
            const floatTl = gsap.timeline({
                onComplete: () => setIsAnimating(false),
            });
            const { wheelDelta: wD } = d;

            if (wD > 0) {
                splitAllHeadings();
                changeCount('-');

                floatTl
                    .to('.date span', { yPercent: -100, duration: 0.3 })
                    .to(['.heading span', '.text-anime span', '.sub-blog span'], {
                        yPercent: 100,
                        duration: 0.4,
                        opacity: .3,
                        ease: 'power2.inOut',
                        stagger: 0.01,
                        onComplete: () => setMonitor(Math.random())
                    }, '<')
                    .set('.date span', { yPercent: 100 })
                    .to('.date span', {
                        yPercent: 0,
                        duration: 0.3
                    }, '<+0.05')
            } else {
                splitAllHeadings();
                changeCount('+');

                floatTl
                    .to('.date span', { yPercent: -100, duration: 0.3 })
                    .to(['.heading span', '.text-anime span', '.sub-blog span'], {
                        yPercent: -100,
                        duration: 0.4,
                        opacity: .3,
                        ease: 'power2.inOut',
                        stagger: 0.01,
                        onComplete: () => setMonitor(Math.random())
                    }, '<')
                    .set('.date span', { yPercent: 100 })
                    .to('.date span', {
                        yPercent: 0,
                        duration: 0.3
                    }, '<+0.05');
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
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
        if (buttonAnime.current) buttonAnime.current.textContent = data[crrScroll].buttonText;

        splitAllHeadings();

        const hoi = prevCrrScroll > crrScroll;
        const animateDirection = (prevCrrScroll === 2 && crrScroll === 0) || (prevCrrScroll === 0 && crrScroll === 2)
            ? (!hoi ? -100 : 100)
            : (hoi ? -100 : 100);

        gsap.from(['.heading span', '.text-anime span', '.sub-blog span'], {
            yPercent: animateDirection,
            duration: 0.4,
            opacity: 1,
            ease: 'power2.out',
            stagger: 0.01
        });

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
        setCrrScroll(prev => (option === '+' ? (prev < 2 ? ++prev : 0) : (prev > 0 ? --prev : 2)));
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

                {/* Main Content - Left Aligned */}
                <div className="flex items-center justify-start w-full h-full px-12">
                    <div className="text-left w-full">
                        <div className="h-fit overflow-hidden mb-6">
                            <p ref={textAnimeOne} className="text-anime font-bold text-lg text-white">
                                MAKE IT YOURS
                            </p>
                        </div>

                        <div className="h-fit overflow-hidden font-bebas mb-4">
                            <h1 ref={textAnimeTwo} className="text-anime text-[8vw] leading-none text-white">
                                CUSTOM STREETWEAR.
                            </h1>
                        </div>

                        <div className="h-fit overflow-hidden font-bebas mb-8">
                            <h1 ref={textAnimeThree} className="text-anime text-[8vw] leading-none text-white">
                                YOUR WAY
                            </h1>
                        </div>

                        <div className="h-fit overflow-hidden my-2 mb-10">
                            <p ref={subBlogAnime} className="sub-blog font-thin opacity-70 py-2 text-white text-lg max-w-2xl">
                                Bring your memories, faces, and moments to life — right on your tee. At Tropicade, we blend bold street vibes with personal stories.
                            </p>
                        </div>

                        <div className="mb-12">
                            <button ref={buttonAnime} className="bg-[#FF3A65] px-8 py-4 text-white text-lg font-medium hover:bg-[#e6335a] transition-colors">
                                SHOP OUR COLLECTION →
                            </button>
                        </div>

                        {/* Process Steps */}
                        <div

                            className=" py-4 flex items-center justify-evenly w-full backdrop-blur-[28px] absolute bottom-0 left-0 z-60"
                        >
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