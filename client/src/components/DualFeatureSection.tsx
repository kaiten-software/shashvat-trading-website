import { X, Check } from "lucide-react";

export default function DualFeatureSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Why Choose Shizensui
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* RO Water Card */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">
                Conventional
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent" data-testid="text-ro-water">
                RO Water
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Removes minerals → flat, "empty" water
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Strips away beneficial minerals</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Produces flat, tasteless water</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">May lead to mineral deficiencies</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Less effective hydration</p>
              </div>
            </div>
          </div>

          {/* Shizensui Card */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full text-sm font-semibold mb-4">
                Advanced
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent" data-testid="text-shizensui">
                Shizensui
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Adds natural minerals → healthier, balanced water
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Preserves 30+ essential minerals</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Natural, clean, refreshing taste</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Supports optimal health & body balance</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">Superior hydration & absorption</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">99.8% virus & bacteria elimination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
