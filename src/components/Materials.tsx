import { useEffect, useRef, useState } from "react";
import { Waves, Trees, Shell, Recycle, Gem } from "lucide-react";
import materialsImage from "@/assets/product-5.png";

const materials = [
  {
    icon: Waves,
    name: "Sea Glass",
    description: "Tumbled by waves and time into smooth, frosted gems",
  },

  {
    icon: Shell,
    name: "Shells & Coral",
    description: "Natural treasures gifted by the tides",
  },

  {
    icon: Recycle,
    name: "Reclaimed Metal",
    description: "Vintage findings and salvaged pieces given new purpose",
  },
];

export const Materials = () => {
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
      id="materials"
      ref={sectionRef}
      className="py-24 px-6 bg-card relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${materialsImage})` }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="border-t border-primary/20 mb-16" />

        <h2
          className={`text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          From Shore to Shine
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, index) => {
            const Icon = material.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={material.name}
                className={`text-center p-6 rounded-lg bg-background/80 backdrop-blur-sm transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${
                        isEven ? "-translate-x-12" : "translate-x-12"
                      }`
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-serif font-semibold text-primary mb-2">
                  {material.name}
                </h3>

                <p className="text-accent text-sm">{material.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
