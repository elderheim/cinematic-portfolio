"use client";

import { useEffect, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function ScrollButton() {
  // State to track if we are at the very top of the page
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out the button if the user scrolls down more than 50px
      setIsVisible(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      // Scroll down precisely one viewport height to kick off the 3D journey
      smoother.scrollTo(window.innerHeight, true);
    } else {
      // Fallback for native scrolling
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    // Fixed to the bottom right. The opacity transition handles the fade-out seamlessly.
    <div
      className={`fixed right-8 bottom-12 md:right-16 md:bottom-16 z-40 transition-opacity duration-700 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* flex-row aligns the text to the left of the button */}
      <div className="flex flex-row items-center gap-4">
        {/* The micro-copy */}
        <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">
          Scroll to begin
        </span>

        {/* The Interactive Button */}
        <button
          onClick={handleScrollDown}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 hover:text-[#a080cc] hover:border-[#a080cc] hover:bg-white/5 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          aria-label="Scroll down to begin"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            // A subtle bounce animation on hover
            className="transition-transform duration-300 group-hover:translate-y-1"
          >
            {/* The SVG lines are flipped to point perfectly downwards */}
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
