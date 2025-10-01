import { useEffect, useState } from 'react';
import { FaqService } from '@/services/faq.service';
import type { FaqDto } from '@/types/faq';
import FaqSectionTemplate from '@/components/common/sections/FaqSectionTemplate';

const FaqSection = () => {
  const [faqs, setFaqs] = useState<FaqDto[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await FaqService.getAllFaqs();
        setFaqs(
          data.filter((faq) => faq.category?.title.toLowerCase() == 'загальне')
        );
      } catch (error) {
        console.error('Failed to fetch faqs', error);
      }
    };
    fetchFaqs();
  }, []);
  return <FaqSectionTemplate faqs={faqs} />;
};

export default FaqSection;
