import Image from "next/image"

const AboutAnimation = () => {
    return (
        <div className="h-screen w-full px-20 pt-28">
            <div className="flex justify-between items-center">
                <h1 className="font-bebas text-4xl">What sets us apart?</h1>
                <div className="h-[1px] w-[500px] bg-white"></div>
                <p className="flex flex-col gap-2 w-1/3">
                    <span className="text-sm font-light">
                        Bold, high-quality designs inspired by ‘80s-‘90s streetwear culture, printed with premium DTG technology for lasting color and detail.
                    </span>
                    <span className="text-sm font-light">
                        Whether you&apos;re looking to express yourself, surprise someone with a unique gift, or create custom tees for your crew.
                    </span>
                </p>
            </div>
            <div className="h-[70vh] flex flex-col justify-center relative">
                <h1 className="font-bebas text-8xl opacity-50">Tropicade is where your style becomes</h1>
                <h1 className="font-bebas text-8xl opacity-50">the main story</h1>
                <Image src="/assets/anchor.svg" alt="Anchor Image" width={200} height={100} className="object-cover absolute top-20 left-0" />
            </div>
        </div>
    )
}

export default AboutAnimation