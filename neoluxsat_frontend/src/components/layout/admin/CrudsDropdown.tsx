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

// This function STAYS THE SAME, as AdminHeader uses it
export const getCrudsOptions = () => {
  const finalToken = localStorage.getItem('token');
  const decoded = jwtDecode<JwtPayload>(finalToken!);

  const options = [
    { name: 'Заявки', href: '/admin/applications' },
    { name: 'Часті питання', href: '/admin/faqs' },
    { name: 'Відгуки', href: '/admin/feedbacks' },
    { name: 'Мережеві проблеми', href: '/admin/network' },
    { name: 'Акції', href: '/admin/propositions' },
    { name: 'Ремонти', href: '/admin/repairs' },
  ];

  if (decoded.role && decoded.role === 'Admin') {
    options.push({ name: 'Користувачі', href: '/admin/users' });
  }
  return options;
};

// 💡 --- COMPONENT UPDATED --- 💡
// It now accepts 'options' as a prop
const CrudsDropdown = ({
  options,
}: {
  options: { name: string; href: string }[];
}) => {
  // If there are no options left (e.g., if only 'Заявки' and 'Ремонти' existed),
  // don't render the dropdown at all.
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
        {/* It now maps over the 'options' prop */}
        {options.map((opt, index) => (
          <DropdownMenuItem
            key={index}
            className="hover:text-primaryOrange font-normal text-[16px]/[120%] focus:outline-none text-primaryBlue"
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
