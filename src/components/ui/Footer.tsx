"use client";

import { Link } from "react-router-dom";
import { HoverFlickerText } from "../ux/HoverFlickerText";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function Footer() {
  // Graceful GSAP-aware back-to-top handler
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    // We use a relative block with a subtle frosted glass effect so it blends nicely
    // at the bottom of your scrolling container without looking like a harsh black box.
    <footer className="relative w-full border-t border-white/10 bg-black/20 backdrop-blur-md pt-16 pb-8 px-8 md:px-16 z-50 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Main Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <Link
              to="/"
              className="text-white font-bold text-xl tracking-[0.15em] uppercase w-fit"
            >
              <HoverFlickerText>ALYSSA DAI</HoverFlickerText>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Pioneering digital experiences with a focus on immersive 3D
              interfaces and cinematic storytelling.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2 text-sm text-white/80 font-light">
              <a
                href="mailto:alyssadai@alyssa.com"
                className="hover:text-[#a080cc] transition-colors duration-300 w-fit"
              >
                <HoverFlickerText>alyssadai@alyssa.com</HoverFlickerText>
              </a>
              <p className="text-white/50 mt-2">
                Frisco, TX
                <br />
                United States
              </p>
            </div>
          </div>

          {/* Column 3: Site Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
              Links
            </h4>
            <nav className="flex flex-col gap-3 text-sm text-white/80 font-light">
              {["Home", "Resume", "Projects", "Newsletter"].map((link) => (
                <Link
                  key={link}
                  to={`#${link.toLowerCase()}`}
                  className="hover:text-[#a080cc] transition-colors w-fit"
                >
                  <HoverFlickerText>{link}</HoverFlickerText>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Socials */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
              Follow Us
            </h4>
            <nav className="flex flex-col gap-3 text-sm text-white/80 font-light">
              {["LinkedIn", "Github", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="group hover:text-[#a080cc] transition-colors flex items-center gap-2 w-fit"
                >
                  <HoverFlickerText>{social}</HoverFlickerText>
                  {/* Subtle diagonal arrow that slides slightly on hover */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Utilities */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-white/40 font-light gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} Alyssa Dai. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <Link to="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <span className="opacity-20">|</span>
              <Link to="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Circular Back-to-top Button */}
          <button
            onClick={handleBackToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 hover:text-[#a080cc] hover:border-[#a080cc] hover:bg-white/5 transition-all duration-300"
            aria-label="Back to top"
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
            >
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
