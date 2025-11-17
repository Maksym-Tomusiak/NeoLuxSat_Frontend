// ServiceCardWrapper.tsx
"use client";

import React, { useRef } from "react";
import { motion, Transition, useInView } from "framer-motion";

interface ServiceCardWrapperProps {
  children: React.ReactNode;
  index: number; // Index is still passed but no longer used for delay
}

const ServiceCardWrapper: React.FC<ServiceCardWrapperProps> = ({
  children,
  index,
}) => {
  const ref = useRef(null);
  // Trigger animation when 20% of the card is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: {
      y: 50, // Start 50px from the bottom
      opacity: 0,
    },
    visible: {
      y: 0, // Animate to final position
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        // 💥 DELAY REMOVED HERE 💥
      } as Transition,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ServiceCardWrapper;
