import Image from "next/image";
import Hero from "./Components/Hero";
import QuranPlayer from "./Components/QuranPlayer";
import QuranListenCTA from "./Components/QuranListenCTA";
import HeroSection from "./Components/HeroMensh";
import VideosSection from "./Components/VideosSection";
import QuotesSlider from "./Components/Quotes";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <QuranPlayer/>
      <Hero />
      <VideosSection />
      <QuotesSlider/>
    </>
  );
}
