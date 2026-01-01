import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type StatusMessage = {
  type: "success" | "error";
  message: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^(?!.*\.\.)[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z0-9-]+)*\.[A-Z]{2,}$/i;
    return emailRegex.test(email.trim());
  };

  const clearInputValidity = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity("");
  };

  const setEmailInvalidMessage = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.setCustomValidity(
      "Please enter a valid email address, for example name@example.com."
    );
    event.currentTarget.reportValidity();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(formData.email)) {
      const message = "Please enter a valid email address.";
      toast({
        title: "Invalid Email",
        description: message,
        variant: "destructive"
      });
      setStatusMessage({ type: "error", message });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const payload = {
        ...formData,
        email: formData.email.trim()
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you soon."
        });
        setFormData(initialFormData);
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
      setStatusMessage({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-24 md:py-32 mesh-gradient-cyan" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6" data-testid="text-contact-headline">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground" data-testid="text-contact-subheadline">
            Experience Japanese Purity. Experience Shizensui.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
          <div>
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Shizensui
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600 dark:text-blue-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Visit Us</p>
                    <p className="text-muted-foreground leading-relaxed">
                      101 Sample Street,
                      <br />
                      Sample City,
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600 dark:text-blue-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Call Us</p>
                    <p className="text-muted-foreground">+91 (Contact Number)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600 dark:text-blue-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Email Us</p>
                    <p className="text-muted-foreground">info@rajasthanenergy.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6">
              <p className="text-sm text-muted-foreground italic">
                "Bringing 45+ years of Japanese water purification excellence to India. Join us in experiencing the future of healthy hydration."
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onInput={clearInputValidity}
                  onInvalid={setEmailInvalidMessage}
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 xxxxx xxxxx"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help"
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {statusMessage && (
              <div
                className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                  statusMessage.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {statusMessage.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
