import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Building2, 
  Globe, 
  ExternalLink,
  Phone,
  MessageCircle
} from "lucide-react";

export default function Partners() {
  const { data: companies = [], isLoading } = useQuery<any[]>({
    queryKey: ["companies"],
    queryFn: async () => (await fetch("/api/companies")).json(),
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Static partner info for the major brands
  const majorPartners = [
    {
      name: "LG Chem",
      description: "Global leader in chemical and advanced materials. LG Chem produces a wide range of petrochemicals including ABS, engineering plastics, and synthetic rubbers.",
      country: "South Korea",
      products: ["ABS", "Engineering Plastics", "Synthetic Rubber"]
    },
    {
      name: "Formosa Plastics",
      description: "One of the world's largest PVC and polyolefin producers. Known for TAIRILOY PC, TAIRILAC ABS, and TAIRISAN SAN brands.",
      country: "Taiwan",
      products: ["PC", "ABS", "SAN", "PVC"]
    },
    {
      name: "IRPC",
      description: "Thailand's leading integrated petrochemical company producing POLIMAXX ABS and other polymers.",
      country: "Thailand",
      products: ["ABS", "Polypropylene", "Polyethylene"]
    },
    {
      name: "Styrenix",
      description: "Leading manufacturer of polystyrene resins including PS GPPS and PS HIPS for various applications.",
      country: "India",
      products: ["GPPS", "HIPS", "EPS"]
    },
    {
      name: "Trinseo",
      description: "Global materials solutions provider specializing in plastics, latex binders, and synthetic rubber.",
      country: "USA",
      products: ["Polystyrene", "ABS", "Polycarbonate"]
    },
    {
      name: "INEOS Styrolution",
      description: "The world's leading styrenics supplier with a focus on customer-centric innovation and sustainability.",
      country: "Germany",
      products: ["ABS", "ASA", "SAN", "Polystyrene"]
    },
    {
      name: "Sasol",
      description: "Integrated chemicals and energy company producing a range of commodity and performance chemicals.",
      country: "South Africa",
      products: ["Polyethylene", "Polypropylene", "Specialty Chemicals"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 mb-6">
              Our Partners
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Global <span className="text-emerald-400">Partner Network</span>
            </h1>
            <p className="text-xl text-emerald-100">
              We work with the world's leading petrochemical companies to bring you 
              premium quality thermoplastics and engineering resins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "7+", label: "Major Partners" },
              { value: "10+", label: "Countries" },
              { value: "100+", label: "Products" },
              { value: "2017", label: "Since" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've established strong relationships with industry-leading manufacturers 
              to ensure reliable supply and competitive pricing.
            </p>
          </div>

          {/* Display from CMS if available */}
          {companies.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {companies.map((company: any, index: number) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} className="h-16 w-16 object-contain" />
                        ) : (
                          <div className="h-16 w-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-emerald-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
                          {company.country && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Globe className="h-4 w-4" />
                              {company.country}
                            </div>
                          )}
                        </div>
                      </div>
                      {company.description && (
                        <p className="text-gray-600 text-sm mb-4">{company.description}</p>
                      )}
                      {company.website && (
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-emerald-600 text-sm flex items-center gap-1 hover:underline"
                        >
                          Visit Website <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Static Partner Cards */}
          {companies.length === 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {majorPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{partner.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Globe className="h-4 w-4" />
                            {partner.country}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {partner.products.map((product) => (
                          <Badge key={product} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our growing network of suppliers and customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Reach",
                desc: "Access to markets in North America and Asia through our Canada and India offices."
              },
              {
                title: "Market Expertise",
                desc: "Deep understanding of regional markets, pricing trends, and customer requirements."
              },
              {
                title: "Reliable Operations",
                desc: "Efficient logistics and consistent delivery ensuring your supply chain stability."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-8">
                    <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become a Partner
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Whether you're a manufacturer looking to expand your reach or a business 
            seeking reliable supply, we'd love to work with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
            <a href="tel:+919820191117">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
