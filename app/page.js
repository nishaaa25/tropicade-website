"use client";
import MainLandingPage from "@/components/pages/MainLandingPage";
import VerticalScale from "@/components/VerticalScale";
import Landing from "@/components/pages/Landing";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <MainLandingPage />
      {/* <Landing /> */}
    </div>
  );
}
