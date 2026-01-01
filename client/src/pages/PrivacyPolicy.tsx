import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-90">Last updated: December 4, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-3xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              At Rajasthan Green Energy Solar Solutions, we collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
              <li>Request a quote or consultation</li>
              <li>Schedule a site survey</li>
              <li>Contact us via phone, email, or WhatsApp</li>
              <li>Submit forms on our website</li>
              <li>Subscribe to our newsletter or updates</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              The information we collect may include: name, email address, phone number, property address, electricity consumption details, roof area measurements, and photographs of your property (with your consent).
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Provide accurate solar system design and cost estimates</li>
              <li>Conduct site surveys and feasibility assessments</li>
              <li>Process your solar installation requests</li>
              <li>Communicate with you about your project status</li>
              <li>Assist with DISCOM approvals and subsidy applications</li>
              <li>Provide after-sales support and maintenance services</li>
              <li>Send important updates about solar policies, subsidies, and our services</li>
              <li>Improve our services and customer experience</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-6">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li><strong>Government Authorities:</strong> DISCOM, CEIG, and PM Surya Ghar portal for approvals and subsidy processing</li>
              <li><strong>Service Partners:</strong> Authorized equipment suppliers, logistics providers, and installation teams</li>
              <li><strong>Financial Institutions:</strong> If you opt for solar financing or loan assistance</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-8">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes secure storage systems, encrypted communications, and restricted access to personal data.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground mb-8">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations (including 25-year warranty records), and resolve disputes. Project documentation and warranty records are retained for the duration of the warranty period plus applicable legal retention periods.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal obligations)</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Withdraw consent for specific data processing activities</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              To exercise these rights, contact us at info@rajasthanenergy.com or +91 97725 33559.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">7. Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-8">
              Our website may use cookies and similar technologies to enhance user experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
            <p className="text-muted-foreground mb-8">
              Our website may contain links to third-party websites (e.g., PM Surya Ghar portal, DISCOM websites, equipment manufacturers). We are not responsible for the privacy practices of these external sites. Please review their privacy policies before sharing information.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground mb-8">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with information, please contact us.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-8">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The "Last Updated" date at the top indicates when the policy was last revised. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-foreground mb-2"><strong>Rajasthan Green Energy Solar Solutions</strong></p>
              <p className="text-muted-foreground mb-1">📧 Email: info@rajasthanenergy.com</p>
              <p className="text-muted-foreground mb-1">📞 Phone: +91 97725 33559</p>
              <p className="text-muted-foreground">📍 Location: Jaipur, Rajasthan, India</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <p className="text-green-900 font-semibold mb-2">Your Trust, Our Responsibility</p>
              <p className="text-green-800 text-sm">
                At Rajasthan Green Energy, we are committed to protecting your privacy and handling your information with the utmost care and transparency. Your trust is the foundation of our relationship, and we take data protection seriously.
              </p>
            </div>

          </div>
        </div>
      </section>

      <SolarFooter />
    </div>
  );
}
