import TVPage from "@/components/pages/services/TV/TVPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інтерактивне Телебачення (IPTV) | NeoLuxSat",
  description:
    "Сучасне телебачення з сотнями каналів у високій якості. Доступ до архівів, відеотеки фільмів та можливість перегляду на будь-яких пристроях.",
  openGraph: {
    type: "article",
    title: "Інтерактивне Телебачення (IPTV) | NeoLuxSat",
    description:
      "Сотні каналів у високій якості. Доступ до архівів, відеотеки фільмів та перегляд на будь-яких пристроях.",
    url: "https://vash-provider.ua/services/tv", // Corrected URL
    images: ["https://vash-provider.ua/images/og-tv.jpg"], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Інтерактивне Телебачення (IPTV) | NeoLuxSat",
    description:
      "Сотні каналів у високій якості. Доступ до архівів, відеотеки фільмів та перегляд на будь-яких пристроях.",
    images: ["https://vash-provider.ua/images/og-tv.jpg"], // Corrected URL
  },
};

export default function TV() {
  return <TVPage />;
}
