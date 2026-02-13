import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Package, ArrowLeft, Upload, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Link } from "wouter";

interface Company { id: number; name: string; logo: string | null; }
interface Category { id: number; name: string; slug: string; }
interface Feature { id: number; name: string; slug: string; }
interface Application { id: number; name: string; slug: string; }
interface Product {
  id: number;
  companyId: number;
  name: string;
  slug: string;
  heroImage: string | null;
  shortDescription: string | null;
  contentHtml: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isActive: boolean;
  company?: Company;
}

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    slug: "",
    shortDescription: "",
    contentHtml: "",
    seoTitle: "",
    seoDescription: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [uploadTab, setUploadTab] = useState<"images" | "documents">("images");
  const [additionalImages, setAdditionalImages] = useState<FileList | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [currentTab, setCurrentTab] = useState("basic");

  const { data: products = [], isLoading } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    },
  });

  const { data: companies = [] } = useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: async () => (await fetch("/api/companies")).json(),
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => (await fetch("/api/categories")).json(),
  });

  const { data: features = [] } = useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: async () => (await fetch("/api/features")).json(),
  });

  const { data: applications = [] } = useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: async () => (await fetch("/api/applications")).json(),
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/products", { method: "POST", body: data });
      return res.json();
    },
    onSuccess: async (data) => {
      // Upload additional images and documents
      if (additionalImages && additionalImages.length > 0) {
        const imagesFormData = new FormData();
        Array.from(additionalImages).forEach(file => imagesFormData.append("images", file));
        await fetch(`/api/products/${data.id}/images`, { method: "POST", body: imagesFormData });
      }
      if (documents && documents.length > 0) {
        const docsFormData = new FormData();
        Array.from(documents).forEach(file => docsFormData.append("documents", file));
        await fetch(`/api/products/${data.id}/documents`, { method: "POST", body: docsFormData });
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const res = await fetch(`/api/products/${id}`, { method: "PUT", body: data });
      return res.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const resetForm = () => {
    setFormData({ companyId: "", name: "", slug: "", shortDescription: "", contentHtml: "", seoTitle: "", seoDescription: "" });
    setSelectedCategories([]);
    setSelectedFeatures([]);
    setSelectedApplications([]);
    setHeroImageFile(null);
    setAdditionalImages(null);
    setDocuments(null);
    setEditingProduct(null);
    setCurrentTab("basic");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate descriptive slug from company name and product name
    const selectedCompany = companies.find(c => c.id.toString() === formData.companyId);
    const generatedSlug = selectedCompany && formData.name
      ? `${selectedCompany.name.toLowerCase().replace(/\s+/g, '-')}-${formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`
      : formData.name.toLowerCase().replace(/\s+/g, "-");

    const data = new FormData();
    data.append("companyId", formData.companyId);
    data.append("name", formData.name);
    data.append("slug", generatedSlug);
    data.append("shortDescription", formData.shortDescription);
    data.append("contentHtml", formData.contentHtml);
    data.append("seoTitle", formData.seoTitle);
    data.append("seoDescription", formData.seoDescription);
    data.append("categoryIds", JSON.stringify(selectedCategories));
    data.append("featureIds", JSON.stringify(selectedFeatures));
    data.append("applicationIds", JSON.stringify(selectedApplications));
    if (heroImageFile) data.append("heroImage", heroImageFile);

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = async (productData: any) => {
    // Fetch full product details
    const res = await fetch(`/api/products/${productData.product.id}`);
    const product = await res.json();

    setEditingProduct(product);
    setFormData({
      companyId: product.companyId?.toString() || "",
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription || "",
      contentHtml: product.contentHtml || "",
      seoTitle: product.seoTitle || "",
      seoDescription: product.seoDescription || "",
    });
    setSelectedCategories(product.categories?.map((c: any) => c.id) || []);
    setSelectedFeatures(product.features?.map((f: any) => f.id) || []);
    setSelectedApplications(product.applications?.map((a: any) => a.id) || []);
    setCurrentTab("basic");
    setIsOpen(true);
  };

  const toggleSelection = (id: number, selected: number[], setSelected: (val: number[]) => void) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const tabs = ["basic", "relations", "content", "media"];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Package className="h-8 w-8 text-emerald-600" />
                Manage Products
              </h1>
              <p className="text-gray-600 mt-1">Add and manage plastic resin products</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="relations">Categories & More</TabsTrigger>
                    <TabsTrigger value="content">SEO Content</TabsTrigger>
                    <TabsTrigger value="media">Images & Docs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="company">Company/Manufacturer *</Label>
                      <Select value={formData.companyId} onValueChange={(v) => setFormData({ ...formData, companyId: v })}>
                        <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                        <SelectContent>
                          {companies.map(c => (
                            <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., TAIRILAC® ABS Resin" required />
                    </div>
                    <div>
                      <Label htmlFor="slug">URL Slug (Auto-generated)</Label>
                      <Input
                        id="slug"
                        value={formData.companyId && formData.name ?
                          `${companies.find(c => c.id.toString() === formData.companyId)?.name?.toLowerCase().replace(/\s+/g, '-') || 'company'}-${formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}` :
                          formData.slug
                        }
                        disabled
                        className="bg-gray-100 text-gray-600 cursor-not-allowed"
                        placeholder="Select company and enter product name"
                      />
                      <p className="text-xs text-gray-500 mt-1">Auto-generated from company name and product name</p>
                    </div>
                    <div>
                      <Label htmlFor="shortDescription">Short Description</Label>
                      <Textarea id="shortDescription" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} placeholder="Brief product description for listings..." rows={3} />
                    </div>
                  </TabsContent>

                  <TabsContent value="relations" className="space-y-4 mt-4">
                    <div>
                      <Label className="text-base font-semibold">Categories</Label>
                      <p className="text-sm text-gray-500 mb-2">Select all applicable categories</p>
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                        {categories.map(cat => (
                          <div key={cat.id} className="flex items-center space-x-2">
                            <Checkbox id={`cat-${cat.id}`} checked={selectedCategories.includes(cat.id)} onCheckedChange={() => toggleSelection(cat.id, selectedCategories, setSelectedCategories)} />
                            <label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer">{cat.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-semibold">Features</Label>
                      <p className="text-sm text-gray-500 mb-2">Select product features</p>
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                        {features.map(feat => (
                          <div key={feat.id} className="flex items-center space-x-2">
                            <Checkbox id={`feat-${feat.id}`} checked={selectedFeatures.includes(feat.id)} onCheckedChange={() => toggleSelection(feat.id, selectedFeatures, setSelectedFeatures)} />
                            <label htmlFor={`feat-${feat.id}`} className="text-sm cursor-pointer">{feat.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-semibold">Applications</Label>
                      <p className="text-sm text-gray-500 mb-2">Select industry applications</p>
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                        {applications.map(app => (
                          <div key={app.id} className="flex items-center space-x-2">
                            <Checkbox id={`app-${app.id}`} checked={selectedApplications.includes(app.id)} onCheckedChange={() => toggleSelection(app.id, selectedApplications, setSelectedApplications)} />
                            <label htmlFor={`app-${app.id}`} className="text-sm cursor-pointer">{app.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="seoTitle">SEO Title</Label>
                      <Input id="seoTitle" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} placeholder="Page title for search engines" />
                    </div>
                    <div>
                      <Label htmlFor="seoDescription">SEO Description</Label>
                      <Textarea id="seoDescription" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} placeholder="Meta description for search engines (150-160 chars)" rows={2} />
                    </div>
                    <div>
                      <Label htmlFor="contentHtml">Product Content (HTML)</Label>
                      <p className="text-sm text-gray-500 mb-2">Paste HTML content generated from AI for detailed product description</p>
                      <Textarea id="contentHtml" value={formData.contentHtml} onChange={(e) => setFormData({ ...formData, contentHtml: e.target.value })} placeholder="<h2>Product Overview</h2><p>...</p>" rows={10} className="font-mono text-sm" />
                      <div className="mt-2 flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/products/${formData.slug}`, '_blank')}
                          disabled={!formData.slug}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Preview Product Page
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="heroImage">Hero Image (Main Display Image)</Label>
                      <Input id="heroImage" type="file" accept="image/*" onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)} />
                      {editingProduct?.heroImage && !heroImageFile && (
                        <img src={editingProduct.heroImage} alt="Current hero" className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="additionalImages">Additional Product Images</Label>
                      <Input id="additionalImages" type="file" accept="image/*" multiple onChange={(e) => setAdditionalImages(e.target.files)} />
                      <p className="text-sm text-gray-500 mt-1">Select multiple images (max 10)</p>
                    </div>
                    <div>
                      <Label htmlFor="documents">Product Documents (PDF only, max 10MB each)</Label>
                      <Input id="documents" type="file" accept=".pdf" multiple onChange={(e) => setDocuments(e.target.files)} />
                      <p className="text-sm text-gray-500 mt-1">Upload brochures, datasheets, certifications</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1">Cancel</Button>

                  {currentTab !== "media" ? (
                    <Button type="button" onClick={handleNext} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700" disabled={createMutation.isPending || updateMutation.isPending}>
                      {editingProduct ? "Update Product" : "Create Product"}
                    </Button>
                  )}
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader><CardTitle>All Products ({products.length})</CardTitle></CardHeader>
          <CardContent>
            {isLoading && products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No products yet. Add your first product!</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item: any) => (
                    <TableRow key={item.product.id}>
                      <TableCell>
                        {item.product.heroImage ? (
                          <img src={item.product.heroImage} alt={item.product.name} className="h-12 w-12 object-cover rounded" />
                        ) : (
                          <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{item.product.name}</TableCell>
                      <TableCell>{item.company?.name || "-"}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.product.shortDescription || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-red-600" onClick={() => confirm("Delete this product?") && deleteMutation.mutate(item.product.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
