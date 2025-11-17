import SecurityPage from "@/components/pages/services/Security/SecurityPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeoLuxSat | Системи Безпеки та Відеонагляд",
  description:
    "Захистіть свій дім та бізнес. Пропонуємо встановлення сучасних систем безпеки, датчиків Ajax та професійного відеонагляду з доступом 24/7.",
  openGraph: {
    type: "article",
    title: "NeoLuxSat | Системи Безпеки та Відеонагляд",
    description:
      "Захистіть свій дім та бізнес. Встановлення систем Ajax та професійного відеонагляду з доступом 24/7.",
    url: "https://ostrog.pp.ua/services/security", // Corrected URL
    images: ["https://ostrog.pp.ua/images/neoluxsat.png"], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoLuxSat | Системи Безпеки та Відеонагляд",
    description:
      "Захистіть свій дім та бізнес. Встановлення систем Ajax та професійного відеонагляду з доступом 24/7.",
    images: ["https://ostrog.pp.ua/images/neoluxsat.png"], // Corrected URL
  },
};

export default function Security() {
  return <SecurityPage />;
}
