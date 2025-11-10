import { useState, useEffect, useRef, Fragment } from 'react'; // 💡 --- UPDATED ---
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'; // 💡 --- ADD ---
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
import WhatsappIcon from '@/assets/svgs/contacts/whatsapp-icon.svg';
import FacebookIcon from '@/assets/svgs/contacts/facebook-icon.svg';

const HIDE_TIMEOUT_MS = 3000; // 10 seconds

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // const [isClosing, setIsClosing] = useState(false); // 💡 --- REMOVE (Headless UI handles this) ---
  const timerRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const applicationButtonParams = { isOrange: true };

  const services = [
    { name: 'Підключення інтернету', href: '/services/internet' },
    { name: 'Системи безпеки', href: '/services/security' },
    { name: 'Налаштування телебачення', href: '/services/tv' },
    { name: 'IoT та M2M', href: '/services/iot' },
  ];

  // 💡 --- UPDATED ---
  // Simplified close handler. Headless UI's <Transition> handles the exit animation.
  const handleClose = () => {
    setIsOpen(false);
  };

  // 💡 --- REMOVE ---
  // This manual scroll-lock logic is no longer needed.
  // The Headless UI <Dialog> component handles this automatically.
  /*
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
  }, [isOpen, isClosing]);
  */

  // This useEffect for header visibility logic remains unchanged
  useEffect(() => {
    const handleActivity = () => {
      setIsVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (!isHovered && !isOpen && window.scrollY > 0) {
        timerRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, HIDE_TIMEOUT_MS);
      }
    };

    if (isHovered || isOpen) {
      setIsVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else {
      handleActivity();
    }

    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
          <div className="min-[1150px]:flex-1">
            <a href="/">
              <Logo />
            </a>
          </div>

          <div className="hidden min-[1150px]:flex-1 justify-center min-[1150px]:flex">
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

          <div className="hidden min-[1150px]:flex-1 items-center justify-end gap-[8px] text-primaryBlue min-[1150px]:flex md:gap-[12px]">
            <div className="flex flex-col items-center gap-[4px]">
              <a
                href="tel:0957773244"
                className="text-[14px]/[120%] font-semibold tracking-[-0.28px] md:text-[16px]/[120%] md:tracking-[-0.32px]"
              >
                095-777-3244
              </a>
              <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
              <a
                href="tel:0737376088"
                className="text-[14px]/[120%] font-semibold tracking-[-0.28px] md:text-[16px]/[120%] md:tracking-[-0.32px]"
              >
                073-737-6088
              </a>
            </div>
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
            onClick={() => setIsOpen(true)} // This just opens the dialog
            className="ml-auto flex size-[40px] items-center justify-center rounded-[10px] min-[1150px]:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* 💡 --- MOBILE MENU MODAL (UPDATED) --- 💡 */}
      {/*
        This block replaces the old `{isOpen && ...}` logic.
        - <Transition> controls the mount/unmount.
        - <Dialog> handles the accessibility and scroll-lock.
        - <TransitionChild> controls the slide-in/out animation.
      */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-2000" onClose={handleClose}>
          {/*
            This <TransitionChild> is the sliding panel itself.
            We translate the 'animate-slide-in' and 'animate-slide-out'
            classes into Headless UI's transition props.
            (Assuming a slide-in from the right)
          */}
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/*
              This <DialogPanel> replaces your old full-screen div.
              Note that the animation classes are gone from here.
            */}
            <DialogPanel className="fixed inset-0 z-[2000] flex h-full w-full flex-col bg-primaryWhite text-primaryBlue">
              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between p-6">
                  <div>
                    <Logo />
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={handleClose}
                    className="p-2 fill-primaryOrange menu-close-icon-container"
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
                    <a
                      href="/support"
                      className="text-[18px]/[120%] font-medium"
                    >
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
                      <div className="flex flex-col gap-[4px] w-fit">
                        <a href="tel:0957773244" className="font-medium w-fit">
                          095-777-3244
                        </a>
                        <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                        <a href="tel:0737376088" className="font-medium">
                          073-737-6088
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[12px] items-center w-fit">
                    <EmailIcon />
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-normal text-primaryBlue/80">Пошта</p>
                      <a
                        href="mailto:luxsatnet@gmail.com"
                        className="font-medium"
                      >
                        luxsatnet@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-[24px] justify-start mb-[20px]">
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
                      <a href="https://t.me/+380957773244" target="_blank">
                        <TelegramIcon />
                      </a>
                    </div>
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
                      <a href="viber://chat?number=%2B380957773244">
                        <ViberIcon />
                      </a>
                    </div>
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
                      <a
                        href="https://wa.me/380957773244"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsappIcon />
                      </a>
                    </div>
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
                      <a
                        href="https://www.facebook.com/profile.php?id=100066785902681"
                        target="_blank"
                      >
                        <FacebookIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default Header;
