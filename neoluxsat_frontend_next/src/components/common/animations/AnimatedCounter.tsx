"use client";

import { useEffect, useRef } from "react";
// Import useMotionTemplate alongside the others
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const count = useMotionValue(0);

  // 💥 NEW: Use useTransform to get the rounded number string
  const roundedNumber = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  );

  // 💥 NEW: Use useMotionTemplate to combine the MotionValue (roundedNumber)
  // with the static '+' sign into a single MotionValue<string>
  const formattedCount = useMotionTemplate`${roundedNumber}+`;

  useEffect(() => {
    if (isInView) {
      count.set(0);
      animate(count, to, {
        duration: 2.5,
        ease: "easeInOut",
      });
    }
  }, [isInView, to, count]);

  return (
    <motion.p
      ref={ref}
      className={className}
      // CRITICAL FIX: Pass the motion value to the `style` prop as a CSS variable
      // or directly as content using the `children` hack below.
    >
      {/* This is the standard Framer Motion pattern to render a MotionValue.
        We pass the formatted MotionValue directly as a child.
        We use the type assertion to bypass strict React typing.
      */}
      {formattedCount as any}
    </motion.p>
  );
};

export default AnimatedCounter;
