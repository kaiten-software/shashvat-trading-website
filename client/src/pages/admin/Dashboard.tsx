import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FolderTree, Sparkles, Factory, Package, FileText, Settings, ArrowRight, LayoutDashboard, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [companies, categories, features, applications, products, posts] = await Promise.all([
        fetch("/api/companies").then(r => r.json()),
        fetch("/api/categories").then(r => r.json()),
        fetch("/api/features").then(r => r.json()),
        fetch("/api/applications").then(r => r.json()),
        fetch("/api/products").then(r => r.json()),
        fetch("/api/blog/posts").then(r => r.json()),
      ]);
      return {
        companies: companies.length || 0,
        categories: categories.length || 0,
        features: features.length || 0,
        applications: applications.length || 0,
        products: products.length || 0,
        posts: posts.length || 0,
      };
    },
  });

  const menuItems = [
    { href: "/admin/companies", icon: Building2, label: "Companies", desc: "Manage manufacturers", count: stats?.companies },
    { href: "/admin/categories", icon: FolderTree, label: "Categories", desc: "Product categories", count: stats?.categories },
    { href: "/admin/features", icon: Sparkles, label: "Features", desc: "Product features", count: stats?.features },
    { href: "/admin/applications", icon: Factory, label: "Applications", desc: "Industry applications", count: stats?.applications },
    { href: "/admin/products", icon: Package, label: "Products", desc: "Manage products", count: stats?.products },
    { href: "/admin/blog", icon: FileText, label: "Blog", desc: "Manage posts", count: stats?.posts },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Shashvat Admin</h1>
                <p className="text-gray-600">Manage your products, companies, and content</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline">View Website</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {menuItems.map((item) => (
            <Card key={item.label} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{item.count ?? "-"}</p>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Callback Requests - Minimal Navigation */}
        <Link href="/admin/callbacks">
          <Card className="mb-8 cursor-pointer hover:shadow-lg transition-shadow group border-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <MessageSquare className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">View Callback Requests</h3>
                    <p className="text-sm text-gray-600">Manage customer callback submissions</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                      <item.icon className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-1">{item.label}</CardTitle>
                  <p className="text-gray-600">{item.desc}</p>
                  <p className="text-sm text-emerald-600 mt-2 font-medium">{item.count ?? 0} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <CardContent className="py-6">
            <h3 className="font-semibold text-emerald-900 mb-3">Quick Tips</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-emerald-800">
              <li className="flex items-center gap-2">✓ Add companies first (manufacturers like LG, Formosa)</li>
              <li className="flex items-center gap-2">✓ Create categories (PP, PE, PVC, etc.)</li>
              <li className="flex items-center gap-2">✓ Add features and applications</li>
              <li className="flex items-center gap-2">✓ Then create products linking them together</li>
              <li className="flex items-center gap-2">✓ Write blog posts for SEO</li>
              <li className="flex items-center gap-2">✓ Upload PDFs for product datasheets</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
