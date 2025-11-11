import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { useUser } from '@/contexts/userContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { role, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Поки контекст перевіряє токен, нічого не показуємо
  if (isLoading) {
    return null; // Або покажіть глобальний <Loader />
  }

  // 2. Якщо завантаження завершено і ролі немає = не ввійшов
  if (!role) {
    const returnUrl = encodeURIComponent(location.pathname);
    navigate(`/login?returnUrl=${returnUrl}`);
    return null; // Повертаємо null під час перенаправлення
  }

  // 3. Якщо роль є, але не входить до списку дозволених
  if (!allowedRoles.includes(role)) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-[16px]">
        <Ban className="w-[64px] h-[64px] text-iconsRed" />
        <div className="flex flex-col gap-[12px] justify-center items-center">
          <h1 className="font-manrope text-[24px]/[120%] font-semibold text-primaryBlue">
            Access Denied
          </h1>
          <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryBlue/80">
            You do not have permission to view this page.
          </p>
        </div>
        <button
          className="bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold "
          onClick={() => navigate('/admin')}
        >
          Go to Main Page
        </button>
      </div>
    );
  }

  // 4. Якщо все гаразд (завантаження завершено, роль є, роль дозволена)
  return <>{children}</>;
};

export default ProtectedRoute;
