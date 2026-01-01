import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingDown, Gift, Calculator } from "lucide-react";

export default function CostsSubsidy() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-amber-600 via-orange-500 to-red-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Solar System Costs & Subsidy
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Transparent pricing with government subsidy benefits
          </p>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              On-Grid Residential Solar Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Cost ranges for typical rooftop systems (without subsidy)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                capacity: "1 kW",
                range: "₹60,000 – ₹80,000",
                perKw: "₹60,000 - ₹80,000/kW",
                panels: "2-3 panels × 440-550 Wp",
                area: "~10-12 m²",
                generation: "~120-140 kWh/month",
                color: "from-green-500 to-emerald-500"
              },
              {
                capacity: "3 kW",
                range: "₹1,65,000 – ₹2,25,000",
                perKw: "₹55,000 - ₹75,000/kW",
                panels: "6-7 panels × 440-550 Wp",
                area: "~30-35 m²",
                generation: "~360-420 kWh/month",
                color: "from-blue-500 to-cyan-500",
                popular: true
              },
              {
                capacity: "5 kW",
                range: "₹2,50,000 – ₹3,00,000",
                perKw: "₹50,000 - ₹60,000/kW",
                panels: "9-10 panels × 540-550 Wp",
                area: "~50-55 m²",
                generation: "~600-700 kWh/month",
                color: "from-purple-500 to-pink-500"
              }
            ].map((plan, idx) => (
              <div key={idx} className={`relative bg-gradient-to-br ${plan.color} rounded-2xl p-8 text-white shadow-2xl hover:scale-105 transition-transform`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-4xl font-bold mb-4">{plan.capacity}</h3>
                <p className="text-3xl font-bold mb-6">{plan.range}</p>
                <div className="space-y-3 text-sm opacity-90">
                  <p><strong>Per kW:</strong> {plan.perKw}</p>
                  <p><strong>Panels:</strong> {plan.panels}</p>
                  <p><strong>Roof Area:</strong> {plan.area}</p>
                  <p><strong>Generation:</strong> {plan.generation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              📊 Cost Breakdown for 1 kW System
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { component: "Solar Panels", percent: "50-60%", amount: "₹30,000-48,000" },
                { component: "Inverter/PCU", percent: "15-20%", amount: "₹9,000-16,000" },
                { component: "Structure & Mounting", percent: "10-15%", amount: "₹6,000-12,000" },
                { component: "BoS (cables, earthing, protection)", percent: "8-12%", amount: "₹5,000-10,000" },
                { component: "Installation & Liaisoning", percent: "10-15%", amount: "₹6,000-12,000" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md">
                  <p className="text-sm text-muted-foreground mb-2">{item.component}</p>
                  <p className="text-2xl font-bold text-orange-600 mb-1">{item.percent}</p>
                  <p className="text-sm text-muted-foreground">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PM Surya Ghar Subsidy */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Gift className="w-20 h-20 mx-auto text-green-600 mb-4" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              PM Surya Ghar: Muft Bijli Yojana
            </h2>
            <p className="text-xl text-muted-foreground">
              Central Government Subsidy for Rooftop Solar — up to ₹78,000
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Subsidy Structure</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">First 2 kW</p>
                    <p className="text-sm text-muted-foreground">₹30,000 per kW</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">₹60,000</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">Next 1 kW (2-3 kW)</p>
                    <p className="text-sm text-muted-foreground">₹18,000 per kW</p>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">₹18,000</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg border-2 border-teal-500">
                  <div>
                    <p className="font-semibold text-foreground">Maximum Subsidy</p>
                    <p className="text-sm text-muted-foreground">For 3 kW or more</p>
                  </div>
                  <div className="text-3xl font-bold text-teal-600">₹78,000</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong>⚠️ Important:</strong> Subsidy is NOT available for systems above 3 kW. For 5 kW, 10 kW, etc., maximum subsidy remains ₹78,000.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-6">Effective Cost After Subsidy</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">1 kW System</span>
                    <span className="text-green-600 font-bold">₹30,000 subsidy</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Before: ₹60,000 - ₹80,000</p>
                    <p className="text-2xl font-bold text-foreground">After: ₹30,000 - ₹50,000</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">2 kW System</span>
                    <span className="text-green-600 font-bold">₹60,000 subsidy</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Before: ₹1,10,000 - ₹1,50,000</p>
                    <p className="text-2xl font-bold text-foreground">After: ₹50,000 - ₹90,000</p>
                  </div>
                </div>

                <div className="border-2 border-green-500 rounded-lg">
                  <div className="flex justify-between p-4 bg-green-50">
                    <span className="font-semibold">3 kW System</span>
                    <span className="text-green-600 font-bold">₹78,000 subsidy</span>
                  </div>
                  <div className="bg-white rounded-b-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Before: ₹1,65,000 - ₹2,25,000</p>
                    <p className="text-3xl font-bold text-green-600">After: ₹87,000 - ₹1,47,000</p>
                    <p className="text-xs text-green-700 mt-2">✓ Best value — maximum subsidy benefit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">How We Help with Subsidy</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Registration", desc: "We register your project on PM Surya Ghar national portal" },
                { step: "2", title: "Documentation", desc: "Prepare all documents: bills, ID proofs, site photos, technical specs" },
                { step: "3", title: "Approval", desc: "Track application status and coordinate with DISCOM/authorities" },
                { step: "4", title: "Disbursement", desc: "Subsidy credited to your bank account post-inspection (45-90 days)" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Affects Price */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              💰 What Affects Solar System Cost?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Panel Quality",
                points: [
                  "Monocrystalline: ₹25-35/Wp (premium)",
                  "Polycrystalline: ₹20-28/Wp (budget)",
                  "Bifacial: ₹30-40/Wp (high efficiency)"
                ],
                icon: "☀️"
              },
              {
                title: "Inverter Type",
                points: [
                  "String inverter: ₹8,000-15,000/kW",
                  "Hybrid inverter: ₹12,000-25,000/kW",
                  "Microinverters: ₹15,000-30,000/kW"
                ],
                icon: "⚡"
              },
              {
                title: "Roof Type",
                points: [
                  "RCC flat: Standard cost (easiest)",
                  "Tin shed: +10-15% (special fasteners)",
                  "Sloped tiles: +20-30% (more labor)"
                ],
                icon: "🏠"
              },
              {
                title: "System Size",
                points: [
                  "Economies of scale: larger = lower ₹/kW",
                  "1-3 kW: ₹55-75/Wp",
                  "10+ kW: ₹45-55/Wp"
                ],
                icon: "📏"
              },
              {
                title: "Location & Access",
                points: [
                  "Ground floor: Standard cost",
                  "High-rise (>5 floors): +5-10%",
                  "Difficult access: +10-20%"
                ],
                icon: "🏗️"
              },
              {
                title: "Additional Features",
                points: [
                  "Battery backup: +₹80,000-2,00,000",
                  "Remote monitoring: +₹3,000-8,000",
                  "Elevated structure: +₹8,000-15,000/kW"
                ],
                icon: "🔋"
              }
            ].map((factor, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{factor.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{factor.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {factor.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Savings */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <TrendingDown className="w-20 h-20 mx-auto text-blue-600 mb-4" />
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Return on Investment (ROI)
            </h2>
            <p className="text-xl text-muted-foreground">
              Typical payback: 3-5 years | 25-year savings: ₹10-30 lakhs
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              💡 Sample Calculation: 3 kW System
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg text-foreground mb-4">Initial Investment</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>System Cost</span>
                    <span className="font-semibold">₹1,95,000</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 rounded">
                    <span>Subsidy</span>
                    <span className="font-semibold text-green-600">- ₹78,000</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-100 rounded border-2 border-blue-500">
                    <span className="font-bold">Out of Pocket</span>
                    <span className="font-bold text-blue-600 text-xl">₹1,17,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg text-foreground mb-4">Annual Savings</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Monthly Generation</span>
                    <span className="font-semibold">~390 kWh</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Annual Generation</span>
                    <span className="font-semibold">~4,680 kWh</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Cost @ ₹7/unit</span>
                    <span className="font-semibold">₹32,760/year</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-100 rounded border-2 border-green-500">
                    <span className="font-bold">Payback Period</span>
                    <span className="font-bold text-green-600 text-xl">~3.6 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <h4 className="font-bold text-lg text-center text-foreground mb-4">25-Year Projection</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-purple-600">₹8.2L</p>
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-pink-600">7x</p>
                  <p className="text-sm text-muted-foreground">Return Multiple</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-rose-600">85-90%</p>
                  <p className="text-sm text-muted-foreground">Bill Reduction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <Calculator className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Get Your Personalized Cost Estimate
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Detailed quote with component breakdown + subsidy calculation + ROI projection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want a personalized cost estimate with subsidy details" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl px-12 py-7 text-lg">
                💬 Request Detailed Quote
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white bg-orange-700 hover:bg-orange-800 px-12 py-7 text-lg">
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
