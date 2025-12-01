import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import DropdownIcon from "@/assets/svgs/dropdown-icon.svg?component";
import Link from "next/link";

/**
 * Оновлена функція для генерації опцій CRUD на основі ролі.
 * @param role - Поточна роль користувача (наприклад, 'Admin', 'HeadManager', 'Manager', 'Master')
 */
export const getCrudsOptions = (role: string | null) => {
  const options = [];

  // Якщо роль не визначена, повертаємо порожній масив
  if (!role) {
    return [];
  }

  // --- Доступ для Admin та HeadManager ---
  // (Редагування статичного змісту сайту)
  if (role === "Admin" || role === "HeadManager") {
    options.push(
      { name: "Часті питання", href: "/admin/faqs" },
      { name: "Відгуки", href: "/admin/feedbacks" },
      { name: "Мережеві проблеми", href: "/admin/network" },
      { name: "Акції", href: "/admin/propositions" }
    );
  }

  if (
    role === "Admin" ||
    role === "HeadManager" ||
    role === "Manager" ||
    role === "Master"
  ) {
    options.push({ name: "Заявки", href: "/admin/applications" });
  }

  options.push({ name: "Ремонти", href: "/admin/repairs" });

  if (role === "Admin") {
    options.push({ name: "Користувачі", href: "/admin/users" });
  }

  options.sort((a, b) => a.name.localeCompare(b.name));

  return options;
};

// --- Компонент CrudsDropdown ---
// (Залишається без змін, приймає 'options' як пропс)

interface CrudsDropdownProps {
  options: { name: string; href: string }[];
}

const CrudsDropdown: React.FC<CrudsDropdownProps> = ({ options }) => {
  // Не рендеримо дропдаун, якщо немає жодної опції
  if (options.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="dropdown inline-flex items-center gap-2 font-normal text-[16px]/[120%]
      focus:outline-none focus:ring-0 whitespace-nowrap navigation-link text-primaryBlue"
      >
        Редагування
        <DropdownIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-[200px] rounded-md bg-primaryWhite shadow-lg border border-gray-200 z-1002 max-h-[300px] overflow-y-auto">
        {options.map((opt, index) => (
          <DropdownMenuItem
            key={index}
            className="hover:text-primaryOrange font-normal text-[16px]/[120%] focus:outline-none text-primaryBlue cursor-pointer"
            asChild
          >
            <Link href={opt.href}>{opt.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CrudsDropdown;
