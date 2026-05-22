import { Package, Leaf, MapPin, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const promises = [
  {
    icon: Package,
    title: "Eco Packaging",
    description: "All pieces ship in recycled, plastic-free packaging.",
  },
  {
    icon: Leaf,
    title: "Low Waste",
    description: "Zero-waste studio practices and minimal material waste.",
  },
  {
    icon: MapPin,
    title: "Local Sourcing",
    description: "Materials sourced close to home whenever possible.",
  },
  {
    icon: Heart,
    title: "Ethical Craft",
    description: "Fair labor, mindful practices, and community support.",
  },
];

export const EcoPromise = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="eco" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Our Commitment to the Planet</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={promise.title}
                className={`text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-gold-deep" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                  {promise.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
