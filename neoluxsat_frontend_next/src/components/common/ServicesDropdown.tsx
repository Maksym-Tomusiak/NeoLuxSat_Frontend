"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import DropdownIcon from "@/assets/svgs/dropdown-icon.svg?component";
import Link from "next/link";

const ServicesDropdown = ({ isWhite = true }) => {
  const services = [
    { name: "Підключення інтернету", href: "/services/internet" },
    { name: "Системи безпеки", href: "/services/security" },
    { name: "Налаштування телебачення", href: "/services/tv" },
    { name: "IoT та M2M", href: "/services/iot" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          `dropdown inline-flex items-center gap-2 font-normal text-[16px] 
          focus:outline-none focus:ring-0 whitespace-nowrap navigation-link cursor-pointer ` +
          (isWhite ? " text-primaryWhite" : "text-primaryBlue")
        }
      >
        Послуги
        <DropdownIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-[200px] rounded-md bg-primaryWhite shadow-lg border border-gray-200 z-1002 max-h-[300px] overflow-y-auto">
        {services.map((service, index) => (
          <DropdownMenuItem
            key={index}
            className="
      hover:bg-primaryBlue/10 font-normal text-[16px]/[120%] focus:outline-none text-primaryBlue hover:text-primaryOrange cursor-pointer"
            asChild // <-- 1. Add this prop
          >
            {/* 2. Remove the className from the Link. It's not needed. */}
            <Link href={service.href}>{service.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServicesDropdown;
