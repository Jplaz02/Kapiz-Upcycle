import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";
import KapizLogo from "@/assets/kapiz-logo.png";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToExplore = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-15"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all  duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <img src={KapizLogo} alt="Kapiz Logo" className="h-32 mb-5 mx-auto " />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-2 animate-fade-up">
          KAPIZ UPCYCLE
        </h1>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-serif text-primary mb-6 animate-fade-up">
          Sustainable Artistry
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl text-accent mb-8 font-light animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Transforming reclaimed materials into unique, handcrafted jewelry
        </p>
        <Button
          onClick={scrollToExplore}
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-6 text-lg animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Explore Our Work
          <ChevronDown className="ml-2 animate-bounce" />
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
};
