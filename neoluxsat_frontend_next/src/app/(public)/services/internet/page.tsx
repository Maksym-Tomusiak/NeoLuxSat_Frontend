import InternetPage from "@/components/pages/services/Internet/InternetPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оптоволоконний Інтернет | Швидкісні Тарифи від NeoLuxSat",
  description:
    "Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Пропонуємо стабільне з'єднання та вигідні тарифи для дому та офісу.",
  openGraph: {
    type: "article",
    title: "Оптоволоконний Інтернет | NeoLuxSat",
    description:
      "Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Стабільне з'єднання та вигідні тарифи.",
    url: "https://vash-provider.ua/services/internet", // Corrected URL
    images: ["https://vash-provider.ua/images/og-internet.jpg"], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Оптоволоконний Інтернет | NeoLuxSat",
    description:
      "Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Стабільне з'єднання та вигідні тарифи.",
    images: ["https://vash-provider.ua/images/og-internet.jpg"], // Corrected URL
  },
};

export default function Internet() {
  return <InternetPage />;
}
