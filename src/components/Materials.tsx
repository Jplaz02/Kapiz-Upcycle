import { Waves, Shell, Recycle, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const materials = [
  {
    icon: Shell,
    name: "Shells & Capiz",
    description:
      "Iridescent capiz and natural shells — gifts of the tides given new purpose.",
  },
  {
    icon: Sparkles,
    name: "Reclaimed Pearls",
    description:
      "Freshwater and baroque pearls, each with its own unique character.",
  },
  {
    icon: Recycle,
    name: "Reclaimed Metal",
    description: "Vintage findings and salvaged brass, restored and reimagined.",
  },
  {
    icon: Waves,
    name: "Sea Glass",
    description:
      "Tumbled smooth by waves and time into frosted, jewel-like gems.",
  },
];

export const Materials = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="materials"
      ref={ref}
      className="py-24 px-6 bg-secondary/50"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>From Shore to Shine</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-14">
          The natural and reclaimed materials we work with — and what your
          custom piece can be made from.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, index) => {
            const Icon = material.icon;
            return (
              <div
                key={material.name}
                className={`text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-gold-deep" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                  {material.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {material.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
