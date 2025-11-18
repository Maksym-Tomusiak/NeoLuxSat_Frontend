"use client";

import { useState, useEffect, useRef, Fragment } from "react"; // 💡 --- UPDATED ---
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"; // 💡 --- ADD ---
import Logo from "@/assets/svgs/logos/logo-neoluxsat-header.svg?component";
import Divider from "@/assets/svgs/header/header-divider.svg?component";
import MenuIcon from "@/assets/svgs/header/menu-icon.svg?component";
import CloseIcon from "@/assets/svgs/close-icon.svg?component";
import LeaveApplicationButton from "@/components/common/LeaveApplicationButton";
import ServicesDropdown from "../../common/ServicesDropdown";
import AddressIcon from "@/assets/svgs/contacts/address-icon.svg?component";
import PhoneIcon from "@/assets/svgs/contacts/phone-icon.svg?component";
import EmailIcon from "@/assets/svgs/contacts/email-icon.svg?component";
import TelegramIcon from "@/assets/svgs/contacts/telegram-icon.svg?component";
import ViberIcon from "@/assets/svgs/contacts/viber-icon.svg?component";
import WhatsappIcon from "@/assets/svgs/contacts/whatsapp-icon.svg?component";
import FacebookIcon from "@/assets/svgs/contacts/facebook-icon.svg?component";
import Link from "next/link";
import { motion } from "framer-motion";

