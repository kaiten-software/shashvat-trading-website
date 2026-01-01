import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enquire & Pre-Check",
      icon: "📞",
      description: "We start with your electricity bill analysis and satellite imagery review",
      details: [
        "Share your monthly electricity bill (₹ amount or kWh units consumed)",
        "We estimate system size needed (typically 1 kW per 130 kWh monthly consumption)",
        "Satellite pre-check of your rooftop for preliminary feasibility",
        "Instant ballpark quote within 2 hours"
      ],
      timeline: "Day 1",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Site Survey",
      icon: "🏗️",
      description: "On-site visit to measure, assess, and document your property",
      details: [
        "Accurate roof measurements using laser distance meters",
        "Roof type check (RCC, tin shed, tiles) and structural assessment",
        "Identify obstructions: water tanks, AC units, vents, chimneys",
        "Access and safety planning for installation crew",
        "Electrical panel inspection and earthing pit verification",
        "360° site photos for design reference"
      ],
      timeline: "Day 2-3",
      color: "from-cyan-500 to-teal-500"
    },
    {
      number: "03",
      title: "Design & Quote",
      icon: "📐",
      description: "Professional 2D/3D layouts with PVsyst generation simulation",
      details: [
        "2D layout with exact panel placement and dimensions",
        "3D model showing shadows, obstructions, and final look",
        "PVsyst simulation: monthly & annual kWh generation forecast",
        "Equipment datasheets: panels, inverter, structure specifications",
        "Detailed BOQ (Bill of Quantities) with item-wise costs",
        "Payback period calculation and 25-year savings projection"
      ],
      timeline: "Day 4-6",
      color: "from-teal-500 to-green-500"
    },
    {
      number: "04",
      title: "Permits & Subsidy",
      icon: "📋",
      description: "Handle all paperwork, DISCOM approvals, and subsidy registration",
      details: [
        "DISCOM net-metering application (online portal submission)",
        "Technical feasibility approval from distribution company",
        "CEIG approval for systems above 500 kW (where applicable)",
        "Building NOC from society/owner (if rented property)",
        "PM Surya Ghar Muft Bijli subsidy registration on national portal",
        "Documentation: ID proof, address proof, electricity bill, site photos"
      ],
      timeline: "Day 7-21 (parallel with procurement)",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "05",
      title: "Procurement & Mobilization",
      icon: "📦",
      description: "Source certified equipment and prepare for installation",
      details: [
        "Procure panels, inverter, structures from authorized distributors",
        "Quality check: NABL/BIS certificates, physical inspection, RFID verification",
        "Cable, earthing materials, fasteners, and safety equipment",
        "Logistics planning: transport to site, on-site storage arrangement",
        "Crew mobilization: supervisor + 3-5 technicians + safety officer",
        "Pre-installation briefing: SOPs, PPE requirements, emergency protocols"
      ],
      timeline: "Day 7-14",
      color: "from-emerald-500 to-lime-500"
    },
    {
      number: "06",
      title: "Installation",
      icon: "⚡",
      description: "Professional on-site execution with strict safety protocols",
      details: [
        "<strong>Day 1-2:</strong> Structure mounting, earthing pit excavation, DC cabling preparation",
        "<strong>Day 2-3:</strong> Solar panel mounting, string connections, junction box installation",
        "<strong>Day 3-4:</strong> Inverter installation, AC cabling, distribution board setup",
        "<strong>Day 4-5:</strong> Lightning protection, earthing bonding, safety signage",
        "Safety measures: PPE (helmets, harnesses), edge protection, fire extinguishers",
        "Quality checks at every stage: module orientation, cable polarity, torque settings"
      ],
      timeline: "Day 15-20 (3-5 working days)",
      color: "from-amber-500 to-orange-500"
    },
    {
      number: "07",
      title: "Testing & Commissioning",
      icon: "✅",
      description: "Comprehensive system checks before grid connection",
      details: [
        "Visual inspection: panel cleanliness, cable routing, connections",
        "Electrical tests: insulation resistance (over 1 MΩ), polarity verification",
        "Inverter commissioning: MPPT calibration, grid parameter settings",
        "Anti-islanding test: inverter shuts down within 2 seconds of grid loss",
        "Loss-of-mains protection check per IEEE 1547 standards",
        "Net-meter installation by DISCOM after successful inspection",
        "First sync with grid: monitor voltage, frequency, power flow"
      ],
      timeline: "Day 21-25",
      color: "from-orange-500 to-red-500"
    },
    {
      number: "08",
      title: "Handover & Monitoring",
      icon: "📱",
      description: "System handover with remote monitoring setup and training",
      details: [
        "Remote monitoring portal setup (WiFi/4G connection to inverter)",
        "Customer demo: how to read generation data, export/import meters",
        "Mobile app credentials + web dashboard access",
        "Operation manual with do's and don'ts for system care",
        "Warranty documents: 25-year panel warranty, 5-year inverter warranty",
        "Emergency contact: 24/7 helpline for technical support",
        "Maintenance schedule: quarterly cleaning + annual inspection recommended"
      ],
      timeline: "Day 25-30",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How It Works — Step by Step
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            From enquiry to energized — complete transparency in 25-30 days
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              8-Step Solar Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional, transparent, and hassle-free process
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[39px] top-[120px] w-0.5 h-[calc(100%+3rem)] bg-gradient-to-b from-gray-300 to-gray-200 hidden md:block"></div>
                )}
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl">{step.icon}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs font-semibold">
                                ⏱️ {step.timeline}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 text-lg">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: detail }}></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              ⏱️ Total Timeline Summary
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  25-30
                </div>
                <p className="text-muted-foreground">Days from enquiry to commissioning</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  3-5
                </div>
                <p className="text-muted-foreground">Days actual on-site installation work</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  10-15
                </div>
                <p className="text-muted-foreground">Days DISCOM approval (most variable)</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <p className="text-sm text-blue-900 mb-2">
                <strong>💡 Pro Tip:</strong> Fastest projects complete in 20-22 days when:
              </p>
              <ul className="text-sm text-blue-800 space-y-1 ml-6">
                <li>• All documents submitted together (bill, ID, address proof, NOC)</li>
                <li>• Pre-existing earthing pit in good condition</li>
                <li>• Easy roof access and no structural concerns</li>
                <li>• DISCOM office processes applications quickly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Step 1 is just a message away — get preliminary estimate in 2 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want to start my solar journey. Please share preliminary estimate" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 shadow-xl px-12 py-7 text-lg">
                💬 Start Step 1 on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white bg-green-700 hover:bg-green-800 px-12 py-7 text-lg">
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
