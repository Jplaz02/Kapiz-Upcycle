import { Facebook, Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import logoFull from "@/assets/logo.png";

const navLinks = [
  { name: "Our Story", href: "#mission" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "How It Works", href: "#custom-orders" },
  { name: "Materials", href: "#materials" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="footer"
      ref={ref}
      className="bg-charcoal text-cream py-16 px-6"
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-8">
          <button
            onClick={scrollToTop}
            className="inline-block hover:opacity-85 transition-opacity"
            aria-label="Back to top"
          >
            <img
              src={logoFull}
              alt="Kapiz Upcycle"
              className="h-28 w-auto mx-auto"
            />
          </button>
          <p className="text-cream/70 max-w-md mx-auto mt-4">
            Handcrafted custom jewelry that reclaims beauty from nature's gifts.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-cream/75 hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.facebook.com/profile.php?id=61567497300887"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/mskapiz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center text-cream/50 text-sm border-t border-cream/10 pt-8">
          <p>
            &copy; {new Date().getFullYear()} Kapiz Upcycle. All rights
            reserved.
          </p>
          <p className="mt-1">Crafted with care for people and planet.</p>
        </div>
      </div>
    </footer>
  );
};
