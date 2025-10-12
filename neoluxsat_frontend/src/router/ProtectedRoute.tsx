import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@/services/user.service';

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

  if (!authorized) {
    return <h1>Unauthorized</h1>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
