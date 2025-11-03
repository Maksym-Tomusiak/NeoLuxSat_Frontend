import TelegramIcon from '@/assets/svgs/contacts/telegram-icon.svg';
import ViberIcon from '@/assets/svgs/contacts/viber-icon.svg';
import FacebookIcon from '@/assets/svgs/contacts/facebook-icon.svg';
import AddressIcon from '@/assets/svgs/contacts/address-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import EmailIcon from '@/assets/svgs/contacts/email-icon.svg';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import SectionHeader from '@/components/common/SectionHeader';
import MaptilerStyledTileLayer from './MaptilerTileLayer';
import iconUrl from '@/assets/svgs/contacts/address-icon-orange.svg?url';

const ContactsSection = () => {
  const markerIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
  });

  const position: [number, number] = [50.327868073662826, 26.526828402538673];

  const handleGetDirections = () => {
    // Перевіряємо, чи браузер підтримує геолокацію
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (userPosition) => {
          const { latitude, longitude } = userPosition.coords;
          const destination = position; // Координати магазину

          // Формуємо URL для Google Maps
          // Формат: /dir/lat_початку,lng_початку/lat_кінця,lng_кінця
          const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination[0]},${destination[1]}`;

          // Відкриваємо URL у новій вкладці
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        (error) => {
          // Обробка помилок (наприклад, користувач не дав дозвіл)
          console.error('Помилка отримання геолокації:', error);
          alert(
            'Не вдалося отримати вашу геолокацію. Будь ласка, перевірте налаштування та надайте дозвіл.'
          );
        },
        { enableHighAccuracy: true } // Опція для точнішої геолокації
      );
    } else {
      // Якщо геолокація не підтримується
      alert('Геолокація не підтримується вашим браузером.');
    }
  };

  return (
    <section>
      <SectionHeader isCta={false}>
        Де нас <br className="hidden lg:inline" />
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
              <p className="font-medium">093-777-3244</p>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit min-w-[290px]">
            <EmailIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Пошта</p>
              <p className="font-medium">neoluxsat@example.com</p>
            </div>
          </div>
          <div className="flex gap-[24px] justify-center fill-primaryOrange">
            <TelegramIcon />
            <ViberIcon />
            <FacebookIcon />
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
              <p className="font-medium">093-777-3244</p>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <EmailIcon />
            <div className="flex flex-col gap-[8px]">
              <p className="font-normal text-primaryBlue/80">Пошта</p>
              <p className="font-medium">neoluxsat@example.com</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] justify-center fill-primaryOrange">
          <TelegramIcon />
          <ViberIcon />
          <FacebookIcon />
        </div>
      </div>
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <MapContainer
          center={position}
          zoom={15}
          className="w-full h-full rounded-[20px] overflow-hidden"
          scrollWheelZoom={false}
        >
          <MaptilerStyledTileLayer styleId={'dataviz'} />

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
      </div>
    </section>
  );
};

export default ContactsSection;
