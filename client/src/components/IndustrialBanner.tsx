import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IndustrialBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-6 border-y border-orange-700">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
              Looking for Industrial & Commercial Solar Solutions?
            </h3>
            <p className="text-orange-50 text-sm md:text-base">
              Visit our sister company for large-scale solar installations
            </p>
          </div>
          <a 
            href="https://suryantraenergy.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-lg h-12 px-8"
            >
              Visit Suryantra Energy
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
