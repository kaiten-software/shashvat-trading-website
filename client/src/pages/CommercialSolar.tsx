import { useEffect, useState } from "react";
import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Building2 } from "lucide-react";

export default function CommercialSolar() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.open("https://www.suryantraenergy.com", "_blank");
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col">
      <SolarNavigation />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-amber-100 rounded-full">
            <Building2 className="w-6 h-6 text-amber-600" />
            <span className="text-lg font-semibold text-amber-600">Commercial Solar Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Parent Company Takes Care of This
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            For commercial and large-scale solar projects, our parent company 
            <span className="font-semibold text-amber-600"> Suryantra Energy</span> specializes 
            in delivering enterprise-grade solar solutions.
          </p>

          <div className="mb-12">
            <div className="text-6xl font-bold text-amber-600 mb-4">{countdown}</div>
            <p className="text-lg text-gray-600">Redirecting you to Suryantra Energy...</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-600"></div>
            <p className="text-sm text-gray-500">
              If you're not redirected automatically, 
              <a 
                href="https://www.suryantraenergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-semibold ml-1"
              >
                click here
              </a>
            </p>
          </div>
        </div>
      </div>

      <SolarFooter />
    </div>
  );
}
