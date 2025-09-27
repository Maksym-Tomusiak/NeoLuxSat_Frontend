import Logo from '@/assets/svgs/logos/logo-neoluxsat-footer.svg';
import TelegramIcon from '@/assets/svgs/contacts/telegram-icon.svg';
import ViberIcon from '@/assets/svgs/contacts/viber-icon.svg';
import FacebookIcon from '@/assets/svgs/contacts/facebook-icon.svg';
import AddressIcon from '@/assets/svgs/contacts/address-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import EmailIcon from '@/assets/svgs/contacts/email-icon.svg';
import ServicesDropdown from '../common/ServicesDropdown';

const Footer = () => {
  return (
    <div className="mb-[24px] left-[30px] right-[30px] h-[680px] bg-primaryBlue max-w-[1380px] rounded-[20px] mx-auto px-[30px] py-[24px] flex flex-col justify-between">
      <div className="flex justify-between text-primaryWhite pt-[100px] font-noto">
        <ul className="flex flex-col flex-1 gap-[24px] text-[16px] font-normal pl-[80px]">
          <li>
            <a href="/" className="navigation-link">
              Головна
            </a>
          </li>
          <li>
            <a href="/about" className="navigation-link">
              Про нас
            </a>
          </li>
          <li>
            <a href="/support" className="navigation-link">
              Підтримка
            </a>
          </li>
          <li>
            <ServicesDropdown isWhite={true} />
          </li>
        </ul>
        <div className="flex flex-col flex-1 gap-[24px] text-center text-[16px]/[120%] font-normal">
          <p>
            Ми завжди поруч — <br />у месенджерах та соцмережах
          </p>
          <div className="flex gap-[24px] justify-center fill-primaryWhite">
            <TelegramIcon />
            <ViberIcon />
            <FacebookIcon />
          </div>
        </div>
        <div className="flex flex-1 justify-end pr-[80px] fill-primaryWhite/80">
          <div className="flex flex-col w-fit gap-[24px] text-[16px]/[120%] text-left">
            <div className="flex gap-[12px] items-center w-fit">
              <AddressIcon />
              <div className="flex flex-col">
                <p className="font-normal text-primaryWhite/80">Адреса</p>
                <p className="font-medium">вул. Лесі Українки, Острог</p>
              </div>
            </div>
            <div className="flex gap-[12px] items-center w-fit">
              <PhoneIcon />
              <div className="flex flex-col">
                <p className="font-normal text-primaryWhite/80">
                  Номер телефону
                </p>
                <a href="tel:0937773244" className="font-medium">
                  093-777-3244
                </a>
              </div>
            </div>
            <div className="flex gap-[12px] items-center w-fit">
              <EmailIcon />
              <div className="flex flex-col">
                <p className="font-normal text-primaryWhite/80">Пошта</p>
                <a href="mailto:neoluxsat@example.com" className="font-medium">
                  neoluxsat@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
};

export default Footer;
