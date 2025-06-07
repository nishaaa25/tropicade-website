import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex-center fixed py-4  z-60 backdrop-blur-sm">
      <div className="w-[95vw] flex-between mx-auto relative">
        <div className="w-37 h-12 relative">
          <Image
            src="/assets/main-logo.svg"
            alt="main-logo"
            fill
            className="object-contain relative"
          />
        </div>
        <ul className="flex-center gap-12">
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
        <div className="flex-center gap-7">
          <div className="relative">
            <Image
              src="/assets/MagnifyingGlass.svg"
              alt="search"
              width={28}
              height={28}
            />
          </div>
          <div className="relative">
            <Image
              src="/assets/ShoppingBag.svg"
              alt="search"
              width={28}
              height={28}
            />
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
