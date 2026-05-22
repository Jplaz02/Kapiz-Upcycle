import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeadingProps {
  children: React.ReactNode;
  align?: "center" | "left";
}

/** A serif section heading with a gold underline that draws in on scroll. */
export const SectionHeading = ({
  children,
  align = "center",
}: SectionHeadingProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
        {children}
      </h2>
      <span
        className={`mt-4 block h-[3px] w-20 rounded-full bg-primary origin-left transition-transform duration-700 ${
          align === "center" ? "mx-auto" : ""
        } ${isVisible ? "scale-x-100" : "scale-x-0"}`}
      />
    </div>
  );
};
