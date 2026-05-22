import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Send } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Contact = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending message.");
      console.error("Email send error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-muted/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>Let's Make Something Beautiful</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-14">
          Ready to start your custom piece? Send us the details or message us
          directly — we'd love to hear your idea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <form
            onSubmit={handleSubmit}
            className={`md:col-span-3 bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Your Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                Describe Your Dream Piece
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about the piece you'd love — the occasion, style, colors, or materials..."
                className="bg-background border-border resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Start My Custom Order
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div
            className={`md:col-span-2 flex flex-col gap-4 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Prefer to chat?
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Message us directly — we usually reply within a day.
              </p>

              <a
                href="https://www.facebook.com/profile.php?id=61567497300887"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-full bg-[#1877F2] text-white px-5 py-3 font-medium hover:opacity-90 transition-opacity mb-3"
              >
                <Facebook className="w-5 h-5" />
                Message on Facebook
              </a>

              <a
                href="https://www.instagram.com/mskapiz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-full px-5 py-3 font-medium text-white hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                }}
              >
                <Instagram className="w-5 h-5" />
                DM us on Instagram
              </a>
            </div>

            <div className="bg-secondary/60 border border-border rounded-2xl p-6">
              <p className="text-foreground font-medium mb-1">
                Every piece is made to order
              </p>
              <p className="text-muted-foreground text-sm">
                No two are alike — and yours will be designed around you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
