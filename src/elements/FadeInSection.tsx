import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInSectionProps {
  children: ReactNode;
  direction?: "left" | "right"; // направление появления
  delay?: number;               // задержка анимации
  additionalClass?: string,
}

export function FadeInSection({
    children,
    direction = "right",
    delay = 0,
    additionalClass = "",
  }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xStart = direction === "left" ? -100 : 100;

    const animation = gsap.fromTo(
      element,
      { opacity: 0, x: xStart },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // когда элемент входит в зону видимости
          once: true,
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
    };
  }, [direction, delay]);
  return <div ref={ref} className={additionalClass}>{children}</div>;
}