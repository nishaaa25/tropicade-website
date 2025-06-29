"use client";
import Background from "@/components/Background";
import HistoryBackBtn from "@/components/HistoryBackBtn";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const categories = ["All", "Bootleg", "Only You", "Eras Tour"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
        console.log(data[0]?._id, "id");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const title = product?.title?.toLowerCase() || "";
        const category = product?.category || "";

        const matchesCategory =
          activeCategory === "All" || category === activeCategory.toLowerCase();

        const matchesSearch = title.includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
    : [];

  return (
    <div className="min-h-screen relative w-full ">
      <Background />
      <HistoryBackBtn text="Back to home page" />
      <div className="mx-auto w-[97%] md:w-[90%] pt-[18vh] relative">
        <div className="flex-between items-center relative my-6 w-full h-full">
          <div className="flex-center gap-2 lg:gap-4 h-full relative">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 lg:px-7 py-2 text-[8px] sm:text-[10px] md:text-sm lg:text-sm font-medium cursor-pointer transition-all
                ${
                  activeCategory === category
                    ? "bg-dark-pink-500 text-white"
                    : "bg-white/5 text-white hover:bg-dark-pink-500/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative flex-center h-full bg-white/5 w-[28%] px-4 py-2">
            <div className="w-4 lg:w-5 h-4 lg:h-5 relative">
              <Image
                src="/assets/MagnifyingGlass.svg"
                alt="search"
                fill
              />
            </div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md text-[8px] sm:text-[10px] md:text-sm lg:text-sm px-2 md:px-4 pl-3 lg:pl-6 rounded-full text-white placeholder-white/50 focus:outline-none font-[300] bg-transparent"
            />
          </div>
        </div>
        <div className="relative gap-6 top-3 w-full">
          <h3 className="text-[6vw] leading-[5vw] md:text-[3.2vw] md:leading-[2vw] font-bebas">
            ALL PRODUCTS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative top-10 gap-2 sm:gap-4 md:gap-6 lg:gap-x-8 gap-y-6 pt-[3vh] lg:pt-[5vh] w-full h-full">
            {filteredProducts.map((product, index) => (
              <Link href={`/products/${product?._id}`} key={index}>
                <div className="h-[50vh]">
                  <ProductCard {...product} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
