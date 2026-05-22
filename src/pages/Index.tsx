import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Portfolio } from "@/components/Portfolio";
import { CustomOrderProcess } from "@/components/CustomOrderProcess";
import { Materials } from "@/components/Materials";
import { Testimonials } from "@/components/Testimonials";
import { EcoPromise } from "@/components/EcoPromise";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Mission />
      <Portfolio />
      <CustomOrderProcess />
      <Materials />
      <Testimonials />
      <EcoPromise />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
