import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              At Shashvat Trading, we collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
              <li>Request a quote or product information</li>
              <li>Submit an inquiry through our website</li>
              <li>Contact us via phone, email, or other means</li>
              <li>Subscribe to our newsletter or updates</li>
              <li>Engage in business transactions with us</li>
            </ul>
            <p className="text-gray-600 mb-8">
              The information we collect may include: name, email address, phone number, company name, product requirements, and business details.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
              <li>Respond to your inquiries and provide quotations</li>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about products and services</li>
              <li>Send updates about pricing, availability, and market trends</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-6">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
              <li><strong>Business Partners:</strong> Manufacturers and suppliers to fulfill your orders</li>
              <li><strong>Logistics Providers:</strong> For shipping and delivery of products</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-8">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal obligations)</li>
              <li>Opt-out of marketing communications at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600 mb-8">
              Our website may use cookies to enhance user experience and analyze site traffic. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-gray-900 mb-2 font-semibold">Shashvat Trading</p>
              <p className="text-gray-600 mb-1">📧 Email: info@shashvattrading.com</p>
              <p className="text-gray-600 mb-1">📞 Canada: +1 905-813-2169</p>
              <p className="text-gray-600">📞 India: +91 98201 91117</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
