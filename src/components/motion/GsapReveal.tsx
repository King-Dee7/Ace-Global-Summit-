"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function GsapReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}: GsapRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const el = elRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    if (direction === "up") y = 35;
    if (direction === "down") y = -35;
    if (direction === "left") x = 35;
    if (direction === "right") x = -35;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction, delay, duration]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
