import SectionHeader from '../../SectionHeader';
import OurServicesCard, { type OurServicesCardProps } from './OurServicesCard';

export type OurServicesSectionTemplateProps = {
  cardsData: OurServicesCardProps[];
  headerDescription?: React.ReactNode;
};

const OurServicesSectionTemplate: React.FC<OurServicesSectionTemplateProps> = ({
  cardsData,
  headerDescription,
}) => {
  const marginsTop = ['56px', '220px', '0px', '220px'];

  const getMarginTop = (index: number) => {
    return `min-[1440px]:mt-[${marginsTop[index]}]`;
  };

  return (
    <section>
      <div className="flex flex-col gap-[24px] min-[900px]:flex-row justify-between items-start max-[1440px]:mb-[40px]">
        <SectionHeader isCta={false}>
          Наші <br className="hidden lg:inline" />
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
    `}
          >
            <OurServicesCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServicesSectionTemplate;
