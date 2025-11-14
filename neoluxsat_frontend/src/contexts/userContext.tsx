// src/context/UserContext.tsx

import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '@/services/user.service';

interface JwtPayload {
  exp: number;
  role?: string;
  [key: string]: any;
}

interface UserContextType {
  role: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Починаємо із завантаження

  // Ця функція перевіряє токен при завантаженні сторінки
  const validateTokenOnLoad = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    if (!token) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    try {
      let tokenToDecode = token;
      const decoded = jwtDecode<JwtPayload>(token);

      // 1. Перевіряємо, чи токен прострочений
      if (decoded.exp * 1000 < Date.now()) {
        // 2. Намагаємося оновити
        const newToken = await UserService.refreshUserToken();
        if (newToken) {
          localStorage.setItem('token', newToken); // Зберігаємо новий токен
          tokenToDecode = newToken;
        } else {
          // Оновити не вдалося
          throw new Error('Refresh failed');
        }
      }

      // 3. Декодуємо дійсний токен (старий або новий)
      const finalDecoded = jwtDecode<JwtPayload>(tokenToDecode);
      setRole(finalDecoded.role || null);
    } catch (e) {
      // Будь-яка помилка (декодування, оновлення) = вихід
      console.log(e);
      localStorage.removeItem('token');
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateTokenOnLoad();
  }, []);

  // Функція для входу
  const login = (token: string) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setRole(decoded.role || null);
    } catch {
      setRole(null);
    }
  };

  // Функція для виходу
  const logout = () => {
    localStorage.removeItem('token');
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ role, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для легкого доступу до контексту
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
