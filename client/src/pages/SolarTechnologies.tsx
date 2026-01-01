import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Zap, DollarSign, TrendingUp, Shield } from "lucide-react";

export default function SolarTechnologies() {
  const panelTypes = [
    {
      name: "Monocrystalline",
      icon: "🔷",
      efficiency: "20-22%",
      cost: "₹25-35/Wp",
      warranty: "25 years performance",
      color: "from-blue-600 to-cyan-600",
      pros: [
        "Highest efficiency — best for limited space",
        "Better performance in low-light conditions",
        "Longer lifespan (30-40 years actual)",
        "Higher temperature coefficient (-0.35% to -0.40%/°C)",
        "Sleek black appearance"
      ],
      cons: [
        "Higher upfront cost (15-25% more than poly)",
        "Slightly more sensitive to shading"
      ],
      bestFor: "Rooftops with limited space, premium installations, high-efficiency requirement",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
    },
    {
      name: "Polycrystalline",
      icon: "🔹",
      efficiency: "15-17%",
      cost: "₹20-28/Wp",
      warranty: "25 years performance",
      color: "from-indigo-600 to-purple-600",
      pros: [
        "Lower cost — budget-friendly option",
        "Good performance in Indian conditions",
        "Simpler manufacturing = less energy intensive",
        "Proven technology with decades of track record",
        "Slightly better heat tolerance"
      ],
      cons: [
        "Lower efficiency — needs more space",
        "Blueish color may not suit aesthetic preferences",
        "Slightly lower lifespan (25-30 years)"
      ],
      bestFor: "Large roof areas, budget-conscious buyers, commercial installations",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop"
    },
    {
      name: "Thin-Film",
      icon: "📄",
      efficiency: "10-13%",
      cost: "₹15-25/Wp",
      warranty: "10-20 years",
      color: "from-gray-600 to-slate-600",
      pros: [
        "Flexible and lightweight — unique applications",
        "Better performance in high temperatures",
        "Less affected by partial shading",
        "Can be integrated into building materials (BIPV)",
        "Lower cost per watt"
      ],
      cons: [
        "Lowest efficiency — needs 2x space vs mono",
        "Shorter lifespan and warranty",
        "Faster degradation (0.5-1%/year)",
        "Not suitable for residential rooftops"
      ],
      bestFor: "Large ground-mount farms, BIPV applications, temporary installations",
      image: "https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=600&h=400&fit=crop"
    },
    {
      name: "Bifacial",
      icon: "🔄",
      efficiency: "22-24% (front + back)",
      cost: "₹30-40/Wp",
      warranty: "30 years performance",
      color: "from-emerald-600 to-teal-600",
      pros: [
        "Captures light from both sides — up to 30% more energy",
        "Best for elevated or ground-mount structures",
        "Premium efficiency with reflective surfaces below",
        "Longer warranty (30 years)",
        "Better ROI in optimal conditions"
      ],
      cons: [
        "Highest cost (20-35% more than mono)",
        "Requires elevated mounting (0.5-1m clearance)",
        "Back-side gain depends on ground albedo (white > grass)",
        "Not ideal for flush RCC rooftops"
      ],
      bestFor: "Ground-mount systems, elevated structures with reflective surfaces, commercial farms",
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Solar Panel Technologies
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Quick guide to choosing the right panel type for your needs
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              At a Glance Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Panel Type</th>
                  <th className="px-6 py-4 text-center">Efficiency</th>
                  <th className="px-6 py-4 text-center">Cost/Wp</th>
                  <th className="px-6 py-4 text-center">Space Needed</th>
                  <th className="px-6 py-4 text-center">Lifespan</th>
                  <th className="px-6 py-4 text-center">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold">🔷 Monocrystalline</td>
                  <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">20-22%</span></td>
                  <td className="px-6 py-4 text-center">₹25-35</td>
                  <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Least</span></td>
                  <td className="px-6 py-4 text-center">30-40 yrs</td>
                  <td className="px-6 py-4 text-center text-sm">Limited space</td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="px-6 py-4 font-semibold">🔹 Polycrystalline</td>
                  <td className="px-6 py-4 text-center"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">15-17%</span></td>
                  <td className="px-6 py-4 text-center">₹20-28</td>
                  <td className="px-6 py-4 text-center"><span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Moderate</span></td>
                  <td className="px-6 py-4 text-center">25-30 yrs</td>
                  <td className="px-6 py-4 text-center text-sm">Budget-friendly</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">📄 Thin-Film</td>
                  <td className="px-6 py-4 text-center"><span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">10-13%</span></td>
                  <td className="px-6 py-4 text-center">₹15-25</td>
                  <td className="px-6 py-4 text-center"><span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Most</span></td>
                  <td className="px-6 py-4 text-center">15-25 yrs</td>
                  <td className="px-6 py-4 text-center text-sm">Niche uses</td>
                </tr>
                <tr className="hover:bg-emerald-50">
                  <td className="px-6 py-4 font-semibold">🔄 Bifacial</td>
                  <td className="px-6 py-4 text-center"><span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">22-24%</span></td>
                  <td className="px-6 py-4 text-center">₹30-40</td>
                  <td className="px-6 py-4 text-center"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Least</span></td>
                  <td className="px-6 py-4 text-center">35-40 yrs</td>
                  <td className="px-6 py-4 text-center text-sm">Ground-mount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      {panelTypes.map((panel, index) => (
        <section key={index} className={`py-20 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${panel.color} text-white rounded-full mb-6 shadow-lg`}>
                  <span className="text-3xl">{panel.icon}</span>
                  <span className="text-2xl font-bold">{panel.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <Zap className="w-8 h-8 text-amber-500 mb-2" />
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <p className="text-2xl font-bold text-foreground">{panel.efficiency}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                    <p className="text-sm text-muted-foreground">Cost</p>
                    <p className="text-2xl font-bold text-foreground">{panel.cost}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md col-span-2">
                    <Shield className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="text-sm text-muted-foreground">Warranty</p>
                    <p className="text-xl font-bold text-foreground">{panel.warranty}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-green-600 mb-3">✓ Advantages</h3>
                  <ul className="space-y-2">
                    {panel.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-muted-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-red-600 mb-3">✗ Disadvantages</h3>
                  <ul className="space-y-2">
                    {panel.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span className="text-muted-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`bg-gradient-to-r ${panel.color} text-white rounded-xl p-6`}>
                  <p className="font-semibold mb-2">✨ Best For:</p>
                  <p className="text-lg">{panel.bestFor}</p>
                </div>
              </div>

              <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                <img 
                  src={panel.image} 
                  alt={panel.name}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* When to Choose What */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              🤔 Which Panel Should You Choose?
            </h2>
            <p className="text-xl text-muted-foreground">
              Decision guide based on your situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                scenario: "Small Rooftop (under 50 m²)",
                recommendation: "Monocrystalline",
                reason: "Maximize generation from limited space with highest efficiency",
                color: "from-blue-500 to-cyan-500"
              },
              {
                scenario: "Budget Constrained",
                recommendation: "Polycrystalline",
                reason: "Best value for money with proven reliability — 15-25% cost savings",
                color: "from-indigo-500 to-purple-500"
              },
              {
                scenario: "Large Roof (over 100 m²)",
                recommendation: "Polycrystalline",
                reason: "Space isn't an issue — save upfront cost with slightly lower efficiency",
                color: "from-purple-500 to-pink-500"
              },
              {
                scenario: "Ground-Mount Farm",
                recommendation: "Bifacial",
                reason: "Elevated structures + reflective ground = 20-30% more generation",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((guide, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center mb-4`}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{guide.scenario}</h3>
                <p className={`text-xl font-bold bg-gradient-to-r ${guide.color} bg-clip-text text-transparent mb-3`}>
                  → {guide.recommendation}
                </p>
                <p className="text-sm text-muted-foreground">{guide.reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-center text-foreground mb-6">
              💡 Our Recommendation (2024-25)
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <p className="text-4xl mb-4">🏆</p>
                <p className="font-bold text-lg mb-2">Residential (1-10 kW)</p>
                <p className="text-2xl font-bold text-blue-600">Monocrystalline</p>
                <p className="text-sm text-muted-foreground mt-2">540-550 Wp panels, 25-year warranty</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <p className="text-4xl mb-4">💼</p>
                <p className="font-bold text-lg mb-2">Commercial (10-100 kW)</p>
                <p className="text-2xl font-bold text-purple-600">Poly or Mono</p>
                <p className="text-sm text-muted-foreground mt-2">Depends on roof area vs budget</p>
              </div>
              <div className="text-center p-6 bg-emerald-50 rounded-xl">
                <p className="text-4xl mb-4">🏭</p>
                <p className="font-bold text-lg mb-2">Industrial (over 100 kW)</p>
                <p className="text-2xl font-bold text-emerald-600">Bifacial</p>
                <p className="text-sm text-muted-foreground mt-2">Ground-mount or elevated structures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Still Confused? Let's Help You Choose
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Share your roof area, budget, and consumption — we'll recommend the best panel type
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I need help choosing the right solar panel type for my project" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl px-12 py-7 text-lg">
                💬 Get Expert Recommendation
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white bg-indigo-700 hover:bg-indigo-800 px-12 py-7 text-lg">
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
