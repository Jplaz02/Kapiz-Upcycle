import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    context: "Custom necklace",
    rating: 5,
    quote:
      "My Kapiz piece isn't just jewelry — it's a conversation starter and a daily reminder to live more sustainably. The craftsmanship is exceptional.",
  },
  {
    id: 2,
    name: "James Chen",
    context: "Anniversary gift",
    rating: 5,
    quote:
      "I gifted a piece to my wife and she wears it every day. Knowing it's made from reclaimed materials makes it even more special.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    context: "Custom earrings",
    rating: 5,
    quote:
      "Each piece truly tells a story. I love knowing my jewelry has a history and a purpose beyond just looking beautiful.",
  },
];

export const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Words from Our Community</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card border border-border rounded-2xl p-8 shadow-sm transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="w-10 h-10 text-primary/25 mb-3" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="text-foreground font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
