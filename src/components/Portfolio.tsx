import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import product5 from "@/assets/product-5.png";
import product6 from "@/assets/product-6.png";

const pieces = [
  {
    id: 1,
    name: "Shell Blossom Statement",
    materials: "Shell pendant, soda can tabs, vintage beads",
    story: "A stunning centerpiece featuring a hand-painted shell medallion.",
    image: product1,
  },
  {
    id: 2,
    name: "Pearl Garden Cascade",
    materials: "Freshwater pearls, floral accents, brass findings",
    story: "Delicate blooms intertwine with pearl clusters.",
    image: product2,
  },
  {
    id: 3,
    name: "Baroque Pearl Collection",
    materials: "Baroque pearls, vintage beads, brass wire",
    story: "Each pearl's unique shape tells its own story.",
    image: product3,
  },
  {
    id: 4,
    name: "Artisan Display Set",
    materials: "Mixed pearls, wire art, recycled packaging",
    story: "A curated collection showcasing sustainable artistry.",
    image: product4,
  },
  {
    id: 5,
    name: "Resin Pendant Duo",
    materials: "Resin, vintage coins, brass beads",
    story: "Handcrafted pendants with embedded treasures.",
    image: product5,
  },
  {
    id: 6,
    name: "Tree of Life Pearl",
    materials: "Baroque pearls, brass wire, chain",
    story: "Wire-wrapped tree design with pearl leaves.",
    image: product6,
  },
];

export const Portfolio = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const active = activeIndex !== null ? pieces[activeIndex] : null;
  const showPrev = () =>
    setActiveIndex((i) =>
      i === null ? i : (i + pieces.length - 1) % pieces.length
    );
  const showNext = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % pieces.length));

  return (
    <section id="portfolio" ref={ref} className="py-24 px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>One-of-a-Kind Pieces</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-14">
          A glimpse of past commissions. Every piece is unique — use these as
          inspiration for a custom creation of your own.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pieces.map((piece, index) => (
            <div
              key={piece.id}
              className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="block w-full h-72 relative overflow-hidden shine-sweep"
                aria-label={`View ${piece.name}`}
              >
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-cream text-sm font-medium">
                    View details
                  </span>
                </span>
              </button>

              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {piece.name}
                </h3>
                <p className="text-gold-deep text-sm mb-2 font-medium">
                  {piece.materials}
                </p>
                <p className="text-muted-foreground text-sm mb-5 italic">
                  {piece.story}
                </p>
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground rounded-full"
                >
                  Request Something Like This
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => !open && setActiveIndex(null)}
      >
        <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden">
          {active && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-72 md:h-auto">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {active.name}
                </h3>
                <p className="text-gold-deep text-sm font-medium mb-4">
                  {active.materials}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {active.story}
                </p>
                <Button
                  onClick={() => {
                    setActiveIndex(null);
                    scrollToContact();
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-auto"
                >
                  Request Something Like This
                </Button>
              </div>
            </div>
          )}

          <button
            onClick={showPrev}
            aria-label="Previous piece"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={showNext}
            aria-label="Next piece"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};
