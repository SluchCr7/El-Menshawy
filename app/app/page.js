import Hero from "./Components/Hero";
import QuranPlayer from "./Components/QuranPlayer";
import QuranListenCTA from "./Components/QuranListenCTA";
import VideosSection from "./Components/VideosSection";
import QuotesSlider from "./Components/Quotes";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section - The First Impression */}
      <Hero />

      {/* 2. Audio Insight - Quick Listening Access */}
      <section className="relative z-10 -mt-2 md:-mt-10 mb-10 px-6">
        <QuranPlayer />
      </section>

      {/* 3. CTA Section - Direct Navigation to Mushafs */}
      <QuranListenCTA />

      {/* 4. Visual Library - rare videos */}
      <VideosSection />

      {/* 5. Legacy Quotes - Testimonials */}
      <QuotesSlider />

      {/* Decorative Ornaments between sections if needed */}
      <div className="py-20 bg-cream flex justify-center">
        <img src="/patterns/ornament-bottom.svg" className="w-64 opacity-20" alt="" />
      </div>
    </main>
  );
}
