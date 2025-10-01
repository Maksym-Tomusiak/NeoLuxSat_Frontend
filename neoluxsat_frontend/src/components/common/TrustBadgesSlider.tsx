import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import Badge1 from '@/assets/images/trust-badges/trust-badge-1.png';
import Badge2 from '@/assets/images/trust-badges/trust-badge-2.png';
import Badge3 from '@/assets/images/trust-badges/trust-badge-3.png';
import Badge4 from '@/assets/images/trust-badges/trust-badge-4.png';
import Badge5 from '@/assets/images/trust-badges/trust-badge-5.png';
import Badge6 from '@/assets/images/trust-badges/trust-badge-6.png';

const TrustBadgesSlider = () => {
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    swipe: false,
    draggable: false,
    variableWidth: true, // needed for smooth scroll
    autoplay: false, // ❌ disable autoplay, we’ll use CSS
    speed: 0,
  };

  const slides = [
    <img src={Badge1} alt="Trust badge 1" />,
    <img src={Badge2} alt="Trust badge 2" />,
    <img src={Badge3} alt="Trust badge 3" />,
    <img src={Badge4} alt="Trust badge 4" />,
    <img src={Badge5} alt="Trust badge 5" />,
    <img src={Badge6} alt="Trust badge 6" />,
  ];

  // duplicate slides for seamless loop
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className="w-[300px] sm:w-[350px] md:w-[500px] xl:w-[700px] h-[50px] xl:h-[60px] overflow-hidden">
      <Slider {...settings} className="trust-badges-slider">
        {duplicatedSlides.map((s, idx) => (
          <div key={idx} className="flex justify-center items-center px-4">
            {s}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrustBadgesSlider;
