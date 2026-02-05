import { Link } from "wouter";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Technology", path: "/technology" },
    { name: "Contact", path: "/contact" }
  ];

  const products = [
    { name: "Polypropylene (PP)", path: "/products" },
    { name: "Polyethylene (PE)", path: "/products" },
    { name: "Styrenics (ABS/HIPS)", path: "/products" },
    { name: "PVC & PET", path: "/products" },
    { name: "Engineering Plastics", path: "/products" },
    { name: "Recycled Resins", path: "/products" }
  ];

  const resources = [
    { name: "Material Selection", path: "/about" },
    { name: "Technical Support", path: "/contact" },
    { name: "Request Quote", path: "/contact" },
    { name: "Quality Assurance", path: "/about" },
    { name: "Logistics Info", path: "/about" },
    { name: "Industry Partners", path: "/about" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <div>
                <div className="text-lg font-bold leading-tight">
                  Shashvat Trading
                </div>
                <div className="text-xs text-green-400 font-medium">
                  Global Plastics Distribution
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for virgin, near-prime, and reprocessed commodity plastics. 
              Right product. Right price. Right time.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/shashvattrading" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <Link href={product.path}>
                    <span className="text-gray-400 hover:text-green-400 transition-colors text-sm cursor-pointer">
                      {product.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link href={resource.path}>
                    <span className="text-gray-400 hover:text-green-400 transition-colors text-sm cursor-pointer">
                      {resource.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-green-400 text-sm font-medium mb-1">🇨🇦 Canada</p>
                <p className="text-gray-400 text-sm">Shashvat Polymers Ltd</p>
                <a href="tel:+19058132169" className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                  +1 905-813-2169
                </a>
              </li>
              <li>
                <p className="text-green-400 text-sm font-medium mb-1">🇮🇳 India</p>
                <p className="text-gray-400 text-sm">Shashvat Plastics LLP</p>
                <a href="tel:+919820191117" className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                  +91 98201 91117
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="mailto:info@shashvattrading.com" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  info@shashvattrading.com
                </a>
              </li>
            </ul>

            {/* Email Button */}
            <a 
              href="mailto:info@shashvattrading.com"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">✉️</span>
              <span className="font-semibold">Email Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Shashvat Trading. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy-policy">
                <span className="hover:text-green-400 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms-of-service">
                <span className="hover:text-green-400 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Quality Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Global Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>500+ Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Tier-1 Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Built By Credit */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <span>© 2025 Shashvat Trading. All rights reserved.</span>
            <span>
              Built with excellence by{" "}
              <a 
                href="https://kaitensoftware.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Kaiten Software
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
