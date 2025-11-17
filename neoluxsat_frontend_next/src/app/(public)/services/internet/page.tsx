import InternetPage from "@/components/pages/services/Internet/InternetPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeoLuxSat | Оптоволоконний Інтернет | Швидкісні Тарифи від NeoLuxSat",
  description:
    "Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Пропонуємо стабільне з'єднання та вигідні тарифи для дому та офісу.",
  openGraph: {
    type: "article",
    title: "NeoLuxSat | Оптоволоконний Інтернет",
    description:
      "Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Стабільне з'єднання та вигідні тарифи.",
    url: "https://ostrog.pp.ua/services/internet", // Corrected URL
    images: ["https://ostrog.pp.ua/images/neoluxsat.png"], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoLuxSat | Оптоволоконний Інтернет | NeoLuxSat",
    description:
      "Підключіть швидкісний оптоволоконний інтернет до 1 Гбіт/с. Стабільне з'єднання та вигідні тарифи.",
    images: ["https://ostrog.pp.ua/images/neoluxsat.png"], // Corrected URL
  },
};

export default function Internet() {
  return <InternetPage />;
}
