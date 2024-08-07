type PricingTitleProps = {
  title: string;
  description: string;
};

const PricingTitle = ({ title, description }: PricingTitleProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <div className="w-[240px] rounded-[10px] px-[40px] py-[15px] text-center text-[12px] shadow-default">
        {description}
      </div>
      <p className="text-[27px] font-bold">{title}</p>
    </div>
  );
};

export default PricingTitle;
