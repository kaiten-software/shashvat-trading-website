import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Home, Shield, TrendingDown, Battery, Sun, Zap } from "lucide-react";
import { Link } from "wouter";

export default function ResidentialSolar() {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Reduce Electricity Bills",
      description: "Save up to 90% on your monthly electricity costs with our efficient solar systems"
    },
    {
      icon: Shield,
      title: "7-Year Mounting Warranty",
      description: "Industry-leading warranty coverage for complete peace of mind"
    },
    {
      icon: Battery,
      title: "Net Metering Support",
      description: "Sell excess power back to the grid and earn credits"
    },
    {
      icon: Sun,
      title: "Government Subsidy",
      description: "Get up to ₹78,000 subsidy in Rajasthan for residential installations"
    }
  ];

  const packages = [
    {
      capacity: "3 kW",
      units: "300-400 units/month",
      area: "300-400 sq ft",
      price: "₹1,80,000",
      subsidy: "₹78,000",
      finalPrice: "₹1,02,000",
      ideal: "Small homes, 2-3 BHK"
    },
    {
      capacity: "5 kW",
      units: "500-700 units/month",
      area: "500-600 sq ft",
      price: "₹2,75,000",
      subsidy: "₹78,000",
      finalPrice: "₹1,97,000",
      ideal: "Medium homes, 3-4 BHK"
    },
    {
      capacity: "10 kW",
      units: "1000-1400 units/month",
      area: "1000-1200 sq ft",
      price: "₹5,25,000",
      subsidy: "₹78,000",
      finalPrice: "₹4,47,000",
      ideal: "Large homes, villas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Home className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Residential Solar Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Power Your Home with <span className="text-green-600">Clean Energy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Install rooftop solar and enjoy lifetime savings on electricity bills. 
              Get government subsidy up to ₹78,000 in Rajasthan.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Residential Solar?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Residential Solar Packages</h2>
          <p className="text-center text-gray-600 mb-12">Choose the perfect system size for your home</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-100 hover:border-green-500 transition-all hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">{pkg.capacity}</div>
                  <div className="text-sm text-gray-600">{pkg.ideal}</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Monthly Generation:</span>
                    <span className="font-semibold">{pkg.units}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Roof Space Needed:</span>
                    <span className="font-semibold">{pkg.area}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">System Cost:</span>
                      <span className="line-through text-gray-400">{pkg.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-green-600">Govt. Subsidy:</span>
                      <span className="text-green-600 font-semibold">- {pkg.subsidy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Final Cost:</span>
                      <span className="text-2xl font-bold text-green-600">{pkg.finalPrice}</span>
                    </div>
                  </div>
                </div>
                
                <Link href="/contact">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Get Free Quote
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Installation Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Site Survey", desc: "Free evaluation of your roof and energy needs" },
              { step: "2", title: "Design & Approval", desc: "Custom system design and subsidy documentation" },
              { step: "3", title: "Installation", desc: "Professional installation in 2-3 days" },
              { step: "4", title: "Activation", desc: "Net metering setup and system commissioning" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Go Solar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free site survey and personalized solar proposal for your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want to schedule a free solar survey" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 shadow-xl">
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
