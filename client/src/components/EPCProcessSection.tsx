import { Search, PenTool, Package, Wrench, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function EPCProcessSection() {
  const steps = [
    {
      icon: Search,
      title: "Site Analysis & Shadow Study",
      description: "Detailed roof assessment and solar potential evaluation",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: PenTool,
      title: "System Design & Load Calculation",
      description: "Custom engineering design based on your energy needs",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Package,
      title: "Procurement from Tier-1 Brands",
      description: "Quality components from trusted manufacturers",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Wrench,
      title: "Installation & Commissioning",
      description: "Professional installation with safety standards",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FileCheck,
      title: "Net Metering & After-Sales",
      description: "Complete documentation and ongoing support",
      color: "from-green-600 to-teal-600"
    }
  ];

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-4)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Our <span className="font-semibold text-green-600">EPC Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A streamlined 5-step journey from concept to clean energy
          </p>
        </div>

        {/* Process Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-300 to-green-200 transform -translate-y-1/2"></div>
          
          <div className="relative flex justify-between items-start">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center" style={{ width: '18%' }}>
                  {/* Step Number & Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-green-500 flex items-center justify-center font-bold text-green-600 text-lg shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Timeline - Mobile/Tablet */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative`}>
                    <Icon className="w-10 h-10 text-white" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-3 border-green-500 flex items-center justify-center font-bold text-green-600 text-sm shadow-md">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-green-200 shadow-lg mb-8">
            <span className="text-2xl">⚡</span>
            <span className="text-base font-medium text-foreground">Average Installation Time: 7-10 Days</span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Ready to start your solar journey?
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="https://wa.me/919772533559?text=Hi, I'd like to schedule a site visit" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
                💬 Chat Instantly on WhatsApp
              </Button>
            </a>
            <a href="tel:+919772533559">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                📞 Call +91 97725 33559
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
