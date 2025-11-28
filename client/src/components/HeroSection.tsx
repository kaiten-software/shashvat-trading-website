import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-white dark:bg-background mesh-gradient-blue pt-24 md:pt-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-200/20 to-blue-200/20 dark:from-green-800/10 dark:to-blue-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-medium mb-8 shadow-lg">
          Japanese Technology Now in India
        </div>
        
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontStyle: 'normal' }} data-testid="text-hero-headline">
            Pure Water,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Naturally Mineralized</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground mb-8">
            45+ years of Japanese water purification innovation, now in India
          </p>
        </div>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed" data-testid="text-hero-subheadline">
          Shizensui brings revolutionary 3-step water purification technology from Japan to Indian families. 
          Advanced filtration with 30+ essential minerals preserved naturally.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link href="/products">
            <Button 
              size="lg" 
              variant="default"
              className="px-10 py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              data-testid="button-hero-cta"
            >
              View Water Purifiers
            </Button>
          </Link>
          <Link href="/water-life-series">
            <Button 
              size="lg" 
              variant="outline"
              className="px-10 py-6 text-lg border-2"
            >
              Natural Cosmetics
            </Button>
          </Link>
          <Link href="/technology">
            <Button 
              size="lg" 
              variant="outline"
              className="px-10 py-6 text-lg border-2"
            >
              Our Technology
            </Button>
          </Link>
        </div>

        {/* Stats - Clean Text Style */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 max-w-6xl mx-auto">
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-yellow-600 to-pink-600 bg-clip-text text-transparent block mb-2">45+</span>
            <span className="text-sm text-muted-foreground">Years of Research</span>
          </div>
          
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-600 to-rose-600 bg-clip-text text-transparent block mb-2">99.8%</span>
            <span className="text-sm text-muted-foreground">Virus Reduction</span>
          </div>
          
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-emerald-600 to-cyan-600 bg-clip-text text-transparent block mb-2">30+</span>
            <span className="text-sm text-muted-foreground">Essential Minerals</span>
          </div>
          
          <div className="text-center">
            <span className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent block mb-2">300L</span>
            <span className="text-sm text-muted-foreground">Purified per Bottle</span>
          </div>
        </div>

        {/* Japanese Innovation badge */}
  <div className="mt-12 mb-12 inline-flex items-center gap-3 px-8 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full border-2 border-blue-300 dark:border-blue-700 shadow-lg">
          <span className="text-3xl">🇯🇵</span>
          <span className="text-base font-semibold text-foreground">Japanese Innovation</span>
          <span className="text-2xl">×</span>
          <span className="text-3xl">🇮🇳</span>
          <span className="text-base font-semibold text-foreground">Indian Future</span>
        </div>

      </div>
    </section>
  );
}
