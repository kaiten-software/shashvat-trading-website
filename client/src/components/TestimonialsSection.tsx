import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Vishes Sharma",
      location: "Pani Pech - JAIPUR",
      role: "Customer",
      rating: 5,
      text: "The service from Rajasthan Green Energy Solar Power Pvt. Ltd. was excellent. Installation was on time and the team was highly professional.",
      image: "https://ui-avatars.com/api/?name=Vishes+Sharma&size=128&background=22c55e&color=fff",
      system: "5 kW"
    },
    {
      name: "Radheshyam Sharma",
      location: "Chomu - JAIPUR",
      role: "Homeowner",
      rating: 5,
      text: "After installing solar, our electricity bill has reduced by almost 80%. Truly the best investment for our home.",
      image: "https://ui-avatars.com/api/?name=Radheshyam+Sharma&size=128&background=22c55e&color=fff",
      system: "3 kW"
    },
    {
      name: "Colonel Pratap Singh",
      location: "Kirni Phatak - JAIPUR",
      role: "Customer",
      rating: 5,
      text: "Excellent service and top-quality solar panels. My bills dropped significantly – truly worth it!",
      image: "https://ui-avatars.com/api/?name=Pratap+Singh&size=128&background=22c55e&color=fff",
      system: "3 kW"
    },
    {
      name: "Parveen Bhai Sitapara",
      location: "Chomu - JAIPUR",
      role: "Customer",
      rating: 5,
      text: "Best decision! No tension of high bills, solar is working perfectly at home.",
      image: "https://ui-avatars.com/api/?name=Parveen+Sitapara&size=128&background=22c55e&color=fff",
      system: "5 kW"
    },
    {
      name: "Dr. N. C. Nitharwal",
      location: "Jankalyan Hospital - CHOMU",
      role: "Hospital Owner",
      rating: 5,
      text: "Reliable solar power for our hospital, ensuring uninterrupted service and big savings. Highly recommended!",
      image: "https://ui-avatars.com/api/?name=N+C+Nitharwal&size=128&background=22c55e&color=fff",
      system: "20 kW"
    },
    {
      name: "Bansidhar Jaat",
      location: "Chomu - JAIPUR",
      role: "Homeowner",
      rating: 5,
      text: "Best service! My home solar installation was quick and my bills are much lower now.",
      image: "https://ui-avatars.com/api/?name=Bansidhar+Jaat&size=128&background=22c55e&color=fff",
      system: "3 kW"
    },
    {
      name: "Vijay pal Yadav",
      location: "Kaladera - JAIPUR",
      role: "Customer",
      rating: 5,
      text: "Best service! Just one call and they arrived the very next day. Fast and reliable.",
      image: "https://ui-avatars.com/api/?name=Vijay+Yadav&size=128&background=22c55e&color=fff",
      system: "17 kW"
    },
    {
      name: "Dr Punit Lekhra",
      location: "Banipark - JAIPUR",
      role: "Doctor",
      rating: 5,
      text: "After installing solar, my electricity bill is almost half. Very happy with the service.",
      image: "https://ui-avatars.com/api/?name=Punit+Lekhra&size=128&background=22c55e&color=fff",
      system: "3 kW"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-4)' }}>
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
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-base font-semibold text-foreground">4.9/5 Average Rating</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-base text-muted-foreground">800+ Happy Customers</span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Join hundreds of satisfied customers making the switch to solar
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://wa.me/919772533559?text=Hi, I'd like to learn more about solar installation. Can we discuss?" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
                💬 Chat Instantly on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                📞 Call +91 97725 33559
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
