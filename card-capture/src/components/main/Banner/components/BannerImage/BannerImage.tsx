import CursorIcon from '@/components/common/Icon/CursorIcon';
import RightIcon from '@/components/common/Icon/RightIcon';
import TypingAnimation from '@/components/common/Animation/TypingAnimation/TypingAnimation';

const BannerImage = () => {
  const textLines = ['모아서 주는 마음이 더 기억에 남는 법!', '다른 사람들과 함께 선물을 준비해보세요'];

  return (
    <div className="flex flex-row items-center justify-center gap-[40px]">
      {/* 입력할 문구 div */}
      <div className="flex h-[320px] w-[320px] flex-col rounded-[20px] bg-white drop-shadow-md">
        <p className="border-lightBorder border-b-[1px] px-[16px] py-[12px] text-[14px] font-semibold">입력할 문구</p>
        <div className="border-lightBorder tracking-little-tight relative m-[16px] flex flex-1 flex-col items-end rounded-[8px] border-[1px] p-[16px] text-[14px] text-defaultBlack">
          <div className="flex w-full flex-1 flex-col justify-start">
            <TypingAnimation lines={textLines} />
          </div>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-gray5">
            <CursorIcon width={14} className="mr-[1px] mt-[2px] text-white" />
          </div>
        </div>
      </div>

      {/* 화살표 아이콘 */}
      <div className="bg-light-main shadow-drop-bold flex h-[45px] w-[45px] items-center justify-center rounded-full">
        <RightIcon height={16} className="text-main" />
      </div>

      {/* 완성본 이미지 div */}
      <div className="h-[320px] w-[320px] overflow-hidden rounded-[20px] drop-shadow-md">
        <img src="/image/main-completed.png" alt="CompletedImage" className="h-full w-full" />
      </div>
    </div>
  );
};

export default BannerImage;
