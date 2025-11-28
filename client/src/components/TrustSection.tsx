import { Shield, Award, FileCheck, IndianRupee, Headphones, CheckCircle } from "lucide-react";

export default function TrustSection() {
  const trustBadges = [
    {
      icon: Award,
      title: "MNRE-Certified EPC Team",
      description: "Government-approved solar engineering experts"
    },
    {
      icon: Shield,
      title: "25-Year Performance Guarantee",
      description: "Long-term warranty on panel efficiency"
    },
    {
      icon: FileCheck,
      title: "Net-Metering Assistance",
      description: "Complete DISCOM documentation support"
    },
    {
      icon: IndianRupee,
      title: "100% Transparent Pricing",
      description: "No hidden costs, clear breakdown"
    },
    {
      icon: CheckCircle,
      title: "End-to-End Installation",
      description: "From design to commissioning"
    },
    {
      icon: Headphones,
      title: "After-Sales Support",
      description: "24/7 customer service and maintenance"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Why Choose <span className="font-semibold text-green-600">Rajasthan Green Energy Solar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Engineering excellence meets customer trust. We deliver solar solutions built to last.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white to-green-50/30 border border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {badge.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Join 500+ satisfied customers who trust us for their solar needs
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-4">and hundreds more...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
