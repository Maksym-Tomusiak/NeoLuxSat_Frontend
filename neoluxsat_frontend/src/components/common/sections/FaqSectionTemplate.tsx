import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import SectionHeader from '@/components/common/SectionHeader';
import FaqIcon from '@/assets/svgs/faq-icon.svg';
import type { FaqDto } from '@/types/faq';

type FaqSectionTemplateProps = {
  faqs: FaqDto[];
};

const FaqSectionTemplate: React.FC<FaqSectionTemplateProps> = ({ faqs }) => {
  return (
    <section className="relative flex justify-center">
      {/* Left-aligned title */}
      <SectionHeader isCta={false} className="absolute left-0 top-0">
        Часті <br className="hidden sm:inline" />
        питання
      </SectionHeader>

      {/* Centered image + accordion */}
      <div className="flex flex-col items-center max-sm:mt-[20px]">
        {/* Image overlapping accordion */}
        <img
          src="/images/faq-image.png"
          alt="faq background"
          className="z-1 sm:w-[320px] -mb-[68px] w-auto pointer-events-none "
        />

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="relative w-full max-w-[680px] space-y-4 sm:space-y-5 md:space-y-6 lg:min-w-[680px]"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-[20px] bg-primaryBlue p-[24px] font-noto text-primaryWhite"
            >
              <AccordionTrigger
                className="flex items-center justify-between text-[16px]/[120%] font-medium tracking-[-0.32px] text-primaryWhite sm:text-[17px]/[120%] sm:tracking-[-0.34px] md:text-[18px]/[120%] md:tracking-[-0.36px]"
                icon={FaqIcon}
              >
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
