import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import EPCProcessSection from "@/components/EPCProcessSection";
import BrandsSection from "@/components/BrandsSection";
import { Shield, Zap, TrendingDown, Sun, Battery, Wrench } from "lucide-react";

export default function Technology() {
  const techHighlights = [
    {
      icon: Sun,
      title: "High-Efficiency Panels",
      description: "Tier-1 monocrystalline panels with 21-22% efficiency, converting maximum sunlight into electricity.",
      features: ["Bifacial technology", "Anti-PID coating", "Low degradation rate"]
    },
    {
      icon: Zap,
      title: "Smart Inverters",
      description: "Latest generation inverters with MPPT technology for optimal power conversion and monitoring.",
      features: ["99% efficiency", "Real-time monitoring", "Remote diagnostics"]
    },
    {
      icon: Battery,
      title: "Hybrid Solutions",
      description: "Optional battery backup systems for uninterrupted power supply during outages.",
      features: ["Lithium-ion batteries", "10-15 year lifespan", "Smart charge management"]
    },
    {
      icon: Shield,
      title: "Weather Resistant",
      description: "Components designed to withstand extreme weather conditions including hailstorms and high winds.",
      features: ["IP67 rating", "Corrosion resistant", "UV protected"]
    }
  ];

  const benefits = [
    {
      title: "Clean Energy",
      icon: "🌱",
      description: "Zero emissions, zero noise. Pure clean energy from the sun."
    },
    {
      title: "Energy Independence",
      icon: "⚡",
      description: "Generate your own power. Reduce dependence on the grid."
    },
    {
      title: "Cost Savings",
      icon: "💰",
      description: "80-95% reduction in electricity bills from day one."
    },
    {
      title: "Low Maintenance",
      icon: "🔧",
      description: "Minimal upkeep. Just clean panels 2-3 times a year."
    },
    {
      title: "Long Lifespan",
      icon: "📅",
      description: "25+ years of reliable power generation guaranteed."
    },
    {
      title: "Increases Value",
      icon: "🏠",
      description: "Solar homes command premium prices in the market."
    }
  ];

  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-green-50/30 to-amber-50/20">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="inline-block px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            Technology & Innovation
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            <span className="text-foreground">Solar </span>
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent font-semibold">Technology</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Advanced engineering for maximum efficiency and reliability
          </p>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Cutting-Edge <span className="font-semibold text-green-600">Components</span>
            </h2>
            <p className="text-xl text-muted-foreground">Industry-leading technology for optimal performance</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {techHighlights.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="p-8 bg-gradient-to-br from-white to-green-50/30 rounded-2xl border border-green-100 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-2">{tech.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{tech.description}</p>
                      <ul className="space-y-2">
                        {tech.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Solar Works */}
      <section className="py-20 bg-gradient-to-br from-green-50/50 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              How <span className="font-semibold text-green-600">Solar Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">Simple science, powerful results</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-4xl">☀️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Sunlight Hits Panels</h3>
              <p className="text-muted-foreground">Photovoltaic cells absorb sunlight energy</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">2. DC Power Generated</h3>
              <p className="text-muted-foreground">Solar cells convert light into direct current electricity</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">3. Inverter Converts</h3>
              <p className="text-muted-foreground">DC power converted to AC for home use</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">4. Power Your Home</h3>
              <p className="text-muted-foreground">Clean electricity powers your appliances</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white rounded-2xl border border-green-200 text-center">
            <p className="text-lg text-muted-foreground mb-2">
              <span className="font-semibold text-green-600">Bonus:</span> Excess power goes back to the grid through net metering
            </p>
            <p className="text-sm text-muted-foreground">Your meter runs backwards, earning you credits on your electricity bill!</p>
          </div>
        </div>
      </section>

      {/* Solar Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Why Go <span className="font-semibold text-green-600">Solar</span>?
            </h2>
            <p className="text-xl text-muted-foreground">Benefits that last for decades</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-white to-green-50/30 rounded-2xl border border-green-100 hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EPCProcessSection />
      <BrandsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready for Solar Technology?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Let our experts design the perfect solar system for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I need consultation for solar technology" target="_blank" rel="noopener noreferrer">
              <button className="px-10 py-4 bg-white text-green-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-xl">
                💬 Chat Instantly on WhatsApp
              </button>
            </a>
            <a href="tel:+919772533559">
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold text-lg">
                📞 Call +91 97725 33559
              </button>
            </a>
          </div>
        </div>
      </section>

      <SolarFooter />
    </div>
  );
}
