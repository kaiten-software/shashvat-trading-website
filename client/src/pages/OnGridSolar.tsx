import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Grid3x3, TrendingDown, Zap, ChevronRight, Shield, BadgeCheck } from "lucide-react";
import { Link } from "wouter";

export default function OnGridSolar() {
  const features = [
    {
      icon: Zap,
      title: "Net Metering",
      description: "Export excess electricity to the grid and earn credits on your bill"
    },
    {
      icon: TrendingDown,
      title: "Lower Investment",
      description: "No battery costs - most cost-effective solar solution"
    },
    {
      icon: Grid3x3,
      title: "Grid Backup",
      description: "Use grid power when solar production is low"
    },
    {
      icon: BadgeCheck,
      title: "Proven Technology",
      description: "Reliable and widely adopted solar system type"
    }
  ];

  const systemSizes = [
    {
      capacity: "3 kW",
      panels: "8-9 panels",
      area: "300 sq ft",
      production: "12-15 units/day",
      price: "₹1,80,000",
      subsidy: "₹78,000",
      savings: "₹3,000-4,000/month"
    },
    {
      capacity: "5 kW",
      panels: "13-14 panels",
      area: "500 sq ft",
      production: "20-25 units/day",
      price: "₹2,75,000",
      subsidy: "₹78,000",
      savings: "₹5,000-6,500/month"
    },
    {
      capacity: "10 kW",
      panels: "25-27 panels",
      area: "1000 sq ft",
      production: "40-50 units/day",
      price: "₹5,25,000",
      subsidy: "₹78,000",
      savings: "₹10,000-13,000/month"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Solar Generation",
      description: "Solar panels generate DC electricity from sunlight"
    },
    {
      step: "2",
      title: "Inverter Conversion",
      description: "Inverter converts DC to AC for home use"
    },
    {
      step: "3",
      title: "Power Your Home",
      description: "Solar power runs your appliances and lights"
    },
    {
      step: "4",
      title: "Export to Grid",
      description: "Excess power exported to grid for credits"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Grid3x3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">On-Grid Solar Systems</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connect to the Grid, <span className="text-blue-600">Save More</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most popular and cost-effective solar solution. Generate your own electricity 
              and earn from excess power through net metering.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why On-Grid Solar?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How On-Grid Solar Works</h2>
          <p className="text-center text-gray-600 mb-12">Simple and efficient grid-tied system</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md h-full">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Sizes Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">On-Grid System Packages</h2>
          <p className="text-center text-gray-600 mb-12">Choose the right system size for your needs</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {systemSizes.map((system, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100 hover:border-blue-500 transition-all hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{system.capacity}</div>
                  <div className="text-sm text-gray-600">{system.panels}</div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Roof Space:</span>
                    <span className="font-semibold">{system.area}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Daily Production:</span>
                    <span className="font-semibold">{system.production}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Monthly Savings:</span>
                    <span className="font-semibold text-green-600">{system.savings}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">System Cost:</span>
                      <span className="line-through text-gray-400">{system.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-green-600">Govt. Subsidy:</span>
                      <span className="text-green-600 font-semibold">- {system.subsidy}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Quote
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "High-efficiency solar panels (Tier-1 brands)",
              "On-grid solar inverter",
              "Mounting structure (7-year warranty)",
              "DC & AC cables",
              "Junction boxes and earthing",
              "Net meter installation support",
              "DISCOM approval assistance",
              "3-year electrical warranty",
              "Professional installation",
              "System commissioning"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Saving with On-Grid Solar
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a customized on-grid solar proposal for your property
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I need consultation for on-grid solar system" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                💬 Chat Instantly on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                📞 Call +91 97725 33559
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SolarFooter />
    </div>
  );
}
