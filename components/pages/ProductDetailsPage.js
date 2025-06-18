"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailsPage({ product }) {
  const sizes = product.sizes || [];
  const colors = product.colors || [];
  const title = product.title || "Untitled Product";
  const price = product.price || 0;
  const description = product.description || "No description available.";
  const designCode = product.designCode || "DESIGN #0";
  const images = product.images || ["/assets/default.png"];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [activeTab, setActiveTab] = useState("FRONT");
  const items = Array.from({ length: 5 }, (_, i) => i + 1);
  const radius = 200;

  return (
    <div className="h-screen relative overflow-hidden w-full">
      {/* Background visuals and styling remain same */}

      <div className="container w-full h-full flex-center relative ml-[30vw]">
        <div className="absolute top-[17vh] z-10 left-0">
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

        <div className="absolute top-[10vh] left-12">
          <h1 className="text-[22vw] leading-[20vw] font-bebas opacity-2 ">
            CUSTOMISE
          </h1>
        </div>

        <div className="flex items-center h-full gap-10 w-full relative">
          {/* Left Panel */}
          <div className="relative w-[20%] h-full flex justify-center items-start flex-col pt-[10vh] gap-5">
            <div className="flex flex-col items-start gap-2">
              <div className="text-xs uppercase text-[#eab651] bg-[#EAB651]/10 px-2 py-1">
                {designCode}
              </div>
              <h1 className="text-[3.5vw] leading-[3vw] font-bebas">
                {title}
              </h1>
              <p className="text-base">${price}</p>
              <p className="text-gray-400 font-[200] text-xs">{description}</p>
            </div>

            <div className="relative">
              <h3 className="text-base mb-3">COLOR</h3>
              <div className="flex items-center gap-2">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-[22px] h-[22px] flex-center cursor-pointer ${
                      selectedColor === color ? "bg-white" : "bg-transparent"
                    } rounded-full`}
                  >
                    <button
                      className="w-4 h-4 rounded-full"
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
                {sizes.map((size, i) => (
                  <button
                    key={i}
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

          {/* Center Image */}
          <div className="relative w-[55%] h-full flex justify-end items-end">
            <div className="absolute w-[100%] h-[105%] z-200 -bottom-[10vh] -left-[5vw]">
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-contain p-8 relative"
              />
            </div>

            <div className="w-[80%] h-[80%] relative left-[-5vw]">
              <div className="absolute w-full h-full bottom-[-10vh] z-10">
                <Image
                  src="/assets/rectangle.png"
                  alt="rectangle"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 items-end justify-end h-full z-300 custom-polygon w-3/12 ml-auto mr-1 bottom-[2vh]">
                {["FRONT", "BACK", "MODEL", "SIZE CHART"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 cursor-pointer text-white w-full text-end text-sm ${
                      activeTab === tab ? "bg-[#ff4d6d]" : "bg-white/5"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Ring */}
          <div className="flex flex-col gap-4 w-[17%] h-[60vh] relative ">
            <div className="-translate-y-1/2 top-1/2 translate-x-[40%] right-1/2 relative w-100 h-100 rounded-full bg-[#200124] flex-center">
              <div className="relative w-[65%] h-[65%] border-l-2 border-white/50  rounded-full flex items-center ">
                <div className="w-4 h-4 rounded-full bg-dark-pink-500 right-2 custom-shadow-2 relative"></div>
              </div>
              <ul
                className="absolute top-1/2 -translate-y-1/2 grid place-items-center"
                style={{ transform: "rotate(-255deg)" }}
              >
                {items.map((item, i) => {
                  const angle = (185 / items.length) * i;
                  const transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
                  return (
                    <li
                      key={i}
                      className={`${
                        i === 2
                          ? "w-18 h-18 border-dark-pink-500"
                          : "w-10 h-10 border-white/5"
                      } absolute bg-[#3c3841] grid place-items-center rounded-full overflow-hidden border-3`}
                      style={{ transform }}
                    >
                      <Image
                        src={images[i % images.length] || "/assets/default.png"}
                        alt="product"
                        fill
                        className="object-cover"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
