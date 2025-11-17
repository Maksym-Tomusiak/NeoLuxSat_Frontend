"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import FadeInFromDirection from "../animations/FadeInFromDirection";

interface HeroSectionTemplateProps {
  leftPart: React.ReactNode;
  rightPart: React.ReactNode;
  maskPath?: string;
  children?: React.ReactNode;
  layoutClasses?: string;
  // --- NEW PROPS ---
  leftPartClasses?: string;
  rightPartClasses?: string;
}

const HeroSectionTemplate: React.FC<HeroSectionTemplateProps> = ({
  leftPart,
  rightPart,
  maskPath,
  children,
  layoutClasses,
  leftPartClasses, // <-- New: Get left part classes
  rightPartClasses, // <-- New: Get right part classes
}) => {
  const [responsiveMaskPath, setResponsiveMaskPath] = useState(maskPath);

  useEffect(() => {
    if (!maskPath) {
      setResponsiveMaskPath(undefined);
      return;
    }

    const isSmallScreen = () => window.innerWidth < 640;

    const updatePath = () => {
      if (isSmallScreen()) {
        const newPath = maskPath.replace("big", "small");
        setResponsiveMaskPath(newPath);
      } else {
        setResponsiveMaskPath(maskPath);
      }
    };

    updatePath();

    window.addEventListener("resize", updatePath);

    return () => window.removeEventListener("resize", updatePath);
  }, [maskPath]);

  return (
    <FadeInFromDirection direction="fade">
      <div
        className={cn(
          `
        hero-section relative flex w-full h-full
        items-start
        gap-[8px] md:gap-[12px]
        overflow-hidden
        rounded-[16px] md:rounded-[20px]
        max-md:px-[16px] md:px-[24px] // Ensure symmetrical padding
        py-[20px] md:py-[45px]
        text-primaryWhite
        h-[420px] md:h-[500px] lg:h-[620px] xl:h-[694px]
      `,
          layoutClasses || "flex-col md:flex-row"
        )}
      >
        {responsiveMaskPath && (
          <img
            src={responsiveMaskPath}
            alt="hero background"
            className="absolute inset-0 w-full h-full object-fill z-1 pointer-events-none select-none"
          />
        )}

        {/* Left Part - Use new leftPartClasses for overrides */}
        <div
          className={cn(
            "w-full flex flex-col justify-center h-full hero-content z-2 flex-1 min-w-0", // Default classes
            leftPartClasses // Override classes
          )}
        >
          {leftPart}
        </div>

        {/* Right Part - Use new rightPartClasses for overrides */}
        <div
          className={cn(
            `hero-image z-2
          flex justify-center lg:block
          w-full md:w-auto
          mt-[20px] md:mt-0
          // Removed max-w-fit here as we'll control width via flex-basis/grow/shrink or explicit width
          md:max-w-[40%] lg:max-w-[45%] xl:max-w-[50%]
          md:h-full items-center flex-shrink-0`, // Default classes
            rightPartClasses // Override classes
          )}
        >
          {rightPart}
        </div>

        {children}
      </div>
    </FadeInFromDirection>
  );
};

export default HeroSectionTemplate;
