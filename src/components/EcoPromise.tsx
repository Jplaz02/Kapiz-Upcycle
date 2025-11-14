import { useEffect, useRef, useState } from "react";
import { Package, Leaf, MapPin, Heart } from "lucide-react";

const promises = [
  {
    icon: Package,
    title: "Eco Packaging",
    description: "All pieces ship in recycled, plastic-free packaging",
  },
  {
    icon: Leaf,
    title: "Low Waste",
    description: "Zero-waste studio practices and minimal material waste",
  },
  {
    icon: MapPin,
    title: "Local Sourcing",
    description: "Materials sourced within 100 miles when possible",
  },
  {
    icon: Heart,
    title: "Ethical Craft",
    description: "Fair labor, mindful practices, and community support",
  },
];

export const EcoPromise = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="eco" 
      ref={sectionRef}
      className="py-24 px-6 bg-card"
    >
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-primary/20 mb-16" />
        
        <h2 className={`text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          Our Commitment to the Planet
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={promise.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`text-center p-6 rounded-lg bg-background transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${isHovered ? 'shadow-lg shadow-primary/20 scale-105' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${isHovered ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary/10 text-primary'}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-lg font-serif font-semibold text-primary mb-2">
                  {promise.title}
                </h3>
                
                <p className="text-accent text-sm">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
