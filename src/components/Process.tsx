import { useEffect, useRef, useState } from "react";
import { Search, Lightbulb, Hammer } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Sourcing",
    description: "We ethically collect materials from beaches, forests, and sustainable sources, respecting nature's gifts.",
  },
  {
    icon: Lightbulb,
    title: "Designing",
    description: "Each piece is thoughtfully designed to honor the material's natural beauty and unique character.",
  },
  {
    icon: Hammer,
    title: "Crafting",
    description: "Hand-crafted with care and precision, ensuring every detail reflects our commitment to quality.",
  },
];

export const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      id="process" 
      ref={sectionRef}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-primary/20 mb-16" />
        
        <h2 className={`text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          How We Create
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div
                key={step.title}
                className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-primary-foreground">
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-4xl font-serif font-bold text-primary/20">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                
                <p className="text-accent leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {isVisible && (
          <div className="mt-12 flex justify-center">
            <div className="h-1 w-48 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
};
