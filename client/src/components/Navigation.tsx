import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Partners", path: "/partners" },
    { name: "Blog", path: "/blog" },
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
              <div className="h-12 w-12 bg-gradient-to-br from-green-600 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground leading-tight">
                  Shashvat Trading
                </div>
                <div className="text-xs text-green-600 font-medium">
                  Plastic Resins & Polymers
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
              >
                <span
                  className={`text-sm font-medium transition-colors relative cursor-pointer ${isActive(link.path)
                      ? 'text-green-600'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <div className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-green-600"></div>
                  )}
                </span>
              </Link>
            ))}


          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="mailto:info@shashvattrading.com">
              <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg">
                📧 Get Quote
              </Button>
            </a>
            <a href="tel:+19058132169">
              <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50">
                🇨🇦 +1 905-813-2169
              </Button>
            </a>
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {user?.name || 'Admin'}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <div className="absolute top-full right-0 pt-2 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white rounded-lg shadow-xl border border-green-100 py-2">
                    <Link href="/admin">
                      <span className="block px-4 py-2 text-sm text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer">
                        Admin Dashboard
                      </span>
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/admin/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-green-600">
                  <User className="w-4 h-4" />
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-green-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                >
                  <span
                    className={`text-base transition-colors block cursor-pointer ${isActive(link.path)
                        ? 'text-green-600 font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}

              {/* Mobile Admin */}
              {isAuthenticated ? (
                <div className="pt-2 border-t border-gray-100">
                  <Link href="/admin">
                    <span
                      className="text-base text-green-600 font-medium block cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-base text-red-600 mt-2 block"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-100">
                  <Link href="/admin/login">
                    <span
                      className="text-base text-muted-foreground hover:text-green-600 block cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Login
                    </span>
                  </Link>
                </div>
              )}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3">
                <a href="mailto:info@shashvattrading.com" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-500">
                    📧 Request Quote
                  </Button>
                </a>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <a href="tel:+19058132169" className="flex items-center gap-1 text-muted-foreground hover:text-green-600">
                    🇨🇦 +1 905-813-2169
                  </a>
                  <a href="tel:+919820191117" className="flex items-center gap-1 text-muted-foreground hover:text-green-600">
                    🇮🇳 +91 98201 91117
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
