// NotFoundPage.jsx
import Link from "next/link";
import Image from "next/image"; // 1. Import the Next.js Image component

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-110px)]">
      <div className="flex flex-col justify-center items-center gap-[24px] h-full">
        {/* 2. Use the Image component */}
        <Image
          className="max-sm:max-w-[100vw] max-w-[600px] h-auto" // Added h-auto to maintain aspect ratio
          src="/images/not-found-image.png"
          alt="404-image"
          // 3. IMPORTANT: Update these numbers to the actual pixel size of your image
          width={4096}
          height={2304}
          // 4. The 'priority' prop fixes the preload warning
          priority
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

        <Link href="/">
          <button className="bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold ">
            На головну
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
