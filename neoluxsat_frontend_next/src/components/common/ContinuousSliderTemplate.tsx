import React from "react";
import { motion } from "framer-motion";

type Direction = "left" | "right";

interface ContinuousSliderTemplateProps {
  slides: React.ReactNode[];
  durationSeconds?: number;
  className?: string;
  slideGap?: string; // Supports "16px", "1rem", etc.
  direction?: Direction;
}

const ContinuousSliderTemplate: React.FC<ContinuousSliderTemplateProps> = ({
  slides,
  durationSeconds = 20,
  className = "w-full h-auto",
  slideGap = "16px",
  direction = "left",
}) => {
  if (!slides.length) return null;

  // 1. Duplicate slides to ensure we have enough content to loop
  // We use 2 copies. If your content is very narrow and screen is wide,
  // you might need 3 or 4, but 2 is standard for seamless loops.
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        // 2. 'flex' lays them out horizontally
        // 'w-max' ensures the container is as wide as the content (doesn't wrap)
        className="flex w-max"
        animate={{
          // 3. Move exactly -50% of the total width.
          // Because we use margins on ALL items (even the last one),
          // -50% corresponds *exactly* to the start of the second set of slides.
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          // 4. 'linear' ensures constant speed (no easing/slowing down)
          ease: "linear",
          duration: durationSeconds,
          repeat: Infinity,
        }}
      >
        {duplicatedSlides.map((child, index) => (
          <div
            key={index}
            className="shrink-0 flex items-center justify-center"
            style={{
              // 5. CRITICAL FIX: Use Margin instead of Flex Gap.
              // We apply this to EVERY slide.
              marginRight: slideGap,
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ContinuousSliderTemplate;
