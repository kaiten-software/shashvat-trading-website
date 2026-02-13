import { Award, Users, Globe, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutCompanySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="py-24" style={{ background: 'var(--section-bg-3)' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-light text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Global <span className="font-semibold text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Excellence</span> in Plastics
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Established in 2017, Shashvat Trading has grown into a trusted global supplier of commodity
              thermoplastics. We specialize in sourcing, trading, and distributing virgin, near-prime,
              and reprocessed plastic resins to manufacturers worldwide.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              With offices in Canada and India, we bridge the gap between world-class petrochemical
              producers and processors globally. Our experienced team ensures you get the right product,
              at the right price, at the right time—every time.
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600">500+</div>
                </div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-amber-600">25+</div>
                </div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">2017</div>
                </div>
                <div className="text-sm text-muted-foreground">Since Established</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                </div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div className="relative" style={{ y: imageY }}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1000"
                alt="Shashvat Trading Logistics"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border border-green-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Global Presence</div>
                  <div className="text-lg font-bold text-foreground">Canada & India</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Looking for reliable plastic resin supply?
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="mailto:info@shashvattrading.com">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
              >
                ✉️ Email Us for a Quote
              </Button>
            </a>
            <a href="tel:+919820191117">
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                📞 Call +91 98201 91117
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