const HIDE_TIMEOUT_MS = 3000; // 10 seconds

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const applicationButtonParams = { isOrange: true };

  const services = [
    { name: "Підключення інтернету", href: "/services/internet" },
    { name: "Системи безпеки", href: "/services/security" },
    { name: "Налаштування телебачення", href: "/services/tv" },
    { name: "IoT та M2M", href: "/services/iot" },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

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

    window.addEventListener("scroll", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    return () => {
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
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
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-full";

  // 💡 Framer Motion variants for initial page load animation (Top to Bottom)
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={headerVariants}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.5,
        }}
        className={`
         max-w-[1380px] mx-auto fixed top-[24px] left-[16px] md:left-[30px] right-[16px] md:right-[30px] z-1001 rounded-[20px] font-noto 
         ${!isVisible ? "pointer-events-none" : ""}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 💡 Inner div handles the scroll/hover transition based on state */}
        <div
          className={` header-shadow
            mx-auto flex w-full max-w-[1380px] justify-between items-center gap-[32px] rounded-[20px] bg-primaryWhite p-[10px]
            transition-all duration-300 ease-in-out ${headerVisibilityClass}
        `}
        >
          <div className="min-[1150px]:flex-1">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="hidden min-[1150px]:flex-1 justify-center min-[1150px]:flex">
            <ul className="flex items-center justify-end gap-[16px] text-[15px] font-normal text-primaryBlue md:gap-[24px] md:text-[16px]">
              <li>
                <div className="relative w-fit">
                  <ServicesDropdown isWhite={false} />
                </div>
              </li>
              <li>
                <Link href="/about" className="navigation-link">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/support" className="navigation-link">
                  Підтримка
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden min-[1150px]:flex-1 items-center justify-end gap-[8px] text-primaryBlue min-[1150px]:flex md:gap-[12px]">
            <div className="flex flex-col items-center gap-[4px]">
              <Link
                href="tel:0957773244"
                className="text-[14px]/[120%] font-semibold tracking-[-0.28px] md:text-[16px]/[120%] md:tracking-[-0.32px]"
              >
                095-777-3244
              </Link>
              <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
              <Link
                href="tel:0737376088"
                className="text-[14px]/[120%] font-semibold tracking-[-0.28px] md:text-[16px]/[120%] md:tracking-[-0.32px]"
              >
                073-737-6088
              </Link>
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
            onClick={() => setIsOpen(true)}
            className="ml-auto flex size-[40px] items-center justify-center rounded-[10px] min-[1150px]:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </motion.div>

      {/* 💡 --- MOBILE MENU MODAL (UPDATED) --- 💡 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-2000" onClose={handleClose}>
          {/* Backdrop for click outside (optional, but good practice) */}
          <TransitionChild
            as={"div"}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* The Backdrop: We can remove this if we want a slide-in overlay without a darkened background */}
            {/* <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> */}
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-0 z-[2000] flex h-full w-full flex-col bg-primaryWhite text-primaryBlue">
              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                {/* Header and Close Button */}
                <div className="flex items-center justify-between p-6">
                  <div>
                    <Link href="/" onClick={handleClose}>
                      <Logo />
                    </Link>
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={handleClose}
                    className="p-2 fill-primaryOrange menu-close-icon-container action:transform active:scale-95 active:duration-75"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* --- MOBILE NAVIGATION --- */}
                <nav className="flex flex-col gap-[40px] px-6 mb-[40px]">
                  <div className="flex flex-col gap-[24px]">
                    {/* Added: Home Link, was missing in the 'current' nav but implicit */}
                    <Link
                      href="/"
                      className="text-[18px]/[120%] font-medium"
                      onClick={handleClose}
                    >
                      Головна
                    </Link>
                    <Link
                      href="/about"
                      className="text-[18px]/[120%] font-medium"
                      onClick={handleClose}
                    >
                      Про нас
                    </Link>
                    <Link
                      href="/support"
                      className="text-[18px]/[120%] font-medium"
                      onClick={handleClose}
                    >
                      Підтримка
                    </Link>
                  </div>

                  <div>
                    <p className="text-[14px] font-normal text-primaryBlue/80 mb-[12px]">
                      Послуги
                    </p>
                    <div className="flex flex-col gap-[24px]">
                      {services.map((s) => (
                        <Link
                          key={s.name}
                          href={s.href}
                          className="text-[18px]/[120%] text-primaryBlue font-semibold"
                          onClick={handleClose}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                {/* Contacts & Social (filled from previous content) */}
                <div className="px-6 flex flex-col w-fit gap-[40px] text-[16px]/[120%] text-left fill-primaryBlue mb-10">
                  {" "}
                  {/* Added bottom margin */}
                  {/* Address */}
                  <div className="flex gap-[12px] items-center w-fit">
                    <AddressIcon />
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-normal text-primaryBlue/80">Адреса</p>
                      <p className="font-medium">вул. Лесі Українки, Острог</p>
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="flex gap-[12px] items-center w-fit">
                    <PhoneIcon />
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-normal text-primaryBlue/80">
                        Номер телефону
                      </p>
                      <div className="flex flex-col gap-[4px] w-fit">
                        {/* Note: Kept as <Link> for consistency, though standard <Link> is fine for tel: */}
                        <Link
                          href="tel:0957773244"
                          className="font-medium w-fit"
                          onClick={handleClose}
                        >
                          095-777-3244
                        </Link>
                        <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                        <Link
                          href="tel:0737376088"
                          className="font-medium"
                          onClick={handleClose}
                        >
                          073-737-6088
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex gap-[12px] items-center w-fit">
                    <EmailIcon />
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-normal text-primaryBlue/80">Пошта</p>
                      <Link
                        href="mailto:luxsatnet@gmail.com"
                        className="font-medium"
                      >
                        luxsatnet@gmail.com
                      </Link>
                    </div>
                  </div>
                  {/* Social Links */}
                  <div className="flex gap-[24px] justify-start mb-[20px]">
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
                      <Link
                        href="https://t.me/+380957773244"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <TelegramIcon />
                      </Link>
                    </div>
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
                      <Link
                        href="viber://chat?number=%2B380957773244"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ViberIcon />
                      </Link>
                    </div>
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
                      <Link
                        href="https://wa.me/380957773244"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsappIcon />
                      </Link>
                    </div>
                    <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
                      <Link
                        href="https://www.facebook.com/profile.php?id=100066785902681"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FacebookIcon />
                      </Link>
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
