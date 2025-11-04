import React from 'react';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import SectionHeader from '@/components/common/SectionHeader';

type CtaSectionTemplateProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  onApplicationClick?: () => void;
};

const CtaSectionTemplate: React.FC<CtaSectionTemplateProps> = ({
  icon,
  title,
  description,
}) => {
  const applicationButtonParams = {
    color: 'primaryWhite',
    hoverColor: 'primaryBlue',
    backgroundColor: 'primaryBlue',
  };

  return (
    <section className="cta-container relative bg-primaryOrange rounded-[20px] pt-[32px] pb-[24px] px-[24px] flex flex-col justify-between h-[400px]">
      <div className="absolute right-0 top-0 cta-icon-container">{icon}</div>
      <SectionHeader isCta={true} className="xl:max-w-[60%]">
        {title}
      </SectionHeader>
      <div className="bg-primaryWhite p-[10px] rounded-[10px] flex gap-[16px] flex-col sm:flex-row justify-between items-start sm:items-center z-1">
        <p className="text-primaryBlue/80 text-[16px]/[120%] font-noto font-medium">
          {description}
        </p>
        <LeaveApplicationButton
          {...applicationButtonParams}
          className="sm:min-w-fit min-w-full justify-center"
        />
      </div>
    </section>
  );
};

export default CtaSectionTemplate;
