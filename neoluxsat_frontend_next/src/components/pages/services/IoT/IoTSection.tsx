import HouseIcon from "@/assets/svgs/services/iot/house-icon.svg?component";
import ManufactureIcon from "@/assets/svgs/services/iot/manufacture-icon.svg?component";
import MedicineIcon from "@/assets/svgs/services/iot/medicine-icon.svg?component";
import TransportIcon from "@/assets/svgs/services/iot/transport-icon.svg?component";
import CheckedIcon from "@/assets/svgs/shop/checked-icon.svg?component";
import IoTSectionCard from "./IoTSectionCard";
import SectionHeader from "@/components/common/SectionHeader";

const cardsContent = [
  {
    title: "IoT",
    content: (
      <>
        IoT — це мережа взаємопов’язаних пристроїв, сенсорів та систем, які
        збирають і обмінюються даними через інтернет.
      </>
    ),
  },
  {
    title: "M2M",
    content: (
      <>
        M2M — це технологія комунікації між пристроями без участі людини.
        Забезпечує обмін даними через дротові та бездротові канали зв’язку.
      </>
    ),
  },
  {
    title: "Застосування",
    content: (
      <>
        <div className="flex flex-col gap-[16px] items-start justify-end">
          <div className="flex gap-[8px] items-center">
            <HouseIcon />
            <p>Розумний дім</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <ManufactureIcon />
            <p>Промислові рішення</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <MedicineIcon />
            <p>Медицина</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <TransportIcon />
            <p>
              Транспорт, енергетика <br />
              та агробізнес
            </p>
          </div>
        </div>
      </>
    ),
    className: "sm:min-h-[255px]",
  },
  {
    title: "Переваги",
    content: (
      <>
        <div className="flex flex-col gap-[16px] items-start justify-start">
          <div className="flex gap-[8px] items-center">
            <CheckedIcon />
            <p>Автоматизація процесів</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <CheckedIcon />
            <p>Віддалений моніторинг обладнання</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <CheckedIcon />
            <p>Зниження витрат на обслуговування</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <CheckedIcon />
            <p>Підвищення ефективності роботи систем</p>
          </div>
        </div>
      </>
    ),
    className: "sm:min-h-[255px]",
  },
];
const IoTSection = () => {
  return (
    <section>
      <SectionHeader isCta={false} className="mb-[40px] min-[900px]:mb-[56px]">
        Що таке <br />
        IoT та M2M
      </SectionHeader>
      <img
        src="/images/iot-section-image.png"
        alt="iot-image"
        className="max-w-full min-[350px]:max-w-[300px] block min-[900px]:hidden mx-auto mb-[40px]"
      />
      <div className="relative flex flex-col min-[784px]:flex-row max-[784px]:items-center justify-center min-[900px]:justify-between w-full min-[900px]:gap-[15%] gap-[24px] min-[900px]:gap-y-[240px] flex-wrap max-w-[1200px] mx-auto">
        {cardsContent.map((card) => (
          <IoTSectionCard
            key={card.title}
            title={card.title}
            content={card.content}
            className={card.className}
          />
        ))}
        <img
          src="/images/iot-section-image.png"
          alt="iot-image"
          className="absolute max-w-full md:max-h-[450px] lg:max-h-[520px]
          md:left-[calc(50%-190px)] md:top-[calc(50%-250px)] lg:left-[calc(50%-225px)] lg:top-[calc(50%-330px)] max-[900px]:hidden"
        />
      </div>
    </section>
  );
};

export default IoTSection;
