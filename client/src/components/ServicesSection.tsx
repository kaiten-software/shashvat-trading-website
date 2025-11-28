import { Activity, Droplet, Heart, Scale } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ServicesSection() {
  const benefits = [
    {
      icon: <Activity className="w-10 h-10" />,
      title: "Supports Metabolism & Enzyme Functions",
      description: "Essential minerals aid in optimal metabolic processes and enzyme activity"
    },
    {
      icon: <Droplet className="w-10 h-10" />,
      title: "Improves Hydration & Absorption",
      description: "Mineralized water is absorbed more efficiently by body cells"
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Prevents Mineral Deficiency",
      description: "Protects against health issues related to mineral deficiencies"
    },
    {
      icon: <Scale className="w-10 h-10" />,
      title: "Maintains Natural Body Balance",
      description: "Helps maintain optimal pH and electrolyte balance in the body"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-blue-950/30" id="services">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6" data-testid="text-services-headline">
            Health Benefits
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the transformative power of mineral-enriched water for your overall well-being
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-12 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 text-blue-600 dark:text-blue-400">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/health">
            <Button size="lg" variant="default" className="px-10">
              Discover All Benefits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
