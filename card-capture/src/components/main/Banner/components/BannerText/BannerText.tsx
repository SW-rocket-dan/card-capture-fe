import Image from 'next/image';

const BannerText = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="h-[55px] w-[55px]">
            <Image src="/image/message.png" alt="message" width={55} height={55} />
          </div>
          <p className="text-[60px] font-extrabold" style={{ letterSpacing: '-0.018em' }}>
            AI가 문구만 넣으면
          </p>
        </div>
        <div
          className="-mt-2 flex flex-row gap-4 text-[60px] font-extrabold text-main"
          style={{ letterSpacing: '-0.018em' }}
        >
          <p>카드뉴스 3분만에</p>
          <div className="relative inline-block">
            <div className="bg-highlightBorder absolute left-[-3px] top-0 h-[9px] w-[9px]" />
            <div className="bg-highlightBorder absolute right-[-3px] top-0 h-[9px] w-[9px]" />
            <div className="bg-highlightBorder absolute bottom-0 left-[-3px] h-[9px] w-[9px]" />
            <div className="bg-highlightBorder absolute bottom-0 right-[-3px] h-[9px] w-[9px]" />
            <Image
              className="absolute right-[-32px] top-7 z-30"
              src="/image/cursor.png"
              alt="cursor"
              width={38}
              height={38}
            />
            <p className="border-highlightBorder relative inline-block border-[2.5px] px-3.5 py-2 leading-none">제작</p>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center space-x-1 text-[17px] font-medium text-gray4"
        style={{ letterSpacing: '-0.018em' }}
      >
        <span>지금 가입하고</span>
        <span className="font-semibold text-defaultBlack">✨카드뉴스 10장✨</span>을<span> 무료로 제작하세요!</span>
      </div>
    </div>
  );
};

export default BannerText;
