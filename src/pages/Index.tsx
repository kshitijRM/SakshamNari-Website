import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemsSection from "@/components/ProblemsSection";
import ResourcesSection from "@/components/ResourcesSection";
import AIFinancialAdvisorSection from "@/components/AIFinancialAdvisorSection";
import MultilingualSupportSection from "@/components/MultilingualSupportSection";
import StoriesSection from "@/components/StoriesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemsSection />
      <ResourcesSection />
      <AIFinancialAdvisorSection />
      <MultilingualSupportSection />
      <StoriesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
