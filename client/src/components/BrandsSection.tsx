export default function BrandsSection() {
  const panelBrands = [
    {
      name: "Adani Solar",
      logo: "/images/brands/panel/Adani Solar.png",
      category: "Solar Panels"
    },
    {
      name: "INA",
      logo: "/images/brands/panel/INA.png",
      category: "Solar Panels"
    },
    {
      name: "Premier Energies",
      logo: "/images/brands/panel/Premier Energies.png",
      category: "Solar Panels"
    },
    {
      name: "Rayzon Solar",
      logo: "/images/brands/panel/Rayzon Solar.jpg",
      category: "Solar Panels"
    },
    {
      name: "Renew Power",
      logo: "/images/brands/panel/Renew Power.jpg",
      category: "Solar Panels"
    },
    {
      name: "Tata Power Solar",
      logo: "/images/brands/panel/Tata Power Solar.jpg",
      category: "Solar Panels"
    },
    {
      name: "Usha Shriram",
      logo: "/images/brands/panel/Usha Shriram.png",
      category: "Solar Panels"
    },
    {
      name: "WAAREE",
      logo: "/images/brands/panel/WAAREE.jpg",
      category: "Solar Panels"
    },
    {
      name: "Luminous",
      logo: "/images/brands/panel/Luminious.jpg",
      category: "Solar Panels"
    }
  ];

  const inverterBrands = [
    {
      name: "Frelit",
      logo: "/images/brands/Inverter/Frelit.jpg",
      category: "Inverters"
    },
    {
      name: "K Solare",
      logo: "/images/brands/Inverter/K Solare.jpg",
      category: "Inverters"
    },
    {
      name: "Luminous",
      logo: "/images/brands/Inverter/Luminious.jpg",
      category: "Inverters"
    },
    {
      name: "PV Blink",
      logo: "/images/brands/Inverter/PV blink.png",
      category: "Inverters"
    },
    {
      name: "Power One",
      logo: "/images/brands/Inverter/Power One.png",
      category: "Inverters"
    },
    {
      name: "VSOLE",
      logo: "/images/brands/Inverter/VSOLE.jpg",
      category: "Inverters"
    },
    {
      name: "Waaree",
      logo: "/images/brands/Inverter/Waaree.jpg",
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

        {/* Solar Panels Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Solar <span className="text-green-600">Panels</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            {panelBrands.map((brand, index) => (
              <div 
                key={index}
                className="group"
              >
                <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[140px]">
                  <div className="flex items-center justify-center w-full h-20">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = 'none';
                        const textFallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (textFallback) textFallback.style.display = 'block';
                      }}
                    />
                    <div className="text-lg font-bold text-gray-700 group-hover:text-green-600 transition-colors hidden">
                      {brand.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inverters Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Solar <span className="text-amber-600">Inverters</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {inverterBrands.map((brand, index) => (
              <div 
                key={index}
                className="group"
              >
                <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[140px]">
                  <div className="flex items-center justify-center w-full h-20">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = 'none';
                        const textFallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (textFallback) textFallback.style.display = 'block';
                      }}
                    />
                    <div className="text-lg font-bold text-gray-700 group-hover:text-amber-600 transition-colors hidden">
                      {brand.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
