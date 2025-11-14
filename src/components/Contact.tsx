import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Mail, Send } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-primary/20 mb-16" />

        <h2
          className={`text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Let's Make Something Beautiful
        </h2>

        <p
          className={`text-accent text-center text-lg mb-12 transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Have a question? Interested in a custom piece? We'd love to hear from
          you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-card border-muted text-accent placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-card border-muted text-accent placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-card border-muted text-accent placeholder:text-muted-foreground resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              Send Message
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div
            className={`space-y-8 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                Stay Connected
              </h3>
              <p className="text-accent mb-6">
                Follow our journey and see new creations as they're made. Join
                our community of conscious creators and collectors.
              </p>

              <div className="space-y-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61567497300887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="font-medium">@kapizupcycle</span>
                </a>
                <a
                  href="https://www.instagram.com/mskapiz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="font-medium">@mskapiz</span>
                </a>
                <a
                  href="mailto:shervids76@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span className="font-medium">shervids76</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
