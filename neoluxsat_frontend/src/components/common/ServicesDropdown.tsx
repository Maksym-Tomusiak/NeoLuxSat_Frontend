import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import DropdownIcon from '@/assets/svgs/dropdown-icon.svg';

const ServicesDropdown = ({ isWhite = true }) => {
  const services = [
    { name: 'Підключення інтернету', href: '/services/internet' },
    { name: 'Системи безпеки', href: '/services/security' },
    { name: 'Налаштування телебачення', href: '/services/tv' },
    { name: 'IoT та M2M', href: '/services/iot' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          `inline-flex items-center gap-2 font-normal text-[16px]/[120%] py-0
        focus:outline-none focus:ring-0 whitespace-nowrap navigation-link ` +
          (isWhite ? ' text-primaryWhite' : 'text-primaryBlue')
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
              hover:bg-primaryBlue/10 font-normal text-[16px]/[120%] focus:outline-none text-primaryBlue"
          >
            <a href={service.href} className="block w-full h-full">
              {service.name}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServicesDropdown;
