export default function BrandsSection() {
  const brands = [
    {
      name: "Adani Solar",
      logo: "https://www.adanigreenenergy.com/-/media/Project/Adani/Businesses/Green-Energy/Adani-Green-Energy/logo/logo-agel.svg",
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
      logo: "https://www.havells.com/content/dam/havells/india/images/logo.png",
      category: "Inverters"
    },
    {
      name: "Fronius",
      logo: "https://www.fronius.com/~/downloads/Solar%20Energy/Banner/fronius-logo.svg",
      category: "Inverters"
    },
    {
      name: "SMA",
      logo: "https://files.sma.de/downloads/SMA_Logo-2023.svg",
      category: "Inverters"
    },
    {
      name: "Growatt",
      logo: "https://en.growatt.com/Content/images/logo.png",
      category: "Inverters"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-5)' }}>
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
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="h-16 flex items-center justify-center mb-4 w-full">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = 'none';
                        const textFallback = e.currentTarget.nextElementSibling;
                        if (textFallback) textFallback.style.display = 'block';
                      }}
                    />
                    <div className="text-xl font-bold text-gray-700 group-hover:text-green-600 transition-colors hidden">
                      {brand.name}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground px-3 py-1 bg-gray-100 rounded-full">
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
