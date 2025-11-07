import type { OurServicesSectionTemplateProps } from '@/components/common/sections/OurServicesSectionTemplate/OurServicesSectionTemplate';
export interface ServicePageData {
  heroTitle: React.ReactNode;
  heroTitleClasses?: string;
  heroImagePath: string;
  heroImageClasses?: string;
  heroLayoutClasses?: string;
  categoryTitle: string;
  serviceCardsData: OurServicesSectionTemplateProps;
}

export type ServiceKey = 'internet' | 'tv' | 'iot' | 'security';
