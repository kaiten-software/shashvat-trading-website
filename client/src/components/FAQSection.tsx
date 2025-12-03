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
      question: "How much does a 3kW/5kW solar system cost?",
      answer: "A 3kW system costs approximately ₹1.5-1.8 lakhs (after subsidy), while a 5kW system costs around ₹2.5-3 lakhs (after subsidy). Final cost depends on component selection, roof type, and installation complexity. Government subsidy of ₹78,000 is available for residential solar systems in Rajasthan."
    },
    {
      question: "What is the warranty on panels and inverters?",
      answer: "Solar panels come with a 25-year performance warranty (ensuring 80%+ efficiency) and a 10-12 year product warranty. Inverters typically have a 5-10 year warranty depending on the brand. We provide extended warranty options and comprehensive AMC packages for complete peace of mind."
    },
    {
      question: "Is net-metering available in my area?",
      answer: "Net metering is available across Rajasthan through JVVNL and other DISCOMs. We handle the entire net metering application process including documentation, approvals, and bi-directional meter installation. The process typically takes 2-4 weeks after system commissioning."
    },
    {
      question: "How long does installation take?",
      answer: "For residential systems (1-10kW), installation typically takes 7-10 days from site visit to commissioning. This includes design approval, material procurement, installation, testing, and net metering application. Commercial and industrial projects may take 2-4 weeks depending on system size."
    },
    {
      question: "What maintenance is required?",
      answer: "Solar systems require minimal maintenance. Clean panels 2-3 times per year to remove dust (especially before monsoon). Monitor system performance monthly via inverter display or app. We offer Annual Maintenance Contracts (AMC) that include cleaning, inspection, performance testing, and preventive maintenance."
    },
    {
      question: "What is the payback period for solar investment?",
      answer: "Typical payback period is 3-5 years depending on your electricity consumption and system size. After payback, you enjoy 20+ years of free electricity generation. With rising electricity tariffs, the ROI becomes even better over time."
    },
    {
      question: "Will solar work during cloudy days or monsoon?",
      answer: "Yes, solar panels generate electricity even on cloudy days, though at reduced efficiency (20-40% of peak output). During monsoon, generation drops but doesn't stop completely. Annual generation accounts for seasonal variations, ensuring projected savings are met."
    },
    {
      question: "What is the difference between on-grid and hybrid systems?",
      answer: "On-grid systems are connected to the electricity grid without battery backup. They're more economical and use net metering for excess power. Hybrid systems include battery storage, providing backup during power cuts but at a higher initial cost. We help you choose based on your needs and budget."
    },
    {
      question: "Do I get government subsidy for solar installation?",
      answer: "Yes, residential solar systems in Rajasthan are eligible for government subsidy: ₹30,000 for 1kW system, ₹60,000 for 2kW system, and ₹78,000 for 3kW system. We assist with the entire subsidy application process and ensure you receive the maximum benefit, handling all documentation and approvals on your behalf."
    },
    {
      question: "What happens to my solar system during hailstorms?",
      answer: "Quality solar panels are tested to withstand hail stones up to 25mm diameter at high velocity. All our Tier-1 panels are certified for extreme weather conditions. Additionally, we recommend solar insurance to cover rare events. Proper installation with secure mounting also prevents storm damage."
    },
    {
      question: "What is the most important component in a solar plant?",
      answer: "Mounting structure and electrical accessories are the most important components. They ensure the life of plant is longer and safe. A robust mounting structure withstands wind loads, prevents panel damage, and ensures optimal tilt angles. Quality electrical accessories (cables, connectors, earthing, protection devices) prevent failures, reduce losses, and ensure safety for decades."
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
            Everything you need to know about going solar
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
            Our solar experts are here to help you make the right decision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919876543210"
              className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              📞 Call: +91 98677 40809
            </a>
            <a 
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
