const BannerText = () => {
  return (
    <div className="flex flex-col gap-[15px] md:mt-14">
      <div className="flex flex-col items-center justify-center pr-2 md:pr-6">
        <div className="flex flex-row items-center justify-center gap-2 md:gap-3 2xl:gap-4">
          <div className="h-[27px] w-[27px] sm:h-[35px] sm:w-[35px] md:h-[40px] md:w-[40px] lg:h-[55px] lg:w-[55px] 2xl:h-[70px] 2xl:w-[70px]">
            <img src="/image/message.png" alt="message" className="h-full w-full" />
          </div>
          <p
            className="whitespace-nowrap text-[30px] font-extrabold sm:text-[35px] md:text-[50px] lg:text-[60px] 2xl:text-[70px]"
            style={{ letterSpacing: '-0.018em' }}
          >
            문구만 넣으면 AI가
          </p>
        </div>
        <div className="-mt-2 flex flex-row gap-2 whitespace-nowrap text-[30px] font-extrabold tracking-little-tight text-main sm:text-[35px] md:gap-3 md:text-[50px] lg:gap-4 lg:text-[60px] 2xl:text-[70px]">
          <p>디지털 포스터 3분만에</p>
          <div className="relative inline-block">
            <div className="absolute left-[-1px] top-0 h-[7px] w-[7px] bg-highlightBorder md:left-[-2px] md:h-[8px] md:w-[8px] lg:left-[-3px] lg:h-[9px] lg:w-[9px] 2xl:left-[-4px] 2xl:h-[13px] 2xl:w-[13px]" />
            <div className="absolute right-[-1px] top-0 h-[7px] w-[7px] bg-highlightBorder md:right-[-2px] md:h-[8px] md:w-[8px] lg:right-[-3px] lg:h-[9px] lg:w-[9px] 2xl:h-[13px] 2xl:w-[13px]" />
            <div className="absolute bottom-0 left-[-1px] h-[7px] w-[7px] bg-highlightBorder md:left-[-2px] md:h-[8px] md:w-[8px] lg:left-[-3px] lg:h-[9px] lg:w-[9px] 2xl:h-[13px] 2xl:w-[13px]" />
            <div className="absolute bottom-0 right-[-1px] h-[7px] w-[7px] bg-highlightBorder md:right-[-2px] md:h-[8px] md:w-[8px] lg:right-[-3px] lg:h-[9px] lg:w-[9px] 2xl:h-[13px] 2xl:w-[13px]" />
            <div className="absolute right-[-14px] top-4 z-30 h-[18px] w-[18px] sm:right-[-18px] sm:top-4 sm:h-[23px] sm:w-[23px] md:right-[-25px] md:top-5 md:h-[30px] md:w-[30px] lg:right-[-32px] lg:top-7 lg:h-[38px] lg:w-[38px] 2xl:right-[-38px] 2xl:top-10 2xl:h-[45px] 2xl:w-[45px]">
              <img className="h-full w-full" src="/image/cursor.png" alt="cursor" />
            </div>
            <p className="relative inline-block border-[1.5px] border-highlightBorder px-2 py-1 leading-none md:border-[2.5px] md:px-3 md:py-1.5 lg:px-3.5 lg:py-2 2xl:px-4 2xl:py-3">
              제작
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-1 whitespace-nowrap text-[14px] font-medium tracking-little-tight text-gray4 md:text-[15px] lg:text-[17px] 2xl:text-[19px]">
        <span>지금 가입하고</span>
        <span className="font-semibold text-defaultBlack">✨포스터 5장✨</span>을<span> 무료로 제작하세요!</span>
      </div>
    </div>
  );
};

export default BannerText;
