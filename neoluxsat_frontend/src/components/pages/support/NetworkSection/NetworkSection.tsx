import RedNetworkIcon from '@/assets/svgs/network/network-icon-red.svg';
import BlueNetworkIcon from '@/assets/svgs/network/network-icon-blue.svg';
import GreenNetworkIcon from '@/assets/svgs/network/network-icon-green.svg';
import NetworkProblemCard from './NetworkProblemCard';
import SectionHeader from '@/components/common/SectionHeader';
import type { NetworkProblemDto } from '@/types/networkProblem';
import { useEffect, useState } from 'react';
import { NetworkProblemService } from '@/services/networkProblem.service';

const NetworkSection = () => {
  const [networkProblems, setNetworkProblems] = useState<NetworkProblemDto[]>(
    []
  );

  console.log(networkProblems);

  useEffect(() => {
    const fetchNetworkProblems = async () => {
      try {
        const data = await NetworkProblemService.getAllNetworkProblems();
        setNetworkProblems(data);
      } catch (error) {
        console.error('Failed to fetch network problems', error);
      }
    };
    fetchNetworkProblems();
  }, []);

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

  return (
    <section>
      <div className="flex flex-col gap-[24px] min-[900px]:flex-row justify-between min-[900px]:items-end mb-[40px] md:mb-[56px]">
        <SectionHeader isCta={false}>
          Актуальний <br className="hidden min-[900px]:inline" />
          стан мережі
        </SectionHeader>
        <p className="font-noto max-w-[330px] text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
          У цьому розділі ви можете перевірити актуальний стан нашої мережі та
          дізнатися про можливі технічні роботи чи тимчасові збої.
        </p>
      </div>

      <div className="flex flex-col gap-[24px]">
        {networkProblems.map((problem) => (
          <NetworkProblemCard
            key={problem.id}
            problem={problem}
            icon={getIcon(problem.networkProblemStatus.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default NetworkSection;
