"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = ["All", "Bootleg", "Only You", "Eras Tour"];

const products = [
  {
    id: 1,
    name: "BOOTLEG",
    price: 990,
    image: "/assets/product-1.png",
    category: "Bootleg",
  },
  {
    id: 2,
    name: "BOOTLEG",
    price: 990,
    image: "/assets/product-2.png",
    category: "Bootleg",
  },
  {
    id: 3,
    name: "BOOTLEG",
    price: 990,
    image: "/assets/product-3.png",
    category: "Bootleg",
  },
  // Add more products as needed
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#1a0b2e]">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/" className="flex items-center text-white mb-8 hover:text-dark-pink-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home page
        </Link>

        {/* Category tabs */}
        <div className="flex gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === category 
                  ? 'bg-dark-pink-500 text-white' 
                  : 'bg-transparent text-white hover:bg-dark-pink-500/10'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 pl-10 bg-white/5 backdrop-blur-sm rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-dark-pink-500"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-white font-medium mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-white">$ {product.price}</span>
                <button className="text-dark-pink-500 hover:text-dark-pink-600 flex items-center gap-2">
                  ADD TO BAG
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 