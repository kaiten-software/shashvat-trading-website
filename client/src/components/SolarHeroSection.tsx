import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, ArrowRight, Zap } from "lucide-react";

export default function SolarHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-amber-50/20 pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-100/10 to-amber-100/10 rounded-full blur-3xl"></div>
        
        {/* Subtle rays effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-300/40 via-transparent to-transparent transform -rotate-12"></div>
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-green-300/30 via-transparent to-transparent transform rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-shadow">
            <Sun className="w-4 h-4" />
            <span>Premium Solar EPC Solutions</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground mb-6 leading-[1.1]">
            Clean. Powerful.
            <br />
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-amber-500 bg-clip-text text-transparent font-semibold">
              Affordable Solar
            </span>
            <br />
            <span className="text-5xl md:text-6xl lg:text-7xl">for Every Home.</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground mb-10 max-w-4xl mx-auto">
            End-to-end EPC solutions with guaranteed performance & worry-free installation
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="px-10 py-7 text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl transition-all group"
              >
                Book Free Site Visit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="px-10 py-7 text-lg border-2 border-green-600 text-green-700 hover:bg-green-50 group"
              >
                Get Solar Quote
                <Zap className="ml-2 w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <div className="text-sm text-muted-foreground">Years Warranty</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Transparent Pricing</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                3-5
              </div>
              <div className="text-sm text-muted-foreground">Years ROI</div>
            </div>
          </div>

          {/* Location Badge */}
          <div className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-lg">
            <span className="text-2xl">📍</span>
            <span className="text-base font-medium text-foreground">Based in Jaipur, Rajasthan</span>
            <span className="text-2xl">☀️</span>
            <span className="text-base font-medium text-foreground">Serving Pan-India</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-green-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
