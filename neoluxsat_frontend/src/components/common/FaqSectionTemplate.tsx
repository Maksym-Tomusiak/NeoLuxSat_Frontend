import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import FaqIcon from '@/assets/svgs/faq-icon.svg';
import type { FaqDto } from '@/types/faq';

type FaqSectionTemplateProps = {
  faqs: FaqDto[];
};

const FaqSectionTemplate: React.FC<FaqSectionTemplateProps> = ({ faqs }) => {
  return (
    <section className="relative flex justify-center">
      {/* Left-aligned title */}
      <h2 className="absolute left-0 top-0 font-manrone text-primaryBlue/20 text-[88px]/[90%] font-semibold tracking-[-2px] max-w-[500px]">
        Часті питання
      </h2>

      {/* Centered image + accordion */}
      <div className="flex flex-col items-center">
        {/* Image overlapping accordion */}
        <img
          src="/images/faq-image.png"
          alt="faq background"
          className="-mb-[68px] z-1"
        />

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full min-w-[680px] max-w-[680px] space-y-6 relative"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-[20px] bg-primaryBlue p-[24px] font-noto text-primaryWhite"
            >
              <AccordionTrigger
                className="flex items-center justify-between font-semibold text-primaryWhite text-[18px]/[120%] tracking-[-0.36px] font-medium"
                icon={FaqIcon}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[16px]/[120%] tracking-[-0.32px] max-w-[75%]">
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
