import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PropositionDto } from '@/types/proposition';
import { ApplicationService } from '@/services/application.service';
import PhoneIcon from '@/assets/svgs/contacts/phone-icon.svg';
import DateIcon from '@/assets/svgs/admin/dashboard/date-icon.svg';
import InfoIcon from '@/assets/svgs/info-icon.svg';
import { useModal } from '@/contexts/modalContext';

type PropositionCardProps = {
  data: PropositionDto;
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
  animationKey: number;
};

// ... (validatePhone and formatDate functions remain the same) ...
const validatePhone = (phone: string): boolean => {
  return /^\+?[\d\s-]{10,20}$/.test(phone);
};

const formatDate = (date: Date | string): string => {
  try {
    const d = new Date(date);
    return d.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Europe/Kyiv',
    });
  } catch {
    return String(date);
  }
};

const PropositionCard: React.FC<PropositionCardProps> = ({
  data,
  onPause,
  onResume,
  isPaused,
  animationKey,
}) => {
  // ... (state and other logic remains the same) ...
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  let apiUrl = import.meta.env.VITE_API_BASE_URL as string;
  apiUrl = apiUrl.slice(0, apiUrl.length - 4);

  const { showNotification } = useModal();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- 3. RESET SCROLL ON DATA CHANGE ---
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [data.id]); // Dependency array ensures this runs when the slide data changes

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (validatePhone(newPhone)) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setSubmitError('Введіть коректний номер телефону.');
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await ApplicationService.createApplicationProposition({ phone });
      setPhone('');
      showNotification('Заявку успішно відправлено!', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Не вдалося відправити. Спробуйте ще раз.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputClasses =
    'h-[40px] w-full font-noto pl-11 pr-4 bg-white border rounded-lg text-primaryBlue';
  const focusInputClasses =
    'focus:outline-none focus:ring-[1.4px] focus:ring-primaryOrange';

  const getFieldClasses = () => {
    if (submitError) {
      return `border-red-600 ${focusInputClasses}`;
    }
    return `border-gray-300 ${focusInputClasses}`;
  };

  return (
    <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden w-full gap-[20px] lg:justify-center">
      {/* Image Section with Crossfade */}
      <div className="w-full lg:w-1/2 order-first lg:order-last aspect-square max-w-[680px] mx-auto overflow-hidden relative rounded-[20px]">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={data.id}
            src={apiUrl + data.imageUrl}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div
        className={`w-full lg:w-1/2 order-last lg:order-first flex flex-col justify-center
          p-[24px]
          rounded-[20px] bg-primaryBlue/10
          lg:aspect-square max-w-[680px] mx-auto
          progress-border-container 
          is-active
          ${isPaused ? 'is-paused' : ''}
          lg:justify-normal`}
      >
        <div key={animationKey} className="progress-border-animator" />

        <div className="relative z-10 lg:flex lg:h-full lg:flex-col justify-center">
          {/* --- SCROLLABLE WRAPPER --- */}
          <div
            ref={scrollContainerRef}
            className="lg:flex-1 lg:overflow-y-auto lg:overflow-x-hidden max-h-fit lg:min-h-0 lg:flex lg:flex-col lg:pt-2 relative
            pr-2 -mr-2" // Added padding/margin to handle scrollbar
          >
            {/* --- WRAPPER with lg:mt-auto --- */}
            <div className="">
              {/* --- ADDED 'block' CLASS HERE --- */}
              <span
                className="block w-fit px-[8px] py-[10px] bg-primaryOrange/40 rounded-full
                font-noto text-[14px]/[120%] tracking-[-0.28px] text-primaryBlue mb-[24px]"
              >
                Спеціальна пропозиція
              </span>

              {/* Animated content with Framer Motion */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <h3
                    className="font-manrope text-[36px]/[90%] xs:text-[48px]/[90%] xl:text-[64px]/[90%] text-primaryBlue tracking-[-2px] font-semibold mb-[24px] 
                    lg:max-w-[75%]"
                  >
                    {data.title}
                  </h3>
                  <p className="font-noto text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
                    {data.content.split('\n').map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="flex items-center gap-[8px] mt-[12px] fill-primaryOrange mb-[12px] xs:mb-[20px] md:mb-[40px] lg:mb-[20px] xl:mb-[40px]">
                    <div>
                      <DateIcon />
                    </div>
                    <p className="font-noto text-primaryOrange text-[14px]/[120%] tracking-[-0.28px]">
                      Акція діє до {formatDate(data.endDate)}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* --- END OF lg:mt-auto WRAPPER --- */}
          </div>
          {/* --- END OF SCROLLABLE WRAPPER --- */}

          {/* Form Section (stays static) */}
          <form onSubmit={handleSubmit}>
            <label
              htmlFor={`phone-${data.id}`}
              className="font-noto text-primaryBlue text-[16px]/[120%] tracking-[-0.32px] ml-2"
            >
              Номер телефону
            </label>
            <div className="relative flex flex-col sm:flex-row sm:gap-4 mt-2">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 fill-primaryBlue/40 pointer-events-none">
                  <PhoneIcon />
                </div>
                <input
                  id={`phone-${data.id}`}
                  type="tel"
                  placeholder="+380957773244"
                  value={phone}
                  onChange={handlePhoneChange}
                  onFocus={onPause}
                  onBlur={onResume}
                  disabled={isSubmitting}
                  className={`${baseInputClasses} ${getFieldClasses()}`}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto mt-3 sm:mt-0 px-6 py-3 rounded-lg border-primaryOrange border-[2px] bg-primaryOrange text-primaryWhite font-semibold font-noto whitespace-nowrap hover:bg-transparent hover:text-primaryBlue transition-colors disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? 'Відправка...' : 'Залишити заявку'}
              </button>
            </div>

            <div className="mt-2 ml-2 text-sm">
              {submitError && (
                <p className="text-red-600 font-medium">{submitError}</p>
              )}
            </div>
            <div className="flex items-center gap-[8px] mt-[16px]">
              <div className="w-[24px] h-[24px]">
                <InfoIcon />
              </div>
              <p className="text-primaryBlue/80 font-noto text-[14px]/[120%] tracking-[-0.28px] max-w-[380px]">
                Вказавши номер телефону, ви отримаєте персональну пропозицію{' '}
                <br className="hidden min-[368px]:max-[385px]:block" />
                та консультацію спеціаліста протягом{' '}
                <br className="hidden min-[368px]:max-[384px]:block min-[472px]:block" />
                15 хвилин
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropositionCard;
