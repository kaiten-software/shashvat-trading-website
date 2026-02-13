import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";

export default function BrandsSection() {
  const { data: companies = [] } = useQuery<any[]>({
    queryKey: ["companies"],
    queryFn: async () => (await fetch("/api/companies")).json(),
  });

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

        {/* Partners Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {companies.map((company, index) => (
              <div
                key={company.id || index}
                className="group h-full"
              >
                <div className="p-6 h-full bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center min-h-[160px]">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-h-16 max-w-[80%] object-contain mb-4 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <Building2 className="h-12 w-12 text-gray-300 mb-4 group-hover:text-green-500 transition-colors" />
                  )}
                  <div className="text-xl font-bold text-gray-700 group-hover:text-green-600 transition-colors text-center">
                    {company.name}
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
