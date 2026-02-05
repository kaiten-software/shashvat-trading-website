import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "What types of plastic resins do you supply?",
      answer: "We supply a comprehensive range of commodity thermoplastics including Polypropylene (PP), Polyethylene (LDPE, LLDPE, HDPE), Styrenics (GPPS, HIPS, EPS, ABS), PVC, PET, Engineering Plastics (Polyamides, Polycarbonate), as well as recycled resins and bio-polymers. We offer virgin, near-prime, and reprocessed grades to meet various application requirements and budgets."
    },
    {
      question: "What is the minimum order quantity?",
      answer: "Minimum order quantities vary by product type and origin. For most commodity resins, we can accommodate orders starting from one container load (typically 20-25 MT). For specialty materials or smaller quantities, please contact us to discuss availability. We're flexible and work with customers of all sizes."
    },
    {
      question: "Do you provide technical data sheets and quality certificates?",
      answer: "Yes, all our products come with complete technical documentation including Material Safety Data Sheets (MSDS), Technical Data Sheets (TDS), and Certificates of Analysis (COA). We maintain rigorous quality standards and can provide test reports, lot traceability, and compliance certificates as required."
    },
    {
      question: "What are your payment terms?",
      answer: "We offer flexible payment terms based on customer relationship and order volume. Standard terms include Letter of Credit (L/C), advance payment, and established accounts may qualify for credit terms. We work with customers to find mutually beneficial arrangements."
    },
    {
      question: "How long does delivery typically take?",
      answer: "Delivery timelines depend on product availability and destination. For in-stock items, we can ship within 1-2 weeks. Import shipments typically take 4-8 weeks door-to-door. We provide regular updates on shipment status and work with reliable freight partners to ensure timely delivery."
    },
    {
      question: "What's the difference between virgin, near-prime, and reprocessed resins?",
      answer: "Virgin resins are first-quality materials directly from petrochemical producers with full specifications. Near-prime (off-grade) materials may have minor variations from prime specs but maintain excellent processability at competitive prices. Reprocessed resins are recycled from industrial scrap, offering cost savings and environmental benefits for suitable applications."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we have offices in both Canada and India and ship to customers worldwide. Our logistics network covers North America, Europe, Asia, Middle East, and Africa. We handle all export documentation and can arrange door-to-door delivery or FOB/CIF terms as preferred."
    },
    {
      question: "Can you help with material selection for my application?",
      answer: "Absolutely. Our experienced team has deep knowledge of plastic materials and their applications. We can recommend suitable grades based on your processing method, end-use requirements, and budget. Whether you're injection molding, blow molding, extrusion, or thermoforming, we'll help find the right material."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve diverse industries including packaging (flexible and rigid), automotive, consumer goods, construction, electronics, healthcare, agriculture, and textiles. Our product range and technical expertise allow us to support manufacturers across virtually all plastic processing sectors."
    },
    {
      question: "How do I request a quote?",
      answer: "You can request a quote by emailing us at info@shashvattrading.com with your requirements (material type, grade if known, quantity, delivery location), or call our team directly. We typically respond within 24 hours with competitive pricing and availability information."
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-gold)' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Frequently Asked <span className="font-semibold text-green-600">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about sourcing plastics with us
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gradient-to-br from-white to-green-50/30 border border-green-100 rounded-xl px-6 hover:border-green-300 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <h3 className="text-2xl font-semibold text-foreground mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you find the right materials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@shashvattrading.com"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
            >
              ✉️ Email Us
            </a>
            <a 
              href="tel:+919820191117"
              className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              📞 Call: +91 98201 91117
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
