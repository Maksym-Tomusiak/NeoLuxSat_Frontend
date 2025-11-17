import TVPage from "@/components/pages/services/TV/TVPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeoLuxSat | Інтерактивне Телебачення (IPTV)",
  description:
    "Сучасне телебачення з сотнями каналів у високій якості. Доступ до архівів, відеотеки фільмів та можливість перегляду на будь-яких пристроях.",
  openGraph: {
    type: "article",
    title: "NeoLuxSat | Інтерактивне Телебачення (IPTV)",
    description:
      "Сотні каналів у високій якості. Доступ до архівів, відеотеки фільмів та перегляд на будь-яких пристроях.",
    url: "https://ostrog.pp.ua/services/tv", // Corrected URL
    images: [
      "https://drive.google.com/file/d/1oVjRIdS538IanST_fOL60XsjVWKEvuhd/view",
    ], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoLuxSat | Інтерактивне Телебачення (IPTV)",
    description:
      "Сотні каналів у високій якості. Доступ до архівів, відеотеки фільмів та перегляд на будь-яких пристроях.",
    images: [
      "https://drive.google.com/file/d/1oVjRIdS538IanST_fOL60XsjVWKEvuhd/view",
    ], // Corrected URL
  },
};

export default function TV() {
  return <TVPage />;
}
