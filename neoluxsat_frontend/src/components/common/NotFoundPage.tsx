import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-110px)]">
      <div className="flex flex-col justify-center items-center gap-[24px] h-full">
        <img
          className="max-sm:max-w-[100vw] max-w-[600px]"
          src="/images/not-found-image.png"
          alt="404-image"
        />
        <div className="flex flex-col gap-[16px] justify-center items-center">
          <p className="text-primaryBlue font-manrope text-[24px]/[90%] font-semibold text-center">
            Упс! Сторінку не знайдено.
          </p>
          <p className="text-primaryBlue font-noto text-[16px]/[120%] tracking-[-0.32px] text-center">
            Можливо, посилання застаріло або сторінку переміщено. <br />
            Поверніться на головну — ми вже все перевіряємо.
          </p>
        </div>
        <button
          className="bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold "
          onClick={() => navigate('/')}
        >
          На головну
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
