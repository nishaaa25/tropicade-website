import Image from "next/image";

export default function ProductCard({ id, image, name, price }) {
  return (
    <div key={id} className="group relative transition-all pt-[3vh]">
      <div className="relative mb-4 rounded-lg h-[41vh]">
        <div className="">
          <Image
            src="/assets/rect.svg"
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[92%] h-[92%] relative -top-[7vh] left-[10px]">
          <Image
            src={image}
            alt={name}
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="relative bg-black/40 rounded-xl px-4 py-3 -top-15 backdrop-blur-md">
        <h5 className="font-bebas text-sm text-[#535353]">TSHIRT</h5>
        <h3 className="text-white mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <button className="text-dark-pink-500 hover:text-dark-pink-600 flex items-center gap-2 text-sm">
            ADD TO BAG
            <Image
              src="/assets/HandbagSimple.svg"
              alt="handbag"
              width={20}
              height={20}
            />
          </button>{" "}
          <span className="text-white">$ {price}</span>
        </div>
      </div>
    </div>
  );
}
