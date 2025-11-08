import Logo from '@/assets/svgs/logos/logo-neoluxsat-footer.svg';
import TelegramIcon from '@/assets/svgs/contacts/telegram-icon.svg';
import ViberIcon from '@/assets/svgs/contacts/viber-icon.svg';
import WhatsappIcon from '@/assets/svgs/contacts/whatsapp-icon.svg';
import FacebookIcon from '@/assets/svgs/contacts/facebook-icon.svg';
import AddressIcon from '@/assets/svgs/contacts/address-icon.svg';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import EmailIcon from '@/assets/svgs/contacts/email-icon.svg';
import ServicesDropdown from '../../common/ServicesDropdown';

const Footer = () => {
  return (
    <div className="h-[fit] xs:h-[600px] xl:h-[640px] max-md:mx-[16px] max-[1440px]:mx-[30px] bg-primaryBlue max-w-[1380px] rounded-[20px] mx-auto px-[30px] py-[24px] flex flex-col justify-between mb-[16px] md:mb-[24px] blue-gradient-bg">
      {/* Wrapper that switches direction */}
      <div className="flex flex-col md:flex-row justify-between text-primaryWhite pt-[40px] md:pt-[100px] font-noto gap-[40px] md:gap-0">
        {/* Messengers: first on mobile, middle on desktop */}
        <div className="flex flex-col gap-[24px] text-center text-[16px]/[120%] font-normal order-1 md:order-2 flex-1">
          <p>
            Ми завжди поруч — <br />у месенджерах та соцмережах
          </p>
          <div className="flex gap-[24px] justify-center">
            <div className="fill-primaryWhite hover:fill-primaryOrange transition-all duration-150 ease-in-out">
              <a
                href="https://t.me/+380957773244  hover:fill-primaryOrange"
                target="_blank"
              >
                <TelegramIcon />
              </a>
            </div>
            <div className="fill-primaryWhite hover:fill-primaryOrange transition-all duration-150 ease-in-out">
              <a href="viber://chat?number=%2B380957773244">
                <ViberIcon />
              </a>
            </div>
            <div className="fill-primaryWhite hover:fill-primaryOrange transition-all duration-150 ease-in-out">
              <a
                href="https://wa.me/380957773244"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon />
              </a>
            </div>
            <div className="fill-primaryWhite hover:fill-primaryOrange transition-all duration-150 ease-in-out">
              <a
                href="https://www.facebook.com/profile.php?id=61569885994545"
                target="_blank"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Navigation: horizontal on mobile, left column on desktop */}
        <ul className="flex flex-row flex-wrap md:flex-col justify-center md:justify-start flex-1 gap-[24px] text-[16px] font-normal order-2 md:order-1 pl-[0px] lg:pl-[40px] xl:pl-[80px]">
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

        {/* Contacts: last on mobile, right column on desktop */}
        <div className="flex justify-center md:justify-end flex-1 pr-[0px] lg:pr-[40px] xl:pr-[80px] fill-primaryWhite/80 order-3 md:order-3">
          <div className="flex flex-col w-fit gap-[24px] text-[16px]/[120%] text-left">
            <div className="flex gap-[12px] items-center w-fit">
              <AddressIcon />
              <div className="flex flex-col gap-[8px]">
                <p className="font-normal text-primaryWhite/80">Адреса</p>
                <p className="font-medium">вул. Лесі Українки, Острог</p>
              </div>
            </div>
            <div className="flex gap-[12px] items-center w-fit">
              <PhoneIcon />
              <div className="flex flex-col gap-[8px]">
                <p className="font-normal text-primaryWhite/80">
                  Номер телефону
                </p>
                <div className="flex flex-col gap-[4px] w-fit">
                  <a href="tel:0957773244" className="font-medium">
                    095-777-3244
                  </a>
                  <div className="h-[1.4px] bg-primaryOrange w-full rounded-full"></div>
                  <a href="tel:0737376088" className="font-medium">
                    073-737-6088
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-[12px] items-center w-fit">
              <EmailIcon />
              <div className="flex flex-col gap-[8px]">
                <p className="font-normal text-primaryWhite/80">Пошта</p>
                <a href="mailto:neoluxsat@example.com" className="font-medium">
                  neoluxsat@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo always at bottom */}
      <div className="footer-logo-container mt-[40px] md:mt-0">
        <Logo />
      </div>
    </div>
  );
};

export default Footer;
