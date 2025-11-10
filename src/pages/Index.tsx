import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import SwipePreview from "@/components/SwipePreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <SwipePreview />
      <Footer />
    </div>
  );
};

export default Index;
