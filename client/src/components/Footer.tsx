import { Link } from "wouter";

export default function Footer() {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Technology", path: "/technology" },
        { name: "Products", path: "/products" },
        { name: "Water Life Series", path: "/water-life-series" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Learn More",
      links: [
        { name: "Philosophy", path: "/philosophy" },
        { name: "Health Benefits", path: "/health" },
        { name: "Our Story", path: "/about" },
        { name: "Lab Reports", path: "/technology" }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "Jaipur, Rajasthan", path: "/contact" },
        { name: "hello@rajasthanenergy.com", path: "/contact" }
      ]
    }
  ];

  return (
    <footer className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img 
                src="/images/company-logo.png" 
                alt="Rajasthan Green Energy Solar Power Logo" 
                className="h-14 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Premium solar EPC solutions with 7-year mounting warranty in Rajasthan.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span>🇯🇵</span>
              <span className="text-gray-300">Japanese Technology</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span>🇮🇳</span>
              <span className="text-gray-300">Now in India</span>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} data-testid={`footer-section-${index}`}>
              <h4 className="font-semibold mb-4 text-sm text-white" data-testid={`text-footer-title-${index}`}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.path}
                      className="text-sm text-gray-400 hover:text-white transition-colors block"
                      data-testid={`link-footer-${index}-${linkIndex}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 text-center md:text-left" data-testid="text-copyright">
              © {new Date().getFullYear()} Shizensui. All rights reserved. Japanese water purification technology.
            </p>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs text-gray-500 italic">
                Experience Japanese Purity. Experience Shizensui.
              </p>
              <p className="text-xs text-gray-500">
                Powered by{" "}
                <a 
                  href="https://www.kaitensoftware.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors underline"
                >
                  Kaiten Software
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
