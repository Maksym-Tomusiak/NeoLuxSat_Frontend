import Logo from '@/assets/svgs/logo-neoluxsat-header.svg';
import Divider from '@/assets/svgs/header-divider.svg';

const Header = () => {
  return (
    <div className="header-shadow fixed top-[24px] left-[30px] right-[30px] flex items-center p-[10px] bg-primaryWhite rounded-[20px] max-w-[1360px] mx-auto z-10 font-noto">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex flex-1 justify-center">
        <ul className="flex justify-end items-center gap-[24px] text-primaryBlue text-[16px] font-normal">
          <li>
            <a href="#">Послуги</a>
          </li>
          <li>
            <a href="#">Про нас</a>
          </li>
          <li>
            <a href="#">Підтримка</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 justify-end items-center gap-[12px] text-primaryBlue">
        <p className="font-semibold text-[16px]/[120%] tracking-[-0.32px]">
          093-777-3244
        </p>
        <Divider />
        <button
          className="border bg-primaryOrange text-primaryWhite rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fill 
        hover:bg-primaryWhite hover:text-primaryBlue hover:border-primaryOrange
        transition duration-300 ease-in-out cursor-pointer
        font-noto"
        >
          Залишити заявку
        </button>
      </div>
    </div>
  );
};

export default Header;
