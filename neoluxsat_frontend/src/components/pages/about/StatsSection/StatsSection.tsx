const StatsSection = () => {
  const statsData = [
    {
      number: 2100,
      title: 'Задоволених клієнтів',
    },
    {
      number: 1800,
      title: 'Підключених роутерів та точок доступу',
    },
    {
      number: 950,
      title: 'Встановлених камер відеоспостереження',
    },
    {
      number: 600,
      title: 'Налаштованих охоронних систем',
    },
  ];

  return (
    <section>
      <div className="flex flex-wrap justify-center gap-[40px] md:gap-[56px]">
        {statsData.map((stat) => (
          <div
            key={stat.title}
            className="
              flex flex-col items-center text-center gap-[16px]
              w-[180px] sm:w-[200px]
            "
          >
            <p className="font-manrope font-semibold text-primaryOrange text-[24px]/[90%] md:text-[48px]/[90%] tracking-[-0.96px]">
              {stat.number}+
            </p>
            <p className="font-noto text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
