import SolarNavigation from "@/components/SolarNavigation";
import SolarFooter from "@/components/SolarFooter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <SolarNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg opacity-90">Last updated: December 4, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to Rajasthan Green Energy Solar Solutions. By using our services, you agree to these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">1. Services Overview</h2>
            <p className="text-muted-foreground mb-6">
              Rajasthan Green Energy Solar Solutions ("we," "our," "us") provides comprehensive solar EPC (Engineering, Procurement, and Construction) services including:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Site surveys and feasibility studies</li>
              <li>Solar system design and engineering</li>
              <li>Equipment procurement (panels, inverters, structures)</li>
              <li>Complete installation and commissioning</li>
              <li>DISCOM approvals and net-metering liaison</li>
              <li>Subsidy registration assistance (PM Surya Ghar)</li>
              <li>Annual Maintenance Contracts (AMC)</li>
              <li>After-sales support and warranty services</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground mb-8">
              Our services are available to residential, commercial, and industrial customers in India. You must be at least 18 years of age and have the legal authority to enter into this agreement. For rented properties, you must obtain necessary permissions from property owners before proceeding.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">3. Quotations and Pricing</h2>
            <p className="text-muted-foreground mb-4">
              <strong>3.1 Quote Validity:</strong> All quotations are valid for 30 days from the date of issue, subject to equipment price fluctuations and availability.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>3.2 Final Pricing:</strong> Final pricing is confirmed after site survey and design completion. Prices may vary from initial estimates if site conditions differ from preliminary assessments.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>3.3 Inclusions:</strong> Unless specified otherwise, our quotes include panels, inverter, mounting structure, DC & AC cabling, earthing, lightning protection, installation labor, and DISCOM liaison.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>3.4 Exclusions:</strong> Quotes typically exclude: civil work modifications, electrical panel upgrades (if required), elevated structures above 3 meters, battery backup systems (unless specified), and additional costs due to difficult site access.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-6">
              Standard payment structure (may vary by project size):
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li><strong>30% Advance:</strong> Upon order confirmation (booking amount)</li>
              <li><strong>40% On Delivery:</strong> When materials arrive at site</li>
              <li><strong>20% On Installation:</strong> After structure and panel mounting completion</li>
              <li><strong>10% On Commissioning:</strong> After successful testing and grid synchronization</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              Payment modes: Bank transfer, cheque, or online payment. GST applicable as per government rates. Subsidy amounts (if applicable) will be adjusted in the final payment after DISCOM disbursement.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">5. Project Timeline</h2>
            <p className="text-muted-foreground mb-6">
              Typical timeline: 25-30 days from order confirmation to commissioning, subject to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Material availability and delivery schedules</li>
              <li>DISCOM approval timelines (10-15 days, most variable factor)</li>
              <li>Weather conditions and site accessibility</li>
              <li>Customer cooperation in document submission</li>
              <li>Civil work completion (if required)</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              We are not liable for delays caused by government authorities, force majeure events, or factors beyond our reasonable control.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">6. Customer Responsibilities</h2>
            <p className="text-muted-foreground mb-6">
              You agree to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Provide accurate information about your property and electricity consumption</li>
              <li>Ensure safe and unobstructed access to the installation site</li>
              <li>Submit all required documents promptly (ID proof, property papers, electricity bill)</li>
              <li>Obtain necessary permissions from housing societies or property owners</li>
              <li>Ensure availability of single-phase or three-phase power supply as per system requirements</li>
              <li>Maintain clear rooftop area free from obstructions during installation</li>
              <li>Inform us of any structural concerns or property restrictions before installation</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">7. Warranties</h2>
            
            <h3 className="text-2xl font-semibold text-foreground mb-3">7.1 Solar Panels</h3>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
              <li><strong>Product Warranty:</strong> 10-12 years against manufacturing defects (as per manufacturer)</li>
              <li><strong>Performance Warranty:</strong> 25 years linear performance guarantee
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>97% output in first year</li>
                  <li>90% output after 10 years</li>
                  <li>80% output after 25 years</li>
                </ul>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-3">7.2 Inverters</h3>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
              <li>5-10 years manufacturer warranty (as per brand and model)</li>
              <li>Extended warranty available at additional cost</li>
            </ul>

            <h3 className="text-2xl font-semibold text-foreground mb-3">7.3 Installation Workmanship</h3>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>1-year comprehensive workmanship warranty</li>
              <li>Covers structure mounting, electrical connections, and earthing</li>
              <li>Does not cover damage from external factors (storms, lightning beyond protection capacity, vandalism)</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">8. Maintenance and Support</h2>
            <p className="text-muted-foreground mb-4">
              <strong>8.1 Free Support:</strong> We provide 1 year of free remote monitoring support and technical guidance.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>8.2 AMC Plans:</strong> Annual Maintenance Contracts available post-warranty period, covering cleaning, inspection, and preventive maintenance.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>8.3 Customer Maintenance:</strong> Regular cleaning (quarterly recommended) and visual inspection are customer's responsibility for optimal performance.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">9. Cancellation and Refund</h2>
            <p className="text-muted-foreground mb-6">
              <strong>9.1 Customer Cancellation:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
              <li>Before site survey: Full refund minus administrative charges (₹2,000)</li>
              <li>After site survey, before procurement: 80% refund of advance</li>
              <li>After material procurement: No refund, but project can be paused for up to 90 days</li>
              <li>During installation: No refund; customer liable for work completed</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              <strong>9.2 Company Cancellation:</strong> We reserve the right to cancel projects if site conditions are unsafe, structurally inadequate, or if customer fails to fulfill obligations. Full advance will be refunded in such cases.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Our total liability shall not exceed the project contract value</li>
              <li>We are not liable for indirect, consequential, or incidental damages</li>
              <li>We do not guarantee specific electricity bill savings or generation amounts (PVsyst reports are estimates based on historical data)</li>
              <li>We are not responsible for DISCOM policy changes, subsidy delays, or government approval rejections</li>
              <li>Force majeure events (natural disasters, pandemics, government actions) release us from liability</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">11. Intellectual Property</h2>
            <p className="text-muted-foreground mb-8">
              All designs, technical drawings, and project documentation remain our intellectual property. You may use them solely for the intended solar installation. Reproduction or sharing with third parties requires written permission.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">12. Dispute Resolution</h2>
            <p className="text-muted-foreground mb-8">
              Any disputes arising from these terms shall be resolved through amicable negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan, India.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">13. Governing Law</h2>
            <p className="text-muted-foreground mb-8">
              These Terms of Service are governed by the laws of India, including the Electricity Act 2003, Consumer Protection Act 2019, and relevant MNRE guidelines.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">14. Amendments</h2>
            <p className="text-muted-foreground mb-8">
              We reserve the right to modify these terms at any time. Updated terms will be posted on our website with a revised "Last Updated" date. Continued use of our services constitutes acceptance of updated terms.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">15. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service or our services:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-foreground mb-2"><strong>Rajasthan Green Energy Solar Solutions</strong></p>
              <p className="text-muted-foreground mb-1">📧 Email: info@rajasthanenergy.com</p>
              <p className="text-muted-foreground mb-1">📞 Phone: +91 97725 33559</p>
              <p className="text-muted-foreground mb-1">💬 WhatsApp: +91 97725 33559</p>
              <p className="text-muted-foreground">📍 Location: Jaipur, Rajasthan, India</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <p className="text-blue-900 font-semibold mb-2">Agreement Acknowledgment</p>
              <p className="text-blue-800 text-sm">
                By requesting a quote, scheduling a site survey, or proceeding with installation, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>

          </div>
        </div>
      </section>

      <SolarFooter />
    </div>
  );
}
