import Image from "next/image"

import LandingPageImageOne from "@/public/assets/landingAnimation-1.png"
import LandingPageImageTwo from "@/public/assets/landingAnimation-2.png"
import LandingPageImageThree from "@/public/assets/landingAnimation-3.png"

const LandingPageAnimated = () => {
    return (
        <div className="h-screen w-full relative">
            <div className="absolute top-[45%] -translate-y-1/2">
                <p className="px-6 py-2 relative flex w-fit my-4 left-14 bg-[#FF3A651A] items-center gap-4">
                    <Image src="/assets/HeartStraight.svg" alt="ArrowRight" width={20} height={20} />
                    <span>MOST LIKED DESIGNS</span>
                </p>
                <h1 className="text-8xl font-bold text-white px-12">BEST SELLERS</h1>
                <p className="text-white px-12 flex flex-col relative left-1">
                    <span className="opacity-40">T SHIRT</span>
                    <span className="flex gap-2 items-center">
                        <span className="text-xl">BOOTLEG</span>
                        <span className="bg-[#EAB6511A] text-[#EAB651] px-4 py-1 text-sm">DESIGN #2</span>
                    </span>
                    <span className="text-xl">$1250</span>
                </p>
                <div className="flex gap-4 px-12 py-8">
                    <Image src={LandingPageImageOne} alt="LandingPageImageOne" className="rounded-full" width={100} height={100} />
                    <Image src={LandingPageImageTwo} alt="LandingPageImageTwo" className="rounded-full" width={100} height={100} />
                    <Image src={LandingPageImageThree} alt="LandingPageImageThree" className="rounded-full" width={100} height={100} />
                </div>
                <button className="bg-[#FF3A65] px-6 py-4 flex items-center gap-2 relative left-12">
                    <p className="px-3">EXPLORE ALL DESIGNS</p>
                    <Image src="/assets/ArrowLeft.svg" alt="ButtonArrow" width={60} height={60} />
                </button>
            </div>
        </div>
    )
}

export default LandingPageAnimated
