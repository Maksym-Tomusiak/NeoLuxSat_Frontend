import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@/services/user.service';
import { Ban } from 'lucide-react'; // <-- ADDED: Lucide icon import

interface JwtPayload {
  exp: number;
  role?: string;
  [key: string]: any;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  const validateAccess = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirectToLogin();
      return;
    }

    // Check if expired
    if (isTokenExpired(token)) {
      try {
        const newToken = await UserService.refreshUserToken();
        if (!newToken) {
          redirectToLogin();
          return;
        }
      } catch {
        redirectToLogin();
        return;
      }
    }

    // Re-check after refresh
    const finalToken = localStorage.getItem('token');
    const decoded = jwtDecode<JwtPayload>(finalToken!);

    if (decoded.role && allowedRoles.includes(decoded.role)) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  };

  const redirectToLogin = () => {
    //localStorage.removeItem('token');
    const returnUrl = encodeURIComponent(location.pathname);
    navigate(`/login?returnUrl=${returnUrl}`);
  };

  useEffect(() => {
    validateAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (authorized === null) {
    return null; // optionally show loader
  }

  // --- MODIFIED SECTION START ---
  if (!authorized) {
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
  // --- MODIFIED SECTION END ---

  return <>{children}</>;
};

export default ProtectedRoute;
