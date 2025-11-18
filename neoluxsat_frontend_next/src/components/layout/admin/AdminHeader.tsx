"use client";

import { useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Logo from "@/assets/svgs/logos/logo-neoluxsat-header.svg?component";
import MenuIcon from "@/assets/svgs/header/menu-icon.svg?component";
import CloseIcon from "@/assets/svgs/close-icon.svg?component";
import CrudsDropdown from "./CrudsDropdown";
import SiteDropdown from "./SiteDropdown";
import { getCrudsOptions } from "./CrudsDropdown";
import { getSiteOptions } from "./SiteDropdown";
import { UserService } from "@/services/user.service";
import { useUser } from "@/contexts/userContext";
import Link from "next/link";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, logout, isLoading } = useUser();

  // Keep this guard here too!
  if (isLoading || !role) {
    return null;
  }

  const allCrudsOptions = role ? getCrudsOptions(role) : [];

  const siteOptions = getSiteOptions() || [];

  const topLevelLinks = allCrudsOptions.filter(
    (opt) => opt.name === "Заявки" || opt.name === "Ремонти"
  );

  const dropdownOptions = allCrudsOptions.filter(
    (opt) => opt.name !== "Заявки" && opt.name !== "Ремонти"
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  // 7. Оновлена функція виходу
  const handleLogoutClick = async () => {
    try {
      // 7а. Викликаємо API, щоб інвалідувати токен на бекенді
      await UserService.logout();
      logout();
    } catch (error) {
      console.error("Failed to logout from server:", error);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="header-shadow max-w-[1380px] mx-auto fixed top-[24px] left-[16px] md:left-[30px] right-[16px] md:right-[30px] z-1001 rounded-[20px] font-noto">
        <div className="mx-auto flex w-full max-w-[1380px] justify-between items-center gap-[32px] rounded-[20px] bg-primaryWhite p-[10px] min-h-[60px]">
          <div>
            <Link href="/" onClick={handleClose}>
              <Logo />
            </Link>
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden min-lg:flex justify-center">
            <ul className="flex font-noto items-center justify-end gap-[16px] text-[15px] font-normal text-primaryBlue md:gap-[24px] md:text-[16px]">
              <li>
                <Link href="/admin" className="navigation-link">
                  Інформаційна панель
                </Link>
              </li>
              {/* Рендеримо посилання верхнього рівня */}
              {topLevelLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="navigation-link">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <div className="relative w-fit">
                  {/* Передаємо відфільтровані опції */}
                  <CrudsDropdown options={dropdownOptions} />
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
            bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue action:transform active:scale-95 active:duration-75`}
                    onClick={handleLogoutClick} // Використовуємо оновлену функцію
                  >
                    Вийти
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Burger Button */}
          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="ml-auto flex size-[40px] items-center justify-center rounded-[10px] min-lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU MODAL --- */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-2000" onClose={handleClose}>
          {/* The Sliding Panel (from left) */}
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
                      className="p-2 fill-primaryOrange menu-close-icon-container action:transform active:scale-95 active:duration-75"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>

                {/* --- MOBILE NAVIGATION --- */}
                <nav className="flex flex-col gap-[40px] px-6 mb-[40px]">
                  <div className="flex flex-col gap-[24px]">
                    <Link
                      href="/admin"
                      className="text-[18px]/[120%] font-medium"
                      onClick={handleClose}
                    >
                      Інформаційна панель
                    </Link>
                    {/* Рендеримо посилання верхнього рівня */}
                    {topLevelLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-[18px]/[120%] font-medium"
                        onClick={handleClose}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  {/* Cruds Options */}
                  <div>
                    <p className="text-[14px] font-normal text-primaryBlue/80 mb-[12px]">
                      Редагування
                    </p>
                    <div className="flex flex-col gap-[24px]">
                      {/* Рендеримо опції, що залишилися */}
                      {dropdownOptions.map((opt) => (
                        <Link
                          key={opt.name}
                          href={opt.href}
                          className="text-[18px]/[120%] text-primaryBlue font-semibold"
                          onClick={handleClose}
                        >
                          {opt.name}
                        </Link>
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
                        <Link
                          key={opt.name}
                          href={opt.href}
                          className="text-[18px]/[120%] text-primaryBlue font-semibold"
                          onClick={handleClose}
                          target={opt.href !== "/admin" ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                        >
                          {opt.name}
                        </Link>
                      ))}
                      <div className="mt-[24px] w-full">
                        <button
                          className={`max-xs:w-full justify-center application-button border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold 
               bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue`}
                          onClick={handleLogoutClick} // Використовуємо оновлену функцію
                        >
                          Вийти
                        </button>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default AdminHeader;
