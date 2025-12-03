import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingDown, IndianRupee, Zap } from "lucide-react";

export default function PricingEstimatorSection() {
  const [capacity, setCapacity] = useState("5");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [showEstimate, setShowEstimate] = useState(false);

  const capacityOptions = [
    { value: "1", label: "1 kW" },
    { value: "3", label: "3 kW" },
    { value: "5", label: "5 kW" },
    { value: "10", label: "10 kW" },
    { value: "15", label: "15 kW" },
    { value: "20", label: "20 kW" },
    { value: "30", label: "30 kW" }
  ];

  // Pricing calculation (approximate)
  const pricePerKw = 55000; // Average price per kW
  const estimatedCost = parseInt(capacity) * pricePerKw;
  const monthlySavings = parseInt(capacity) * 150 * 5.5; // Approx monthly savings
  const yearlyBillReduction = monthlySavings * 12;
  const roiYears = (estimatedCost / yearlyBillReduction).toFixed(1);
  const subsidyAmount = 78000; // Government subsidy in Rajasthan

  const handleCalculate = () => {
    if (name && phone && location) {
      setShowEstimate(true);
    }
  };

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

        {/* Estimator Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Input Section */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-white to-green-50/30">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Your Details</h3>
                
                <div className="space-y-5">
                  {/* System Capacity */}
                  <div>
                    <Label htmlFor="capacity" className="text-base font-medium mb-2 block">
                      System Capacity (kW)
                    </Label>
                    <Select value={capacity} onValueChange={setCapacity}>
                      <SelectTrigger id="capacity" className="h-12">
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        {capacityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-base font-medium mb-2 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location" className="text-base font-medium mb-2 block">
                      City/Location
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g., Jaipur, Rajasthan"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-lg font-semibold"
                  >
                    Calculate Savings
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-green-600 to-green-500 text-white">
                <h3 className="text-2xl font-semibold mb-6">Your Estimate</h3>
                
                {showEstimate ? (
                  <div className="space-y-6">
                    {/* Estimated Cost */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <IndianRupee className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90 mb-1">Estimated Cost</div>
                          <div className="text-3xl font-bold">₹{(estimatedCost / 100000).toFixed(2)}L</div>
                          <div className="text-xs opacity-75 mt-1">After subsidy: ₹{((estimatedCost - subsidyAmount) / 100000).toFixed(2)}L</div>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Savings */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <TrendingDown className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90 mb-1">Monthly Savings</div>
                          <div className="text-3xl font-bold">₹{monthlySavings.toLocaleString()}</div>
                          <div className="text-xs opacity-75 mt-1">₹{yearlyBillReduction.toLocaleString()} per year</div>
                        </div>
                      </div>
                    </div>

                    {/* ROI */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90 mb-1">Payback Period</div>
                          <div className="text-3xl font-bold">{roiYears} years</div>
                          <div className="text-xs opacity-75 mt-1">Then pure savings for 20+ years</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <Button 
                        variant="secondary"
                        className="w-full h-12 bg-white text-green-700 hover:bg-gray-100 font-semibold"
                      >
                        Get Detailed Proposal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center opacity-75">
                      <Calculator className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Fill in your details to see your personalized estimate</p>
                    </div>
                  </div>
                )}
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
              <a href="https://wa.me/919785277913?text=Hi, I'd like to discuss solar installation pricing and options" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                  💬 Chat Instantly on WhatsApp
                </Button>
              </a>
              <a href="tel:+919785277913">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  📞 Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
