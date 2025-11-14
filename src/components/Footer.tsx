import { useEffect, useRef, useState } from "react";
import { Instagram, Mail } from "lucide-react";

const navLinks = [
  { name: "Mission", href: "#mission" },
  { name: "Gallery", href: "#gallery" },
  { name: "Materials", href: "#materials" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="footer"
      ref={footerRef}
      className="py-16 px-6 bg-background border-t border-primary/20"
    >
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-8">
          <button 
            onClick={scrollToTop}
            className="text-3xl font-serif font-bold text-primary hover:text-primary/80 transition-colors mb-4 inline-block"
          >
            Kapiz Upcycle
          </button>
          <p className="text-accent max-w-md mx-auto">
            Handcrafted jewelry that reclaims beauty from nature's gifts
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-accent hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://instagram.com/kapizupcycle"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:hello@kapizupcycle.com"
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Kapiz Upcycle. All rights reserved.</p>
          <p className="mt-2">Crafted with care for people and planet.</p>
        </div>
      </div>
    </footer>
  );
};
