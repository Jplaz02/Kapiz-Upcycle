import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
    story: "A stunning centerpiece featuring a hand-painted shell medallion",
    image: product1,
  },
  {
    id: 2,
    name: "Pearl Garden Cascade",
    materials: "Freshwater pearls, floral accents, brass findings",
    story: "Delicate blooms intertwine with pearl clusters",
    image: product2,
  },
  {
    id: 3,
    name: "Baroque Pearl Collection",
    materials: "Baroque pearls, vintage beads, brass wire",
    story: "Each pearl's unique shape tells its own story",
    image: product3,
  },
  {
    id: 4,
    name: "Artisan Display Set",
    materials: "Mixed pearls, wire art, recycled packaging",
    story: "A curated collection showcasing sustainable artistry",
    image: product4,
  },
  {
    id: 5,
    name: "Resin Pendant Duo",
    materials: "Resin, vintage coins, brass beads",
    story: "Handcrafted pendants with embedded treasures",
    image: product5,
  },
  {
    id: 6,
    name: "Tree of Life Pearl",
    materials: "Baroque pearls, brass wire, chain",
    story: "Wire-wrapped tree design with pearl leaves",
    image: product6,
  },
];

export const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-primary/20 mb-16" />
        
        <h2 className={`text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          One-of-a-Kind Pieces
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pieces.map((piece, index) => (
            <div
              key={piece.id}
              className={`bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-64 bg-muted relative overflow-hidden">
                <img 
                  src={piece.image} 
                  alt={piece.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                  {piece.name}
                </h3>
                
                <p className="text-accent text-sm mb-2 font-medium">
                  {piece.materials}
                </p>
                
                <p className="text-muted-foreground text-sm mb-4 italic">
                  {piece.story}
                </p>
                
                <Button 
                  onClick={scrollToContact}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
