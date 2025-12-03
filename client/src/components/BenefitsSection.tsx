import { TrendingDown, DollarSign, TrendingUp, Home } from "lucide-react";
import { Link } from "wouter";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingDown,
      title: "80-95% Bill Reduction",
      description: "Significantly lower your monthly electricity expenses",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "ROI in 3-5 Years",
      description: "Quick payback period with long-term savings",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Government Subsidies",
      description: "₹78,000 subsidy available in Rajasthan",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Home,
      title: "Increases Property Value",
      description: "Solar homes command premium prices in the market",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-2)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Solar <span className="font-semibold text-green-600">Benefits</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Why switching to solar makes financial sense
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Environmental Impact</h3>
            <p className="text-muted-foreground leading-relaxed">
              Each kW of solar reduces 1.5 tons of CO₂ emissions annually. Help create a cleaner future for the next generation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Energy Independence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Protect yourself from rising electricity tariffs. Generate your own clean power and gain energy security.
            </p>
          </div>
        </div>

        {/* Soft CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full border border-green-200">
            <span className="text-muted-foreground">Want to calculate your potential savings?</span>
            <Link href="/contact" className="text-green-600 font-semibold hover:text-green-700">
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
