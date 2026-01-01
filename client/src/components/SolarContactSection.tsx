import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function SolarContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    requirement: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `City: ${formData.city}\n\nRequirement: ${formData.requirement}`
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll get back to you within 24 hours.'
        });
        setFormData({ name: "", email: "", phone: "", city: "", requirement: "" });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try WhatsApp or call us directly.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try WhatsApp or call us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-green)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Let's Start Your <span className="font-semibold text-green-600">Solar Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch for a free consultation and site assessment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Request Callback</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="contact-name" className="text-base font-medium mb-2 block">
                  Your Name *
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="contact-email" className="text-base font-medium mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="contact-phone" className="text-base font-medium mb-2 block">
                  Phone Number *
                </Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="contact-city" className="text-base font-medium mb-2 block">
                  City *
                </Label>
                <Input
                  id="contact-city"
                  type="text"
                  placeholder="e.g., Jaipur"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-12"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Requirement */}
              <div>
                <Label htmlFor="contact-requirement" className="text-base font-medium mb-2 block">
                  Your Requirement
                </Label>
                <Textarea
                  id="contact-requirement"
                  placeholder="Tell us about your solar requirements..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="min-h-[120px]"
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <Button 
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-lg font-semibold disabled:opacity-50"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Sending...' : 'Request Callback'}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              We'll get back to you within 24 hours
            </p>
          </div>

          {/* Contact Info & WhatsApp */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="bg-white rounded-2xl p-6 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Call Us</h4>
                    <a 
                      href="tel:+919772533559" 
                      className="text-green-600 hover:text-green-700 font-semibold text-lg"
                    >
                      +91 97725 33559
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Sat, 9 AM - 7 PM</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-6 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Email Us</h4>
                    <a 
                      href="mailto:info@rajasthanenergy.com" 
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      info@rajasthanenergy.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 border border-green-100 hover:border-green-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Visit Us</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Rajasthan Green Energy Solar Power Pvt Ltd</strong><br />
                      2nd Floor, B.L Tower<br />
                      Arihant Nagar, Kalwar Road<br />
                      Hatoj, Jaipur (Raj.) 302012<br />
                      <span className="text-xs mt-2 block">GSTIN: 08AANCR3458B1ZA</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3">Chat on WhatsApp</h3>
              <p className="text-green-50 mb-6 leading-relaxed">
                Get instant responses to your queries. Our solar experts are available on WhatsApp.
              </p>
              <a
                href="https://wa.me/919772533559?text=Hi, I'm interested in solar installation. Please provide more details."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  className="w-full h-14 bg-white text-green-700 hover:bg-gray-100 font-semibold text-lg shadow-lg"
                >
                  <span className="text-2xl mr-2">📱</span>
                  WhatsApp Now
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-green-100 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">800+</div>
                <div className="text-xs text-muted-foreground">Happy Customers</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-green-100 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">24hr</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
