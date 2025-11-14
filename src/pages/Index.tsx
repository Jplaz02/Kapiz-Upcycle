import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Gallery } from "@/components/Gallery";
import { Materials } from "@/components/Materials";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { EcoPromise } from "@/components/EcoPromise";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Mission />
      <Gallery />
      <Materials />
      <Process />
      <Testimonials />
      <Contact />
      <EcoPromise />
      <Footer />
    </div>
  );
};

export default Index;
