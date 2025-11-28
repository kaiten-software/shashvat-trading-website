import SolarNavigation from "@/components/SolarNavigation";
import SolarHeroSection from "@/components/SolarHeroSection";
import AboutCompanySection from "@/components/AboutCompanySection";
import TrustSection from "@/components/TrustSection";
import EPCProcessSection from "@/components/EPCProcessSection";
import SolutionsSection from "@/components/SolutionsSection";
import PricingEstimatorSection from "@/components/PricingEstimatorSection";
import BenefitsSection from "@/components/BenefitsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrandsSection from "@/components/BrandsSection";
import FAQSection from "@/components/FAQSection";
import SolarContactSection from "@/components/SolarContactSection";
import SolarFooter from "@/components/SolarFooter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      <SolarHeroSection />
      <TrustSection />
      <AboutCompanySection />
      <EPCProcessSection />
      <SolutionsSection />
      <PricingEstimatorSection />
      <BenefitsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <BrandsSection />
      <FAQSection />
      <SolarContactSection />
      <SolarFooter />
    </div>
  );
}
