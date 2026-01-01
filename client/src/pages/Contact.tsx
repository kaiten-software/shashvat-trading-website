import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import SolarContactSection from "@/components/SolarContactSection";
import IndustrialBanner from "@/components/IndustrialBanner";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      <div className="pt-20">
        <IndustrialBanner />
        <SolarContactSection />
      </div>
      <SolarFooter />
    </div>
  );
}
