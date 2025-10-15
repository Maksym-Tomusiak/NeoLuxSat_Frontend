import React from 'react';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import SectionHeader from '@/components/common/SectionHeader';

type CtaSectionTemplateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onApplicationClick?: () => void;
};

const CtaSectionTemplate: React.FC<CtaSectionTemplateProps> = ({
  icon,
  title,
  description,
  onApplicationClick,
}) => {
  const applicationButtonParams = {
    color: 'primaryWhite',
    hoverColor: 'primaryBlue',
    backgroundColor: 'primaryBlue',
  };

  return (
    <section className="relative bg-primaryOrange rounded-[20px] pt-[32px] pb-[24px] px-[24px] flex flex-col justify-between h-[400px]">
      <div className="absolute right-0 top-0 cta-icon-container">{icon}</div>
      <SectionHeader isCta={true} className="xl:max-w-[60%]">
        {title}
      </SectionHeader>
      <div className="bg-primaryWhite p-[10px] rounded-[10px] flex gap-[16px] flex-col sm:flex-row justify-between items-center z-1">
        <p
          className="text-primaryBlue/80 text-[16px]/[120%] font-noto font-medium
        md:max-w-[50%] xl:max-w-[30%]"
        >
          {description}
        </p>
        <LeaveApplicationButton
          {...applicationButtonParams}
          onApplicationClick={onApplicationClick}
          className="sm:min-w-fit min-w-full justify-center"
        />
      </div>
    </section>
  );
};

export default CtaSectionTemplate;
