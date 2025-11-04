import * as React from 'react';
import { useState, useEffect } from 'react'; // 'useState' is already imported, which is good.
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import SectionHeader from '@/components/common/SectionHeader';

import type { FaqDto } from '@/types/faq';
import { FaqService } from '@/services/faq.service';

type FaqSectionTemplateProps = {
  categoryTitle: string;
};

const FaqSectionTemplate: React.FC<FaqSectionTemplateProps> = ({
  categoryTitle,
}) => {
  const [faqs, setFaqs] = useState<FaqDto[]>([]);
  // --- 1. ADD STATE FOR OPEN ITEMS ---
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await FaqService.getAllFaqs();
        setFaqs(
          data.filter(
            (faq) =>
              faq.category?.title.toLowerCase() == categoryTitle.toLowerCase()
          )
        );
      } catch (error) {
        console.error('Failed to fetch faqs', error);
      }
    };
    fetchFaqs();
  }, []); // Note: categoryTitle should be in the dependency array if it can change

  if (faqs.length === 0) return null;

  // --- 2. CREATE THE CLICK HANDLER ---
  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement>,
    faqId: string
  ) => {
    // Check if the item is already open
    const isOpen = openItems.includes(faqId);

    if (isOpen) {
      // Check if the click came from the trigger itself.
      // If it did, we let the trigger handle its own toggle and do nothing.
      const target = e.target as HTMLElement;
      if (target.closest('[data-slot="accordion-trigger"]')) {
        return;
      }

      // If the click was *not* on the trigger (e.g., on content or padding)
      // and the item is open, we manually close it.
      setOpenItems((prev) => prev.filter((id) => id !== faqId));
    }
    // If the item is closed, we *only* let the trigger open it.
    // This handler won't open a closed item by clicking the content.
  };

  return (
    <section className="relative flex justify-center">
      {/* Left-aligned title */}
      <SectionHeader isCta={false} className="absolute left-0 top-0">
        Часті <br className="hidden sm:inline" />
        питання
      </SectionHeader>

      {/* Centered image + accordion */}
      <div className="flex flex-col items-center max-md:mt-[80px] w-fit h-fit">
        {/* Image overlapping accordion */}
        <img
          src="/images/faq-image.png"
          alt="faq background"
          className="z-1 sm:w-[320px] -mb-[15.5px] w-auto pointer-events-none 
          mr-[calc(10%)] md:mr-[calc(50%-250px)] lg:mr-[calc(50%-270px)]
          max-xs:max-w-[60vw] max-md:max-w-[270px] max-w-[300px]"
        />

        <Accordion
          type="multiple"
          className="relative w-full max-w-[680px] space-y-4 sm:space-y-5 md:space-y-6 lg:min-w-[680px]"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-[20px] bg-primaryBlue p-[24px] font-noto text-primaryWhite cursor-pointer"
              // --- 4. ADD THE CLICK HANDLER TO THE ITEM ---
              onClick={(e) => handleItemClick(e, faq.id)}
            >
              <AccordionTrigger className="flex items-center justify-between text-[16px]/[120%] font-medium tracking-[-0.32px] text-primaryWhite sm:text-[17px]/[120%] sm:tracking-[-0.34px] md:text-[18px]/[120%] md:tracking-[-0.36px] cursor-pointer">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[100%] text-[14px]/[120%] tracking-[-0.28px] sm:text-[15px]/[120%] sm:tracking-[-0.3px] md:max-w-[75%] md:text-[16px]/[120%] md:tracking-[-0.32px]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSectionTemplate;
