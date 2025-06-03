import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full relative">
      <div className="w-[95vw] relative flex-between mx-auto pt-6">
        <div className="w-37 h-12 relative">
          <Image
            src="/assets/main-logo.svg"
            alt="main-logo"
            fill
            className="object-contain relative"
          />
        </div>
        <ul className="flex-center gap-12">
          <li className="text-base">
            <Link href="/">MEN</Link>
          </li>
          <li className="text-base">
            <Link href="/">WOMEN</Link>
          </li>
          <li className="text-base">
            <Link href="/">DESIGN METHODOLOGY</Link>
          </li>
        </ul>
        <div className="flex-center gap-7">
          <div className="relative">
            <Image
              src="/assets/MagnifyingGlass.svg"
              alt="search"
              width={32}
              height={32}
            />
          </div>
          <div className="relative">
            <Image
              src="/assets/ShoppingBag.svg"
              alt="search"
              width={32}
              height={32}
            />
          </div>
          <div className="relative">
            <Image
              src="/assets/SquaresFour.svg"
              alt="search"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
