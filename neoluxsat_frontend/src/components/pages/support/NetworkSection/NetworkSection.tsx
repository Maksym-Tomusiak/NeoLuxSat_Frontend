// src/components/NetworkSection.tsx

import React from 'react';
import RedNetworkIcon from '@/assets/svgs/network/network-icon-red.svg';
import BlueNetworkIcon from '@/assets/svgs/network/network-icon-blue.svg';
import GreenNetworkIcon from '@/assets/svgs/network/network-icon-green.svg';
import NetworkProblemCard from './NetworkProblemCard';
import SectionHeader from '@/components/common/SectionHeader';
import useNetworkStatusLogic from '@/hooks/useNetworkStatusLogic';
import NetworkStatusCard from './NetworkStatusCard';

// 💡 NEW: Component for the loading placeholder state
const LoadingPlaceholder: React.FC = () => (
  <div className="flex justify-between items-center gap-[70px] flex-row max-lg:flex-col">
    <div className="w-full max-w-[680px] rounded-[20px] p-[24px] bg-primaryBlue/10 min-h-[160px] flex items-center justify-center text-primaryBlue font-semibold">
      Завантаження даних про стан мережі...
    </div>
    <img
      src="/images/no-problems-image.png"
      alt="loading image"
      className="max-sm:max-w-full max-md:max-w-[400px] max-lg:max-w-[500px] max-xl:max-w-[400px] max-[1440px]:max-w-[500px] min-[1440px]:max-w-[600px] opacity-50 animate-pulse"
    />
  </div>
);

const NetworkSection = () => {
  const { problems, fetchError, getCardData } = useNetworkStatusLogic();

  const getIcon = (status: string) => {
    switch (status) {
      case 'У процесі відновлення':
        return <RedNetworkIcon />;
      case 'Заплановано':
        return <BlueNetworkIcon />;
      case 'Вирішено':
        return <GreenNetworkIcon />;
      default:
        return <BlueNetworkIcon />;
    }
  };

  const mainContent = (() => {
    // 💡 FIX: 1. LOADING STATE - Render loader if problems is null (initial state)
    if (problems === null) {
      return <LoadingPlaceholder />;
    }

    // 2. ERROR/SUCCESS STATE (problems is now an array: [] or [data...])
    if (!problems || problems.length === 0) {
      // This covers:
      // a) fetchError is true (Error Card)
      // b) fetchError is false (Success Card)
      return (
        <div className="flex justify-between items-center gap-[70px] flex-row max-lg:flex-col">
          <NetworkStatusCard data={getCardData} />
          <img
            src={
              fetchError
                ? '/images/network-error-image.png'
                : '/images/no-problems-image.png'
            }
            alt="status image"
            className="max-sm:max-w-full max-md:max-w-[400px] max-lg:max-w-[500px] max-xl:max-w-[400px] max-[1440px]:max-w-[500px] min-[1440px]:max-w-[600px]"
          />
        </div>
      );
    }

    const problemListMaxHeightClass =
      problems.length > 3 ? 'max-h-[670px] overflow-y-auto' : '';

    return (
      <div className="flex flex-col gap-[24px]">
        <div
          className={`flex flex-col gap-[24px] ${problemListMaxHeightClass} snap-y snap-y-mandatory scrollbar-fade pb-[1px]`}
        >
          {problems.map((problem) => (
            <NetworkProblemCard
              key={problem.id}
              problem={problem}
              icon={getIcon(problem.networkProblemStatus.title)}
            />
          ))}
        </div>
      </div>
    );
  })();

  return (
    <section>
      {/* ... (Section Header and Description remain the same) ... */}
      <div className="flex flex-col gap-[24px] flex-row flex-wrap justify-between min-sm:items-end mb-[40px] md:mb-[56px]">
        <SectionHeader isCta={false}>
          Актуальний <br className="hidden sm:inline" />
          стан мережі
        </SectionHeader>
        <p className="font-noto max-w-[330px] text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
          У цьому розділі ви можете перевірити актуальний стан нашої мережі та
          дізнатися про можливі технічні роботи чи тимчасові збої.
        </p>
      </div>

      {mainContent}
    </section>
  );
};

export default NetworkSection;
