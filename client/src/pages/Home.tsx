import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import AboutCompanySection from "@/components/AboutCompanySection";
import SolutionsSection from "@/components/SolutionsSection";
import HomeProductFilter from "@/components/HomeProductFilter";
import BrandsSection from "@/components/BrandsSection";
import RecentBlogPosts from "@/components/RecentBlogPosts";
import FAQSection from "@/components/FAQSection";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <AboutCompanySection />
      <SolutionsSection />
      <HomeProductFilter />
      <BrandsSection />
      <RecentBlogPosts />
      <FAQSection />

      <Footer />
    </div>
  );
}
