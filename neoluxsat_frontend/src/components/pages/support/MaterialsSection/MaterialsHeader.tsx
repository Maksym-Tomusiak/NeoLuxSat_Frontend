import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';

const MaterialsHeader = () => {
  return (
    <div className="flex flex-col gap-[24px] min-[900px]:flex-row justify-between items-start max-[1440px]:mb-[40px]">
      <SectionHeader isCta={false}>
        Корисні <br className="hidden lg:inline" />
        матеріали
      </SectionHeader>
      <p className="font-noto max-w-[330px] text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
        Тут ви знайдете практичні рішення, покрокові інструкції та рекомендації{' '}
        <br className="hidden 2xs:block" />
        від наших спеціалістів.
      </p>
    </div>
  );
};

export default React.memo(MaterialsHeader);
