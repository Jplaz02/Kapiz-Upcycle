import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    quote:
      "My Kapiz piece isn't just jewelry — it's a conversation starter and a daily reminder to live more sustainably. The craftsmanship is exceptional.",
  },
  {
    id: 2,
    name: "James Chen",
    quote:
      "I gifted a piece to my wife, and she wears it every day. Knowing it's made from reclaimed materials makes it even more special.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    quote:
      "Each piece truly tells a story. I love knowing that my jewelry has a history and a purpose beyond just looking beautiful.",
  },
];

export const Testimonials = () => {
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
    <section id="testimonials" ref={sectionRef} className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-primary/20 mb-16" />

        <h2
          className={`text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Words from Our Community
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-background p-8 rounded-lg relative transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="w-12 h-12 text-primary/20 mb-4" />

              <p className="text-accent mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div>
                <p className="text-primary font-semibold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
