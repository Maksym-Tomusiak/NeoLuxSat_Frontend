import Logo from '@/assets/svgs/logos/logo-neoluxsat-header.svg';
import SiteDropdown from './SiteDropdown';
import CrudsDropdown from './CrudsDropdown';

const AdminHeader = () => {
  return (
    <>
      {/* Header */}
      <div className="header-shadow max-w-[1380px] mx-auto fixed top-[24px] left-[16px] md:left-[30px] right-[16px] md:right-[30px] z-1001 rounded-[20px] font-noto">
        <div className="mx-auto flex w-full max-w-[1380px] justify-between items-center gap-[32px] rounded-[20px] bg-primaryWhite p-[10px] min-h-[60px]">
          <div>
            <a href="/">
              <Logo />
            </a>
          </div>

          <div className="justify-center flex">
            <ul className="flex font-noto items-end justify-end gap-[16px] text-[15px] font-normal text-primaryBlue md:gap-[24px] md:text-[16px]">
              <li>
                <a href="/admin" className="navigation-link">
                  Інформаційна панель
                </a>
              </li>
              <li>
                <div className="relative w-fit">
                  <CrudsDropdown />
                </div>
              </li>
              <li>
                <div className="relative w-fit">
                  <SiteDropdown />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
