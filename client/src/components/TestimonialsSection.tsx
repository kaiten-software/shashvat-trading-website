import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      location: "Malviya Nagar, Jaipur",
      role: "Homeowner",
      rating: 5,
      text: "Excellent service from start to finish. The team was professional, installation was completed in 8 days, and my electricity bill has reduced by 55%. Highly recommended!",
      image: "https://ui-avatars.com/api/?name=Rajesh+Sharma&size=128&background=22c55e&color=fff",
      system: "5 kW Residential"
    },
    {
      name: "Priya Mehta",
      location: "Vaishali Nagar, Jaipur",
      role: "Business Owner",
      rating: 5,
      text: "Best decision for our office. The ROI calculations were accurate, and we're saving ₹18,000 monthly. The net metering process was handled smoothly by their team.",
      image: "https://ui-avatars.com/api/?name=Priya+Mehta&size=128&background=22c55e&color=fff",
      system: "20 kW Commercial"
    },
    {
      name: "Anil Kumar",
      location: "Mansarovar, Jaipur",
      role: "Society President",
      rating: 5,
      text: "Our housing society chose Rajasthan Green Energy Solar and we're thrilled. Professional installation, transparent pricing, and excellent after-sales support.",
      image: "https://ui-avatars.com/api/?name=Anil+Kumar&size=128&background=22c55e&color=fff",
      system: "30 kW Society"
    },
    {
      name: "Sunita Rathore",
      location: "Civil Lines, Jaipur",
      role: "Homeowner",
      rating: 5,
      text: "The hybrid system with battery backup was perfect for our needs. No more power cuts, and our bills are down by 60%. Great team and quality equipment!",
      image: "https://ui-avatars.com/api/?name=Sunita+Rathore&size=128&background=22c55e&color=fff",
      system: "10 kW Hybrid"
    },
    {
      name: "Vikram Singh",
      location: "Sitapura, Jaipur",
      role: "Factory Owner",
      rating: 5,
      text: "Industrial installation was completed without disrupting operations. The engineering team was knowledgeable and the system performance exceeds expectations.",
      image: "https://ui-avatars.com/api/?name=Vikram+Singh&size=128&background=22c55e&color=fff",
      system: "50 kW Industrial"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            What Our <span className="font-semibold text-green-600">Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real experiences from satisfied solar customers across Jaipur
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 bg-gradient-to-br from-white to-green-50/30 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-green-600/20" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* System Badge */}
              <div className="mb-6 inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {testimonial.system}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-green-100">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-green-200"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-base font-semibold text-foreground">4.9/5 Average Rating</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-base text-muted-foreground">500+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
