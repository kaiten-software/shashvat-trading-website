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
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-green-50/30 to-amber-50/20">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            <span className="text-foreground">Solar </span>
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent font-semibold">Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Complete solar EPC services for residential, commercial, and industrial needs
          </p>
        </div>
      </section>

      <SolutionsSection />
      <PricingEstimatorSection />
      <BenefitsSection />
      <SolarContactSection />
      <SolarFooter />
    </div>
  );
}
