import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sun, ArrowRight, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function SolarHeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -150]);
  const y3 = useTransform(scrollY, [0, 600], [0, 100]);

  // Rotating phrases with typing effect
  const phrases = [
    { text: "Affordable Solar", gradient: "from-green-600 via-green-500 to-amber-500" },
    { text: "Sustainable Energy", gradient: "from-blue-600 via-cyan-500 to-teal-500" },
    { text: "Smart Investment", gradient: "from-purple-600 via-pink-500 to-rose-500" },
    { text: "Energy Freedom", gradient: "from-orange-600 via-amber-500 to-yellow-500" },
    { text: "Future Ready", gradient: "from-emerald-600 via-green-500 to-lime-500" }
  ];
  
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex].text;
    
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 5000; // 5 seconds pause after typing complete
    
    if (!isDeleting && displayText === currentPhrase) {
      // Pause before starting to delete
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }
    
    if (isDeleting && displayText === "") {
      // Move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }
    
    const typingTimeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }
    }, typingSpeed);
    
    return () => clearTimeout(typingTimeout);
  }, [displayText, currentPhraseIndex, isDeleting]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-amber-50/20 pt-20 flex flex-col items-center justify-center" style={{ background: 'var(--section-bg-1)' }}>
      {/* Animated Background Elements with Parallax */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: y1 }}>
        {/* Soft gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-100/10 to-amber-100/10 rounded-full blur-3xl"></div>
      </motion.div>

      <motion.div className="absolute inset-0 opacity-30" style={{ y: y2 }}>
        {/* Subtle rays effect with parallax */}
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-300/40 via-transparent to-transparent transform -rotate-12"></div>
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-green-300/30 via-transparent to-transparent transform rotate-12"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-sm font-medium mt-8 mb-12 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Sun className="w-4 h-4" />
            <span>Premium Solar EPC Solutions</span>
          </motion.div>
          
          {/* Main Headline with Animations */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground mb-6 leading-[1.3] pb-6 overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Clean. Powerful.
            </motion.span>
            <br />
            <span className={`bg-gradient-to-r ${phrases[currentPhraseIndex].gradient} bg-clip-text text-transparent font-semibold inline-flex items-center pb-2`} style={{ WebkitBoxDecorationBreak: 'clone' }}>
              <span className="pb-2">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className={`inline-block w-1 h-16 md:h-20 ml-2 bg-gradient-to-r ${phrases[currentPhraseIndex].gradient}`}
              />
            </span>
            <br />
            <motion.span 
              className="text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              for Every Home.
            </motion.span>
          </motion.h1>
          
          {/* Sub-headline */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground mb-10 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            End-to-end EPC solutions with guaranteed performance & worry-free installation
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <Link href="/contact">
              <Button 
                size="lg" 
                className="px-10 py-7 text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl transition-all group"
              >
                Book Free Site Visit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="px-10 py-7 text-lg border-2 border-green-600 text-green-700 hover:bg-green-50 group"
              >
                Get Solar Quote
                <Zap className="ml-2 w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <div className="text-sm text-muted-foreground">Years Warranty</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-sm text-muted-foreground">Transparent Pricing</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                800+
              </div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                3-5
              </div>
              <div className="text-sm text-muted-foreground">Years ROI</div>
            </div>
          </div>

          {/* Location Badge */}
          <div className="mt-12">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-lg">
              <span className="text-2xl">📍</span>
              <span className="text-base font-medium text-foreground">Based in Jaipur, Rajasthan</span>
              <span className="text-2xl">☀️</span>
              <span className="text-base font-medium text-foreground">Serving Pan-India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
