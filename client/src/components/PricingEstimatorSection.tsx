import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingDown, IndianRupee, Zap, Phone } from "lucide-react";

// Pricing data for DCR systems
const pricingData: Record<string, { minPrice: number; maxPrice: number; subsidy: number }> = {
  "3-single": { minPrice: 155000, maxPrice: 199990, subsidy: 78000 },
  "3-three": { minPrice: 159990, maxPrice: 239990, subsidy: 78000 },
  "5-single": { minPrice: 209990, maxPrice: 279990, subsidy: 78000 },
  "5-three": { minPrice: 255990, maxPrice: 309990, subsidy: 78000 },
  "6-three": { minPrice: 289990, maxPrice: 359990, subsidy: 78000 },
  "8-three": { minPrice: 369990, maxPrice: 459990, subsidy: 78000 },
  "10-three": { minPrice: 449990, maxPrice: 529990, subsidy: 78000 },
};

// Valid combinations
const validCombinations: Record<string, string[]> = {
  "3": ["single", "three"],
  "5": ["single", "three"],
  "6": ["three"],
  "8": ["three"],
  "10": ["three"],
};

export default function PricingEstimatorSection() {
  const [sanctionLoad, setSanctionLoad] = useState("");
  const [phase, setPhase] = useState("");
  const [avgUnits, setAvgUnits] = useState("");
  const [avgBillAmount, setAvgBillAmount] = useState("");
  const [showEstimate, setShowEstimate] = useState(false);

  const sanctionLoadOptions = [
    { value: "3", label: "3 KW" },
    { value: "5", label: "5 KW" },
    { value: "6", label: "6 KW" },
    { value: "8", label: "8 KW" },
    { value: "10", label: "10 KW" },
  ];

  const phaseOptions = [
    { value: "single", label: "Single Phase" },
    { value: "three", label: "Three Phase" },
  ];

  // Get available phase options based on sanction load
  const getAvailablePhaseOptions = () => {
    if (!sanctionLoad) return phaseOptions;
    const validPhases = validCombinations[sanctionLoad] || [];
    return phaseOptions.filter(opt => validPhases.includes(opt.value));
  };

  // Reset phase if not valid for selected sanction load
  useEffect(() => {
    if (sanctionLoad && phase) {
      const validPhases = validCombinations[sanctionLoad] || [];
      if (!validPhases.includes(phase)) {
        setPhase("");
      }
    }
  }, [sanctionLoad]);

  // Calculations
  const units = parseFloat(avgUnits) || 0;
  const billAmount = parseFloat(avgBillAmount) || 0;
  
  const unitsPerDay = units / 30;
  const recommendedKW = Math.ceil(unitsPerDay / 4);
  const billPerUnit = units > 0 ? billAmount / units : 0;

  // Find recommended system from pricing data
  const getRecommendedSystem = () => {
    if (recommendedKW <= 3) return { kw: 3, phase: phase || "single" };
    if (recommendedKW <= 5) return { kw: 5, phase: phase || "three" };
    if (recommendedKW <= 6) return { kw: 6, phase: "three" };
    if (recommendedKW <= 8) return { kw: 8, phase: "three" };
    if (recommendedKW <= 10) return { kw: 10, phase: "three" };
    return { kw: 0, phase: "" }; // More than 10KW
  };

  const recommendedSystem = getRecommendedSystem();
  const pricingKey = `${recommendedSystem.kw}-${recommendedSystem.phase}`;
  const pricing = pricingData[pricingKey];

  const handleCalculate = () => {
    if (avgUnits && avgBillAmount) {
      setShowEstimate(true);
    }
  };

  const isFormValid = sanctionLoad && phase && avgUnits && avgBillAmount;

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-green)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            <span>Quick Quote Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Instant <span className="font-semibold text-green-600">Solar Pricing</span> Estimate
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get a detailed cost estimate and savings projection in seconds
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Input Section - Left */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-white to-green-50/30">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Your Details</h3>
                
                <div className="space-y-5">
                  {/* Sanction Load */}
                  <div>
                    <Label htmlFor="sanctionLoad" className="text-base font-medium mb-2 block">
                      Current Sanction Load
                    </Label>
                    <Select value={sanctionLoad} onValueChange={setSanctionLoad}>
                      <SelectTrigger id="sanctionLoad" className="h-12">
                        <SelectValue placeholder="Select sanction load" />
                      </SelectTrigger>
                      <SelectContent>
                        {sanctionLoadOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phase */}
                  <div>
                    <Label htmlFor="phase" className="text-base font-medium mb-2 block">
                      Phase
                    </Label>
                    <Select value={phase} onValueChange={setPhase} disabled={!sanctionLoad}>
                      <SelectTrigger id="phase" className="h-12">
                        <SelectValue placeholder={sanctionLoad ? "Select phase" : "Select sanction load first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailablePhaseOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {sanctionLoad && parseInt(sanctionLoad) >= 6 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        * {sanctionLoad} KW is only available in Three Phase
                      </p>
                    )}
                  </div>

                  {/* Avg Units */}
                  <div>
                    <Label htmlFor="avgUnits" className="text-base font-medium mb-2 block">
                      Avg Units Consumed (last 12 months per month)
                    </Label>
                    <Input
                      id="avgUnits"
                      type="number"
                      placeholder="e.g., 650"
                      value={avgUnits}
                      onChange={(e) => setAvgUnits(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {/* Avg Bill Amount */}
                  <div>
                    <Label htmlFor="avgBillAmount" className="text-base font-medium mb-2 block">
                      Avg Bill Amount (last 12 months per month) ₹
                    </Label>
                    <Input
                      id="avgBillAmount"
                      type="number"
                      placeholder="e.g., 4200"
                      value={avgBillAmount}
                      onChange={(e) => setAvgBillAmount(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    disabled={!isFormValid}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-lg font-semibold disabled:opacity-50"
                  >
                    Calculate Savings
                  </Button>
                </div>
              </div>

              {/* Results Section - Right */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-green-600 to-green-500 text-white">
                <h3 className="text-2xl font-semibold mb-6">Your Estimate</h3>
                
                {showEstimate ? (
                  recommendedKW > 10 ? (
                    // More than 10KW - Contact for best price
                    <div className="space-y-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                        <div className="text-center">
                          <Zap className="w-12 h-12 mx-auto mb-3 opacity-90" />
                          <div className="text-xl font-semibold mb-2">
                            You need a {recommendedKW} KW Solar Plant
                          </div>
                          <p className="text-sm opacity-90 mb-4">
                            For systems above 10 KW, we encourage you to contact us for the best customized pricing.
                          </p>
                          <p className="text-xs opacity-75">
                            Note: DCR subsidy is only available for up to 10 KW
                          </p>
                        </div>
                      </div>
                      <a href="tel:+919772533559" className="block">
                        <Button 
                          variant="secondary"
                          className="w-full h-12 bg-white text-green-700 hover:bg-gray-100 font-semibold"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact for Best Price
                        </Button>
                      </a>
                    </div>
                  ) : pricing ? (
                    <div className="space-y-4">
                      {/* Recommendation */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-base font-medium opacity-90 mb-1">We Recommend</div>
                            <div className="text-3xl md:text-4xl font-bold leading-tight">
                              {recommendedSystem.kw} KW {recommendedSystem.phase === "single" ? "Single" : "Three"} Phase
                            </div>
                            <div className="text-lg opacity-90 mt-2">
                              To reduce your monthly bill to <span className="font-bold text-yellow-300 bg-yellow-400/20 px-2 py-0.5 rounded">Net Zero</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monthly Savings */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <TrendingDown className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-base font-medium opacity-90 mb-1">Monthly Savings</div>
                            <div className="text-3xl md:text-4xl font-bold">₹{billAmount.toLocaleString()}</div>
                            <div className="text-base opacity-80 mt-1">₹{(billAmount * 12).toLocaleString()} per year</div>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <IndianRupee className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-base font-medium opacity-90 mb-1">Starting Price</div>
                            <div className="text-3xl md:text-4xl font-bold">₹{pricing.minPrice.toLocaleString()}</div>
                            <div className="text-base opacity-80 mt-1">
                              With ₹{pricing.subsidy.toLocaleString()} Govt. Subsidy (DCR)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        <a href="https://wa.me/919772533559?text=Hi, I'm interested in a solar installation. Based on the calculator, I need a system around the recommended capacity." target="_blank" rel="noopener noreferrer">
                          <Button 
                            variant="secondary"
                            className="w-full h-14 bg-white text-green-700 hover:bg-gray-100 font-semibold text-lg"
                          >
                            Get Detailed Proposal
                          </Button>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center opacity-75">
                        <p>Please fill in all fields to see your estimate</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[300px]">
                    <div className="text-center opacity-75">
                      <Calculator className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Fill in your details to see your personalized estimate</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>No Hidden Costs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Free Site Visit</span>
          </div>
        </div>

        {/* Subtle CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Prefer to discuss your requirements directly?
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://wa.me/919772533559?text=Hi, I'd like to discuss solar installation pricing and options" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                💬 Chat Instantly on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                📞 Call +91 97725 33559
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
