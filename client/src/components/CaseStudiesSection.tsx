import { MapPin, Zap, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseStudiesSection() {
  const projects = [
    {
      title: "Residential Villa - Malviya Nagar",
      location: "Jaipur, Rajasthan",
      capacity: "5 kW",
      monthlySavings: "₹3,500",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop",
      before: "₹6,000/month bill",
      after: "₹2,500/month bill",
      description: "Complete rooftop installation with net metering"
    },
    {
      title: "Commercial Office - Vaishali Nagar",
      location: "Jaipur, Rajasthan",
      capacity: "20 kW",
      monthlySavings: "₹18,000",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      before: "₹35,000/month bill",
      after: "₹17,000/month bill",
      description: "On-grid solar system for office complex"
    },
    {
      title: "Industrial Unit - Sitapura",
      location: "Jaipur, Rajasthan",
      capacity: "50 kW",
      monthlySavings: "₹45,000",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
      before: "₹85,000/month bill",
      after: "₹40,000/month bill",
      description: "Large-scale industrial solar installation"
    },
    {
      title: "Farm House - Ajmer Road",
      location: "Jaipur, Rajasthan",
      capacity: "10 kW",
      monthlySavings: "₹8,500",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      before: "₹15,000/month bill",
      after: "₹6,500/month bill",
      description: "Hybrid solar system with battery backup"
    },
    {
      title: "Restaurant - MI Road",
      location: "Jaipur, Rajasthan",
      capacity: "15 kW",
      monthlySavings: "₹12,000",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      before: "₹22,000/month bill",
      after: "₹10,000/month bill",
      description: "Commercial solar for high-usage business"
    },
    {
      title: "Housing Society - Mansarovar",
      location: "Jaipur, Rajasthan",
      capacity: "30 kW",
      monthlySavings: "₹25,000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      before: "₹48,000/month bill",
      after: "₹23,000/month bill",
      description: "Community solar for residential complex"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-green-50/50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Our <span className="font-semibold text-green-600">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real projects, real savings, real impact across Rajasthan
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Capacity Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-green-600 text-white rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {project.capacity}
                </div>

                {/* Location */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{project.location}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-green-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Before/After */}
                <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-xl">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Before</div>
                    <div className="text-sm font-semibold text-red-600">{project.before}</div>
                  </div>
                  <div className="text-2xl">→</div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">After</div>
                    <div className="text-sm font-semibold text-green-600">{project.after}</div>
                  </div>
                </div>

                {/* Monthly Savings */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">Monthly Savings</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">{project.monthlySavings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Want to see your property featured here?
          </p>
          <Button 
            size="lg"
            className="px-10 py-6 text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
          >
            Start Your Solar Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
