export default function BrandsSection() {
  const globalProducers = [
    {
      name: "LG Chem",
      logo: "/images/brands/lgchem.png",
      region: "South Korea"
    },
    {
      name: "Formosa Plastics",
      logo: "/images/brands/formosa.png",
      region: "Taiwan"
    },
    {
      name: "IRPC",
      logo: "/images/brands/irpc.png",
      region: "Thailand"
    },
    {
      name: "INEOS Styrolution",
      logo: "/images/brands/ineos.png",
      region: "Germany"
    },
    {
      name: "Trinseo",
      logo: "/images/brands/trinseo.png",
      region: "USA"
    },
    {
      name: "Styrenix",
      logo: "/images/brands/styrenix.png",
      region: "India"
    },
    {
      name: "Sasol",
      logo: "/images/brands/sasol.png",
      region: "South Africa"
    },
    {
      name: "SABIC",
      logo: "/images/brands/sabic.png",
      region: "Saudi Arabia"
    }
  ];

  const additionalPartners = [
    {
      name: "Reliance Industries",
      logo: "/images/brands/reliance.png",
      region: "India"
    },
    {
      name: "Braskem",
      logo: "/images/brands/braskem.png",
      region: "Brazil"
    },
    {
      name: "PTT Global Chemical",
      logo: "/images/brands/pttgc.png",
      region: "Thailand"
    },
    {
      name: "Lotte Chemical",
      logo: "/images/brands/lotte.png",
      region: "South Korea"
    },
    {
      name: "Indorama Ventures",
      logo: "/images/brands/indorama.png",
      region: "Thailand"
    },
    {
      name: "Mitsubishi Chemical",
      logo: "/images/brands/mitsubishi.png",
      region: "Japan"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-5)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Our <span className="font-semibold text-green-600">Global Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We source from the world's leading petrochemical producers
          </p>
        </div>

        {/* Primary Producers Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Premier <span className="text-green-600">Producers</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {globalProducers.map((brand, index) => (
              <div 
                key={index}
                className="group"
              >
                <div className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[140px]">
                  <div className="text-xl font-bold text-gray-700 group-hover:text-green-600 transition-colors text-center mb-2">
                    {brand.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {brand.region}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Partners Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Strategic <span className="text-amber-600">Partners</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {additionalPartners.map((brand, index) => (
              <div 
                key={index}
                className="group"
              >
                <div className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[120px]">
                  <div className="text-lg font-bold text-gray-700 group-hover:text-amber-600 transition-colors text-center mb-1">
                    {brand.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {brand.region}
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
            <h3 className="font-semibold text-foreground mb-2">Certified Quality</h3>
            <p className="text-sm text-muted-foreground">All products meet international standards</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="font-semibold text-foreground mb-2">Global Network</h3>
            <p className="text-sm text-muted-foreground">Sourcing from 20+ countries</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-semibold text-foreground mb-2">Trusted Relationships</h3>
            <p className="text-sm text-muted-foreground">Long-standing partnerships since 2017</p>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            All materials come with quality certificates and technical data sheets
          </p>
        </div>
      </div>
    </section>
  );
}
