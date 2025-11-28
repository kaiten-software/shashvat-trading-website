import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ScenicSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-r from-blue-900 to-cyan-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              🇯🇵 Japanese Innovation Since 1979
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              The Visionary Behind Shizensui
            </h2>
            
            <div className="space-y-4 text-lg text-blue-50">
              <p className="leading-relaxed">
                At 86 years old, <strong className="text-white">Shigeyoshi Morita</strong> from Tottori, Japan, has dedicated over 45 years to perfecting water purification technology.
              </p>
              <p className="leading-relaxed">
                His patented 3-step process—<strong className="text-white">Precipitation, Decomposition, and Aggregation</strong>—restores water to its natural mineral balance, unlike conventional systems that strip away essential nutrients.
              </p>
              <p className="leading-relaxed">
                Born from a deep respect for nature's wisdom, Shizensui represents decades of research, innovation, and an unwavering commitment to human health.
              </p>
            </div>

            <Link href="/about">
              <Button 
                size="lg" 
                variant="secondary"
                className="mt-6 bg-white text-blue-900 hover:bg-blue-50"
              >
                Read Our Complete Story
              </Button>
            </Link>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="text-8xl md:text-9xl">💧</div>
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-bold">45+</p>
                  <p className="text-lg text-blue-100">Years of Research</p>
                </div>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-sm text-blue-100 italic">
                    "Water, like life, must maintain its natural balance"
                  </p>
                  <p className="text-xs text-blue-200 mt-2">— Shigeyoshi Morita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
