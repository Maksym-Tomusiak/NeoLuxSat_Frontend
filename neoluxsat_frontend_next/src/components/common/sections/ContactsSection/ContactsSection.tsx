"use client";

import dynamic from "next/dynamic";
import { type Icon } from "leaflet";
import { useState, useEffect } from "react";
import SectionHeader from "@/components/common/SectionHeader";

import TelegramIcon from "@/assets/svgs/contacts/telegram-icon.svg?component";
import ViberIcon from "@/assets/svgs/contacts/viber-icon.svg?component";
import WhatsappIcon from "@/assets/svgs/contacts/whatsapp-icon.svg?component";
import FacebookIcon from "@/assets/svgs/contacts/facebook-icon.svg?component";
import AddressIcon from "@/assets/svgs/contacts/address-icon.svg?component";
import PhoneIcon from "@/assets/svgs/contacts/phone-icon.svg?component";
import EmailIcon from "@/assets/svgs/contacts/email-icon.svg?component";
import Link from "next/link";
import FadeInFromDirection from "../../animations/FadeInFromDirection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);
const MaptilerStyledTileLayer = dynamic(() => import("./MaptilerTileLayer"), {
  ssr: false,
});

const ContactsSection = () => {
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      setMarkerIcon(
        new L.Icon({
          iconUrl: "./address-icon-orange.svg",
          iconSize: [32, 32],
        })
      );
    });
  }, []);

  const position: [number, number] = [50.327868073662826, 26.526828402538673];

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (userPosition) => {
          const { latitude, longitude } = userPosition.coords;
          const destination = position;
          const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination[0]},${destination[1]}`;
          window.open(url, "_blank", "noopener,noreferrer");
        },
        (error) => {
          console.error("Помилка отримання геолокації:", error);
          alert(
            "Не вдалося отримати вашу геолокацію. Будь ласка, перевірте налаштування та надайте дозвіл."
          );
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Геолокація не підтримується вашим браузером.");
    }
  };

  return (
    <section>
      <SectionHeader isCta={false}>
        Де нас <br className="hidden sm:inline" />
        знайти
      </SectionHeader>

      {/* Desktop Contact Info */}
      <div className="hidden sm:flex justify-end max-lg:mt-[40px] font-noto mb-[24px] lg:mb-[56px]">
        <div className="flex flex-wrap items-center gap-x-[59px] lg:gap-y-[32px] h-[175px] w-[680px] text-primaryBlue fill-primaryBlue">
          <div className="flex gap-[12px] items-center w-fit min-w-[290px]">
            <AddressIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Адреса</p>
              <p className="font-medium">
                вул. Лесі Українки, <br />
                Острог
              </p>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <PhoneIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Номер телефону</p>
              <div className="flex flex-col gap-[4px] w-fit">
                <Link
                  href="tel:0957773244"
                  className="font-medium w-fit hover:text-primaryOrange transition-colors duration-150"
                >
                  095-777-3244
                </Link>
                <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                <Link
                  href="tel:0737376088"
                  className="font-medium hover:text-primaryOrange transition-colors duration-150"
                >
                  073-737-6088
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit min-w-[290px]">
            <EmailIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Пошта</p>
              <Link
                href="mailto:luxsatnet@gmail.com"
                className="font-medium hover:text-primaryOrange transition-colors duration-150"
              >
                luxsatnet@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex gap-[16px] justify-center fill-primaryOrange">
            <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
              <Link href="https://t.me/+380957773244" target="_blank">
                <TelegramIcon />
              </Link>
            </div>
            <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
              <Link href="viber://chat?number=%2B380957773244">
                <ViberIcon />
              </Link>
            </div>
            <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
              <Link
                href="https://wa.me/380957773244"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon />
              </Link>
            </div>
            <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out action:transform active:scale-95 active:duration-75">
              <Link
                href="https://www.facebook.com/profile.php?id=100066785902681"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Contact Info */}
      <div className="sm:hidden flex justify-between max-lg:mt-[40px] font-noto mb-[24px] lg:mb-[56px]">
        <div className="flex flex-col items-start gap-[16px] text-primaryBlue fill-primaryBlue">
          <div className="flex gap-[12px] items-center w-fit">
            <AddressIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Адреса</p>
              <p className="font-medium">
                вул. Лесі Українки, <br />
                Острог
              </p>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <PhoneIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Номер телефону</p>
              <div className="flex flex-col gap-[4px] w-fit">
                <Link
                  href="tel:0957773244"
                  className="font-medium w-fit hover:text-primaryOrange transition-colors duration-150"
                >
                  095-777-3244
                </Link>
                <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                <Link
                  href="tel:0737376088"
                  className="font-medium hover:text-primaryOrange transition-colors duration-150"
                >
                  073-737-6088
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <EmailIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Пошта</p>
              <Link
                href="mailto:luxsatnet@gmail.com"
                className="font-medium hover:text-primaryOrange transition-colors duration-150"
              >
                luxsatnet@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] justify-between fill-primaryOrange">
          <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
            <Link href="https://t.me/+380957773244" target="_blank">
              <TelegramIcon />
            </Link>
          </div>
          <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
            <Link href="viber://chat?number=%2B380957773244">
              <ViberIcon />
            </Link>
          </div>
          <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
            <Link
              href="https://wa.me/380957773244"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon />
            </Link>
          </div>
          <div className="fill-primaryOrange hover:fill-primaryOrange/60 transition-all duration-150 ease-in-out">
            <Link
              href="https://www.facebook.com/profile.php?id=100066785902681"
              target="_blank"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>

      <FadeInFromDirection direction="fade" duration={1}>
        {/* Map Container - always visible */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[20px] overflow-hidden">
          {/* Desktop: Static Overlay (md and up) */}
          <div className="hidden md:block absolute top-[24px] left-[24px] z-[1000] bg-primaryWhite rounded-[20px] map-ovelay-shadow">
            <div className="flex flex-col items-start text-primaryBlue font-noto gap-[24px] p-[16px] max-w-[70vw] sm:max-w-[340px]">
              <div className="flex gap-[12px] flex-col w-full bg-p">
                <p className="font-medium text-[16px]/[120%] tracking-[-0.32px]">
                  Наш магазин
                </p>
                <p className="text-primaryBlue/80 text-[16px]/[120%] tracking-[-0.32px] max-w-full">
                  Перегляньте маршрут та відвідайте нас.
                </p>
              </div>
              <button
                onClick={handleGetDirections}
                className="px-[18px] py-[14px] flex items-center justify-center text-[16px]/[120%] tracking-[-0.32px] w-full max-h-[40px]
                border-[1.4px] border-primaryOrange text-primaryBlue bg-primaryWhite
                bg-primaryOrange rounded-[10px] hover:border-primaryBlue transition duration-300 ease-in-out cursor-pointer
                active:scale-95 active:duration-75"
              >
                Прокласти маршрут
              </button>
            </div>
          </div>

          {/* Mobile/Tablet: Accordion Overlay (below md) */}
          <div className="md:hidden absolute top-[16px] left-[16px] md:top-[24px] md:left-[24px] z-[1000] bg-primaryWhite rounded-[20px] map-ovelay-shadow ">
            <Accordion
              type="single"
              collapsible
              className="w-full min-w-[70vw] max-w-[70vw] xs:min-w-[340px] sm:max-w-[340px]"
            >
              <AccordionItem value="map-routing" className="border-none">
                <AccordionTrigger className="text-primaryBlue font-noto hover:no-underline p-[16px] min-h-fit items-center [&[data-state=open]]:text-primaryBlue/80">
                  <div className="flex flex-col w-full">
                    <p className="font-medium text-[16px]/[120%] tracking-[-0.32px]">
                      Наш магазин
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-[16px] pb-[16px] min-w-[70vw] max-w-[70vw] xs:min-w-[340px] sm:max-w-[340px]">
                  <div className="flex flex-col gap-[12px]">
                    <p className="text-primaryBlue/80 text-[16px]/[120%] tracking-[-0.32px] max-w-full">
                      Перегляньте маршрут та відвідайте нас.
                    </p>
                    <button
                      onClick={handleGetDirections}
                      className="px-[18px] py-[14px] flex items-center justify-center text-[16px]/[120%] tracking-[-0.32px] w-full max-h-[40px]
                    border-[1.4px] border-primaryOrange text-primaryBlue bg-primaryWhite
                    bg-primaryOrange rounded-[10px] hover:border-primaryBlue transition duration-300 ease-in-out cursor-pointer
                    active:scale-95 active:duration-75"
                    >
                      Прокласти маршрут
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Map - always rendered */}
          {markerIcon && (
            <MapContainer
              center={position}
              zoom={15}
              className="w-full h-full"
              scrollWheelZoom={false}
              zoomControl={false}
            >
              <MaptilerStyledTileLayer styleId={"dataviz"} />
              <ZoomControl position="topright" />
              <Marker position={position} icon={markerIcon} />
            </MapContainer>
          )}
        </div>
      </FadeInFromDirection>
    </section>
  );
};

export default ContactsSection;
