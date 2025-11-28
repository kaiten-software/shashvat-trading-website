import { Home, Building2, Factory, Zap, Construction, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function SolutionsSection() {
  const solutions = [
    {
      icon: Home,
      title: "Residential Rooftop Solar",
      description: "Custom solar solutions for homes, reducing electricity bills by 30-60%",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Building2,
      title: "Commercial Solar",
      description: "Cost-effective solar installations for offices and commercial buildings",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Factory,
      title: "Industrial Solar",
      description: "High-capacity solar systems for manufacturing and industrial facilities",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "On-Grid / Hybrid Systems",
      description: "Flexible grid-tied and battery backup solar solutions",
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Construction,
      title: "Solar Structure & Civil Work",
      description: "Expert structural design and foundation work for solar installations",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "Annual Maintenance (AMC)",
      description: "Comprehensive maintenance contracts for optimal system performance",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-5)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Our <span className="font-semibold text-green-600">Solar Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive EPC services tailored to your energy needs
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-green-600 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {solution.description}
                  </p>
                  <Link href="/contact">
                    <Button 
                      variant="ghost" 
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto font-semibold"
                    >
                      Learn More →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Not sure which solution is right for you?
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <Button 
                size="lg"
                className="px-10 py-6 text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
              >
                Get Free Consultation
              </Button>
            </Link>
            <a href="https://wa.me/919876543210?text=Hi, I need help choosing the right solar solution">
              <Button 
                size="lg"
                variant="outline"
                className="px-10 py-6 text-lg border-green-600 text-green-600 hover:bg-green-50"
              >
                💬 Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
