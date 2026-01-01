import { Link } from "wouter";
import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function SolarFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Solar Solutions", path: "/products" },
    { name: "Technology", path: "/technology" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    { name: "Residential Solar", path: "/residential-solar" },
    { name: "Commercial Solar", path: "/commercial-solar" },
    { name: "Industrial Solar", path: "/industrial-solar" },
    { name: "On-Grid Systems", path: "/on-grid-solar" },
    { name: "Hybrid Systems", path: "/hybrid-solar" },
    { name: "Solar AMC", path: "/solar-amc" }
  ];

  const resources = [
    { name: "EPC & Installation", path: "/epc-installation" },
    { name: "Site Survey", path: "/site-survey" },
    { name: "Design & Simulation", path: "/design-simulation" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Costs & Subsidy", path: "/costs-subsidy" },
    { name: "Solar Technologies", path: "/solar-technologies" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/images/company-logo.png" 
                alt="Rajasthan Green Energy Solar Solutions" 
                className="h-12 w-auto"
              />
              <div>
                <div className="text-lg font-bold leading-tight">
                  Rajasthan Green Energy
                </div>
                <div className="text-xs text-green-400 font-medium">
                  Solar Solutions
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium EPC solutions for residential, commercial, and industrial solar installations. 
              Engineering excellence meets customer trust.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/raajasthangreenenergy" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.path}>
                    <a className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                      {service.name}
                    </a>
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
                <li key={resource.path}>
                  <Link href={resource.path}>
                    <a className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                      {resource.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Jaipur, Rajasthan<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="tel:+919772533559" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  +91 97725 33559
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="mailto:info@rajasthanenergy.com" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  info@rajasthanenergy.com

                </a>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/919772533559"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">💬</span>
              <span className="font-semibold">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Rajasthan Green Energy Solar. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy-policy">
                <a className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/terms-of-service">
                <a className="hover:text-green-400 transition-colors">
                  Terms of Service
                </a>
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
              <span>MNRE Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>25-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>800+ Installations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Tier-1 Brands Only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Built By Credit */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            Built with excellence by{" "}
            <a 
              href="https://kaitensoftware.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Kaiten Software
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
