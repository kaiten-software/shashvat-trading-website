import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun } from "lucide-react";
import { useState } from "react";

export default function SolarNavigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Solutions", path: "/products" },
    { name: "Technology", path: "/technology" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img 
                src="/images/company-logo.png" 
                alt="Rajasthan Green Energy Solar Power" 
                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="text-lg font-bold text-foreground leading-tight">
                  Rajasthan Green Energy
                </div>
                <div className="text-xs text-green-600 font-medium">
                  Solar Solutions
                </div>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path}
              >
                <a 
                  className={`text-sm font-medium transition-colors relative ${
                    isActive(link.path) 
                      ? 'text-green-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <div className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-green-600"></div>
                  )}
                </a>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://wa.me/919785277913?text=Hi, I'm interested in solar solutions" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg">
                💬 Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+919785277913">
              <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50">
                📞 Call
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path}
                >
                  <a 
                    className={`text-base transition-colors block ${
                      isActive(link.path) 
                        ? 'text-green-600 font-semibold' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <a href="https://wa.me/919785277913?text=Hi, I'm interested in solar solutions" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 shadow-lg" 
                  >
                    💬 Chat Instantly on WhatsApp
                  </Button>
                </a>
                <a href="tel:+919785277913">
                  <Button variant="outline" size="sm" className="w-full border-green-600 text-green-700">
                    📞 Call
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
