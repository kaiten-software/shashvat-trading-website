import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, FileText, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  contentHtml: string;
  featuredImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function AdminBlog() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    contentHtml: "",
    seoTitle: "",
    seoDescription: "",
    isPublished: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const res = await fetch("/api/blog/all");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/blog/posts", { method: "POST", body: data });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: FormData }) => {
      const res = await fetch(`/api/blog/posts/${id}`, { method: "PUT", body: data });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogPosts"] }),
  });

  const resetForm = () => {
    setFormData({ title: "", slug: "", excerpt: "", contentHtml: "", seoTitle: "", seoDescription: "", isPublished: false });
    setImageFile(null);
    setEditingPost(null);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"));
    data.append("excerpt", formData.excerpt);
    data.append("contentHtml", formData.contentHtml);
    data.append("seoTitle", formData.seoTitle);
    data.append("seoDescription", formData.seoDescription);
    data.append("isPublished", formData.isPublished.toString());
    if (imageFile) data.append("featuredImage", imageFile);

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      contentHtml: post.contentHtml,
      seoTitle: post.seoTitle || "",
      seoDescription: post.seoDescription || "",
      isPublished: post.isPublished,
    });
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
                <FileText className="h-8 w-8 text-emerald-600" />
                Manage Blog
              </h1>
              <p className="text-gray-600 mt-1">Create and manage blog posts for SEO</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Post Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title
                          .toLowerCase()
                          .replace(/\(.*?\)/g, "") // Remove content inside parentheses
                          .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
                          .replace(/\s+/g, "-") // Replace spaces with hyphens
                          .replace(/-+/g, "-") // Prevent duplicate hyphens
                          .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens

                        setFormData({ ...formData, title, slug });
                      }}
                      placeholder="e.g., Understanding HIPS Properties"
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
                      placeholder="Auto-generated from title"
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-generated deterministic slug</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Brief summary shown in listings..." rows={2} />
                </div>
                <div>
                  <Label htmlFor="contentHtml">Post Content (HTML) *</Label>
                  <Textarea id="contentHtml" value={formData.contentHtml} onChange={(e) => setFormData({ ...formData, contentHtml: e.target.value })} placeholder="<h2>Introduction</h2><p>...</p>" rows={12} className="font-mono text-sm" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input id="seoTitle" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} placeholder="Page title for search engines" />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Input id="seoDescription" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} placeholder="Meta description (150-160 chars)" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  <Input id="featuredImage" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  {editingPost?.featuredImage && !imageFile && (
                    <img src={editingPost.featuredImage} alt="Featured" className="mt-2 h-20 object-cover rounded" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="isPublished" checked={formData.isPublished} onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })} />
                  <Label htmlFor="isPublished">Publish immediately</Label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">{editingPost ? "Update Post" : "Create Post"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader><CardTitle>All Posts ({posts.length})</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No blog posts yet. Create your first post!</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        {post.featuredImage ? (
                          <img src={post.featuredImage} alt={post.title} className="h-12 w-16 object-cover rounded" />
                        ) : (
                          <div className="h-12 w-16 bg-gray-100 rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-gray-500">/{post.slug}</div>
                      </TableCell>
                      <TableCell>
                        {post.isPublished ? (
                          <Badge className="bg-emerald-100 text-emerald-700"><Eye className="h-3 w-3 mr-1" />Published</Badge>
                        ) : (
                          <Badge variant="secondary"><EyeOff className="h-3 w-3 mr-1" />Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => handleEdit(post)}><Pencil className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-red-600" onClick={() => confirm("Delete this post?") && deleteMutation.mutate(post.id)}><Trash2 className="h-4 w-4" /></Button>
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
