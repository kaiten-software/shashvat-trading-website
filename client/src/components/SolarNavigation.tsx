import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SolarNavigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Technology", path: "/technology" },
    { name: "Contact", path: "/contact" }
  ];

  const serviceLinks = [
    { name: "Residential Solar", path: "/products", external: false },
    { name: "Commercial Solar", path: "https://www.suryantraenergy.com/", external: true },
    { name: "Industrial Solar", path: "/products", external: false },
    { name: "On-Grid Systems", path: "/products", external: false },
    { name: "Hybrid Systems", path: "/products", external: false },
    { name: "Solar AMC", path: "/products", external: false }
  ];

  const resourceLinks = [
    { name: "EPC & Installation", path: "/epc-installation" },
    { name: "Site Survey", path: "/site-survey" },
    { name: "Design & Simulation", path: "/design-simulation" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Costs & Subsidy", path: "/costs-subsidy" },
    { name: "Solar Technologies", path: "/solar-technologies" }
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
            
            {/* Our Services Dropdown */}
            <div className="relative group">
              <button 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Our Services
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <div className="bg-white rounded-lg shadow-xl border border-green-100 py-2">
                    {serviceLinks.map((link) => (
                      link.external ? (
                        <a 
                          key={link.name}
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link key={link.name} href={link.path}>
                          <a className="block px-4 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-colors">
                            {link.name}
                          </a>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              {resourcesOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-56 z-50"
                  onMouseEnter={() => setResourcesOpen(true)}
                  onMouseLeave={() => setResourcesOpen(false)}
                >
                  <div className="bg-white rounded-lg shadow-xl border border-green-100 py-2">
                    {resourceLinks.map((link) => (
                      <Link key={link.name} href={link.path}>
                        <a className="block px-4 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-colors">
                          {link.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://wa.me/919772533559?text=Hi, I'm interested in solar solutions" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg">
                💬 Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50">
                📞 +91 97725 33559
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
              
              {/* Mobile Services Section */}
              <div className="pt-2 border-t border-green-100">
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                  Our Services
                </div>
                {serviceLinks.map((link) => (
                  link.external ? (
                    <a 
                      key={link.name}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-2 pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link key={link.name} href={link.path}>
                      <a 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-2 pl-4"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    </Link>
                  )
                ))}
              </div>

              {/* Mobile Resources Section */}
              <div className="pt-2 border-t border-green-100">
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                  Resources
                </div>
                {resourceLinks.map((link) => (
                  <Link key={link.name} href={link.path}>
                    <a 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-2 pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-green-100">
                <a href="https://wa.me/919772533559?text=Hi, I'm interested in solar solutions" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 shadow-lg" 
                  >
                    💬 Chat Instantly on WhatsApp
                  </Button>
                </a>
                <a href="tel:+919772533559">
                  <Button variant="outline" size="sm" className="w-full border-green-600 text-green-700">
                    📞 +91 97725 33559
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
