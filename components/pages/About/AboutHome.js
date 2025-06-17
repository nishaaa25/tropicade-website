import Image from "next/image"

const AboutHome = () => {
  return (
    <div className="h-screen w-full relative">
      <div>
        <h1 className="font-bebas absolute top-48 left-20 text-8xl">custom t-shirts that combine</h1>
        <h1 className="font-bebas absolute top-72 right-20 text-8xl">quality, creativity, & personality.</h1>
      </div>
      <div className="flex-center gap-10 absolute bottom-20 left-20 right-20">
        <p className="w-1/2 font-extralight flex flex-col gap-4 text-sm">
          <span>
            was born in 2024 with a clear vision: to create custom t-shirts that
            combine quality, creativity, and personality. After in depth market research
            and a close look at the competition, we realized one thing: most custom
            apparel out there lacks originality and attention to detail.
            We knew we could do better.
          </span>

          <span>
            We&apos;re a small team based in Tallinn, Estonia:
            a manager handling production and customer care, two dedicated designers who work one-on-one with clients to bring their ideas to life, and a creative agency managing our marketing and socials.
          </span>
        </p>
        <div className="w-1/2 h-[25vh] relative">
          <Image src="/assets/about-landing.png" alt="about" fill className="object-cover" />
        </div>
      </div>
      <div className="absolute top-32 left-20 right-0 flex-center gap-4 w-fit">
        <Image src="/assets/arrow-back.svg" alt="about" width={50} height={50} />
        <span className="text-sm">Back</span>
      </div>
    </div>
  )
}

export default AboutHome
