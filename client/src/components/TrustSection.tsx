import { Shield, Award, Globe, Truck, Headphones, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TrustSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const trustBadges = [
    {
      icon: Award,
      title: "Tier-1 Partners Only",
      description: "We work exclusively with world-class petrochemical producers"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Rigorous quality control ensuring consistent material properties"
    },
    {
      icon: Globe,
      title: "Global Sourcing Network",
      description: "Strategic partnerships across Asia, Middle East & Americas"
    },
    {
      icon: Truck,
      title: "Reliable Logistics",
      description: "Efficient supply chain ensuring on-time delivery worldwide"
    },
    {
      icon: CheckCircle,
      title: "Technical Expertise",
      description: "Experienced team helping you choose the right materials"
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Responsive customer service across time zones"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-2)' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div className="text-center mb-16" style={{ y }}>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Why Choose <span className="font-semibold text-green-600">Shashvat Trading</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium quality thermoplastics with unmatched service. Right product. Right price. Right time.
          </p>
        </motion.div>

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
            Trusted by manufacturers and distributors across 25+ countries
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
