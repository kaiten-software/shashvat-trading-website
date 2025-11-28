import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import AboutCompanySection from "@/components/AboutCompanySection";
import TrustSection from "@/components/TrustSection";
import EPCProcessSection from "@/components/EPCProcessSection";
import SolarContactSection from "@/components/SolarContactSection";

export default function About() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      <AboutCompanySection />
      <TrustSection />
      <EPCProcessSection />
      <SolarContactSection />
      <SolarFooter />
    </div>
  );
}
