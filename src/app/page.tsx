import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CampaignsSection from "@/components/CampaignsSection";
import GallerySection from "@/components/GallerySection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CampaignsSection />
      <GallerySection />
      <StatsSection />
      <TestimonialsSection />
      <EnquiryForm />
      <Footer />
    </main>
  );
}
