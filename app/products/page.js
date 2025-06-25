"use client";
import Background from "@/components/Background";
import HistoryBackBtn from "@/components/HistoryBackBtn";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const categories = ["All", "Bootleg", "Only You", "Eras Tour"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
        console.log(data[0]?._id, "id");
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

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
    <div className="min-h-screen relative">
      <Background/>
      <HistoryBackBtn text="Back to home page" />
      <div className="container mx-auto w-[90%] pt-[20vh] relative">
        <div className="flex-between relative my-4">
          <div className="flex-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-7 py-2 text-sm font-medium cursor-pointer transition-all
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
          <div className="relative mb-8 flex-center bg-white/5 w-[28%] px-4 py-2">
            <Image
              src="/assets/MagnifyingGlass.svg"
              alt="search"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 pl-6 rounded-full text-white placeholder-white/50 focus:outline-none font-[300]"
            />
          </div>
        </div>
        <div className="relative gap-6 top-3">
          <h3 className="text-[3.2vw] leading-[2vw] font-bebas">
            ALL PRODUCTS
          </h3>
          <div className="grid grid-cols-5 relative top-10 gap-8 pt-[5vh]">
            {filteredProducts.map((product, index) => (
              <Link href={`/products/${product?._id}`} key={index}>
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
