import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function StatsSection() {
  const stats = [
    { value: "45+", label: "Years of Research" },
    { value: "99.8%", label: "Virus Reduction" },
    { value: "30+", label: "Essential Minerals Preserved" },
    { value: "300L", label: "Purified per Bottle" }
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Born in Tottori, Perfected over 45 Years
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Developed by an 86-year-old innovator, Shizensui restores water to its natural mineral balance using a patented 3-step process: Precipitation, Decomposition, Aggregation.
          </p>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Read Our Story
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center" 
              data-testid={`stat-${index}`}
            >
              <div className="text-5xl md:text-6xl font-bold mb-3 tabular-nums bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/technology">
            <Button size="lg" className="px-8">
              See Lab Reports
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
