import { useState, useEffect } from 'react';
import Logo from '@/assets/svgs/logos/logo-neoluxsat-header.svg';
import MenuIcon from '@/assets/svgs/header/menu-icon.svg'; // Assuming these icons are available
import CloseIcon from '@/assets/svgs/close-icon.svg';
import CrudsDropdown from './CrudsDropdown';
import SiteDropdown from './SiteDropdown';
// 💡 Import the functions to get the list items from the dropdown components
import { getCrudsOptions } from './CrudsDropdown';
import { getSiteOptions } from './SiteDropdown';

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 💡 Fetching the lists for the mobile menu
  const crudsOptions = getCrudsOptions();
  const siteOptions = getSiteOptions();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // match animation duration
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  // 💡 Scroll Locking Logic
  useEffect(() => {
    const html = document.documentElement; // <html>
    const body = document.body; // <body>

    if (isOpen) {
      // Lock scroll immediately when menu opens
      html.classList.add('scroll-lock-html');
      body.classList.add('scroll-lock-body');
    } else if (!isClosing) {
      // Unlock scroll only when fully closed (after animation)
      html.classList.remove('scroll-lock-html');
      body.classList.remove('scroll-lock-body');
    }

    // Cleanup: Ensure classes are removed when component unmounts
    return () => {
      html.classList.remove('scroll-lock-html');
      body.classList.remove('scroll-lock-body');
    };
  }, [isOpen, isClosing]);

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

          {/* Desktop Navigation */}
          <div className="hidden min-md:flex justify-center">
            <ul className="flex font-noto items-center justify-end gap-[16px] text-[15px] font-normal text-primaryBlue md:gap-[24px] md:text-[16px]">
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
              <li>
                <div>
                  <button
                    className={`application-button border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold 
                      bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue`}
                    onClick={handleLogoutClick}
                  >
                    Вийти
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Burger Button (visible below 900px) */}
          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="ml-auto flex size-[40px] items-center justify-center rounded-[10px] min-md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile menu modal */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[1999]" />
          <div
            className={`fixed inset-0 z-[2000] bg-primaryWhite text-primaryBlue h-full w-full flex flex-col ${
              isClosing ? 'animate-slide-out' : 'animate-slide-in'
            }`}
          >
            {/* Scrollable Modal Content Wrapper */}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col overscroll-y-contain">
              {/* Header and Close Button */}
              <div className="flex items-center justify-between p-6">
                <div>
                  <Logo />
                </div>
                <div className="flex items-center">
                  <button
                    aria-label="Close menu"
                    onClick={handleClose}
                    className="p-2"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation List */}
              <nav className="flex flex-col gap-[40px] px-6 mb-[40px]">
                <div className="flex flex-col gap-[24px]">
                  <a href="/admin" className="text-[18px]/[120%] font-medium">
                    Інформаційна панель
                  </a>
                </div>

                {/* Cruds Options */}
                <div>
                  <p className="text-[14px] font-normal text-primaryBlue/80 mb-[12px]">
                    Редагування
                  </p>
                  <div className="flex flex-col gap-[24px]">
                    {crudsOptions.map((opt) => (
                      <a
                        key={opt.name}
                        href={opt.href}
                        className="text-[18px]/[120%] text-primaryBlue font-semibold"
                        onClick={handleClose}
                      >
                        {opt.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Site Options */}
                <div>
                  <p className="text-[14px] font-normal text-primaryBlue/80 mb-[12px]">
                    Сайт
                  </p>
                  <div className="flex flex-col gap-[24px]">
                    {siteOptions.map((opt) => (
                      <a
                        key={opt.name}
                        href={opt.href}
                        className="text-[18px]/[120%] text-primaryBlue font-semibold"
                        onClick={handleClose}
                        target={opt.href !== '/admin' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                      >
                        {opt.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-[24px] w-full">
                    <button
                      className={`max-xs:w-full justify-center application-button border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold 
                      bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue`}
                      onClick={handleLogoutClick}
                    >
                      Вийти
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminHeader;
