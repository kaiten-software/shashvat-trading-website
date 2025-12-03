import { useEffect, useState } from "react";
import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Factory } from "lucide-react";

export default function IndustrialSolar() {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <SolarNavigation />
      
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-blue-100 rounded-full">
            <Factory className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">Industrial Solar Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Parent Company Takes Care of This
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            For industrial and mega-scale solar projects, our parent company 
            <span className="font-semibold text-blue-600"> Suryantra Energy</span> provides 
            comprehensive solar solutions for manufacturing facilities and industrial complexes.
          </p>

          <div className="mb-12">
            <div className="text-6xl font-bold text-blue-600 mb-4">{countdown}</div>
            <p className="text-lg text-gray-600">Redirecting you to Suryantra Energy...</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
            <p className="text-sm text-gray-500">
              If you're not redirected automatically, 
              <a 
                href="https://www.suryantraenergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold ml-1"
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
