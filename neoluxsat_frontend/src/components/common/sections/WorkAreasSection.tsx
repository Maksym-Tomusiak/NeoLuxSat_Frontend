import SectionHeader from '../SectionHeader';
import mapImage from '@/assets/images/areas/areas-map-icon.png';

const WorkAreasSection = () => {
  return (
    <section>
      <SectionHeader isCta={false}>
        Де ми <br className="hidden lg:inline" />
        працюємо
      </SectionHeader>
      <div className="mx-auto w-full areas-map-container mt-[40px]">
        <img src={mapImage} alt="areas map" className="mx-auto" />
      </div>
    </section>
  );
};

export default WorkAreasSection;
