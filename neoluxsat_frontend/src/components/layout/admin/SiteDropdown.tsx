import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import DropdownIcon from '@/assets/svgs/dropdown-icon.svg';

export const getSiteOptions = () => {
  return [
    { name: 'Головна', href: '/' },
    { name: 'Про нас', href: '/about' },
    { name: 'Підтримка', href: '/support' },
    { name: 'Підключення інтернету', href: '/services/internet' },
    { name: 'Системи безпеки', href: '/services/security' },
    { name: 'Налаштування телебачення', href: '/services/tv' },
    { name: 'IoT та M2M', href: '/services/iot' },
  ];
};

const SiteDropdown = () => {
  const options = getSiteOptions(); // Use the new function

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="dropdown inline-flex items-center gap-2 font-normal text-[16px]/[120%]
          focus:outline-none focus:ring-0 whitespace-nowrap navigation-link text-primaryBlue"
      >
        Сайт
        <DropdownIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-2 w-[200px] rounded-md bg-primaryWhite shadow-lg border border-gray-200 z-1002 max-h-[300px] overflow-y-auto">
        {options.map((opt, index) => (
          <DropdownMenuItem
            key={index}
            className="hover:bg-primaryBlue/10 font-normal text-[16px]/[120%] focus:outline-none text-primaryBlue"
          >
            <a
              href={opt.href}
              className="block w-full h-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              {opt.name}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteDropdown;
