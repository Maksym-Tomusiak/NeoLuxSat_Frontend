import HomePage from "@/components/pages/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeoLuxSat | Інтернет, ТБ та Системи Безпеки",
  description: "Підключіть надійний оптоволоконний інтернет...",
  openGraph: {
    title: "NeoLuxSat | Інтернет, ТБ та Системи Безпеки",
    description: "Надійний інтернет, ТБ та системи безпеки.",
    url: "https://ostrog.pp.ua/", // Use your real URL
    images: ["https://ostrog.pp.ua/images/neoluxsat.png"], // Use your real URL
  },
};

export default function Home() {
  return <HomePage />;
}
