import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Battery, Zap, Shield, Sun, Moon, Power, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function HybridSolar() {
  const features = [
    {
      icon: Power,
      title: "Uninterrupted Power",
      description: "24/7 electricity supply with battery backup"
    },
    {
      icon: Battery,
      title: "Energy Storage",
      description: "Store excess solar power for nighttime use"
    },
    {
      icon: Zap,
      title: "Grid + Solar",
      description: "Use solar first, grid as backup when needed"
    },
    {
      icon: Shield,
      title: "Power Outage Protection",
      description: "Keep running even during grid failures"
    }
  ];

  const systemPackages = [
    {
      capacity: "5 kW",
      battery: "5 kWh",
      backup: "4-6 hours",
      panels: "13-14 panels",
      area: "500 sq ft",
      price: "₹4,50,000",
      ideal: "Small to medium homes"
    },
    {
      capacity: "7.5 kW",
      battery: "10 kWh",
      backup: "6-8 hours",
      panels: "19-20 panels",
      area: "750 sq ft",
      price: "₹6,75,000",
      ideal: "Medium to large homes"
    },
    {
      capacity: "10 kW",
      battery: "15 kWh",
      backup: "8-12 hours",
      panels: "25-27 panels",
      area: "1000 sq ft",
      price: "₹9,25,000",
      ideal: "Large homes & small businesses"
    }
  ];

  const advantages = [
    {
      icon: Sun,
      title: "Day Time",
      description: "Solar powers your home and charges batteries"
    },
    {
      icon: Moon,
      title: "Night Time",
      description: "Battery provides stored solar energy"
    },
    {
      icon: Battery,
      title: "Cloudy Days",
      description: "Use stored energy or draw from grid"
    },
    {
      icon: Power,
      title: "Grid Failure",
      description: "Automatic switch to battery backup"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Battery className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">Hybrid Solar Systems</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Solar + Storage for <span className="text-purple-600">Complete Energy Independence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Best of both worlds - enjoy 24/7 solar power with battery backup, 
              plus grid connection for ultimate reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Hybrid Solar?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-purple-600" />
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
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">24/7 Power Supply</h2>
          <p className="text-center text-gray-600 mb-12">Intelligent power management throughout the day</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {advantages.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-6 shadow-md h-full">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  {index < advantages.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Packages Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Hybrid Solar Packages</h2>
          <p className="text-center text-gray-600 mb-12">Complete solar + battery backup solutions</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {systemPackages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100 hover:border-purple-500 transition-all hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-purple-600 mb-1">{pkg.capacity}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{pkg.battery} Battery</div>
                  <div className="text-sm text-gray-600">{pkg.ideal}</div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Backup Duration:</span>
                    <span className="font-semibold">{pkg.backup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Solar Panels:</span>
                    <span className="font-semibold">{pkg.panels}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Roof Space:</span>
                    <span className="font-semibold">{pkg.area}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Package Price:</span>
                      <span className="text-2xl font-bold text-purple-600">{pkg.price}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Get Detailed Quote
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
          <h2 className="text-3xl font-bold text-center mb-12">Complete System Package</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "High-efficiency solar panels",
              "Hybrid solar inverter",
              "Lithium/Lead-acid battery bank",
              "Battery management system",
              "Mounting structure (7-year warranty)",
              "Complete cabling & protection",
              "Smart monitoring system",
              "Net metering support (optional)",
              "Professional installation",
              "System commissioning & training"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Hybrid vs Other Systems</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4 bg-purple-50">Hybrid</th>
                  <th className="text-center p-4">On-Grid</th>
                  <th className="text-center p-4">Off-Grid</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">24/7 Power</td>
                  <td className="text-center p-4 bg-purple-50">✅</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Grid Backup</td>
                  <td className="text-center p-4 bg-purple-50">✅</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Battery Storage</td>
                  <td className="text-center p-4 bg-purple-50">✅</td>
                  <td className="text-center p-4">❌</td>
                  <td className="text-center p-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Net Metering</td>
                  <td className="text-center p-4 bg-purple-50">✅</td>
                  <td className="text-center p-4">✅</td>
                  <td className="text-center p-4">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Investment</td>
                  <td className="text-center p-4 bg-purple-50">Medium</td>
                  <td className="text-center p-4">Low</td>
                  <td className="text-center p-4">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience True Energy Freedom
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a customized hybrid solar system designed for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I need a custom quote for hybrid solar system" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl">
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
