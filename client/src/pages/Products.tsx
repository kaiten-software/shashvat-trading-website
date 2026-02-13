import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import {
  ArrowRight,
  Search,
  Package,
  X,
  Phone,
  MessageCircle
} from "lucide-react";

const SEARCH_CONTEXT_KEY = 'shashvat_product_search_context';

export default function Products() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: async () => (await fetch("/api/products")).json(),
  });

  const { data: categories = [] } = useQuery<any[]>({
    queryKey: ["categories"],
    queryFn: async () => (await fetch("/api/categories")).json(),
  });

  const { data: companies = [] } = useQuery<any[]>({
    queryKey: ["companies"],
    queryFn: async () => (await fetch("/api/companies")).json(),
  });

  const filteredProducts = useMemo(() => {
    return products.filter((item: any) => {
      const matchesSearch =
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory ||
        item.categories?.some((cat: any) => cat.id.toString() === selectedCategory);

      const matchesCompany = !selectedCompany ||
        item.company?.id.toString() === selectedCompany;

      return matchesSearch && matchesCategory && matchesCompany;
    });
  }, [products, searchQuery, selectedCategory, selectedCompany]);

  // Save search context and navigate to product
  const handleProductClick = useCallback((productSlug: string) => {
    // Save current search state to sessionStorage for prev/next navigation
    const context = {
      companyId: selectedCompany,
      categoryId: selectedCategory,
      searchQuery: searchQuery,
      productIds: filteredProducts.map((p: any) => p.product.id),
      timestamp: Date.now(),
    };
    sessionStorage.setItem(SEARCH_CONTEXT_KEY, JSON.stringify(context));
    navigate(`/products/${productSlug}`);
  }, [filteredProducts, selectedCompany, selectedCategory, searchQuery, navigate]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedCompany(null);
  };

  const handleFilterChange = (setter: (val: string | null) => void, value: string | null) => {
    setter(value);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedCompany;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Static product categories for display when no products exist
  const staticCategories = [
    { name: "Polypropylene (PP)", desc: "Versatile thermoplastic for packaging, automotive, and consumer goods" },
    { name: "Polyethylene (PE)", desc: "LDPE, LLDPE, HDPE for films, containers, and pipes" },
    { name: "PVC", desc: "Rigid and flexible applications in construction and packaging" },
    { name: "ABS Resins", desc: "High-impact engineering plastic for automotive and electronics" },
    { name: "Polystyrene (PS)", desc: "GPPS and HIPS for packaging and consumer products" },
    { name: "Engineering Plastics", desc: "PC, PA, and specialty resins for demanding applications" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 mb-6">
              Our Products
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium <span className="text-emerald-400">Plastic Resins</span>
            </h1>
            <p className="text-xl text-emerald-100">
              Explore our comprehensive range of virgin, near-prime, and reprocessed
              commodity plastics from leading global manufacturers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory || ""}
              onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value || null)}
              className="h-10 px-4 border rounded-lg bg-white text-gray-700 w-full md:w-48"
            >
              <option value="">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Company Filter */}
            <select
              value={selectedCompany || ""}
              onChange={(e) => handleFilterChange(setSelectedCompany, e.target.value || null)}
              className="h-10 px-4 border rounded-lg bg-white text-gray-700 w-full md:w-48"
            >
              <option value="">All Manufacturers</option>
              {companies.map((company: any) => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item: any, index: number) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div
                    onClick={() => handleProductClick(item.product.slug)}
                    className="cursor-pointer"
                  >
                    <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        {item.product.heroImage ? (
                          <img
                            src={item.product.heroImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                            <Package className="h-12 w-12 text-emerald-300" />
                          </div>
                        )}
                        {item.company && (
                          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700">
                            {item.company.name}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        {item.categories && item.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.categories.slice(0, 2).map((cat: any) => (
                              <Badge key={cat.id} variant="outline" className="text-xs">
                                {cat.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {item.product.shortDescription || "High-quality thermoplastic resin"}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-emerald-600 text-sm font-medium">
                          View Details <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : products.length === 0 ? (
            // Show static categories when no products in database
            <div>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Categories</h2>
                <p className="text-gray-600">
                  We supply a wide range of thermoplastics. Contact us for availability and pricing.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staticCategories.map((cat, index) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                        <Package className="h-16 w-16 text-emerald-300" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{cat.name}</h3>
                        <p className="text-gray-600 text-sm">{cat.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-emerald-100 mb-8">
            Contact us with your requirements and we'll source the right materials for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                Send Inquiry
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
