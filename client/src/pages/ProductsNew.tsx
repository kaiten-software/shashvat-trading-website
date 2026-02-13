import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ArrowRight,
  Search,
  Package,
  X,
  Phone,
  MessageCircle,
  Filter,
  SlidersHorizontal,
  Loader2,
  ChevronDown,
  ChevronUp,
  Grid3X3,
  List,
  RefreshCw,
  CheckCircle
} from "lucide-react";

const SEARCH_CONTEXT_KEY = 'shashvat_product_search_context';

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

export default function Products() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Expandable filter sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    companies: true,
    features: false,
    applications: false,
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
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

  const { data: features = [] } = useQuery<any[]>({
    queryKey: ["features"],
    queryFn: async () => (await fetch("/api/features")).json(),
  });

  const { data: applications = [] } = useQuery<any[]>({
    queryKey: ["applications"],
    queryFn: async () => (await fetch("/api/applications")).json(),
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((item: Product) => {
      const matchesSearch = !searchQuery ||
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategories = selectedCategories.length === 0 ||
        item.categories?.some((cat) => selectedCategories.includes(cat.id.toString()));

      const matchesCompanies = selectedCompanies.length === 0 ||
        (item.company && selectedCompanies.includes(item.company.id.toString()));

      const matchesFeatures = selectedFeatures.length === 0 ||
        item.features?.some((feat) => selectedFeatures.includes(feat.id.toString()));

      const matchesApplications = selectedApplications.length === 0 ||
        item.applications?.some((app) => selectedApplications.includes(app.id.toString()));

      return matchesSearch && matchesCategories && matchesCompanies && matchesFeatures && matchesApplications;
    });
  }, [products, searchQuery, selectedCategories, selectedCompanies, selectedFeatures, selectedApplications]);

  // Show refresh indicator on filter change
  useEffect(() => {
    const hasFilters = selectedCategories.length > 0 || selectedCompanies.length > 0 ||
      selectedFeatures.length > 0 || selectedApplications.length > 0 || searchQuery;
    if (hasFilters) {
      setIsRefreshing(true);
      const timer = setTimeout(() => setIsRefreshing(false), 400);
      return () => clearTimeout(timer);
    }
  }, [selectedCategories, selectedCompanies, selectedFeatures, selectedApplications, searchQuery]);

  // Save search context and navigate to product
  const handleProductClick = useCallback((productSlug: string) => {
    const context = {
      categoryIds: selectedCategories,
      companyIds: selectedCompanies,
      featureIds: selectedFeatures,
      applicationIds: selectedApplications,
      searchQuery: searchQuery,
      productIds: filteredProducts.map((p: Product) => p.product.id),
      timestamp: Date.now(),
    };
    sessionStorage.setItem(SEARCH_CONTEXT_KEY, JSON.stringify(context));
    navigate(`/products/${productSlug}`);
  }, [filteredProducts, selectedCategories, selectedCompanies, selectedFeatures, selectedApplications, searchQuery, navigate]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setSelectedFeatures([]);
    setSelectedApplications([]);
  };

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 ||
    selectedCompanies.length > 0 || selectedFeatures.length > 0 || selectedApplications.length > 0;

  const activeFilterCount = selectedCategories.length + selectedCompanies.length +
    selectedFeatures.length + selectedApplications.length + (searchQuery ? 1 : 0);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Filter Section Render Function
  const renderFilterSection = ({
    title,
    items,
    selected,
    setSelected,
    sectionKey
  }: {
    title: string;
    items: any[];
    selected: string[];
    setSelected: (val: string[]) => void;
    sectionKey: keyof typeof expandedSections;
  }) => (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
              {selected.length}
            </Badge>
          )}
          {expandedSections[sectionKey] ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {expandedSections[sectionKey] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-2 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <Checkbox
                    checked={selected.includes(item.id.toString())}
                    onCheckedChange={() =>
                      toggleSelection(item.id.toString(), selected, setSelected)
                    }
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Sidebar Filters Render Function
  const renderFilters = () => (
    <div className="space-y-4">
      {/* Search in Sidebar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All Filters ({activeFilterCount})
        </Button>
      )}

      {renderFilterSection({
        title: "Categories",
        items: categories,
        selected: selectedCategories,
        setSelected: setSelectedCategories,
        sectionKey: "categories"
      })}

      {renderFilterSection({
        title: "Manufacturers",
        items: companies,
        selected: selectedCompanies,
        setSelected: setSelectedCompanies,
        sectionKey: "companies"
      })}

      {renderFilterSection({
        title: "Features",
        items: features,
        selected: selectedFeatures,
        setSelected: setSelectedFeatures,
        sectionKey: "features"
      })}

      {renderFilterSection({
        title: "Applications",
        items: applications,
        selected: selectedApplications,
        setSelected: setSelectedApplications,
        sectionKey: "applications"
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 mb-4">
              Product Catalog
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Premium <span className="text-emerald-400">Plastic Resins</span>
            </h1>
            <p className="text-lg text-emerald-100">
              Explore our comprehensive catalog of virgin, near-prime, and reprocessed
              commodity plastics from leading global manufacturers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </h2>
                </div>
                {renderFilters()}
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
              <Button
                onClick={() => setShowMobileFilters(true)}
                className="bg-emerald-600 hover:bg-emerald-700 shadow-lg"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>

            {/* Mobile Filters Drawer */}
            <AnimatePresence>
              {showMobileFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setShowMobileFilters(false)}
                  />
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    className="fixed top-0 left-0 h-full w-80 bg-white z-50 p-6 overflow-y-auto lg:hidden"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-semibold text-lg">Filters</h2>
                      <button onClick={() => setShowMobileFilters(false)}>
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    {renderFilters()}
                    <Button
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Show {filteredProducts.length} Results
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    {isRefreshing ? (
                      <motion.div
                        key="refreshing"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-medium">Refreshing results...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="count"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-2"
                      >
                        {hasActiveFilters && (
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        )}
                        <p className="text-gray-700">
                          <span className="font-semibold text-emerald-600">{filteredProducts.length}</span>
                          {' '}product{filteredProducts.length !== 1 ? 's' : ''} found
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-emerald-600' : ''}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-emerald-600' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters Tags */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => setSearchQuery('')}
                    >
                      Search: {searchQuery} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                  {selectedCategories.map(id => {
                    const cat = categories.find(c => c.id.toString() === id);
                    return cat ? (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleSelection(id, selectedCategories, setSelectedCategories)}
                      >
                        {cat.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ) : null;
                  })}
                  {selectedCompanies.map(id => {
                    const company = companies.find(c => c.id.toString() === id);
                    return company ? (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleSelection(id, selectedCompanies, setSelectedCompanies)}
                      >
                        {company.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ) : null;
                  })}
                  {selectedFeatures.map(id => {
                    const feat = features.find(f => f.id.toString() === id);
                    return feat ? (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleSelection(id, selectedFeatures, setSelectedFeatures)}
                      >
                        {feat.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ) : null;
                  })}
                  {selectedApplications.map(id => {
                    const app = applications.find(a => a.id.toString() === id);
                    return app ? (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleSelection(id, selectedApplications, setSelectedApplications)}
                      >
                        {app.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ) : null;
                  })}
                </motion.div>
              )}

              {isLoading ? (
                <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : ''} gap-6`}>
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
                <motion.div
                  key={`${selectedCategories.join()}-${selectedCompanies.join()}`}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  className={viewMode === 'grid'
                    ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                  }
                >
                  {filteredProducts.map((item: Product, index: number) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.03, 0.5) }}
                    >
                      <div
                        onClick={() => handleProductClick(item.product.slug)}
                        className="cursor-pointer"
                      >
                        {viewMode === 'grid' ? (
                          <Card className="h-full hover:shadow-lg transition-all cursor-pointer group flex flex-col">
                            <div className="aspect-[4/3] bg-white border-b border-gray-100 relative overflow-hidden flex items-center justify-center p-2">
                              {item.product.heroImage ? (
                                <img
                                  src={item.product.heroImage}
                                  alt={item.product.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                  <Package className="h-12 w-12 text-gray-300" />
                                </div>
                              )}
                              {item.company && (
                                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 shadow-sm border border-gray-100">
                                  {item.company.name}
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4 flex-1 flex flex-col">
                              {item.categories && item.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {item.categories.slice(0, 2).map((cat) => (
                                    <Badge key={cat.id} variant="outline" className="text-xs">
                                      {cat.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {item.product.shortDescription || "High-quality thermoplastic resin"}
                              </p>
                              <div className="flex items-center gap-2 mt-auto text-emerald-600 text-sm font-medium pt-2 border-t border-gray-50">
                                View Details <ArrowRight className="h-4 w-4" />
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <Card className="hover:shadow-lg transition-all cursor-pointer group">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="w-32 h-24 flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-1">
                                  {item.product.heroImage ? (
                                    <img
                                      src={item.product.heroImage}
                                      alt={item.product.name}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                      <Package className="h-8 w-8 text-gray-300" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      {item.company && (
                                        <Badge className="mb-1 bg-emerald-100 text-emerald-700 text-xs">
                                          {item.company.name}
                                        </Badge>
                                      )}
                                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                        {item.product.name}
                                      </h3>
                                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                        {item.product.shortDescription || "High-quality thermoplastic resin"}
                                      </p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                  {item.categories && item.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {item.categories.slice(0, 3).map((cat) => (
                                        <Badge key={cat.id} variant="outline" className="text-xs">
                                          {cat.name}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
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
