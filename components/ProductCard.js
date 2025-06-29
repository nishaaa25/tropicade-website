import Image from "next/image";

export default function ProductCard({ id, image, title, price }) {
  return (
    <div className="group relative transition-all lg:pt-[3vh] w-full h-full flex flex-col ">
      <div className="relative mb-4 rounded-lg h-[35vh] flex-shrink-0">
        <div className="">
          <Image
            src="/assets/rect.svg"
            alt="Product background rectangle"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[100%] h-[100%] relative -top-[5.5vh] ">
          <Image
            src={image || "/products/tshirt-2.png"}
            alt={`${title} product image`}
            fill 
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="relative bg-black/40 rounded-xl px-4 py-3 -top-15 backdrop-blur-md flex-1 ">
        <div className="relative">
          <h5 className="font-bebas text-[10px] sm:text-xs md:text-sm text-[#535353]">TSHIRT</h5>
          <h3 className="text-white uppercase mb-2 line-clamp-2 overflow-hidden text-xs md:text-sm lg:text-base">{title}</h3>
        </div>
        <div className="flex justify-between items-center mt-auto relative">
          <button className="text-dark-pink-500 hover:text-dark-pink-600 flex items-center gap-2 text-[10px] sm:text-xs md:text-sm ">
            BUY NOW
            <Image
              src="/assets/HandbagSimple.svg"
              alt="Shopping bag icon"
              width={20}
              height={20}
            />
          </button>{" "}
          <span className="text-white text-xs md:text-sm lg:text-base">$ {price}</span>
        </div>
      </div>
    </div>
  );
}
