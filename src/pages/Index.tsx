import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import SwipePreview from "@/components/SwipePreview";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AdBanner slot="home-top" size="leaderboard" className="py-6" />
      <HowItWorks />
      <AdBanner slot="home-mid" size="medium" className="py-8" />
      <SwipePreview />
      <AdBanner slot="home-bottom" size="slim" className="py-6" />
      <Footer />
    </div>
  );
};

export default Index;
