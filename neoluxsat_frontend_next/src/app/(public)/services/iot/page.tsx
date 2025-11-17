import IoTPage from "@/components/pages/services/IoT/IoTPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'NeoLuxSat | Рішення "Розумний Дім" (IoT)',
  description:
    "Керуйте вашим будинком зі смартфона. Інтеграція розумних пристроїв (IoT) для автоматизації освітлення, клімату та безпеки вашого житла.",
  openGraph: {
    type: "article",
    title: 'NeoLuxSat | Рішення "Розумний Дім" (IoT)',
    description:
      "Керуйте вашим будинком зі смартфона. Автоматизація освітлення, клімату та безпеки вашого житла.",
    url: "https://ostrog.pp.ua/services/iot", // Corrected URL
    images: [
      "https://drive.google.com/file/d/1oVjRIdS538IanST_fOL60XsjVWKEvuhd/view",
    ], // Corrected URL
  },
  twitter: {
    card: "summary_large_image",
    title: 'NeoLuxSat | Рішення "Розумний Дім" (IoT)',
    description:
      "Керуйте вашим будинком зі смартфона. Автоматизація освітлення, клімату та безпеки вашого житла.",
    images: [
      "https://drive.google.com/file/d/1oVjRIdS538IanST_fOL60XsjVWKEvuhd/view",
    ], // Corrected URL
  },
};

export default function IoT() {
  return <IoTPage />;
}
