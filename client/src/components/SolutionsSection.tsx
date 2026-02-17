import { Hexagon, Layers, CircleDot, Box, Recycle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function SolutionsSection() {
  const { ref, isInView } = useScrollReveal();
  const solutions = [
    {
      icon: Hexagon,
      title: "Polypropylene (PP)",
      description: "Versatile thermoplastic for packaging, automotive, textiles, and consumer goods applications",
      image: "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?auto=format&fit=crop&q=80&w=600&h=400",
      gradient: "from-blue-500 to-cyan-500",
      link: "/products"
    },
    {
      icon: Layers,
      title: "Polyethylene (PE)",
      description: "LDPE, LLDPE, HDPE grades for films, pipes, containers, and industrial applications",
      image: "https://images.unsplash.com/photo-1581242163695-19d0acfd486f?auto=format&fit=crop&q=80&w=600&h=400",
      gradient: "from-green-500 to-emerald-500",
      link: "/products"
    },
    {
      icon: CircleDot,
      title: "Styrenics (GPPS, HIPS, ABS)",
      description: "High-performance resins for electronics, appliances, and consumer products",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600&h=400",
      gradient: "from-purple-500 to-pink-500",
      link: "/products"
    },
    {
      icon: Box,
      title: "PVC & PET",
      description: "Construction-grade PVC and packaging-grade PET for diverse industrial needs",
      image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&q=80&w=600&h=400",
      gradient: "from-amber-500 to-orange-500",
      link: "/products"
    },
    {
      icon: Sparkles,
      title: "Engineering Plastics",
      description: "Polyamides, polycarbonate, and specialty resins for high-performance applications",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400",
      gradient: "from-teal-500 to-cyan-500",
      link: "/products"
    },
    {
      icon: Recycle,
      title: "Recycled & Bio-Polymers",
      description: "Sustainable alternatives including reprocessed resins and eco-friendly materials",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600&h=400",
      gradient: "from-indigo-500 to-purple-500",
      link: "/products"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-5)' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Our <span className="font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Product Range</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive thermoplastic solutions for every manufacturing need
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
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
                  <Link href={solution.link}>
                    <Button
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto font-semibold"
                    >
                      View Products →
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Need help finding the right material for your application?
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="mailto:info@shashvattrading.com">
              <Button
                size="lg"
                className="px-10 py-6 text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-xl"
              >
                ✉️ Request a Quote
              </Button>
            </a>
            <a href="tel:+919820191117">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-6 text-lg border-green-600 text-green-600 hover:bg-green-50"
              >
                📞 Call +91 98201 91117
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
