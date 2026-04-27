import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    // quickTo is highly optimized for values that change constantly
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      // Using mix-blend-difference makes it contrast perfectly against any background
      className="fixed top-0 left-0 w-6 h-6 bg-[#2d052e] mix-blend-difference rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
    />
  );
}