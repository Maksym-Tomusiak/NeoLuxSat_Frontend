import Logo from '@/assets/svgs/logos/logo-neoluxsat-header.svg';
import Divider from '@/assets/svgs/header/header-divider.svg';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import ServicesDropdown from '../common/ServicesDropdown';

const Header = () => {
  const applicationButtonParams = {
    isOrange: true,
  };

  return (
    <div className="header-shadow fixed top-[24px] left-[30px] right-[30px] flex items-center p-[10px] bg-primaryWhite rounded-[20px] max-w-[1380px] mx-auto z-1001 font-noto">
      <div className="flex-1">
        <a href="/">
          <Logo />
        </a>
      </div>
      <div className="flex flex-1 justify-center">
        <ul className="flex justify-end items-center gap-[24px] text-primaryBlue text-[16px] font-normal">
          <li>
            <div className="relative w-fit">
              <ServicesDropdown isWhite={false} />
            </div>
          </li>
          <li>
            <div className="relative w-fit">
              <a href="/about" className="navigation-link">
                Про нас
              </a>
            </div>
          </li>
          <li>
            <div className="relative w-fit">
              <a href="/support" className="navigation-link">
                Підтримка
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 justify-end items-center gap-[12px] text-primaryBlue">
        <a
          href="tel:0937773244"
          className="font-semibold text-[16px]/[120%] tracking-[-0.32px]"
        >
          093-777-3244
        </a>
        <Divider />
        <LeaveApplicationButton {...applicationButtonParams} />
      </div>
    </div>
  );
};

export default Header;
