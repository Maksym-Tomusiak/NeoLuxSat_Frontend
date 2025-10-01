import SectionHeader from '../SectionHeader';
import AreasMapIcon from '@/assets/svgs/areas/areas-map-icon.svg';

const WorkAreasSection = () => {
  return (
    <section>
      <SectionHeader isCta={false}>
        Де ми <br className="hidden lg:inline" />
        працюємо
      </SectionHeader>
      <div className="mx-auto w-full areas-map-container mt-[40px]">
        <AreasMapIcon />
      </div>
    </section>
  );
};

export default WorkAreasSection;
