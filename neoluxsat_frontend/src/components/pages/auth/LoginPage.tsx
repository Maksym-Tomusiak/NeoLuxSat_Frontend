import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserService } from '@/services/user.service';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await UserService.loginUser({ username, password });
      const { accessToken } = response;

      localStorage.setItem('token', accessToken);

      // Redirect to returnUrl or /admin
      const params = new URLSearchParams(location.search);
      const returnUrl = params.get('returnUrl') || '/admin';
      navigate(returnUrl, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError('Невірне ім’я користувача або пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[350px]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primaryBlue">
          Вхід до панелі адміністратора
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ім’я користувача"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryBlue"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryBlue"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-primaryBlue text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
