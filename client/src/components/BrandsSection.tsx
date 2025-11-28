export default function BrandsSection() {
  const brands = [
    {
      name: "Adani Solar",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Adani_2012.svg/320px-Adani_2012.svg.png",
      category: "Solar Panels"
    },
    {
      name: "Vikram Solar",
      logo: "https://www.vikramsolar.com/wp-content/themes/vikram-child/assets/images/logo.svg",
      category: "Solar Panels"
    },
    {
      name: "Waaree",
      logo: "https://waaree.com/assets/images/logo.png",
      category: "Solar Panels"
    },
    {
      name: "Luminous",
      logo: "https://www.luminousindia.com/documents/286775/301080/logo.svg",
      category: "Inverters"
    },
    {
      name: "Havells",
      logo: "https://www.havells.com/content/dam/havells/global/logos/havells-logo.png",
      category: "Inverters"
    },
    {
      name: "Fronius",
      logo: "https://www.fronius.com/~/downloads/Solar%20Energy/Banner/fronius-logo.svg",
      category: "Inverters"
    },
    {
      name: "SMA",
      logo: "https://www.sma.de/typo3conf/ext/wwt_sma/Resources/Public/Images/logo.svg",
      category: "Inverters"
    },
    {
      name: "Growatt",
      logo: "https://www.ginverter.com/images/logo.png",
      category: "Inverters"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Premium <span className="font-semibold text-green-600">Tier-1 Brands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We partner with the world's most trusted solar equipment manufacturers
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="group"
            >
              <div className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[160px]">
                {/* Logo placeholder - using text since actual logos need proper attribution */}
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-gray-700 group-hover:text-green-600 transition-colors mb-2">
                    {brand.name}
                  </div>
                  <div className="text-xs text-muted-foreground px-3 py-1 bg-gray-100 rounded-full inline-block">
                    {brand.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="font-semibold text-foreground mb-2">Tier-1 Certified</h3>
            <p className="text-sm text-muted-foreground">Top-rated manufacturers globally</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-foreground mb-2">25+ Years Warranty</h3>
            <p className="text-sm text-muted-foreground">Performance guarantees on panels</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-semibold text-foreground mb-2">Proven Track Record</h3>
            <p className="text-sm text-muted-foreground">Billions of watts installed worldwide</p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            All equipment comes with manufacturer warranties and our quality guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
