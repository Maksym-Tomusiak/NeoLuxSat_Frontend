"use client";

import { motion, useInView, MotionProps } from "framer-motion";
import { useRef, ReactNode } from "react";

interface FadeInFromDirectionProps extends MotionProps {
  children: ReactNode;
  direction?: "top" | "bottom" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const getInitialVariant = (
  direction: FadeInFromDirectionProps["direction"]
) => {
  switch (direction) {
    case "top":
      return { y: -50, opacity: 0 };
    case "bottom":
      return { y: 50, opacity: 0 };
    case "left":
      return { x: -50, opacity: 0 };
    case "right":
      return { x: 50, opacity: 0 };
    case "fade":
    default:
      return { opacity: 0 };
  }
};

const FadeInFromDirection = ({
  children,
  direction = "fade",
  delay = 0,
  duration = 0.5,
  once = true,
  className,
  ...props
}: FadeInFromDirectionProps) => {
  const ref = useRef(null);
  const isInView = once ? useInView(ref, { once, amount: 0.1 }) : true;

  const initial = getInitialVariant(direction);
  const animate =
    direction === "fade" ? { opacity: 1 } : { x: 0, y: 0, opacity: 1 };

  const isVertical = direction === "top" || direction === "bottom";

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration,
        delay,
      }}
      style={{
        position: isVertical ? "relative" : undefined,
      }}
      {...props}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInFromDirection;
