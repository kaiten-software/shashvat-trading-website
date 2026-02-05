import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle } from "lucide-react";

interface ProductInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductId?: number;
  selectedProductName?: string;
}

const EMAIL_STORAGE_KEY = 'shashvat_user_email';

export default function ProductInquiryModal({ 
  isOpen, 
  onClose, 
  selectedProductId, 
  selectedProductName 
}: ProductInquiryModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productId: selectedProductId?.toString() || "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Load products for dropdown
  const { data: products = [] } = useQuery<any[]>({
    queryKey: ["productsForInquiry"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      return res.json();
    },
  });

  // Load saved email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  // Update product selection when prop changes
  useEffect(() => {
    if (selectedProductId) {
      setFormData(prev => ({ ...prev, productId: selectedProductId.toString() }));
    }
  }, [selectedProductId]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit inquiry");
      return res.json();
    },
    onSuccess: () => {
      // Save email to localStorage for future use
      if (formData.email) {
        localStorage.setItem(EMAIL_STORAGE_KEY, formData.email);
      }
      setSubmitted(true);
      toast({
        title: "Inquiry Submitted!",
        description: "Thank you for your interest. We'll get back to you shortly.",
      });
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: formData.email, // Keep email for next inquiry
          phone: "",
          company: "",
          productId: "",
          message: "",
        });
        onClose();
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    // Also save to localStorage as they type (debounced save)
    localStorage.setItem(EMAIL_STORAGE_KEY, email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Request Product Information
          </DialogTitle>
          <DialogDescription>
            {selectedProductName 
              ? `Inquiring about: ${selectedProductName}`
              : "Fill out the form below and we'll get back to you within 24 hours."
            }
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your inquiry has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Your company"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product of Interest</Label>
              <Select 
                value={formData.productId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, productId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">General Inquiry</SelectItem>
                  {products.map((item: any) => (
                    <SelectItem key={item.product.id} value={item.product.id.toString()}>
                      {item.product.name} {item.company ? `(${item.company.name})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please describe your requirements, quantities needed, or any questions..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
