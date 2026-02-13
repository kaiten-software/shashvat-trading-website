import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery<any[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      const all = await res.json();
      return all.slice(0, 6); // Show first 6 products
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Products</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
          </div>
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
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Products</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of premium plastic resins from leading global manufacturers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item: any, index: number) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
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
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 shadow-sm border border-gray-100">
                        {item.company.name}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    {item.categories && item.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.categories.slice(0, 2).map((cat: any) => (
                          <Badge key={cat.id} variant="outline" className="text-xs">
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {item.product.name}
                    </h3>
                    {item.product.shortDescription && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.product.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:translate-x-1 transition-transform pt-2 border-t border-gray-50 mt-auto">
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
