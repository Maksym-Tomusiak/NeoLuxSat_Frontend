"use client";

import * as React from "react";
import { useState, useEffect } from "react";
// Removed: import { motion } from "framer-motion"; as it's now in FaqItem
import {
  Accordion,
  // AccordionItem/Trigger/Content removed as they are now in FaqItem
} from "@/components/ui/accordion";
import SectionHeader from "@/components/common/SectionHeader";
import type { FaqDto } from "@/types/faq";
import { FaqService } from "@/services/faq.service";
import FaqItem from "./FaqItem"; // Import the new component

// Removed the fadeInVariants utility function as animation logic moved to FaqItem

const FaqSectionTemplate: React.FC<{ categoryTitle: string }> = ({
  categoryTitle,
}) => {
  const [faqs, setFaqs] = useState<FaqDto[]>([]);
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await FaqService.getAllFaqs();
        const filteredFaqs = data.filter(
          (faq) =>
            faq.category?.title.toLowerCase() === categoryTitle.toLowerCase()
        );
        setFaqs(filteredFaqs);

        // Open first FAQ by default
        if (filteredFaqs.length > 0 && filteredFaqs[0].id) {
          setOpenItems([filteredFaqs[0].id]);
        }
      } catch (err) {
        console.error("Failed to fetch faqs", err);
      }
    };
    fetchFaqs();
  }, [categoryTitle]);

  if (faqs.length === 0) return null;

  return (
    <section className="relative flex justify-center">
      <SectionHeader isCta={false} className="absolute left-0 top-0">
        Часті <br className="hidden sm:inline" /> питання
      </SectionHeader>
      <div className="flex flex-col items-center max-md:mt-[80px] w-full h-fit">
        <img
          src="/images/faq-image.png"
          alt="faq background"
          className="z-1 sm:w-[320px] -mb-[13px] w-auto pointer-events-none mx-auto max-xs:max-w-[60vw] max-md:max-w-[270px] max-w-[300px]"
        />
        <Accordion
          type="multiple"
          className="relative w-full max-w-[680px] space-y-4 sm:space-y-5 md:space-y-6 lg:min-w-[680px]"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {faqs.map((faq, idx) => (
            // Now using the separated FaqItem component
            <FaqItem
              key={faq.id}
              faq={faq}
              needsAnimation={idx > 0}
              // Pass a sequential delay to maintain the staggered animation timing
              delay={0.1 * idx}
            />
          ))}
        </Accordion>
      </div>
    </section>
  );
};
export default FaqSectionTemplate;
