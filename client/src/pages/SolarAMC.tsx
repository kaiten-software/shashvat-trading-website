import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Wrench, Shield, Calendar, TrendingUp, CheckCircle2, AlertTriangle, Zap, Settings } from "lucide-react";
import { Link } from "wouter";

export default function SolarAMC() {
  const whyAMC = [
    {
      icon: TrendingUp,
      title: "Maximize Efficiency",
      description: "Regular maintenance keeps your system at peak performance"
    },
    {
      icon: Shield,
      title: "Extended Lifespan",
      description: "Proper care extends your solar system's operational life"
    },
    {
      icon: AlertTriangle,
      title: "Early Problem Detection",
      description: "Identify and fix issues before they become costly"
    },
    {
      icon: CheckCircle2,
      title: "Warranty Protection",
      description: "Maintain manufacturer warranties with documented service"
    }
  ];

  const amcPlans = [
    {
      name: "Basic AMC",
      subtitle: "Essential Maintenance",
      visits: "2 visits/year",
      price: "₹4,999",
      duration: "1 Year",
      features: [
        "2 preventive maintenance visits",
        "Panel cleaning & inspection",
        "Inverter health check",
        "Connection tightening",
        "Performance report",
        "Basic troubleshooting",
        "Email/phone support"
      ],
      recommended: false
    },
    {
      name: "Premium AMC",
      subtitle: "Comprehensive Care",
      visits: "4 visits/year",
      price: "₹8,999",
      duration: "1 Year",
      features: [
        "4 preventive maintenance visits",
        "Deep panel cleaning & inspection",
        "Complete system diagnostics",
        "Inverter firmware updates",
        "Cable & connection audit",
        "Performance optimization",
        "Priority support 24/7",
        "Free emergency callout (1/year)"
      ],
      recommended: true
    },
    {
      name: "Enterprise AMC",
      subtitle: "For Commercial Systems",
      visits: "Monthly visits",
      price: "Custom",
      duration: "1-3 Years",
      features: [
        "12+ scheduled visits per year",
        "Dedicated service engineer",
        "Real-time monitoring setup",
        "Predictive maintenance",
        "Spare parts included",
        "Insurance claim assistance",
        "24/7 priority support",
        "Unlimited emergency callouts",
        "Annual performance audit"
      ],
      recommended: false
    }
  ];

  const maintenanceIncludes = [
    {
      icon: Wrench,
      title: "Panel Cleaning",
      tasks: ["Remove dust, dirt & bird droppings", "Clean with deionized water", "Check for physical damage", "Inspect frame & mounting"]
    },
    {
      icon: Zap,
      title: "Inverter Service",
      tasks: ["Check display & indicators", "Test input/output parameters", "Clean air filters", "Verify firmware version"]
    },
    {
      icon: Settings,
      title: "System Check",
      tasks: ["Inspect all connections", "Tighten loose terminals", "Check earthing system", "Test circuit breakers"]
    },
    {
      icon: Calendar,
      title: "Performance Review",
      tasks: ["Compare generation data", "Identify efficiency drops", "Analyze weather impact", "Provide improvement suggestions"]
    }
  ];

  const problems = [
    "Low power generation?",
    "Inverter showing errors?",
    "Panel damage or shading?",
    "Connection issues?",
    "System not monitored regularly?",
    "Unsure about performance?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <Wrench className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-orange-600">Solar AMC Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Keep Your Solar System <span className="text-orange-600">Running at Peak</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Regular maintenance and monitoring to ensure maximum efficiency and long-term performance 
              of your solar investment.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Facing These Issues?</h2>
          <p className="text-center text-gray-600 mb-8">Our AMC service is the solution</p>
          <div className="grid md:grid-cols-3 gap-4">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="font-medium">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AMC Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Solar AMC is Essential</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyAMC.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AMC Plans Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your AMC Plan</h2>
          <p className="text-center text-gray-600 mb-12">Flexible maintenance plans for every need</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {amcPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg p-8 ${
                  plan.recommended 
                    ? 'border-4 border-orange-500 relative' 
                    : 'border-2 border-gray-200'
                } hover:shadow-xl transition-all`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</div>
                  <div className="text-sm text-gray-600 mb-4">{plan.subtitle}</div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">{plan.price}</div>
                  <div className="text-sm text-gray-600">{plan.duration}</div>
                  <div className="mt-3 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm inline-block">
                    {plan.visits}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact">
                  <Button 
                    className={`w-full ${
                      plan.recommended 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Subscribe Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included in Each Visit</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceIncludes.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-orange-600">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15-25%</div>
              <div className="text-sm opacity-90">Efficiency increase with regular cleaning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+ Years</div>
              <div className="text-sm opacity-90">Additional lifespan with proper maintenance</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Systems under our AMC</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Priority support for AMC customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Protect Your Solar Investment
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sign up for AMC and ensure your solar system delivers optimal performance for years
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want to subscribe to Solar AMC" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow-xl">
                💬 Chat Instantly on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 bg-white hover:bg-orange-50">
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
