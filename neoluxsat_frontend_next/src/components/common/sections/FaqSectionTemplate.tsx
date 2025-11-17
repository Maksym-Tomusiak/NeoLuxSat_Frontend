// FaqSectionTemplate.tsx
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import StaggeredFadeIn from "@/components/common/animations/StaggeredFadeIn";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/common/SectionHeader";

import type { FaqDto } from "@/types/faq";
import { FaqService } from "@/services/faq.service";

type FaqSectionTemplateProps = {
  categoryTitle: string;
};

const FaqSectionTemplate: React.FC<FaqSectionTemplateProps> = ({
  categoryTitle,
}) => {
  const [faqs, setFaqs] = useState<FaqDto[]>([]);
  // We will initialize openItems after data fetch.
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await FaqService.getAllFaqs();
        const filteredFaqs = data.filter(
          (faq) =>
            faq.category?.title.toLowerCase() == categoryTitle.toLowerCase()
        );
        setFaqs(filteredFaqs);

        // 💡 1. SET FIRST FAQ OPEN BY DEFAULT ON INITIAL LOAD
        if (filteredFaqs.length > 0 && filteredFaqs[0].id) {
          setOpenItems([filteredFaqs[0].id]);
        }
      } catch (error) {
        console.error("Failed to fetch faqs", error);
      }
    };
    fetchFaqs();
  }, [categoryTitle]);

  if (faqs.length === 0) return null;

  // 💡 2. UPDATED CLICK HANDLER TO HANDLE TOGGLE WHEN CLICKING THE ITEM CONTAINER
  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement>,
    faqId: string
  ) => {
    const isOpen = openItems.includes(faqId);

    // Check if the click originated from the AccordionTrigger element itself.
    // If it did, we let the underlying Radix/HeadlessUI mechanism handle the toggle
    // via the Accordion component's onValueChange, which is bound to setOpenItems.
    const target = e.target as HTMLElement;
    if (target.closest('[data-slot="accordion-trigger"]')) {
      return;
    }

    // If the click happened on the general AccordionItem area (not the Trigger):
    setOpenItems((prev) => {
      if (isOpen) {
        // Close the item if currently open
        return prev.filter((id) => id !== faqId);
      } else {
        // Open the item if currently closed
        return [...prev, faqId];
      }
    });
  };

  // --- Component for a single FAQ item (to clean up the map) ---
  const FaqItemComponent: React.FC<{ faq: FaqDto }> = ({ faq }) => (
    <AccordionItem
      key={faq.id}
      value={faq.id}
      className="rounded-[20px] bg-primaryBlue p-[24px] font-noto text-primaryWhite cursor-pointer"
      // 💡 Attach click handler to the Item container
      onClick={(e) => handleItemClick(e, faq.id)}
    >
      <AccordionTrigger className="flex items-center justify-between text-[16px]/[120%] font-medium tracking-[-0.32px] text-primaryWhite sm:text-[17px]/[120%] sm:tracking-[-0.34px] md:text-[18px]/[120%] md:tracking-[-0.36px] cursor-pointer">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="max-w-[100%] text-[14px]/[120%] tracking-[-0.28px] sm:text-[15px]/[120%] sm:tracking-[-0.3px] md:max-w-[75%] md:text-[16px]/[120%] md:tracking-[-0.32px]">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );

  // --- Animation Logic ---
  const firstFaq = faqs[0];
  const remainingFaqs = faqs.slice(1);

  return (
    <section className="relative flex justify-center">
      <SectionHeader isCta={false} className="absolute left-0 top-0">
        Часті <br className="hidden sm:inline" />
        питання
      </SectionHeader>

      <div className="flex flex-col items-center max-md:mt-[80px] w-full h-fit">
        <img
          src="/images/faq-image.png"
          alt="faq background"
          className="z-1 sm:w-[320px] -mb-[13px] w-auto pointer-events-none
  mx-auto
  max-xs:max-w-[60vw] max-md:max-w-[270px] max-w-[300px]"
        />

        <Accordion
          type="multiple"
          className="relative w-full max-w-[680px] space-y-4 sm:space-y-5 md:space-y-6 lg:min-w-[680px]"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {/* The first FAQ item is rendered without animation */}
          {firstFaq && <FaqItemComponent faq={firstFaq} />}

          {/* The remaining items are wrapped in StaggeredFadeIn. */}
          <StaggeredFadeIn
            direction="bottom"
            staggerChildren={0.1}
            className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
          >
            {remainingFaqs.map((faq) => (
              <FaqItemComponent key={faq.id} faq={faq} />
            ))}
          </StaggeredFadeIn>
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSectionTemplate;
