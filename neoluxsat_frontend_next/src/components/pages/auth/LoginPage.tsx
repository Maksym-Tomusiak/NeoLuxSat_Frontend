"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserService } from "@/services/user.service";
import { useUser } from "@/contexts/userContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await UserService.loginUser({ username, password });
      const { accessToken } = response;

      login(accessToken);

      const returnUrl = searchParams.get("returnUrl") || "/admin";

      router.replace(returnUrl);
    } catch (err: any) {
      console.error(err);
      setError("Невірне ім’я користувача або пароль");
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
            {loading ? "Вхід..." : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
