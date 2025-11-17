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

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const MaptilerStyledTileLayer = dynamic(() => import("./MaptilerTileLayer"), {
  ssr: false,
});

const ContactsSection = () => {
  const [markerIcon, setMarkerIcon] = useState<Icon | null>(null);

  useEffect(() => {
    // You've already imported L, so you can use it directly
    import("leaflet").then((L) => {
      setMarkerIcon(
        new L.Icon({
          // 4. Use the .src property from your imported icon
          iconUrl: "./address-icon-orange.svg",
          iconSize: [32, 32],
        })
      );
    });
  }, []);

  const position: [number, number] = [50.327868073662826, 26.526828402538673];

  const handleGetDirections = () => {
    // Перевіряємо, чи браузер підтримує геолокацію
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (userPosition) => {
          const { latitude, longitude } = userPosition.coords;
          const destination = position; // Координати магазину

          // Формуємо ПРАВИЛЬНИЙ URL для Google Maps
          // Формат: /dir/lat_початку,lng_початку/lat_кінця,lng_кінця
          const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination[0]},${destination[1]}`;

          // Відкриваємо URL у новій вкладці
          window.open(url, "_blank", "noopener,noreferrer");
        },
        (error) => {
          // Обробка помилок (наприклад, користувач не дав дозвіл або сайт на HTTP)
          console.error("Помилка отримання геолокації:", error);
          alert(
            "Не вдалося отримати вашу геолокацію. Будь ласка, перевірте налаштування та надайте дозвіл. (Також переконайтеся, що сайт завантажено через HTTPS)."
          );
        },
        { enableHighAccuracy: true } // Опція для точнішої геолокації
      );
    } else {
      // Якщо геолокація не підтримується
      alert("Геолокація не підтримується вашим браузером.");
    }
  };

  return (
    <section>
      <SectionHeader isCta={false}>
        Де нас <br className="hidden sm:inline" />
        знайти
      </SectionHeader>
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
                <Link href="tel:0957773244" className="font-medium w-fit">
                  095-777-3244
                </Link>
                <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                <Link href="tel:0737376088" className="font-medium">
                  073-737-6088
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit min-w-[290px]">
            <EmailIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Пошта</p>
              <Link href="mailto:luxsatnet@gmail.com" className="font-medium">
                luxsatnet@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex gap-[16px] justify-center fill-primaryOrange">
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
      </div>
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
                <Link href="tel:0957773244" className="font-medium w-fit">
                  095-777-3244
                </Link>
                <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                <Link href="tel:0737376088" className="font-medium">
                  073-737-6088
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <EmailIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Пошта</p>
              <Link href="mailto:luxsatnet@gmail.com" className="font-medium">
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
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
          {markerIcon && (
            <MapContainer
              center={position}
              zoom={15}
              className="w-full h-full rounded-[20px] overflow-hidden"
              scrollWheelZoom={false}
            >
              <MaptilerStyledTileLayer styleId={"dataviz"} />

              <Marker position={position} icon={markerIcon}>
                <Popup>
                  <div className="flex flex-col items-center font-noto gap-2">
                    <span>Наш магазин</span>
                    <button
                      onClick={handleGetDirections}
                      className="px-3 py-3 bg-blue-600 text-primaryWhite rounded-md font-noto text-[14px]/[120%] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Прокласти маршрут
                    </button>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </FadeInFromDirection>
    </section>
  );
};

export default ContactsSection;
