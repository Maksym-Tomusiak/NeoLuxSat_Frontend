import SupportPage from "@/components/pages/support/SupportPage";
import { Metadata } from "next";

// All your meta tags go here
export const metadata: Metadata = {
  title: "NeoLuxSat | Підтримка Клієнтів | Допомога, Статус Мережі",
  description:
    "Потрібна допомога? Знайдіть корисні матеріали, перевірте статус мережі або зв'яжіться з нашою технічною підтримкою. Ми завжди на зв'язку.",
  openGraph: {
    type: "article",
    title: "Підтримка Клієнтів | NeoLuxSat",
    description:
      "Потрібна допомога? Знайдіть корисні матеріали, перевірте статус мережі або зв'яжіться з нашою технічною підтримкою.",
    // --- 💡 CORRECTED URLS ---
    url: "https://vash-provider.ua/support",
    images: ["https://vash-provider.ua/images/og-support.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Підтримка Клієнтів | NeoLuxSat",
    description:
      "Потрібна допомога? Знайдіть корисні матеріали, перевірте статус мережі або зв'яжіться з нашою технічною підтримкою.",
    // --- 💡 CORRECTED URL ---
    images: ["https://vash-provider.ua/images/og-support.jpg"],
  },
};

export default function Support() {
  return <SupportPage />;
}
