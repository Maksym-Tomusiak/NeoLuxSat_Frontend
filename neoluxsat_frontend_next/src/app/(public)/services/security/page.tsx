import SecurityPage from "@/components/pages/services/Security/SecurityPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Системи Безпеки та Відеонагляд | NeoLuxSat",
  description:
    "Захистіть свій дім та бізнес. Пропонуємо встановлення сучасних систем безпеки, датчиків Ajax та професійного відеонагляду з доступом 24/7.",
  openGraph: {
    type: "article",
    title: "Системи Безпеки та Відеонагляд | NeoLuxSat",
    description:
      "Захистіть свій дім та бізнес. Встановлення систем Ajax та професійного відеонагляду з доступом 24/7.",
    url: "https://vash-provider.ua/services/security", // Corrected URL
    images: ["https://vash-provider.ua/images/og-security.jpg"], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Системи Безпеки та Відеонагляд | NeoLuxSat",
    description:
      "Захистіть свій дім та бізнес. Встановлення систем Ajax та професійного відеонагляду з доступом 24/7.",
    images: ["https://vash-provider.ua/images/og-security.jpg"], // Corrected URL
  },
};

export default function Security() {
  return <SecurityPage />;
}
