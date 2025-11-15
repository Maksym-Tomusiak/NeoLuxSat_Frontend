import AboutPage from "@/components/pages/about/AboutPage";
import { Metadata } from "next";

// 1. Move all your meta tags HERE
export const metadata: Metadata = {
  title: "NeoLuxSat | Наша Місія та Команда",
  description:
    "Дізнайтеся більше про NeoLuxSat. Наша місія — надавати якісні та інноваційні телеком-послуги. Знайомтеся з нашою історією, цінностями та командою.",
  openGraph: {
    type: "article",
    title: "NeoLuxSat | Наша Місія та Команда",
    description:
      "Дізнайтеся про нашу місію, цінності та команду, що стоїть за NeoLuxSat.",
    url: "https://vash-provider.ua/about", // Corrected URL
    images: ["https://vash-provider.ua/images/og-about.jpg"], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoLuxSat | Наша Місія та Команда",
    description:
      "Дізнайтеся про нашу місію, цінності та команду, що стоїть за NeoLuxSat.",
    images: ["https://vash-provider.ua/images/og-about.jpg"], // Corrected URL
  },
};

export default function About() {
  return <AboutPage />;
}
