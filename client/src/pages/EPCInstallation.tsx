import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Wrench, AlertCircle } from "lucide-react";

export default function EPCInstallation() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Full Turnkey EPC & Installation
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Complete end-to-end solar solutions — from design to commissioning
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Complete Turnkey Solution
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for a safe, efficient, and long-lasting solar installation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🏗️", title: "Structure & Mounting", desc: "Hot-dip galvanized steel or aluminum structures designed for 150 km/h wind speeds with 1.5x safety factor" },
              { icon: "☀️", title: "Solar Panels", desc: "100% Made in India modules with 25-year performance warranty, 97% first year output, IEC 61215 certified" },
              { icon: "⚡", title: "Inverters & PCU", desc: "Smart MPPT inverters with ≥97% efficiency, anti-islanding protection, and grid synchronization" },
              { icon: "🔌", title: "DC & AC Cabling", desc: "UV-resistant FRLS/XLPE cables with proper conduiting, voltage drop under 2%, IS 694/IS 1554 compliant" },
              { icon: "🌍", title: "Earthing System", desc: "Separate earth pits for DC, AC & lightning circuits, resistance less than 5 ohms as per IS 3043:2018" },
              { icon: "⚡", title: "Lightning Protection", desc: "Full array field protection as per IEC 62305 with Type II surge protection devices" },
              { icon: "⚠️", title: "Safety Signage", desc: "Warning labels, emergency shut-off instructions, and electrical hazard markings" },
              { icon: "📊", title: "Metering Setup", desc: "Dual metering: Net meter (import/export) + Generation meter with DISCOM coordination" },
              { icon: "🛡️", title: "AMC Option", desc: "Annual Maintenance Contracts available for worry-free long-term operation" }
            ].map((item, idx) => (
              <div key={idx} className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Standards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              ⚙️ Technical Standards & Compliance
            </h2>
            <p className="text-xl text-muted-foreground">
              Every installation engineered to MNRE and BIS standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Solar PV Modules</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>IEC 61215 / IS 14286, IEC 61730, IEC 62804 (PID) certified</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Minimum 16% efficiency with +3% power tolerance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>IP65 junction boxes with MC4 connectors & RFID tags</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Performance: 97% year 1, 90% at 10 years, 80% at 25 years</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Inverters (PCU)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>IEC 61683 / IS 16221 / IS 16169 compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>≥97% efficiency (non-isolated) / ≥93% (isolated)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Anti-islanding, surge protection, auto grid sync</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Power Factor &gt;0.9, THD &lt;3%, IP65/IP54 rated</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Mounting Structure</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Hot-dip galvanized steel (IS 2062) or aluminum (AA6063 T6)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Withstands 150 km/h wind with 1.5x safety factor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Ballast / Tin Shed / Elevated RCC options</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>SS-304 or HDG 8.8 grade fasteners for durability</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Protection Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Separate earthing for DC, AC & lightning (&lt;5 ohms)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Lightning protection per IEC 62305</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Type II SPDs at AC and DC distribution points</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>All metallic parts bonded per IS 3043:2018</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Full Compliance Guarantee</h3>
            <p className="text-lg opacity-90 mb-2">
              ✓ MNRE Simplified Procedure Guidelines
            </p>
            <p className="text-lg opacity-90 mb-2">
              ✓ CEA Technical Standards for Distributed Generation
            </p>
            <p className="text-lg opacity-90 mb-2">
              ✓ Electricity Act, 2003 compliant
            </p>
            <p className="text-lg opacity-90">
              ✓ ISO 9001 & ISO 14001 traceability
            </p>
          </div>
        </div>
      </section>

      {/* Installation Best Practices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Installation Best Practices
            </h2>
            <p className="text-xl text-muted-foreground">
              Safety-first approach with professional execution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "👷", title: "Pre-Installation Walkdown", desc: "Site supervisor conducts full walkdown with team, marking locations and logistics planning" },
              { icon: "🦺", title: "PPE & Safety", desc: "Full Personal Protective Equipment and safety lines mandatory for sloped roofs" },
              { icon: "🏗️", title: "Structure Mounting", desc: "Precise mounting with earthing bonding, careful panel handling (no stepping on modules)" },
              { icon: "⚡", title: "DC String Rules", desc: "Strings not made live during module placement, proper polarity checks at every step" },
              { icon: "🌡️", title: "Inverter Placement", desc: "Optimal siting with adequate ventilation, cable routing to keep voltage drop under 2%" },
              { icon: "⚠️", title: "Lightning & Signage", desc: "Lightning protection and warning signage installed per standards" },
              { icon: "🔍", title: "Testing & Checks", desc: "Visual inspection, anti-islanding tests, loss-of-mains protection verification" },
              { icon: "✅", title: "Commissioning", desc: "Grid synchronization, net-meter swap, full system handover with documentation" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Professional Solar Installation?
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Get a detailed quote with component breakdown and timeline
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919772533559?text=Hi, I want a detailed EPC installation quote" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 shadow-xl">
                💬 Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button size="lg" variant="outline" className="border-white text-white bg-green-700 hover:bg-green-800">
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
