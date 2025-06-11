"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sizes = ["S", "M", "L", "X", "XL", "XXL"];
const colors = ["#416d8a", "#418a5c", "#8a5641", "#8a4180"];

export default function ProductDetailsPage() {
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [activeTab, setActiveTab] = useState("FRONT");
  const items = Array.from({ length: 12 }, (_, i) => i + 1);
  const radius = 219;

  return (
    <div className="h-screen relative overflow-hidden w-full">
      <div className="fixed -bottom-80 -l eft-[15vw] -z-10">
        <Image
          src="/assets/leafs.svg"
          alt="landing-page-bg"
          width={900}
          height={900}
          className="object-contain z-50 h-[50vw] w-[50vw]"
        />
      </div>
      <div className="fixed -bottom-52 -right-[15vw] -z-10">
        <div className="leaf-img h-[30vw] w-[40vw]">
          <Image
            src="/assets/singleleaf.svg"
            alt="landing-page-bg"
            width={900}
            height={900}
            className="object-contain z-50 h-full w-full mix-blend-screen"
          />
        </div>
        <div className="h-[60vh] fixed top-1/2 -translate-y-1/2 -right-30 w-[60vh] rounded-full blur-[180px] bg-[#440a53] z-10"></div>
        <div className="h-[60vh] fixed top-[80%] left-1/2 -translate-x-1/2 w-[60vh] rounded-full blur-[200px] bg-[#CF2379] z-30"></div>
      </div>
      <div className="container mx-auto w-[90%] h-full flex-center relative">
        <div className="absolute top-[17vh] left-0 z-10">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image
              src="/assets/arrow-back.svg"
              alt="arrowback"
              width={51}
              height={27}
            />
            Back to all products
          </Link>
        </div>
        <div className="absolute top-[10vh]">
          <h1 className="text-[22vw] leading-[20vw] font-bebas mix-blend-overlay opacity-15 ">
            CUSTOMISE
          </h1>
        </div>
        <div className="flex items-center h-full gap-6 w-full relative">
          <div className="relative w-[24%] h-full flex justify-center items-start flex-col pt-[10vh] gap-5">
            <div className="flex flex-col items-start gap-2">
              <div className="text-xs uppercase  text-[#eab651] bg-[#EAB651]/10 px-2 py-1">
                DESIGN #2
              </div>
              <h1 className="text-[3.5vw] leading-[3vw] font-bebas">
                T-SHIRT BOOTLEG
              </h1>
              <p className="text-base">$ 1,250</p>
              <p className="text-gray-400 font-[200] text-xs">
                At The Design Shop, we craft digital experiences that don&apos;t
                just look amazing — they work beautifully. We believe in design
                that&apos;s both stunning and strategic, focused on growth and
                development.
              </p>
            </div>
            <div className="relative">
              <h3 className="text-base mb-3">COLOR</h3>
              <div className="flex items-center gap-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-[22px] h-[22px] flex-center cursor-pointer ${
                      selectedColor === color ? "bg-white" : "bg-transparent"
                    } rounded-full`}
                  >
                    <button
                      className="w-4 h-4 relative rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <h3 className="text-base mb-3">
                SIZE <span className="text-dark-pink-500">(UNISEX)</span>
              </h3>
              <div className="flex items-center gap-[10px]">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-6 h-6 flex-center text-sm uppercase px-1 transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? "bg-white text-dark-pink-500"
                        : "text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button className="min-w-[162px] bg-[#ff4d6d] text-white py-2 hover:bg-[#ff4d6d]/90 transition-colors cursor-pointer text-sm relative top-2">
              BUY NOW
            </button>
          </div>
          <div className="relative w-[60%] h-full flex justify-end items-end">
            <div className="absolute w-[100%] h-[105%] z-200 -bottom-[10vh] -left-[5vw]">
              <Image
                src="/assets/t-shirt2.png"
                alt="T-Shirt Bootleg"
                fill
                className="object-contain p-8 relative"
              />
            </div>
            <div className="w-[80%] h-[80%] relative  left-[-5vw]">
              <div className="absolute w-full h-full bottom-[-10vh] z-10">
                <Image
                  src="/assets/rectangle.png"
                  alt="rectangle"
                  fill
                  className="relative object-cover "
                />
              </div>
              <div className="flex flex-col relative gap-2 items-end justify-end h-full z-300 custom-polygon w-3/12 ml-auto mr-1 bottom-[2vh]">
                {["FRONT", "BACK", "MODEL", "SIZE CHART"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 cursor-pointer text-white w-full text-end text-sm ${
                      activeTab === tab ? "bg-[#ff4d6d] " : "bg-white/5"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed -right-[18vw] top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#200124] w-[60vh] h-[60vh] rounded-full flex-center mr-8">
          <div className="relative w-[70%] h-[70%] border-l-2 border-white/50  rounded-full flex items-center ">
            <div className="w-4 h-4 rounded-full bg-dark-pink-500 right-2 custom-shadow-2 relative"></div>
          </div>
          <ul
            className="absolute top-1/2 -translate-y-1/2 grid place-items-center "
            style={{ transform: "rotate(-90deg)" }}
          >
            {items.map((item, i) => {
              const angle = (360 / items.length) * i;
              const transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
              return (
                <li
                  key={i}
                  className={`${
                    i === 9
                      ? "w-17 h-17 border-dark-pink-500"
                      : "w-10 h-10 border-white/5"
                  } absolute bg-[#3c3841]  grid place-items-center rounded-full overflow-hidden border-3 `}
                  style={{ transform }}
                >
                  <Image
                    src={`/assets/product-1.png`}
                    alt="alt"
                    fill
                    className="rotate-90 text-white text-xs font-sans"
                  ></Image>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
