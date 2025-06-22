'use client';
import Image from "next/image";

export default function HistoryBackBtn({text}) {
  return (
    <button
      className="absolute top-32 left-20 right-0 flex-center gap-4 w-fit cursor-pointer z-100" 
      onClick={() => history.back()}
    >
      <Image src="/assets/arrow-back.svg" alt="about" width={50} height={50} />
      <span className="text-sm">{text}</span>
    </button>
  );
}
