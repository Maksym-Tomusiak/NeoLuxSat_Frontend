type IoTSectionCardProps = {
  title: string;
  content: React.ReactNode;
};
const IoTSectionCard: React.FC<IoTSectionCardProps> = ({ title, content }) => {
  return (
    <div
      className="w-full max-w-[350px] p-[24px] rounded-[20px] flex flex-col gap-[24px] max-h-fit z-1"
      style={{ backgroundColor: '#cdd1de' }}
    >
      <p className="font-manrope text-primaryOrange text-[24px]/[90%] font-semibold">
        {title}
      </p>
      <div className="fill-primaryBlue text-primaryBlue font-noto text-[16px]/[120%] tracking-[-2%]">
        {content}
      </div>
    </div>
  );
};

export default IoTSectionCard;
