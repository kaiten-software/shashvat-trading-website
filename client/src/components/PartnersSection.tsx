export default function PartnersSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-50/30 via-blue-50/30 to-green-50/30 dark:from-orange-950/5 dark:via-blue-950/5 dark:to-green-950/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-start justify-center gap-12 md:gap-16">
            <div className="text-center max-w-[200px]">
              <div className="text-6xl mb-4">🏔️</div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Born in Tottori</h3>
              <p className="text-sm text-muted-foreground">Japan's pristine water heritage</p>
            </div>
            
            <div className="text-center max-w-[200px]">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">45+ Years Research</h3>
              <p className="text-sm text-muted-foreground">Patented technology proven worldwide</p>
            </div>
            
            <div className="text-center max-w-[200px]">
              <div className="text-6xl mb-4">🌏</div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Now in India</h3>
              <p className="text-sm text-muted-foreground">Serving communities nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
