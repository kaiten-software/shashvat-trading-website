import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Satellite, MapPin, Ruler, Camera, FileCheck, AlertTriangle } from "lucide-react";

export default function SiteSurvey() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Site Survey & Feasibility Analysis
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Accurate assessment for optimal solar system design
          </p>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Site Assessment
            </h2>
            <p className="text-xl text-muted-foreground">
              Two-stage process: Satellite pre-check + On-site physical survey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Stage 1: Satellite Pre-Check */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Satellite className="w-10 h-10 text-blue-600" />
                <h3 className="text-2xl font-bold text-foreground">Stage 1: Satellite Pre-Check</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Shadow Analysis:</strong> Identify nearby buildings, trees, or obstructions causing shading
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Roof Area Estimation:</strong> Preliminary measurement of available rooftop space
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Orientation Check:</strong> Roof direction (ideal: South-facing in India) and tilt angles
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Solar Access:</strong> Hours of direct sunlight throughout the day and year
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Initial Sizing:</strong> System capacity recommendation based on electricity bill analysis
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-blue-600">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Satellite analysis gives us 80% confidence before visiting your site
                </p>
              </div>
            </div>

            {/* Stage 2: On-Site Survey */}
            <div className="bg-cyan-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-10 h-10 text-cyan-600" />
                <h3 className="text-2xl font-bold text-foreground">Stage 2: On-Site Physical Survey</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Precise Measurements:</strong> Actual roof dimensions using laser distance meter
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Roof Type Assessment:</strong> RCC, tin shed, sloped tiles — determines mounting method
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Structural Integrity:</strong> Check load-bearing capacity (min 25 kg/m² for typical systems)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Access & Safety:</strong> Staircase, ladder requirements, edge protection planning
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Electrical Setup:</strong> Main distribution board location, earthing pit, cable routing path
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Obstructions:</strong> Water tanks, AC units, vents, antennas — precise documentation
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                  <div>
                    <strong>Site Photos:</strong> 360° roof images, existing electrical panel, earthing pit
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* What You Receive */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              📋 What You Receive After Survey
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <FileCheck className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Feasibility Report</h4>
                <p className="text-sm text-muted-foreground">
                  Go/No-Go decision with technical justification
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <Ruler className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Accurate Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Usable roof area with marked exclusion zones
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Photo Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Complete site images for design reference
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Professional Survey Matters
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "✅", title: "Right System Size", desc: "Avoid over-sizing (wasted money) or under-sizing (insufficient power)" },
              { icon: "💰", title: "Accurate Costing", desc: "No surprise charges — final quote matches actual requirements" },
              { icon: "⚡", title: "Optimal Performance", desc: "Maximize generation with ideal panel placement and orientation" },
              { icon: "🛡️", title: "Safety First", desc: "Identify structural issues, access challenges before installation begins" },
              { icon: "📅", title: "Faster Installation", desc: "Pre-planned logistics mean 3-5 day installation instead of delays" },
              { icon: "✔️", title: "Smoother Approvals", desc: "Accurate drawings for DISCOM, CEIG, and building authorities" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues Found */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Common Issues We Identify During Survey
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Heavy Shading:</strong> Trees or buildings blocking sun for 3+ hours daily (reduces output by 30-60%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Weak Structure:</strong> Asbestos or old tin sheets unable to support panel weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Insufficient Area:</strong> Claimed "200 m²" actually only 120 m² usable after obstructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Access Problems:</strong> No safe way to reach rooftop or maintain panels later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>Electrical Issues:</strong> Single-phase supply when three-phase needed for systems above 10 kW</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic mt-4 ml-12">
              💡 Finding issues early saves 10-15 days and prevents installation failures
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Schedule Your Free Site Survey
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Get professional assessment within 48 hours — completely FREE with no obligations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want to schedule a free site survey" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 shadow-xl">
                💬 Book Survey on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white bg-cyan-700 hover:bg-cyan-800">
                📞 Call +91 97725 33559
              </Button>
            </a>
          </div>
          <p className="text-sm opacity-75 mt-6">
            📍 Available across Jaipur and nearby districts • 🚗 We come to you
          </p>
        </div>
      </section>

      <SolarFooter />
    </div>
  );
}
