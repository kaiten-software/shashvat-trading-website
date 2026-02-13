import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  MessageCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

const EMAIL_STORAGE_KEY = 'shashvat_user_email';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    requirement: ""
  });

  // Load saved email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  // Save email to localStorage when it changes
  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    if (email) {
      localStorage.setItem(EMAIL_STORAGE_KEY, email);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/callbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "Thank you for your interest. We'll call you back shortly.",
      });
      // Keep the email for future inquiries
      setFormData({
        name: "",
        email: formData.email,
        phone: "",
        city: "",
        requirement: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 mb-6">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-emerald-400">Touch</span>
            </h1>
            <p className="text-xl text-emerald-100">
              Have questions about our products or need a quote?
              We're here to help you find the right solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                {/* Canada Office */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">🇨🇦</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Canada Office</h3>
                        <p className="text-emerald-600 text-sm mb-2">Shashvat Polymers Ltd</p>
                        <a
                          href="tel:+19058132169"
                          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-1"
                        >
                          <Phone className="h-4 w-4" />
                          +1 905-813-2169
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* India Office */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">🇮🇳</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">India Office</h3>
                        <p className="text-emerald-600 text-sm mb-2">Shashvat Plastics LLP</p>
                        <a
                          href="tel:+919820191117"
                          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-1"
                        >
                          <Phone className="h-4 w-4" />
                          +91 98201 91117
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Us</h3>
                        <a
                          href="mailto:info@shashvattrading.com"
                          className="text-emerald-600 hover:underline"
                        >
                          info@shashvattrading.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Business Hours</h3>
                        <p className="text-gray-600 text-sm">Monday - Friday</p>
                        <p className="text-gray-600 text-sm">9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div {...fadeIn} className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Callback</h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll call you back within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Your City"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirement">Your Requirement *</Label>
                      <Textarea
                        id="requirement"
                        required
                        rows={5}
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        placeholder="Tell us about your plastic resin requirements..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Request Callback
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prefer to Talk?</h2>
          <p className="text-gray-600 mb-8">
            Call us directly for immediate assistance with your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919820191117">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Phone className="mr-2 h-5 w-5" />
                Call India: +91 98201 91117
              </Button>
            </a>
            <a href="tel:+19058132169">
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600">
                <Phone className="mr-2 h-5 w-5" />
                Call Canada: +1 905-813-2169
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Shashvat?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, text: "Quality Assured Products" },
              { icon: Clock, text: "Quick Response Time" },
              { icon: Building2, text: "Global Network" },
              { icon: MessageCircle, text: "Expert Support" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="font-medium text-gray-900">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
