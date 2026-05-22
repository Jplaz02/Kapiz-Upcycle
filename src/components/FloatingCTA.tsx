import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/** A floating "Start a Custom Order" button that appears after the hero. */
export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 700);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <button
      onClick={scrollToContact}
      aria-label="Start a custom order"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-6 py-3.5 shadow-lg shadow-primary/30 transition-all duration-500 hover:bg-primary/90 hover:scale-105 ${
        isVisible
          ? "opacity-100 translate-y-0 animate-pulse-once"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <Sparkles className="w-4 h-4" />
      <span className="hidden sm:inline">Start a Custom Order</span>
      <span className="sm:hidden">Custom Order</span>
    </button>
  );
};
