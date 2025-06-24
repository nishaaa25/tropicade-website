"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        gsap.to(navRef.current, {
          y: -100,
          duration: 2,
          ease: "power2.out"
        });
      } else {
        gsap.to(navRef.current, {
          y: 0,
          duration: 2,
          ease: "power2.out"
        });
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="w-full flex-center fixed py-4 z-60 backdrop-blur-sm">
      <div className="w-[95vw] flex-between mx-auto relative">
        <Link href="/" className="w-37 h-12 relative z-80" >
          <Image
            src="/assets/main-logo.svg"
            alt="main-logo"
            fill
            className="object-contain relative"
          />
        </Link>
        <ul className="flex-center gap-12 relative z-80">
          <li className="text-sm">
            <Link href="/">MEN</Link>
          </li>
          <li className="text-sm">
            <Link href="/">WOMEN</Link>
          </li>
          <li className="text-sm">
            <Link href="/">DESIGN METHODOLOGY</Link>
          </li>
        </ul>
        <div className="flex-center gap-7 relative z-80">
          <div className="relative">
            <Image
              src="/assets/MagnifyingGlass.svg"
              alt="search"
              width={28}
              height={28}
            />
          </div>
          <div className="relative">
            <Link href="/cart">
            <Image
              src="/assets/ShoppingBag.svg"
              alt="search"
              width={28}
                height={28}
              />
            </Link>
          </div>
          <div className="relative">
            <Image
              src="/assets/menu.svg"
              alt="search"
              width={21}
              height={21}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
