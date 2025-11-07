import { cn } from '@/lib/utils';
import FaqSectionTemplate from './sections/FaqSectionTemplate';
import HeroSectionTemplate from './sections/HeroSectionTemplate';
import type { OurServicesSectionTemplateProps } from './sections/OurServicesSectionTemplate/OurServicesSectionTemplate';
import OurServicesSectionTemplate from './sections/OurServicesSectionTemplate/OurServicesSectionTemplate';

type ServicesPageTemplateProps = {
  heroTitle: React.ReactNode;
  heroTitleClasses?: string;
  heroImagePath: string;
  heroImageClasses?: string;
  heroLayoutClasses?: string; // <-- 1. Add the prop here
  categoryTitle: string;
  serviceCardsData: OurServicesSectionTemplateProps;
  children?: React.ReactNode;
};

const ServicesPageTemplate: React.FC<ServicesPageTemplateProps> = ({
  heroTitle,
  heroTitleClasses,
  heroImagePath,
  heroImageClasses,
  heroLayoutClasses, // <-- 2. Get the prop
  categoryTitle,
  serviceCardsData,
  children,
}) => {
  return (
    <>
      <section>
        <HeroSectionTemplate
          layoutClasses={heroLayoutClasses}
          leftPart={
            <>
              <div
                className="flex flex-col justify-center items-start
                min-h-[380px] sm:min-h-[400px] lg:min-h-[550px] xl:min-h-[600px]
                max-w-full"
              >
                <h1
                  className={cn(
                    `
          font-manrope font-semibold tracking-[-1px] 2xs:tracking-[-1.5px] lg:tracking-[-2px]
          text-primaryWhite align-text-left
          max-w-fit
          text-[40px]/[90%] 2xs:text-[48px]/[90%] md:text-[52px]/[90%] lg:text-[64px]/[90%] xl:text-[88px]/[90%]`,
                    heroTitleClasses
                  )}
                >
                  {heroTitle}
                </h1>
              </div>
            </>
          }
          rightPart={
            <>
              <div className="w-fit h-fit max-w-fit">
                <img
                  src={heroImagePath}
                  alt="hero-image"
                  className={cn(
                    `
          max-w-auto
          h-auto
        `,
                    heroImageClasses
                  )}
                />
              </div>
            </>
          }
          maskPath="/images/template-3-big-hero-bg.png"
        />
      </section>
      <OurServicesSectionTemplate {...serviceCardsData} />

      {children}
      <FaqSectionTemplate categoryTitle={categoryTitle} />
    </>
  );
};

export default ServicesPageTemplate;
