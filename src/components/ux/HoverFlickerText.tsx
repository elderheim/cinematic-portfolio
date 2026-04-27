import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

export function HoverFlickerText({ children }: { children: React.ReactNode }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  const handleMouseEnter = () => {
    if (!textRef.current) return;

    // Only create the SplitText instance once
    if (!splitRef.current) {
      splitRef.current = new SplitText(textRef.current, { type: "chars" });
    }

    // Kill any ongoing animations to prevent queuing glitches if they mouse in/out quickly
    gsap.killTweensOf(splitRef.current.chars);

    // Create a fast, randomized flicker
    gsap.fromTo(splitRef.current.chars, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        stagger: { 
          amount: 0.4, 
          from: "random" 
        },
        ease: "power1.inOut"
      }
    );
  };

  return (
    <span
      ref={textRef}
      onMouseEnter={handleMouseEnter}
      className="inline-block cursor-crosshair"
    >
      {children}
    </span>
  );
}