import ContinuousSliderTemplate from "@/components/common/ContinuousSliderTemplate";

import Badge1 from "@/assets/images/trust-badges/trust-badge-1.png";
import Badge2 from "@/assets/images/trust-badges/trust-badge-2.png";
import Badge3 from "@/assets/images/trust-badges/trust-badge-3.png";
import Badge4 from "@/assets/images/trust-badges/trust-badge-4.png";
import Badge5 from "@/assets/images/trust-badges/trust-badge-5.png";

const TrustBadgesSlider = () => {
  // The content of the original slides
  const slides = [
    <img src={Badge1.src} alt="Trust badge 1" />,
    <img src={Badge2.src} alt="Trust badge 2" />,
    <img src={Badge3.src} alt="Trust badge 3" />,
    <img src={Badge4.src} alt="Trust badge 4" />,
    <img src={Badge5.src} alt="Trust badge 5" />,
  ];

  return (
    <ContinuousSliderTemplate
      slides={slides}
      durationSeconds={12} // Animation cycle time
      className="w-[400px] sm:w-[350px] md:w-[600px] xl:w-[700px] h-[50px] xl:h-[60px]" // Viewport size
      slideGap="56px"
    />
  );
};

export default TrustBadgesSlider;
