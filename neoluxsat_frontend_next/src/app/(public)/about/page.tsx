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
    url: "https://ostrog.pp.ua/about", // Corrected URL
    images: [
      "https://drive.google.com/file/d/1oVjRIdS538IanST_fOL60XsjVWKEvuhd/view",
    ], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoLuxSat | Наша Місія та Команда",
    description:
      "Дізнайтеся про нашу місію, цінності та команду, що стоїть за NeoLuxSat.",
    images: [
      "https://drive.google.com/file/d/1oVjRIdS538IanST_fOL60XsjVWKEvuhd/view",
    ], // Corrected URL
  },
};

export default function About() {
  return <AboutPage />;
}
