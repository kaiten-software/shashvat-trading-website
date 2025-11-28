import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import SolarContactSection from "@/components/SolarContactSection";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      <div className="pt-20">
        <SolarContactSection />
      </div>
      <SolarFooter />
    </div>
  );
}
