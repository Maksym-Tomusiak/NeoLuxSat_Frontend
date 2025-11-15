import LoginPage from "@/components/pages/auth/LoginPage";
import { Metadata } from "next";

// You can still export metadata from a 'page.tsx' file
// that renders a client component.
export const metadata: Metadata = {
  title: "Вхід | NeoLuxSat",
};

export default function Login() {
  return <LoginPage />;
}
