"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FaqDto } from "@/types/faq";

interface FaqItemProps {
  faq: FaqDto;
  delay: number;
  needsAnimation?: boolean;
}

const FaqItem: React.FC<FaqItemProps> = ({
  faq,
  delay,
  needsAnimation = true,
}) => {
  // Variants for fade-in (slide-up) animation
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // The string "easeOut" is a valid framer-motion easing, but
        // requires explicit typing/casting to satisfy strict TypeScript settings.
        ease: "easeOut",
        // Apply the passed staggered delay
        delay: delay,
      },
    },
  };

  if (!needsAnimation) {
    return (
      <AccordionItem
        value={faq.id}
        className="rounded-[20px] bg-primaryBlue font-noto text-primaryWhite cursor-pointer"
      >
        <AccordionTrigger className="flex items-center justify-between text-[16px]/[120%] font-medium tracking-[-0.32px] text-primaryWhite sm:text-[17px]/[120%] sm:tracking-[-0.34px] md:text-[18px]/[120%] md:tracking-[-0.36px] cursor-pointer">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="max-w-[100%] text-[14px]/[120%] tracking-[-0.28px] sm:text-[15px]/[120%] sm:tracking-[-0.3px] md:max-w-[75%] md:text-[16px]/[120%] md:tracking-[-0.32px]">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    // Use motion.div to wrap the AccordionItem for in-view animation
    <motion.div
      key={faq.id}
      initial="hidden"
      whileInView="visible" // Triggers the animation when the element enters the viewport
      viewport={{ once: true, amount: 0.2 }} // Triggers once when 20% of the item is visible
      variants={fadeInVariants}
      style={{ width: "100%" }}
    >
      <AccordionItem
        value={faq.id}
        // MODIFIED: Removed p-[24px] from AccordionItem.
        className="rounded-[20px] bg-primaryBlue font-noto text-primaryWhite cursor-pointer"
      >
        <AccordionTrigger className="flex items-center justify-between text-[16px]/[120%] font-medium tracking-[-0.32px] text-primaryWhite sm:text-[17px]/[120%] sm:tracking-[-0.34px] md:text-[18px]/[120%] md:tracking-[-0.36px] cursor-pointer">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="max-w-[100%] text-[14px]/[120%] tracking-[-0.28px] sm:text-[15px]/[120%] sm:tracking-[-0.3px] md:max-w-[75%] md:text-[16px]/[120%] md:tracking-[-0.32px]">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default FaqItem;
