import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Award, 
  Users, 
  Shield, 
  Globe, 
  Target,
  Heart,
  Lightbulb,
  Phone,
  MessageCircle,
  Building2,
  TrendingUp
} from "lucide-react";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const values = [
    {
      icon: Award,
      title: "Best Quality",
      desc: "We provide premium-grade products that meet international standards and quality requirements."
    },
    {
      icon: Users,
      title: "Team Support",
      desc: "Our experienced staff ensures the correct materials are traded with precision and care."
    },
    {
      icon: Shield,
      title: "Reliability",
      desc: "Local and global suppliers rely on our commitment to consistent, on-time delivery."
    }
  ];

  const milestones = [
    { year: "2017", title: "Founded", desc: "Shashvat Trading established with a vision for global plastics distribution" },
    { year: "2018", title: "India Operations", desc: "Opened Shashvat Plastics LLP in Mumbai" },
    { year: "2019", title: "Global Partnerships", desc: "Established partnerships with major petrochemical producers" },
    { year: "2020", title: "Canada Expansion", desc: "Launched Shashvat Polymers Ltd in Canada" },
    { year: "2023", title: "Growing Network", desc: "Expanded product portfolio and customer base across continents" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="max-w-3xl">
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 mb-6">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Partner in 
              <span className="text-emerald-400"> Global Plastics Trading</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Since 2017, Shashvat Trading has been delivering premium thermoplastics 
              to customers worldwide, bridging the gap between manufacturers and end-users.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2017", label: "Founded" },
              { value: "2", label: "Global Offices" },
              { value: "50+", label: "Partner Companies" },
              { value: "100+", label: "Products" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Building Bridges in Global Trade
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Shashvat Trading was founded with a simple yet powerful vision: to become 
                  the most reliable partner for businesses seeking quality plastic resins at 
                  competitive prices.
                </p>
                <p>
                  We leverage our global network, experienced staff, and deep market knowledge 
                  to deliver the right product, at the right price, at the right time. Our 
                  team brings decades of combined experience in the petrochemical industry.
                </p>
                <p>
                  With offices in Canada and India, we serve customers across North America, 
                  Asia, and beyond. Our partnerships with leading manufacturers like LG Chem, 
                  Formosa, IRPC, and INEOS Styrolution ensure access to the best products 
                  available globally.
                </p>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                <Globe className="h-32 w-32 text-emerald-400" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">7+ Years</p>
                    <p className="text-gray-600">Industry Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeIn}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="h-14 w-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To be the preferred trading partner for plastic resins by delivering 
                    exceptional value through quality products, competitive pricing, and 
                    reliable service. We strive to build lasting relationships based on 
                    trust and mutual success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div {...fadeIn}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="h-14 w-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                    <Lightbulb className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To become a leading global distributor of thermoplastics, known for 
                    our extensive product range, market expertise, and commitment to 
                    customer satisfaction. We aim to grow sustainably while contributing 
                    to the success of our partners.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Global Presence</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Offices
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...fadeIn}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🇨🇦</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Canada</h3>
                      <p className="text-emerald-600">Shashvat Polymers Ltd</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Serving the North American market with a focus on quality service 
                    and reliable supply of polymer resins.
                  </p>
                  <a 
                    href="tel:+19058132169" 
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <Phone className="h-4 w-4" />
                    +1 905-813-2169
                  </a>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div {...fadeIn}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🇮🇳</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">India</h3>
                      <p className="text-emerald-600">Shashvat Plastics LLP</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Headquartered in Mumbai, serving the Asian market with extensive 
                    product range and industry expertise.
                  </p>
                  <a 
                    href="tel:+919820191117" 
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <Phone className="h-4 w-4" />
                    +91 98201 91117
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Milestones
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-emerald-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-sm text-emerald-600 font-medium">{milestone.year}</p>
                  <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Let's discuss how we can meet your plastic resin requirements with 
            competitive pricing and reliable supply.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </Link>
            <a href="tel:+919820191117">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
