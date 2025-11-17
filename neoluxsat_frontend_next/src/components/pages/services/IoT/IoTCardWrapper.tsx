"use client";

import React from "react";
// 1. Remove unnecessary framer-motion imports as they are handled by FadeInFromDirection
// import { motion, Transition, useInView } from "framer-motion";
import FadeInFromDirection from "@/components/common/animations/FadeInFromDirection"; // <-- Assuming this path

interface IoTCardWrapperProps {
  children: React.ReactNode;
  index: number; // The index of the card (0-indexed)
}

const IoTCardWrapper: React.FC<IoTCardWrapperProps> = ({ children, index }) => {
  const delay = index * 0.1;

  return (
    // 3. Render the existing reusable component, passing the calculated props
    <FadeInFromDirection direction={"bottom"} delay={delay} className="z-2">
      {children}
    </FadeInFromDirection>
  );
};

export default IoTCardWrapper;
