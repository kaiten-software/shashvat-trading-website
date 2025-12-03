import { Shield, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function WarrantySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden" 
      style={{ background: 'var(--section-bg-3)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
            <Award className="w-4 h-4" />
            <span>Industry-Leading Protection</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Unmatched Warranty Coverage
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The only EPC company offering comprehensive, unconditional warranty protection for your complete solar installation
          </p>
        </motion.div>

        {/* Main Warranty Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-green-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-700 mb-3">
                  7-Year Mounting Structure Warranty
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Complete protection for your solar panel mounting system, frames, and structural components—unconditionally guaranteed.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Aluminum & steel structures</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>All mounting hardware & fasteners</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Structural integrity assurance</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-amber-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-700 mb-3">
                  3-Year Electrical Accessories Warranty
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Comprehensive coverage for all electrical components and accessories—no conditions, no hassle.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>Cables & connectors</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>Junction boxes & earthing</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>AC/DC distribution boxes</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-green-200 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2">What Makes Us Different?</h4>
              <p className="text-muted-foreground mb-3">
                Unlike other EPC companies that offer limited or conditional warranties, we stand behind our work with industry-leading coverage. Your peace of mind is our priority.
              </p>
              <p className="text-sm text-muted-foreground italic">
                *All specifications are provided as per our expert recommendations to ensure optimal system performance and longevity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
