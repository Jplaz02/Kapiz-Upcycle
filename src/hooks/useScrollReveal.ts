import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view. Returns a ref to attach to the
 * element and an `isVisible` flag for driving entrance transitions. The
 * observer is set up once at mount; `options` are read at that point.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...optionsRef.current }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
