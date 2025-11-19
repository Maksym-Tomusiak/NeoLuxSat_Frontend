// ServicesSection.jsx
import { useState, useEffect } from "react";
import ServiceIcon1 from "@/assets/svgs/services/services-icon-1.svg?component";
import ServiceIcon2 from "@/assets/svgs/services/services-icon-2.svg?component";
import ServiceIcon3 from "@/assets/svgs/services/services-icon-3.svg?component";
import ServiceIcon4 from "@/assets/svgs/services/services-icon-4.svg?component";
import ServiceCard from "./ServiceCard";
import SectionHeader from "@/components/common/SectionHeader";
import FadeInFromDirection from "@/components/common/animations/FadeInFromDirection";

const ServicesSection = () => {
  // Initialize state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. SSR Safety: Check if window exists
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 712);
    };

    // Check initially
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    {
      icon: <ServiceIcon1 />,
      href: "/services/internet",
      title: "Підключення інтернету",
      description:
        "Ми підключаємо інтернет у квартирах, приватних будинках та офісах.",
    },
    {
      icon: <ServiceIcon2 />,
      href: "/services/iot",
      title: "IoT та M2M",
      description:
        "Підключаємо розумні рішення для автоматизації процесів, контролю та безперервного зв’язку.",
    },
    {
      icon: <ServiceIcon3 />,
      href: "/services/security",
      title: "Системи безпеки",
      description:
        "Проєктуємо та встановлюємо охоронні системи для квартир, будинків та бізнесу.",
    },
    {
      icon: <ServiceIcon4 />,
      href: "/services/tv",
      title: "Налаштування телебачення",
      description:
        "Ми швидко й професійно налаштуємо супутникове, кабельне або Smart TV.",
    },
  ];

  return (
    <section id="main-content-start">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:items-start justify-between flex-wrap">
          <SectionHeader
            isCta={false}
            className="
     w-fit
     row-start-1
     md:col-span-2 md:justify-self-center
     lg:col-span-1 lg:row-start-1 lg:col-start-1 lg:justify-self-start
    "
          >
            Наші <br className="hidden sm:inline" />
            послуги
          </SectionHeader>

          {/* Cards - Top Row */}
          <div className="flex gap-[20px] w-full lg:w-fit justify-center flex-wrap">
            {/* Card 1 */}
            <FadeInFromDirection
              // 2. KEY PROP: Forces re-render when view changes
              key={`card-1-${isMobile ? "mobile" : "desktop"}`}
              direction={isMobile ? "bottom" : "top"}
              delay={0.1}
              className="max-[712px]:min-w-full min-[712px]:max-w-[330px]"
            >
              <div className="max-[712px]:w-full min-[712px]:max-w-[330px]">
                <ServiceCard {...data[0]} />
              </div>
            </FadeInFromDirection>

            {/* Card 2 */}
            <FadeInFromDirection
              // 2. KEY PROP: Forces re-render when view changes
              key={`card-2-${isMobile ? "mobile" : "desktop"}`}
              direction={isMobile ? "bottom" : "top"}
              delay={isMobile ? 0.1 : 0.2}
              className="max-[712px]:min-w-full min-[712px]:max-w-[330px]"
            >
              <div className="max-[712px]:w-full min-[712px]:max-w-[330px]">
                <ServiceCard {...data[1]} />
              </div>
            </FadeInFromDirection>
          </div>
        </div>

        {/* Cards - Bottom Row (Always bottom) */}
        <div className="w-full flex justify-center items-center gap-[20px] mx-auto flex-wrap">
          {/* Card 3 */}
          <FadeInFromDirection
            direction="bottom"
            delay={0.1}
            className="max-[712px]:min-w-full min-[712px]:max-w-[330px]"
          >
            <div className="max-[712px]:min-w-full min-[712px]:max-w-[330px]">
              <ServiceCard {...data[2]} />
            </div>
          </FadeInFromDirection>

          {/* Card 4 */}
          <FadeInFromDirection
            direction="bottom"
            delay={isMobile ? 0.1 : 0.2}
            className="max-[712px]:min-w-full min-[712px]:max-w-[330px]"
          >
            <div className="max-[712px]:min-w-full min-[712px]:max-w-[330px]">
              <ServiceCard {...data[3]} />
            </div>
          </FadeInFromDirection>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
