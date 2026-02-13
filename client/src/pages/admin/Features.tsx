import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface Feature {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
}

export default function AdminFeatures() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Feature | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: features = [], isLoading } = useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await fetch("/api/features");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/features", { method: "POST", body: data });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const res = await fetch(`/api/features/${id}`, { method: "PUT", body: data });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/features/${id}`, { method: "DELETE" });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
  });

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "" });
    setImageFile(null);
    setEditingItem(null);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"));
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (item: Feature) => {
    setEditingItem(item);
    setFormData({ name: item.name, slug: item.slug, description: item.description || "" });
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-emerald-600" />
                Manage Features
              </h1>
              <p className="text-gray-600 mt-1">Product features like High Impact, Heat Resistant, etc.</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />Add Feature
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Feature" : "Add New Feature"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Feature Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name
                        .toLowerCase()
                        .replace(/\(.*?\)/g, "") // Remove content inside parentheses
                        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
                        .replace(/\s+/g, "-") // Replace spaces with hyphens
                        .replace(/-+/g, "-") // Prevent duplicate hyphens
                        .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens

                      setFormData({ ...formData, name, slug });
                    }}
                    placeholder="e.g., High Impact Strength"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    readOnly
                    className="bg-gray-100 text-gray-500 cursor-not-allowed"
                    placeholder="Auto-generated from name"
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-generated deterministic slug</p>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
                </div>
                <div>
                  <Label htmlFor="image">Feature Image</Label>
                  <Input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">{editingItem ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader><CardTitle>All Features ({features.length})</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : features.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No features yet. Add your first feature!</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded" />
                        ) : (
                          <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-gray-500">{item.slug}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.description || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-red-600" onClick={() => confirm("Delete?") && deleteMutation.mutate(item.id)}><Trash2 className="h-4 w-4" /></Button>
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
