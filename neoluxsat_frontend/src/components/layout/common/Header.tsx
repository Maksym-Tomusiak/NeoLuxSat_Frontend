import { useState, useEffect, useRef } from 'react';
import Logo from '@/assets/svgs/logos/logo-neoluxsat-header.svg';
import Divider from '@/assets/svgs/header/header-divider.svg';
import MenuIcon from '@/assets/svgs/header/menu-icon.svg';
import CloseIcon from '@/assets/svgs/close-icon.svg';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import ServicesDropdown from '../../common/ServicesDropdown';
import AddressIcon from '@/assets/svgs/contacts/address-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import EmailIcon from '@/assets/svgs/contacts/email-icon.svg';
import TelegramIcon from '@/assets/svgs/contacts/telegram-icon.svg';
import ViberIcon from '@/assets/svgs/contacts/viber-icon.svg';
import FacebookIcon from '@/assets/svgs/contacts/facebook-icon.svg';

const HIDE_TIMEOUT_MS = 3000; // 10 seconds

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // 💡 Ref to store the timer ID
  const timerRef = useRef<number | null>(null); // 💡 --- NEW --- // Use state for hover instead of a ref, so useEffect can react to it

  const [isHovered, setIsHovered] = useState(false);

  const applicationButtonParams = { isOrange: true };

  const services = [
    { name: 'Підключення інтернету', href: '/services/internet' },
    { name: 'Системи безпеки', href: '/services/security' },
    { name: 'Налаштування телебачення', href: '/services/tv' },
    { name: 'IoT та M2M', href: '/services/iot' },
  ];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // match animation duration
  }; // This useEffect for scroll-lock is unchanged and correct

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.classList.add('scroll-lock-html');
      body.classList.add('scroll-lock-body');
    } else if (!isClosing) {
      html.classList.remove('scroll-lock-html');
      body.classList.remove('scroll-lock-body');
    }

    return () => {
      html.classList.remove('scroll-lock-html');
      body.classList.remove('scroll-lock-body');
    };
  }, [isOpen, isClosing]); // 💡 --- LOGIC UPDATED --- // This effect replaces your resetTimer function and the old effect

  useEffect(() => {
    // Function to handle user activity (scroll or touch)
    const handleActivity = () => {
      // 1. Always show header on activity
      setIsVisible(true); // 2. Clear any pending hide timer

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      } // 3. Set a new timer to hide, IF conditions are met // (Not hovered, menu not open, and preferably, scrolled down)

      if (!isHovered && !isOpen && window.scrollY > 0) {
        timerRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, HIDE_TIMEOUT_MS);
      }
    }; // If user is hovering or the mobile menu is open, // keep the header visible and cancel any hide timer.

    if (isHovered || isOpen) {
      setIsVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else {
      // If not hovered and menu is closed (e.g., on mouse leave, or on load),
      // run the activity handler to set the timer.
      handleActivity();
    } // Add listeners for scroll and touch

    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity); // Cleanup

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }; // Re-run this logic whenever hover or menu state changes
  }, [isOpen, isHovered]); // --- 💡 Mouse Hover Handlers (UPDATED) ---

  const handleMouseEnter = () => {
    // Just set the state. The useEffect will handle the logic.
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Just set the state. The useEffect will handle the logic.
    setIsHovered(false);
  }; // --- End of Logic Update --- // CSS Class for smooth transition and hiding

  const headerVisibilityClass = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 -translate-y-full';

  return (
    <>
      {/* Header */}
      <div
        className={`
                    header-shadow max-w-[1380px] mx-auto fixed top-[24px] left-[16px] md:left-[30px] right-[16px] md:right-[30px] z-1001 rounded-[20px] font-noto 
                    transition-all duration-300 ease-in-out ${headerVisibilityClass}
                `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto flex w-full max-w-[1380px] justify-between items-center gap-[32px] rounded-[20px] bg-primaryWhite p-[10px]">
          <div className="xl:flex-1">
            <a href="/">
              <Logo />
            </a>
          </div>

          <div className="hidden xl:flex-1 justify-center min-[900px]:flex">
            <ul className="flex items-center justify-end gap-[16px] text-[15px] font-normal text-primaryBlue md:gap-[24px] md:text-[16px]">
              <li>
                <div className="relative w-fit">
                  <ServicesDropdown isWhite={false} />
                </div>
              </li>
              <li>
                <a href="/about" className="navigation-link">
                  Про нас
                </a>
              </li>
              <li>
                <a href="/support" className="navigation-link">
                  Підтримка
                </a>
              </li>
            </ul>
          </div>

          <div className="hidden xl:flex-1 items-center justify-end gap-[8px] text-primaryBlue min-[900px]:flex md:gap-[12px]">
            <a
              href="tel:0937773244"
              className="text-[14px]/[120%] font-semibold tracking-[-0.28px] md:text-[16px]/[120%] md:tracking-[-0.32px]"
            >
              093-777-3244
            </a>
            <div className="hidden md:block">
              <Divider />
            </div>
            <LeaveApplicationButton
              {...applicationButtonParams}
              className="min-w-fit"
            />
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="ml-auto flex size-[40px] items-center justify-center rounded-[10px] min-[900px]:hidden"
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
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
              <div className="flex items-center justify-between p-6">
                <div>
                  <Logo />
                </div>
                <button
                  aria-label="Close menu"
                  onClick={handleClose}
                  className="p-2 fill-primaryOrange"
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="flex flex-col gap-[40px] px-6 mb-[40px]">
                <div className="flex flex-col gap-[24px]">
                  <a href="/" className="text-[18px]/[120%] font-medium">
                    Головна
                  </a>
                  <a href="/about" className="text-[18px]/[120%] font-medium">
                    Про нас
                  </a>
                  <a href="/support" className="text-[18px]/[120%] font-medium">
                    Підтримка
                  </a>
                </div>

                <div>
                  <p className="text-[14px] font-normal text-primaryBlue/80 mb-[12px]">
                    Послуги
                  </p>
                  <div className="flex flex-col gap-[24px]">
                    {services.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        className="text-[18px]/[120%] text-primaryBlue font-semibold"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="px-6 flex flex-col w-fit gap-[40px] text-[16px]/[120%] text-left fill-primaryBlue">
                <div className="flex gap-[12px] items-center w-fit">
                  <AddressIcon />
                  <div className="flex flex-col gap-[8px]">
                    <p className="font-normal text-primaryBlue/80">Адреса</p>
                    <p className="font-medium">вул. Лесі Українки, Острог</p>
                  </div>
                </div>
                <div className="flex gap-[12px] items-center w-fit">
                  <PhoneIcon />
                  <div className="flex flex-col gap-[8px]">
                    <p className="font-normal text-primaryBlue/80">
                      Номер телефону
                    </p>
                    <a href="tel:0937773244" className="font-medium">
                      093-777-3244
                    </a>
                  </div>
                </div>
                <div className="flex gap-[12px] items-center w-fit">
                  <EmailIcon />
                  <div className="flex flex-col gap-[8px]">
                    <p className="font-normal text-primaryBlue/80">Пошта</p>
                    <a
                      href="mailto:neoluxsat@example.com"
                      className="font-medium"
                    >
                      neoluxsat@example.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-[24px] justify-start fill-primaryOrange mb-[20px]">
                  <TelegramIcon />
                  <ViberIcon />
                  <FacebookIcon />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
