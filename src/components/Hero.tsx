import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";
import logoMark from "@/assets/kapiz-logo.png";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background/90" />
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <img
          src={logoMark}
          alt="Kapiz Upcycle"
          className="h-24 md:h-28 mb-6 mx-auto drop-shadow-lg animate-float"
        />

        <p className="inline-flex items-center gap-2 text-gold-deep text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-4 h-4" />
          Handcrafted · One-of-a-kind · Eco-conscious
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-5 leading-tight text-balance">
          Custom Jewelry, <span className="text-gold-deep">Reclaimed</span> by
          Hand
        </h1>

        <p className="text-lg md:text-xl text-foreground/75 mb-8 font-light max-w-xl mx-auto">
          We transform reclaimed shells, pearls, and found materials into
          one-of-a-kind pieces — designed around your story.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => scrollTo("contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-6 text-base rounded-full"
          >
            Start Your Custom Piece
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("portfolio")}
            className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium px-8 py-6 text-base rounded-full"
          >
            View Our Work
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollTo("mission")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-foreground/60 hover:text-foreground transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};
