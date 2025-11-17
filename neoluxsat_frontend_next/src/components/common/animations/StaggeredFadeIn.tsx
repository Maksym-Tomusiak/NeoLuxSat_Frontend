"use client";

import { motion, useInView, MotionProps, Variants } from "framer-motion";
import { useRef, ReactNode } from "react"; // 💡 Import ReactNode

// 1. Define the props interface
interface StaggeredFadeInProps extends MotionProps {
  children: ReactNode; // Children can be a single element or an array
  direction?: "top" | "bottom" | "left" | "right" | "fade";
  staggerChildren?: number;
  once?: boolean;
  className?: string;
}

/**
 * Animates children elements sequentially upon entering the viewport.
 */
const StaggeredFadeIn = ({
  children,
  direction = "bottom",
  staggerChildren = 0.1,
  once = true,
  className,
  ...props
}: StaggeredFadeInProps) => {
  // 💡 Apply the props interface here
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  // Explicitly typing parentVariants and childVariants
  const parentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: staggerChildren,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "bottom" ? 20 : direction === "top" ? -20 : 0,
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...props}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          // 💡 Note: TypeScript might still warn here if 'child' is not guaranteed to be a React Element.
          // In React, Array.isArray(children) check is usually enough for mapping.
          <motion.div
            key={index}
            variants={childVariants}
            style={{ height: "100%", width: "100%" }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={childVariants}
          style={{ height: "100%", width: "100%" }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StaggeredFadeIn;
