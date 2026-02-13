import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductInquiryModal from "@/components/ProductInquiryModal";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  Download,
  Package,
  CheckCircle,
  Building2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Search,
  MessageCircle,
  X
} from "lucide-react";

// Constants
const SEARCH_CONTEXT_KEY = 'shashvat_product_search_context';

interface SearchContext {
  companyId?: string;
  categoryId?: string;
  searchQuery?: string;
  productIds: number[];
  timestamp: number;
}

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug;
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [searchContext, setSearchContext] = useState<SearchContext | null>(null);

  // Load search context from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem(SEARCH_CONTEXT_KEY);
    if (stored) {
      try {
        const context = JSON.parse(stored) as SearchContext;
        // Only use context if it's less than 30 minutes old
        if (Date.now() - context.timestamp < 30 * 60 * 1000) {
          setSearchContext(context);
        }
      } catch (e) {
        console.error('Failed to parse search context');
      }
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!slug,
  });

  // Fetch all products for navigation
  const { data: allProducts = [] } = useQuery<any[]>({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    },
  });

  // Related products - same company or category
  const relatedProducts = useMemo(() => {
    if (!data || !allProducts.length) return { sameCompany: [], sameCategory: [] };

    const sameCompany = allProducts
      .filter((p: any) =>
        p.product.slug !== slug &&
        p.company?.id === data.company?.id
      )
      .slice(0, 4);

    const categoryIds = data.categories?.map((c: any) => c.id) || [];
    const sameCategory = allProducts
      .filter((p: any) =>
        p.product.slug !== slug &&
        p.categories?.some((c: any) => categoryIds.includes(c.id))
      )
      .slice(0, 4);

    return { sameCompany, sameCategory };
  }, [data, allProducts, slug]);

  // Calculate prev/next products based on search context or all products
  const navigation = useMemo(() => {
    if (!data || !allProducts.length) return { prev: null, next: null };

    let productList = allProducts;

    // If we have a search context, use that order
    if (searchContext && searchContext.productIds.length > 0) {
      productList = searchContext.productIds
        .map(id => allProducts.find((p: any) => p.product.id === id))
        .filter(Boolean);
    }

    const currentIndex = productList.findIndex((p: any) => p.product.slug === slug);

    return {
      prev: currentIndex > 0 ? productList[currentIndex - 1] : null,
      next: currentIndex < productList.length - 1 ? productList[currentIndex + 1] : null,
      currentPosition: currentIndex + 1,
      totalCount: productList.length,
    };
  }, [data, allProducts, slug, searchContext]);

  const clearSearchContext = () => {
    sessionStorage.removeItem(SEARCH_CONTEXT_KEY);
    setSearchContext(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-96 bg-gray-200 rounded mb-8" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // API returns product fields at root level, not nested
  const product = data;
  const { company, categories, features, applications, images, documents } = data;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Search Context Banner */}
      {searchContext && (
        <div className="bg-emerald-50 border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Search className="h-4 w-4 text-emerald-600" />
                <span className="text-gray-600">
                  Viewing result {navigation.currentPosition} of {navigation.totalCount}
                  {searchContext.searchQuery && (
                    <> for "<span className="font-medium text-emerald-700">{searchContext.searchQuery}</span>"</>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/products">
                  <Button variant="ghost" size="sm" className="text-emerald-600">
                    New Search
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearchContext}
                  className="text-gray-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-emerald-600">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-gray-100 flex items-center justify-center">
                {product.heroImage ? (
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <Package className="h-24 w-24 text-gray-300" />
                  </div>
                )}
              </div>
              {images && images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img: any) => (
                    <div key={img.id} className="aspect-square bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-1">
                      <img src={img.imagePath} alt="" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {company && (
                <div className="flex items-center gap-2 mb-4">
                  {company.logo && (
                    <img src={company.logo} alt={company.name} className="h-8 object-contain" />
                  )}
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                    {company.name}
                  </Badge>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-xl text-gray-600 mb-6">
                  {product.shortDescription}
                </p>
              )}

              {/* Categories */}
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat: any) => (
                    <Badge key={cat.id} className="bg-gray-100 text-gray-700">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Features Quick List */}
              {features && features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {features.slice(0, 4).map((feat: any) => (
                      <li key={feat.id} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        {feat.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Accordions: Additional Details & Documents */}

              <Accordion type="single" collapsible className="w-full mb-8">
                <AccordionItem value="documents">
                  <AccordionTrigger>Documents</AccordionTrigger>
                  <AccordionContent>
                    {documents && documents.length > 0 ? (
                      <div className="space-y-3 pt-2">
                        {documents.map((doc: any) => (
                          <a
                            key={doc.id}
                            href={doc.filePath}
                            download={doc.fileName}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors group"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <FileText className="h-5 w-5 text-red-500 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">{doc.fileName || "Document"}</p>
                                {doc.fileSize && (
                                  <p className="text-xs text-gray-500">
                                    {(doc.fileSize / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                )}
                              </div>
                            </div>
                            <Download className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 py-2">No documents available.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setInquiryModalOpen(true)}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Request Quote
                </Button>
                <a href="tel:+919820191117">
                  <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </a>
              </div>

              {/* Quick Contact */}
              <Card className="bg-emerald-50 border-emerald-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-emerald-800 mb-4">Need Assistance?</h3>
                  <div className="space-y-3 text-sm">
                    <a href="tel:+919820191117" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                      <Phone className="h-4 w-4" />
                      India: +91 98201 91117
                    </a>
                    <a href="tel:+19058132169" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                      <Phone className="h-4 w-4" />
                      Canada: +1 905-813-2169
                    </a>
                    <a href="mailto:info@shashvattrading.com" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                      <Mail className="h-4 w-4" />
                      info@shashvattrading.com
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Details Banner */}
      <section className="bg-emerald-50 py-12 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 uppercase tracking-wide">
              Additional Details
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-900 font-medium">
            {product.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: product.contentHtml }} />
            ) : (
              <p>{product.shortDescription || "No additional details available."}</p>
            )}
          </div>
        </div>
      </section>



      {/* Product Navigation */}
      <section className="py-8 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {navigation.prev ? (
              <Link href={`/products/${navigation.prev.product.slug}`}>
                <Button variant="outline" className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous:</span>
                  <span className="font-medium truncate max-w-[150px]">{navigation.prev.product.name}</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            <Link href="/products">
              <Button variant="ghost" className="gap-2">
                <Package className="h-4 w-4" />
                All Products
              </Button>
            </Link>

            {navigation.next ? (
              <Link href={`/products/${navigation.next.product.slug}`}>
                <Button variant="outline" className="gap-2">
                  <span className="hidden sm:inline">Next:</span>
                  <span className="font-medium truncate max-w-[150px]">{navigation.next.product.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Related Products - Same Company */}
      {
        relatedProducts.sameCompany.length > 0 && company && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  More from {company.name}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.sameCompany.map((item: any) => (
                  <Link key={item.product.id} href={`/products/${item.product.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        {item.product.heroImage ? (
                          <img
                            src={item.product.heroImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-emerald-600 text-sm">
                          View Details <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      }

      {/* Related Products - Same Category */}
      {
        relatedProducts.sameCategory.length > 0 && categories && categories.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Similar Products in {categories[0]?.name}
                </h2>
                <Link href="/products">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.sameCategory.map((item: any) => (
                  <Link key={item.product.id} href={`/products/${item.product.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        {item.product.heroImage ? (
                          <img
                            src={item.product.heroImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {item.product.name}
                        </h3>
                        {item.company && (
                          <p className="text-sm text-gray-500 mt-1">{item.company.name}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-emerald-600 text-sm">
                          View Details <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      }

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in {product.name}?</h2>
          <p className="text-emerald-100 mb-8">
            Contact us today for competitive pricing and reliable supply.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50"
              onClick={() => setInquiryModalOpen(true)}
            >
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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

      {/* Product Inquiry Modal */}
      <ProductInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        selectedProductId={product.id}
        selectedProductName={product.name}
      />
    </div>
  );
}
