import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Package,
  Search,
  Filter,
  Loader2,
  RefreshCw,
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown
} from "lucide-react";

interface Product {
  product: {
    id: number;
    name: string;
    slug: string;
    heroImage: string | null;
    shortDescription: string | null;
  };
  company: { id: number; name: string } | null;
  categories: { id: number; name: string }[];
  features: { id: number; name: string }[];
  applications: { id: number; name: string }[];
}

export default function HomeProductFilter() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
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

  const { data: applications = [] } = useQuery<any[]>({
    queryKey: ["applications"],
    queryFn: async () => (await fetch("/api/applications")).json(),
  });

  // Filtered products with instant refresh
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((item) => {
      const matchesSearch = !searchQuery ||
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory ||
        item.categories?.some((cat) => cat.id.toString() === selectedCategory);

      const matchesCompany = !selectedCompany ||
        item.company?.id.toString() === selectedCompany;

      const matchesApplication = !selectedApplication ||
        item.applications?.some((app) => app.id.toString() === selectedApplication);

      return matchesSearch && matchesCategory && matchesCompany && matchesApplication;
    });
  }, [products, searchQuery, selectedCategory, selectedCompany, selectedApplication]);

  // Show refresh indicator when filters change
  useEffect(() => {
    if (selectedCategory || selectedCompany || selectedApplication || searchQuery) {
      setIsRefreshing(true);
      const timer = setTimeout(() => setIsRefreshing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, selectedCompany, selectedApplication, searchQuery]);

  const hasActiveFilters = selectedCategory || selectedCompany || selectedApplication || searchQuery;

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCompany("");
    setSelectedApplication("");
    setSearchQuery("");
  };

  const displayProducts = filteredProducts.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge className="bg-emerald-100 text-emerald-700 mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Quick Product Finder
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your <span className="text-emerald-600">Perfect Material</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use filters to quickly find the plastic resins you need. Results update instantly as you select.
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white border-gray-200"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 border rounded-lg bg-white text-gray-700 min-w-[180px]"
            >
              <option value="">All Categories</option>
              {Array.isArray(categories) && categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Company */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="h-12 px-4 border rounded-lg bg-white text-gray-700 min-w-[180px]"
            >
              <option value="">All Manufacturers</option>
              {Array.isArray(companies) && companies.map((company: any) => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>

            {/* Application */}
            <select
              value={selectedApplication}
              onChange={(e) => setSelectedApplication(e.target.value)}
              className="h-12 px-4 border rounded-lg bg-white text-gray-700 min-w-[180px]"
            >
              <option value="">All Applications</option>
              {Array.isArray(applications) && applications.map((app: any) => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="h-12">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Header with Loading Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isRefreshing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating results...
                </motion.div>
              )}
            </AnimatePresence>
            {!isRefreshing && (
              <motion.p
                key={filteredProducts.length}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gray-600"
              >
                Showing <span className="font-semibold text-emerald-600">{displayProducts.length}</span> of {filteredProducts.length} products
              </motion.p>
            )}
          </div>

          <Link href="/products">
            <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : displayProducts.length > 0 ? (
          <motion.div
            key={`${selectedCategory}-${selectedCompany}-${selectedApplication}-${searchQuery}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {displayProducts.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/products/${item.product.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer group overflow-hidden flex flex-col">
                    <div className="aspect-[4/3] bg-white border-b border-gray-100 relative overflow-hidden flex items-center justify-center p-2">
                      {item.product.heroImage ? (
                        <img
                          src={item.product.heroImage}
                          alt={item.product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <Package className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                      {item.company && (
                        <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700 text-xs shadow-sm border border-gray-100">
                          {item.company.name}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      {item.categories && item.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.categories.slice(0, 1).map((cat) => (
                            <Badge key={cat.id} variant="outline" className="text-xs">
                              {cat.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.product.shortDescription || "Premium quality resin"}
                      </p>
                      <div className="flex items-center text-emerald-600 text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform pt-2 border-t border-gray-50 mt-auto">
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* View All Products CTA */}
        {filteredProducts.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/products">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                View All {filteredProducts.length} Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
