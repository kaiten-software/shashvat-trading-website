import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Terms and conditions for plastic resin trading and distribution services by Shashvat Trading
          </p>
          <p className="text-gray-500 mt-4">Last Updated: January 2025</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-3xl font-bold text-foreground mb-4">1. Introduction & Acceptance</h2>
            <p className="text-muted-foreground mb-8">
              Welcome to Shashvat Trading (comprising Shashvat Polymers Ltd, Canada and Shashvat Plastics LLP, India). By engaging our plastic resin trading services, requesting quotations, placing orders, or using our website, you agree to be bound by these Terms of Service. Please read them carefully before proceeding with any business transaction.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">2. Our Services</h2>
            <p className="text-muted-foreground mb-4">
              We provide comprehensive plastic resin trading and distribution services including:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li><strong>Resin Trading:</strong> Supply of virgin and recycled plastic resins including PP, PE, PVC, PET, ABS, PS, PC, and engineering plastics</li>
              <li><strong>Technical Consultation:</strong> Material selection assistance based on your application requirements</li>
              <li><strong>Global Sourcing:</strong> Access to premium manufacturers including LG Chem, Formosa, IRPC, Styrenix, Trinseo, Sasol, and INEOS Styrolution</li>
              <li><strong>Logistics Coordination:</strong> Shipping and delivery coordination for domestic and international orders</li>
              <li><strong>Quality Assurance:</strong> Material certificates, test reports, and quality documentation</li>
              <li><strong>Custom Blending:</strong> Tailored material solutions for specific applications</li>
              <li><strong>Inventory Solutions:</strong> Consignment and just-in-time delivery arrangements</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">3. Quotations & Pricing</h2>
            <p className="text-muted-foreground mb-4">
              <strong>3.1 Validity:</strong> All quotations are valid for the period specified therein, typically 7-14 days from the date of issue. Prices are subject to change based on market conditions, currency fluctuations, and manufacturer pricing adjustments.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>3.2 Pricing Basis:</strong> Prices quoted may be on Ex-Works, FOB, CIF, or delivered basis as specified. Incoterms 2020 apply to all international shipments.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>3.3 Inclusions:</strong> Unless otherwise specified, quotations include material cost only. Packaging, freight, insurance, duties, and taxes are as per the specified Incoterms or stated separately.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>3.4 Exclusions:</strong> Quotations typically exclude: import duties and customs clearance, local transportation from port, unloading charges, special packaging requirements, testing fees beyond standard certificates.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">4. Orders & Confirmation</h2>
            <p className="text-muted-foreground mb-4">
              <strong>4.1 Order Placement:</strong> Orders may be placed via email, phone, or through our authorized representatives. All orders are subject to written confirmation and availability.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>4.2 Order Confirmation:</strong> An order is confirmed only upon written acknowledgment from Shashvat Trading and receipt of advance payment (where applicable).
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>4.3 Minimum Order Quantity:</strong> Minimum order quantities apply based on product type and origin. Standard container loads (20 MT / 40 MT) apply for international shipments.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>4.4 Specifications:</strong> Buyers are responsible for verifying that product specifications meet their application requirements. Technical data sheets are provided for reference.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Payment terms are negotiated on a case-by-case basis depending on:
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li><strong>New Customers:</strong> 100% advance payment or irrevocable Letter of Credit</li>
              <li><strong>Established Customers:</strong> Net 30-60 days credit terms subject to credit approval</li>
              <li><strong>Large Orders:</strong> 30% advance, balance against documents or LC terms</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              Payments for international transactions may be made via wire transfer, Letter of Credit, or other mutually agreed banking instruments. All banking charges outside the beneficiary bank are to the buyer's account.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">6. Delivery & Shipping</h2>
            <p className="text-muted-foreground mb-4">
              <strong>6.1 Lead Times:</strong> Delivery timelines are estimates and depend on manufacturer production schedules, shipping availability, and customs clearance. Lead times typically range from 2-8 weeks for international shipments.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>6.2 Risk Transfer:</strong> Risk transfers to buyer as per the agreed Incoterms. For CIF/CIP terms, marine insurance is included; otherwise, buyers should arrange adequate cargo insurance.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>6.3 Delays:</strong> We will communicate any anticipated delays promptly. Shashvat Trading is not liable for delays caused by shipping lines, customs authorities, or force majeure events.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">7. Quality & Claims</h2>
            <p className="text-muted-foreground mb-4">
              <strong>7.1 Quality Standards:</strong> All materials are supplied as per manufacturer specifications. Certificate of Analysis (COA) and Material Safety Data Sheets (MSDS) are provided upon request.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>7.2 Inspection:</strong> Buyers must inspect materials upon receipt. Claims for visible damage or quantity shortages must be noted on delivery documents and reported within 48 hours.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>7.3 Quality Claims:</strong> Claims for quality defects must be reported within 14 days of receipt with supporting documentation and retained samples. Claims will not be entertained after material has been processed.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>7.4 Claim Resolution:</strong> Valid claims may be resolved through replacement, credit note, or price adjustment at Shashvat Trading's discretion.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">8. Returns & Cancellations</h2>
            <p className="text-muted-foreground mb-4">
              <strong>8.1 Returns:</strong> Due to the nature of commodity trading, returns are generally not accepted unless material is defective or does not conform to specifications.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>8.2 Order Cancellation:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
              <li>Before production/shipment: Cancellation may be accepted subject to restocking fees</li>
              <li>After shipment: Cancellation not accepted; buyer responsible for all costs</li>
              <li>Custom orders: Non-cancellable once production begins</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              <strong>8.3 Seller Cancellation:</strong> Shashvat Trading reserves the right to cancel orders due to force majeure, material unavailability, or credit concerns. Advance payments will be refunded in such cases.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">9. Warranties & Limitations</h2>
            <p className="text-muted-foreground mb-4">
              <strong>9.1 Limited Warranty:</strong> Materials are warranted to conform to manufacturer specifications at the time of shipment. We pass through manufacturer warranties where applicable.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>9.2 Disclaimer:</strong> EXCEPT AS EXPRESSLY STATED, NO WARRANTIES ARE MADE REGARDING MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Buyers are solely responsible for determining material suitability for their applications.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>9.3 Technical Advice:</strong> Any technical advice provided is based on our best knowledge but is given without warranty. The buyer assumes all responsibility for results obtained from material usage.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground space-y-2">
              <li>Our total liability shall not exceed the invoice value of the specific shipment in question</li>
              <li>We are not liable for indirect, consequential, special, or incidental damages</li>
              <li>We are not responsible for losses arising from production delays, lost profits, or third-party claims</li>
              <li>Force majeure events (natural disasters, wars, pandemics, trade restrictions, government actions) release us from liability</li>
              <li>Liability for defective materials is limited to replacement or refund at our option</li>
            </ul>

            <h2 className="text-3xl font-bold text-foreground mb-4">11. Intellectual Property & Confidentiality</h2>
            <p className="text-muted-foreground mb-4">
              <strong>11.1 Proprietary Information:</strong> Pricing, supplier information, and trade terms are confidential and shall not be disclosed to third parties.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>11.2 Trademarks:</strong> Product brand names and trademarks belong to their respective manufacturers. Use of such marks is subject to applicable trademark laws.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">12. Compliance & Regulations</h2>
            <p className="text-muted-foreground mb-4">
              Buyers are responsible for compliance with all applicable import regulations, environmental laws, and product safety requirements in their jurisdiction. Shashvat Trading provides documentation to support compliance but assumes no liability for regulatory issues.
            </p>
            <p className="text-muted-foreground mb-8">
              Materials may be subject to export controls. Buyers shall not re-export materials in violation of applicable export laws.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">13. Dispute Resolution</h2>
            <p className="text-muted-foreground mb-4">
              <strong>13.1 Negotiation:</strong> Parties shall attempt to resolve any disputes through good faith negotiation.
            </p>
            <p className="text-muted-foreground mb-8">
              <strong>13.2 Arbitration:</strong> Unresolved disputes shall be settled by arbitration. For transactions with Shashvat Plastics LLP (India), arbitration shall be conducted in Mumbai under Indian Arbitration and Conciliation Act. For transactions with Shashvat Polymers Ltd (Canada), arbitration shall be conducted in Toronto under the rules of the ADR Institute of Canada.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">14. Governing Law</h2>
            <p className="text-muted-foreground mb-8">
              Transactions with Shashvat Plastics LLP are governed by the laws of India. Transactions with Shashvat Polymers Ltd are governed by the laws of the Province of Ontario, Canada. For international sales, the United Nations Convention on Contracts for the International Sale of Goods (CISG) may apply unless expressly excluded.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">15. Amendments</h2>
            <p className="text-muted-foreground mb-8">
              We reserve the right to modify these terms at any time. Updated terms will be posted on our website with a revised "Last Updated" date. Continued engagement with our services constitutes acceptance of updated terms. Individual transactions may be governed by specific terms agreed in writing.
            </p>

            <h2 className="text-3xl font-bold text-foreground mb-4">16. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service or our trading services:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-foreground mb-2"><strong>🇨🇦 Canada Office</strong></p>
                <p className="text-muted-foreground text-sm mb-1">Shashvat Polymers Ltd</p>
                <p className="text-muted-foreground mb-1">📧 Email: info@shashvattrading.com</p>
                <p className="text-muted-foreground mb-1">📞 Phone: +1 905-813-2169</p>
                <p className="text-muted-foreground">📍 Ontario, Canada</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-foreground mb-2"><strong>🇮🇳 India Office</strong></p>
                <p className="text-muted-foreground text-sm mb-1">Shashvat Plastics LLP</p>
                <p className="text-muted-foreground mb-1">📧 Email: info@shashvattrading.com</p>
                <p className="text-muted-foreground mb-1">📞 Phone: +91-9820191117</p>
                <p className="text-muted-foreground">📍 Mumbai, India</p>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
              <p className="text-primary font-semibold mb-2">Agreement Acknowledgment</p>
              <p className="text-muted-foreground text-sm">
                By requesting a quotation, placing an order, or engaging our trading services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. For specific transactions, additional terms may be agreed upon in writing which shall take precedence over these general terms.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
