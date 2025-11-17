"use client";

import React, { useRef } from "react";
import { motion, Transition, useInView } from "framer-motion";

interface MaterialsCardWrapperProps {
  children: React.ReactNode;
  index: number; // The index of the card (0-indexed)
}

const MaterialsCardWrapper: React.FC<MaterialsCardWrapperProps> = ({
  children,
  index,
}) => {
  const ref = useRef(null);
  // Trigger animation when 20% of the card is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // 1. Removed direction state and useEffect, as all animations come from the bottom

  const variants = {
    hidden: {
      y: 50, // Always start 50px from the bottom
      opacity: 0,
    },
    visible: {
      y: 0, // Animate to final position
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        // 2. Staggered delay based on index (0.1s delay between cards)
        delay: index * 0.1,
      } as Transition,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      // 3. Animate based on scroll view state
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default MaterialsCardWrapper;
