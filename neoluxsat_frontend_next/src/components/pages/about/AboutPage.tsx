import ContactsSection from "@/components/common/sections/ContactsSection/ContactsSection";
import WhyUsSection from "@/components/common/sections/WhyUsSection/WhyUsSection";
import WorkAreasSection from "@/components/common/sections/WorkAreasSection";
import StatsSection from "./StatsSection/StatsSection";
import AboutUsSection from "./AboutUsSection/AboutUsSection";
import HeroSection from "./HeroSection/HeroSection";
import FadeInFromDirection from "@/components/common/animations/FadeInFromDirection";

const AboutPage = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FadeInFromDirection direction="bottom">
        <AboutUsSection />
      </FadeInFromDirection>
      <WhyUsSection />
      <WorkAreasSection />
      <ContactsSection />
    </>
  );
};

export default AboutPage;
