import { Suspense } from "react";
import LoginPage from "@/components/pages/auth/LoginPage";

export default function Login() {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginPage />
    </Suspense>
  );
}
