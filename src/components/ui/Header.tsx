"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverFlickerText } from "../ux/HoverFlickerText";
// 1. Import your scene data so the header knows the timeline math
import { scenePerspectives } from "@/lib/data/scene-data";

interface HeaderProps {
  demoTitle?: string;
  demos?: Array<{
    label: string;
    href: string;
  }>;
}

export function Header({
  demoTitle = "ALYSSA DAI",
  demos = [
    { label: "Home", href: "#home" },
    { label: "Resume", href: "#cv" },
    { label: "Projects", href: "#works" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Contact", href: "#contact" },
  ],
}: HeaderProps) {
  const [activeId, setActiveId] = useState(demos[0]?.href || "");

  // 2. The Math-Based Scroll Tracker
  // This replaces IntersectionObserver, which fails on fixed elements.
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (maxScroll <= 0) return;

      // Calculate our current scroll depth as a percentage (0 to 100)
      const currentProgress = (window.scrollY / maxScroll) * 100;

      // Find which perspective range we are currently sitting inside
      const currentPerspective = scenePerspectives.find(
        (p) =>
          currentProgress >= p.scrollProgress.start &&
          currentProgress < p.scrollProgress.end,
      );

      if (currentPerspective && currentPerspective.sectionId) {
        setActiveId(`#${currentPerspective.sectionId}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. The Percentage-Based Scroll Handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");

      const targetPerspective = scenePerspectives.find(
        (p) => p.sectionId === id,
      );

      if (targetPerspective) {
        setActiveId(href);

        const maxScroll = ScrollTrigger.maxScroll(window);

        // Let's penetrate 2% into the section's progress range rather than just hitting the border.
        // This guarantees the camera finishes its interpolation and the text is fully visible.
        const bufferPercentage = 6.5;
        const targetPercentage =
          (targetPerspective.scrollProgress.start + bufferPercentage) / 100;

        const targetPixel = maxScroll * targetPercentage;

        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(targetPixel, true);
        } else {
          window.scrollTo({ top: targetPixel, behavior: "smooth" });
        }
      }
    }
  };

  const leftLinks = demos.slice(0, 3);
  const rightLinks = demos.slice(3, 5);

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[98%] max-w-7xl z-50 pointer-events-auto">
        <div className="flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <nav className="hidden md:flex flex-1 items-center justify-start gap-8 pl-4">
            {leftLinks.map((demo, index) => {
              const isCurrent = activeId === demo.href;
              return (
                <Link
                  key={`left-${index}`}
                  to={demo.href}
                  onClick={(e) => handleNavClick(e, demo.href)}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    isCurrent
                      ? "text-[#33135f] font-medium"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <HoverFlickerText>{demo.label}</HoverFlickerText>
                </Link>
              );
            })}
          </nav>

          <div className="flex-shrink-0 px-4">
            <Link
              to="/"
              aria-label={demoTitle}
              className="block hover:scale-105 transition-transform duration-300"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="20" cy="20" r="6" fill="#33135f" />
              </svg>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 items-center justify-end gap-8 pr-4">
            {rightLinks.map((demo, index) => {
              const isCurrent = activeId === demo.href;
              return (
                <Link
                  key={`right-${index}`}
                  to={demo.href}
                  onClick={(e) => handleNavClick(e, demo.href)}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    isCurrent
                      ? "text-[#33135f] font-medium"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <HoverFlickerText>{demo.label}</HoverFlickerText>
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden flex flex-1 justify-end items-center pr-2">
            <button
              aria-label="Open Menu"
              className="text-white/80 hover:text-white p-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
