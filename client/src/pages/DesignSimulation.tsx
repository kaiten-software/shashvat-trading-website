import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { Layers, Box, BarChart3, Sun, Zap, TrendingDown } from "lucide-react";

export default function DesignSimulation() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-600 via-pink-500 to-rose-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Design & Simulation
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Precision engineering for maximum solar generation
          </p>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Professional Solar System Design
            </h2>
            <p className="text-xl text-muted-foreground">
              Every system is custom-designed using professional software and engineering standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                title: "2D & 3D Layouts",
                desc: "Visual representation of exact panel placement, spacing, and orientation on your roof",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Box,
                title: "String Design",
                desc: "Optimal series-parallel configuration for maximum efficiency and minimal losses",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: BarChart3,
                title: "PVsyst Generation Reports",
                desc: "Industry-standard software predicting monthly & annual kWh output with 95% accuracy",
                color: "from-rose-500 to-red-500"
              },
              {
                icon: Sun,
                title: "Shading Analysis",
                desc: "Hour-by-hour shadow simulation across all seasons using solar pathfinder data",
                color: "from-orange-500 to-amber-500"
              },
              {
                icon: Zap,
                title: "Loss Calculations",
                desc: "Detailed breakdown: cable losses, inverter losses, temperature de-rating, soiling",
                color: "from-amber-500 to-yellow-500"
              },
              {
                icon: TrendingDown,
                title: "Cost Optimization",
                desc: "Right-sized system balancing upfront cost with long-term ROI and payback period",
                color: "from-emerald-500 to-green-500"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PVsyst Simulation Details */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              📊 PVsyst Energy Simulation
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry-standard software used by engineers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-6">What PVsyst Calculates</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <strong>Hourly Solar Irradiance:</strong> Based on latitude (26.9°N for Jaipur), longitude, and TMY3 weather data
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <strong>Panel Performance:</strong> Temperature coefficients, degradation rates, efficiency curves
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <strong>System Losses:</strong> DC cable (1-2%), AC cable (0.5-1%), inverter (2-3%), soiling (5-8% in India)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <strong>Near & Far Shading:</strong> From chimneys, parapets, trees — calculated for every hour of the year
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">5</span>
                  </div>
                  <div>
                    <strong>Monthly & Annual Output:</strong> Expected kWh generation with 95% confidence interval
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-pink-600 mb-6">Sample Output Report</h3>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-4"><strong>Example: 5 kW On-Grid System in Jaipur</strong></p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">Irradiance (kWh/m²)</th>
                      <th className="text-right py-2">Output (kWh)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2">January</td>
                      <td className="text-right">170</td>
                      <td className="text-right font-semibold">650</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">April</td>
                      <td className="text-right">210</td>
                      <td className="text-right font-semibold">780</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">July</td>
                      <td className="text-right">185</td>
                      <td className="text-right font-semibold">710</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">October</td>
                      <td className="text-right">195</td>
                      <td className="text-right font-semibold">740</td>
                    </tr>
                    <tr className="font-bold text-foreground">
                      <td className="py-2">Annual Total</td>
                      <td className="text-right">—</td>
                      <td className="text-right text-lg text-green-600">8,700 kWh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded p-4">
                <p className="text-sm text-green-800">
                  <strong>✓ Performance Ratio:</strong> 78-82% (excellent for Indian conditions)<br/>
                  <strong>✓ Capacity Factor:</strong> 19.8% annual average<br/>
                  <strong>✓ Specific Yield:</strong> 1,740 kWh/kWp/year
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Design Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Why 3D Design Matters
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional 2D layouts can't show shadows, obstructions, or installation challenges. Our 3D models give you:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Visual Clarity:</strong>
                    <p className="text-muted-foreground">See exactly how panels fit around water tanks, AC units, skylights</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 font-bold">2</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Shadow Precision:</strong>
                    <p className="text-muted-foreground">Hour-by-hour shadow movement across seasons — avoid underperforming spots</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-rose-600 font-bold">3</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Customer Confidence:</strong>
                    <p className="text-muted-foreground">You see the final result before installation begins</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Faster Approvals:</strong>
                    <p className="text-muted-foreground">DISCOM and authorities appreciate professional, clear drawings</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">🏗️ 3D Model Includes:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Roof geometry with accurate slope angles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Panel placement with row-to-row spacing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>All obstructions (tanks, vents, parapets)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Nearby buildings causing shadows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Walkway access for maintenance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Inverter & junction box locations</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground italic">
                  💡 3D design adds 1-2 days to timeline but prevents costly mistakes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* String Design Explanation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              ⚡ String Design & Configuration
            </h2>
            <p className="text-xl text-muted-foreground">
              Proper stringing ensures maximum efficiency and inverter compatibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-4">What is a String?</h3>
              <p className="text-muted-foreground mb-4">
                A <strong>string</strong> is a series connection of solar panels. Voltage adds up, while current remains the same.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-mono">
                  <strong>Example:</strong><br/>
                  10 panels × 40V each = 400V string<br/>
                  Each panel: 10A → String current: 10A
                </p>
              </div>
              <p className="text-muted-foreground">
                <strong>Why it matters:</strong> Inverters have specific voltage windows (MPPT range). Too many panels = overvoltage trip. Too few = underutilized inverter.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-4">Design Rules We Follow</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>MPPT Range:</strong> String voltage must stay within inverter's MPPT window (e.g., 200-850V)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Equal String Lengths:</strong> All strings in same MPPT should have same number of panels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>No Mixed Orientations:</strong> Don't combine East & West facing panels in one string</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Cable Sizing:</strong> DC cable rated for 1.25× string current to handle surge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Voltage Drop:</strong> Keep total DC cable run under 2% voltage drop</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">📐 Sample String Configuration</h3>
            <p className="text-lg opacity-90 mb-6">
              5 kW System with 550 Wp Monocrystalline Panels
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">9</p>
                <p className="text-sm">Total Panels</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">3 × 3</p>
                <p className="text-sm">String Config</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold mb-2">120V</p>
                <p className="text-sm">Per String</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Get Your Custom Design & Simulation Report
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Professional PVsyst report + 3D layout included with every quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want a custom solar design with PVsyst report" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl">
                💬 Request Design Report
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white bg-purple-700 hover:bg-purple-800">
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
