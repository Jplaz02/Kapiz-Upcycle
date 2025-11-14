import { useEffect, useRef, useState } from "react";
import workspaceImage from "@/assets/product-1.jpg";

export const Mission = () => {
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
    <section id="mission" ref={sectionRef} className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-primary/20 mb-16" />

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Sustainability with Soul
            </h2>
            <p className="text-accent text-lg leading-relaxed mb-4">
              At Kapiz Upcycle, we believe that beauty doesn't have to come at
              the planet's expense. Each piece we create tells a story of
              transformation — taking materials that others might overlook and
              giving them new life as wearable art.
            </p>
            <p className="text-accent text-lg leading-relaxed">
              From sun-bleached driftwood to ocean-polished sea glass, we source
              our materials ethically and sustainably. Our mission is to reduce
              waste, celebrate craftsmanship, and create jewelry that's as
              meaningful as it is beautiful.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <img
              src={workspaceImage}
              alt="Artisan workspace with natural materials"
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
