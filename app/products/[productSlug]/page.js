"use client";
import HistoryBackBtn from "@/components/HistoryBackBtn";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCart } from "@/components/Hooks/CartContext";
import { useRouter } from "next/navigation";
import Background from "@/components/Background";
import Loader from "@/components/Loader";
import TshirtFadeReveal from "@/components/pages/tshirtFadeReveal";

const sizes = ["S", "M", "L", "X", "XL", "XXL"];
const colors = ["#416d8a", "#418a5c", "#8a5641", "#8a4180"];

export default function ProductDetailsPage({ params }) {
  const productSlug = React.use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [activeTab, setActiveTab] = useState("FRONT");
  const [circleRotation, setCircleRotation] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(2);
  const items = Array.from({ length: 9 }, (_, i) => i + 1);
  const radius = 200;

  const { addToCart } = useCart();
  const router = useRouter();

  // Infinite loop: allow any image to be centered, wrap around using modulo
  const handleImageClick = (clickedIndex) => {
    const anglePerPosition = 360 / items.length;
    // Calculate shortest direction to rotate (for smoothness)
    let diff = clickedIndex - activeImageIndex;
    // Handle wrapping for infinite loop
    if (diff > items.length / 2) diff -= items.length;
    if (diff < -items.length / 2) diff += items.length;
    setCircleRotation(prev => prev - diff * anglePerPosition);
    setActiveImageIndex(clickedIndex);
    setIsPlaying(!isPlaying)
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log("Fetching product with ID:", productSlug.productSlug);
        const response = await fetch(
          `/api/products/${productSlug.productSlug}`
        );
        console.log("Response status:", response.status);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Product not found");
        }
        const productData = await response.json();
        console.log("Product data:", productData);
        setProduct(productData);
        // Set initial color from product data if available
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
        // Set initial size from product data if available
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
          console.log("Initial size set to:", productData.sizes[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug.productSlug) {
      fetchProduct();
    }
  }, [productSlug.productSlug]);

  useEffect(() => {
    console.log("Selected size changed:", selectedSize);
  }, [selectedSize]);

  function handleBuyNow() {
    if (!product) return;
    addToCart({
      id: product._id,
      title: product.title,
      image: product.image || "/assets/product-1.png",
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      qty: 1,
    });
    router.push("/cart");
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden w-full">
      <Background />
      <HistoryBackBtn text="Back to all products" />
      <div className=" w-full h-full flex-center relative ml-[5vw]">
        <div className="absolute top-[10vh] left-12">
          <h1 className="text-[22vw] leading-[20vw] font-bebas opacity-2 ">
            CUSTOMISE
          </h1>
        </div>
        <div className="flex items-center h-full gap-10 w-full relative">
          <div className="relative w-[25%] h-full flex justify-center items-start flex-col pt-[10vh] gap-5">
            <div className="flex flex-col items-start gap-2">
              <div className="text-xs uppercase  text-[#eab651] bg-[#EAB651]/10 px-2 py-1">
                Design#2
              </div>
              <h1 className="text-[3.5vw] leading-[3.2vw] font-bebas">
                {product.title || "T-SHIRT BOOTLEG"}
              </h1>
              <p className="text-base">
                $ {product.price?.toLocaleString() || "1,250"}
              </p>
              <p className="text-gray-400 font-[200] text-xs pr-10">
                {product.desc ||
                  "At The Design Shop, we craft digital experiences that don't just look stunning — they work beautifully. We specialize in website and application design & development."}
              </p>
            </div>
            <div className="relative">
              <h3 className="text-base mb-3">COLOR</h3>
              <div className="flex items-center gap-2">
                {(product.colors && product.colors.length > 0
                  ? product.colors
                  : colors
                ).map((color) => (
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
                {(product.sizes && product.sizes.length > 0
                  ? product.sizes
                  : sizes
                ).map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      console.log("Selected size:", size);
                    }}
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
            <button
              className="min-w-[162px] bg-[#ff4d6d] text-white py-2 hover:bg-[#ff4d6d]/90 transition-colors cursor-pointer text-sm relative top-2"
              onClick={handleBuyNow}
            >
              BUY NOW
            </button>
          </div>
          <div className="relative w-[52%] h-full flex justify-end items-end">
          <div className="absolute w-[100%] h-[105%] z-200 -bottom-[12vh] -left-[5vw]">
              <TshirtFadeReveal isPlaying={isPlaying} />
            </div> 
            <div className="w-[80%] h-[80%] relative  left-[-3vw]">
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
          <div className="flex flex-col gap-4 w-[24%] h-[60vh] relative">
            <div className="-translate-y-1/2 top-1/2 -translate-x-1/4 left-1/2 relative w-100 h-100 rounded-full bg-[#200124] flex-center">
              <div className="relative w-[65%] h-[65%] border-l-2 border-white/50  rounded-full flex items-center ">
                <div className="w-4 h-4 rounded-full bg-dark-pink-500 right-2 custom-shadow-2 relative"></div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 flex-center rotate-100">
                <ul
                  className="relative  grid place-items-center transition-transform duration-500 ease-in-out"
                  style={{ transform: `rotate(${circleRotation}deg)` }}
                >
                  {items.map((item, i) => {
                    const angle = (360 / items.length) * i;
                    const liTransform = `rotate(${angle}deg) translate(${radius}px)`;
                    const imgTransform = `rotate(${-angle}deg)`;
                    const isActive = i === activeImageIndex;
                    return (
                      <li
                        key={i}
                        onClick={() => handleImageClick(i)}
                        className={`${
                          isActive
                            ? "w-18 h-18 border-dark-pink-500"
                            : "w-10 h-10 border-white/5"
                        } absolute bg-[#3c3841] grid place-items-center rounded-full overflow-hidden border-3 cursor-pointer transition-all duration-300 hover:scale-110`}
                        style={{ transform: liTransform }}
                      > 
                        <Image
                          src={`/assets/product-1.png`}
                          alt={`Product view ${i + 1}`}
                          fill
                          className="object-cover"
                          style={{ transform: imgTransform }}
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
    </div>
  );
}
