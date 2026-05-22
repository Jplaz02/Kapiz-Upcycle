import { MessageCircle, PenTool, Hammer, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "Share Your Vision",
    description:
      "Tell us your idea, occasion, or inspiration. No idea is too small — we'll shape it together.",
  },
  {
    icon: PenTool,
    title: "We Design Together",
    description:
      "We propose materials and a design that honors your story, and refine it until it feels right.",
  },
  {
    icon: Hammer,
    title: "Handcrafted for You",
    description:
      "Your piece is made by hand from reclaimed and natural materials, with care at every step.",
  },
  {
    icon: Gift,
    title: "Delivered with Love",
    description:
      "Your one-of-a-kind piece arrives in eco-friendly, plastic-free packaging, ready to wear.",
  },
];

export const CustomOrderProcess = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="custom-orders"
      ref={ref}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>How Custom Orders Work</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-16">
          Commissioning your own piece is simple. Here's what to expect.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Connecting line that draws in on scroll (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-border overflow-hidden">
            <div
              className={`h-full bg-primary origin-left transition-transform [transition-duration:1500ms] ease-out ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`relative text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative z-10 mx-auto inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Icon className="w-9 h-9" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border border-border text-foreground text-sm font-serif font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mt-5 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base"
          >
            Start Your Custom Order
          </Button>
        </div>
      </div>
    </section>
  );
};
