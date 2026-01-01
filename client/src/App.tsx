import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Technology from "@/pages/Technology";
import Products from "@/pages/Products";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import ResidentialSolar from "@/pages/ResidentialSolar";
import CommercialSolar from "@/pages/CommercialSolar";
import IndustrialSolar from "@/pages/IndustrialSolar";
import OnGridSolar from "@/pages/OnGridSolar";
import HybridSolar from "@/pages/HybridSolar";
import SolarAMC from "@/pages/SolarAMC";
import EPCInstallation from "@/pages/EPCInstallation";
import SiteSurvey from "@/pages/SiteSurvey";
import DesignSimulation from "@/pages/DesignSimulation";
import HowItWorks from "@/pages/HowItWorks";
import CostsSubsidy from "@/pages/CostsSubsidy";
import SolarTechnologies from "@/pages/SolarTechnologies";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/technology" component={Technology} />
        <Route path="/products" component={Products} />
        <Route path="/solutions" component={Products} />
        <Route path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
        <Route path="/residential-solar" component={ResidentialSolar} />
        <Route path="/commercial-solar" component={CommercialSolar} />
        <Route path="/industrial-solar" component={IndustrialSolar} />
        <Route path="/on-grid-solar" component={OnGridSolar} />
        <Route path="/hybrid-solar" component={HybridSolar} />
        <Route path="/solar-amc" component={SolarAMC} />
        <Route path="/epc-installation" component={EPCInstallation} />
        <Route path="/site-survey" component={SiteSurvey} />
        <Route path="/design-simulation" component={DesignSimulation} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/costs-subsidy" component={CostsSubsidy} />
        <Route path="/solar-technologies" component={SolarTechnologies} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
