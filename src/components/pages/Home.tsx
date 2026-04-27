/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

import { getPositionClasses } from "@/lib/util/utils";
import { scenePerspectives } from "@/lib/data/scene-data";

import Loader from "@/components/ui/Loader";
import { Header } from "@/components/ui/Header";
import { CustomCursor } from "@/components/ux/CustomCursor";
import { InteractiveMouseLight } from "@/components/ux/InteractiveMouseLight";
import { HoverFlickerText } from "@/components/ux/HoverFlickerText";
import { Footer } from "@/components/ui/Footer";
import ScrollButton from "@/components/ui/ScrollButton";
import Scene from "@/features/world/Scene";
import { useGLTF } from "@react-three/drei";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
}

/**
 * CinematicSceneShowcase is the main component that sets up the entire page, including the 3D canvas, header, and scroll-triggered animations.
 * It initializes the GSAP timelines for camera movement and text animations based on the scroll position.
 * The component also handles the loading state and ensures that all animations are properly cleaned up when the component is unmounted.
 * @returns 
 */
export default function CinematicSceneShowcase() {
  document.title = "Alyssa Dai | Portfolio";
  const containerRef = useRef<HTMLDivElement>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cameraAnimRef = useRef({ x: -20, y: 0, z: 0 });
  const targetAnimRef = useRef({ x: 0, y: 15, z: 0 });
  const rotationAnimRef = useRef({ useRotation: false });
  const [isLoading, setIsLoading] = useState(true);
  const splitInstancesRef = useRef<SplitText[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !smoothWrapperRef.current ||
      !smoothContentRef.current
    )
      return;

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    document.fonts.ready.then(() => {
      ScrollSmoother.create({
        wrapper: smoothWrapperRef.current!,
        content: smoothContentRef.current!,
        smooth: 4,
        effects: false,
        smoothTouch: 2,
      });

      const setProgressWidth = gsap.quickSetter(
        progressBarRef.current,
        "width",
        "%",
      );
      const setProgressText = gsap.quickSetter(
        progressTextRef.current,
        "textContent",
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            setProgressWidth(progress);
            setProgressText(
              Math.round(progress).toString().padStart(3, "0") + "%",
            );
          },
        },
      });

      scenePerspectives.forEach((perspective) => {
        const startProgress = perspective.scrollProgress.start / 100;
        const endProgress = perspective.scrollProgress.end / 100;

        tl.to(
          cameraAnimRef.current,
          {
            x: perspective.camera.x,
            y: perspective.camera.y,
            z: perspective.camera.z,
            duration: endProgress - startProgress,
            ease: "none",
          },
          startProgress,
        );

        tl.to(
          targetAnimRef.current,
          {
            x: perspective.target.x,
            y: perspective.target.y,
            z: perspective.target.z,
            duration: endProgress - startProgress,
            ease: "none",
          },
          startProgress,
        );

        tl.to(
          rotationAnimRef.current,
          {
            useRotation: false,
            duration: endProgress - startProgress,
            ease: "none",
          },
          startProgress,
        );
      });

      scenePerspectives.forEach((perspective, index) => {
        const textEl = textRefs.current[index];
        if (textEl) {
          if (perspective.hideText) {
            gsap.set(textEl, { opacity: 0, pointerEvents: "none" });
            return;
          }

          const titleEl = textEl.querySelector("h2");
          const subtitleEl = textEl.querySelector("p");

          if (titleEl && subtitleEl) {
            const titleSplit = new SplitText(titleEl, { type: "chars" });
            const subtitleSplit = new SplitText(subtitleEl, { type: "chars" });
            splitInstancesRef.current.push(titleSplit, subtitleSplit);

            const textTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: `${perspective.scrollProgress.start}% top`,
                end: `${perspective.scrollProgress.end}% top`,
                scrub: 0.5,
              },
            });

            if (index === 0) {
              gsap.set([titleSplit.chars, subtitleSplit.chars], {
                x: 0,
                opacity: 1,
              });

              textTimeline.to([subtitleSplit.chars, titleSplit.chars], {
                x: 100,
                opacity: 0,
                duration: 1,
                stagger: -0.02,
                ease: "power2.in",
              });
            } else {
              const isLastPerspective = index === scenePerspectives.length - 1;

              textTimeline
                .fromTo(
                  [subtitleSplit.chars, titleSplit.chars],
                  { x: -100, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: isLastPerspective ? 0.2 : 0.25,
                    stagger: isLastPerspective ? -0.01 : -0.02,
                    ease: "power2.out",
                  },
                )
                .to({}, { duration: isLastPerspective ? 1.0 : 0.5 })
                .to([subtitleSplit.chars, titleSplit.chars], {
                  x: 100,
                  opacity: 0,
                  duration: 0.25,
                  stagger: -0.02,
                  ease: "power2.in",
                });
            }
          }
        }
      });

    });

    return () => {
      clearTimeout(loadingTimer);
      splitInstancesRef.current.forEach((split) => split.revert());
      splitInstancesRef.current = [];
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Loader
        isLoading={isLoading}
        className="bg-[#0a0a0a]"
        classNameLoader="bg-[#f2f2f2]"
      />
      <Header
        demoTitle=""
        demos={[
          { label: "Home", href: "#home" },
          { label: "Resume", href: "#cv" },
          { label: "Projects", href: "#projects" },
          { label: "Newsletter", href: "#newsletter" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      <div className="fixed inset-0 w-full h-svh z-0">
        <CustomCursor />
        <Canvas
          eventSource={
            typeof window !== "undefined" ? document.body : undefined
          }
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          style={{ background: "#0a0a0a" }}
        >
          <Scene cameraAnimRef={cameraAnimRef} targetAnimRef={targetAnimRef}>
            <InteractiveMouseLight />
          </Scene>
        </Canvas>
      </div>

      <ScrollButton/>

      <div className="fixed inset-0 pointer-events-none z-10">
        {scenePerspectives.map((perspective, index) => (
          <div
            key={index}
            id={perspective.sectionId}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className={`absolute max-md:w-full pointer-events-auto ${getPositionClasses(perspective.position)}`}
          >
            <HoverFlickerText>
              <h2 className="text-[4vw] max-md:text-2xl font-bold leading-[1.1] mb-2 tracking-tight text-white drop-shadow-2xl">
                {perspective.title}
              </h2>
            </HoverFlickerText>
            <p className="text-[1.25vw] max-md:text-l leading-[1.4] text-white/70 font-light drop-shadow-lg">
              {perspective.subtitle}
            </p>
          </div>
        ))}
      </div>

      

      <div
        ref={smoothWrapperRef}
        id="smooth-wrapper"
        className="relative z-20 pointer-events-none"
      >
        
        <div ref={smoothContentRef} id="smooth-content">
          <div ref={containerRef} style={{ height: "900svh" }} />
          <Footer />
        </div>
      </div>
    </>
  );
}

useGLTF.preload("./assets/Building.glb");
