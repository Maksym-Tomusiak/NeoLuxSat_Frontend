// Inside OurServicesSectionTemplate.tsx

import SectionHeader from "../../SectionHeader";
import OurServicesCard, { type OurServicesCardProps } from "./OurServicesCard";
import ServiceCardWrapper from "./ServicesCardWrapper";

export type OurServicesSectionTemplateProps = {
  cardsData: OurServicesCardProps[];
  headerDescription?: React.ReactNode;
};

const OurServicesSectionTemplate: React.FC<OurServicesSectionTemplateProps> = ({
  cardsData,
  headerDescription,
}) => {
  const marginsTop = ["56px", "220px", "0px", "220px"];

  const getMarginTop = (index: number) => {
    return `min-[1440px]:mt-[${marginsTop[index]}]`;
  };

  return (
    <section id="main-content-start">
      <div className="flex flex-col gap-[24px] flex-row flex-wrap justify-between items-start max-[1440px]:mb-[40px]">
        <SectionHeader isCta={false}>
          Наші <br className="hidden sm:inline" />
          послуги
        </SectionHeader>
        {headerDescription}
      </div>
      <div className="flex flex-wrap justify-center max-[1440px]:mx-auto max-[1440px]:max-w-[1000px] min-[1440px]:justify-between max-[1440px]:items-center gap-[20px]">
        {cardsData.map((item, index) => (
          <div
            key={index}
            className={`
              w-fit flex justify-center items-center
              min-[1440px]:h-fit max-[712px]:min-w-full
              ${getMarginTop(index)}
              ${item.isTarif ? "max-[1440px]:order-first" : ""}
            `}
          >
            {/* 💥 2. WRAP THE CARD WITH THE ANIMATION COMPONENT 💥 */}
            <ServiceCardWrapper index={index}>
              <OurServicesCard {...item} />
            </ServiceCardWrapper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServicesSectionTemplate;
