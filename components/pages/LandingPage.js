import { useGSAP } from "@gsap/react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import splitType from "split-type";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const textAnimeOne = useRef(null);
  const textAnimeTwo = useRef(null);
  const textAnimeThree = useRef(null);
  const subBlogAnime = useRef(null);
  const buttonAnime = useRef(null);
  const textAnimeOneDiv = useRef(null);
  const textAnimeTwoDiv = useRef(null);
  const textAnimeThreeDiv = useRef(null);
  const subBlogAnimeDiv = useRef(null);
  const buttonAnimeDiv = useRef(null);
  const bottomAnime = useRef(null);

  useGSAP(() => {
    const splitTextOne = new splitType(textAnimeOne.current, { type: "words" });
    const splitTextTwo = new splitType(textAnimeTwo.current, { type: "words" });
    const splitTextThree = new splitType(textAnimeThree.current, {
      type: "words",
    });
    const splitSubBlog = new splitType(subBlogAnime.current, { type: "words" });

    const tl = gsap.timeline();
    tl.from(
      [
        splitTextOne.words,
        splitTextTwo.words,
        splitTextThree.words,
        splitSubBlog.lines,
        buttonAnime.current,
      ],
      {
        y: 600,
        duration: 3,
        opacity: 0,
        ease: "expo.inOut",
        stagger: 0.1,
      },
      "he"
    );

    tl.from(
      [
        textAnimeOneDiv.current,
        textAnimeTwoDiv.current,
        textAnimeThreeDiv.current,
        subBlogAnimeDiv.current,
        buttonAnimeDiv.current,
      ],
      {
        y: 100,
        duration: 3,
        opacity: 0,
        ease: "expo.inOut",
        stagger: 0.1,
      },
      "he"
    );

    gsap.to(bottomAnime.current, {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: bottomAnime.current,
        start: "top 91%",
        end: "+=5%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      ease: "power2.inOut",
      immediateRender: false,
    });
  });

  return (
    <div className="w-full relative h-screen px-16 pt-[17vh]">
      <div ref={textAnimeOneDiv} className="h-fit overflow-hidden ml-4">
        <p ref={textAnimeOne} className="font-bold leading-4">
          MAKE IT YOURS
        </p>
      </div>
      <div ref={textAnimeTwoDiv} className="h-fit overflow-hidden font-bebas">
        <h1
          ref={textAnimeTwo}
          className="text-[9vw] leading-[8.5vw] text-white whitespace-nowrap"
        >
          CUSTOM STREETWEAR.
        </h1>
      </div>
      <div ref={textAnimeThreeDiv} className="h-fit overflow-hidden font-bebas">
        <h1
          ref={textAnimeThree}
          className="text-[9vw] leading-[9vw] text-white"
        >
          YOUR WAY
        </h1>
      </div>
      <div ref={subBlogAnimeDiv} className="h-fit overflow-hidden my-2">
        <p ref={subBlogAnime} className="font-thin w-[40%] opacity-50 py-4">
          Bring your memories, faces, and moments to life — right on your tee.
          At Tropicade, we blend bold street vibes with personal stories.
        </p>
      </div>

      <div ref={buttonAnimeDiv}>
        <Link href="/products">
          <button
            ref={buttonAnime}
            className="bg-[#FF3A65] px-2 flex-center gap-2 py-1"
          >
            <p className="px-3">SHOP OUR COLLECTION</p>
            <Image
              src="/assets/ArrowUpRight.svg"
              alt="ButtonArrow"
              width={40}
              height={40}
            />
          </button>
        </Link>
      </div>

      <div
        ref={bottomAnime}
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
  );
};

export default LandingPage;
