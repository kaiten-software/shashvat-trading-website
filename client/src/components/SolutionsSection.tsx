import { useState, useEffect } from "react";
import { Hexagon, Layers, CircleDot, Box, Recycle, Sparkles, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useQuery } from "@tanstack/react-query";

export default function SolutionsSection() {
  const { ref, isInView } = useScrollReveal();

  const { data: categories = [] } = useQuery<any[]>({
    queryKey: ["categories"],
    queryFn: async () => (await fetch("/api/categories")).json(),
  });

  const [displayCategories, setDisplayCategories] = useState<any[]>([]);

  useEffect(() => {
    if (categories.length > 0) {
      // Shuffle array securely
      const shuffled = [...categories].sort(() => 0.5 - Math.random());

      // Ensure specific "Poly" duplicates don't appear if their parent is there? 
      // User asked for "1 product one time only". 
      // We will rely on random selection and limit to 6 to reduce perceived duplication.
      // Also ensuring unique IDs just in case.
      const unique = shuffled.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

      setDisplayCategories(unique.slice(0, 6));
    }
  }, [categories]);

  // Icon mapping based on category slug or name
  const getIconForCategory = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("polypropylene") || lowerName.includes("pp")) return Hexagon;
    if (lowerName.includes("polyethylene") || lowerName.includes("pe")) return Layers;
    if (lowerName.includes("styrenics") || lowerName.includes("abs") || lowerName.includes("ps")) return CircleDot;
    if (lowerName.includes("pvc") || lowerName.includes("pet")) return Box;
    if (lowerName.includes("engineering")) return Sparkles;
    if (lowerName.includes("recycled") || lowerName.includes("bio")) return Recycle;
    return Package; // Default icon
  };

  // Gradient mapping - cycle through these or map to specific types
  const getGradientForCategory = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-purple-500 to-pink-500",
      "from-amber-500 to-orange-500",
      "from-teal-500 to-cyan-500",
      "from-indigo-500 to-purple-500",
    ];
    return gradients[index % gradients.length];
  };

  // Fallback images if not provided in DB
  const getDefaultImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1581242163695-19d0acfd486f?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600&h=400"
    ];
    return images[index % images.length];
  };

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
          {displayCategories.map((category, index) => {
            const Icon = getIconForCategory(category.name);
            const gradient = getGradientForCategory(index);
            const image = category.image || getDefaultImage(index);

            return (
              <motion.div
                key={category.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>

                  {/* Icon Badge */}
                  <div className={`absolute top-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {category.description}
                  </p>
                  <Link href={`/products`}>
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
