import { useScrollReveal } from "@/hooks/useScrollReveal";
import missionImage from "@/assets/workspace.jpg";

export const Mission = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="mission" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gold-deep text-sm font-medium uppercase tracking-[0.2em] mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Sustainability with Soul
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            At Kapiz Upcycle, we believe beauty doesn't have to come at the
            planet's expense. Each piece tells a story of transformation —
            materials others overlook, given new life as wearable art.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From ocean-polished shells to reclaimed metals, we source ethically
            and craft every piece by hand. The result is jewelry as meaningful
            as it is beautiful — and entirely your own.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="relative">
            <img
              src={missionImage}
              alt="Artisan workspace with natural materials"
              loading="lazy"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-5 -left-5 hidden sm:block bg-card border border-border rounded-xl shadow-lg px-6 py-4">
              <p className="font-serif text-2xl font-bold text-foreground">
                100%
              </p>
              <p className="text-sm text-muted-foreground">
                Reclaimed &amp; natural materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
