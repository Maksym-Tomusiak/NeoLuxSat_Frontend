import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import DropdownIcon from '@/assets/svgs/dropdown-icon.svg';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  role?: string;
  [key: string]: any;
}

export const getCrudsOptions = () => {
  const finalToken = localStorage.getItem('token');
  const decoded = jwtDecode<JwtPayload>(finalToken!);

  const options = [
    { name: 'Заявки', href: '/admin/applications' },
    { name: 'Часті питання', href: '/admin/faqs' },
    { name: 'Відгуки', href: '/admin/feedbacks' },
    { name: 'Мережеві проблеми', href: '/admin/network' },
    { name: 'Акції', href: '/admin/propositions' },
  ];

  if (decoded.role && decoded.role === 'Admin') {
    options.push({ name: 'Користувачі', href: '/admin/users' });
  }
  return options;
};

const CrudsDropdown = () => {
  const options = getCrudsOptions(); // Use the new function

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
            className="hover:bg-primaryBlue/10 font-normal text-[16px]/[120%] focus:outline-none text-primaryBlue"
          >
            <a href={opt.href} className="block w-full h-full">
              {opt.name}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CrudsDropdown;
