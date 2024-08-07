type TitleProps = {
  title: string;
  content: string;
};

const Title = ({ title, content }: TitleProps) => {
  return (
    <div className="flex min-h-[150px] w-full flex-col items-center justify-center gap-[10px] bg-bannerbg md:min-h-[190px]">
      <p className="text-[30px] font-bold md:text-[35px]">{title}</p>
      <p className="text-[13px] text-gray2">{content}</p>
    </div>
  );
};

export default Title;
