import TelegramIcon from '@/assets/svgs/contacts/telegram-icon.svg';
import ViberIcon from '@/assets/svgs/contacts/viber-icon.svg';
import FacebookIcon from '@/assets/svgs/contacts/facebook-icon.svg';
import AddressIcon from '@/assets/svgs/contacts/address-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import EmailIcon from '@/assets/svgs/contacts/email-icon.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const ContactsSection = () => {
  const markerIcon = new L.Icon({
    iconUrl: '../src/assets/svgs/contacts/address-icon-orange.svg',
    iconSize: [32, 32],
  });

  const position: [number, number] = [50.328053775515706, 26.526811168369054];

  return (
    <section>
      <h2 className="font-manrone text-primaryBlue/20 text-[88px]/[90%] font-semibold tracking-[-2px] max-w-[500px]">
        Де нас знайти
      </h2>
      <div className="flex justify-end font-noto mb-[56px]">
        <div className="flex flex-wrap items-center gap-x-[59px] gap-y-[32px] h-[175px] w-[680px] text-primaryBlue fill-primaryBlue">
          <div className="flex gap-[12px] items-center w-fit">
            <AddressIcon />
            <div className="flex flex-col">
              <p className="font-normal text-primaryBlue/80">Адреса</p>
              <p className="font-medium">вул. Лесі Українки, Острог</p>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <PhoneIcon />
            <div className="flex flex-col">
              <p className="font-normal text-primaryBlue/80">Номер телефону</p>
              <p className="font-medium">093-777-3244</p>
            </div>
          </div>
          <div className="flex gap-[12px] items-center w-fit">
            <EmailIcon />
            <div className="flex flex-col">
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
      <div className="w-full h-[500px]">
        <MapContainer
          center={position}
          zoom={15}
          className="w-full h-full rounded-[20px] overflow-hidden"
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>Наш магазин</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactsSection;
