import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import SolutionsSection from "@/components/SolutionsSection";
import PricingEstimatorSection from "@/components/PricingEstimatorSection";
import BenefitsSection from "@/components/BenefitsSection";
import SolarContactSection from "@/components/SolarContactSection";

export default function Products() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      <div className="pt-20"></div>
      <SolutionsSection />
      <PricingEstimatorSection />
      <BenefitsSection />
      <SolarContactSection />
      <SolarFooter />
    </div>
  );
}
