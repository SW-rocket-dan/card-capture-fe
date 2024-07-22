import RetryIcon from '@/components/common/Icon/RetryIcon';
import React, { useState } from 'react';

const RecommendedColor = () => {
  const [isRotated, setIsRotated] = useState<boolean>(false);

  const clickRotateHandler = () => {
    setIsRotated(true);

    setTimeout(() => setIsRotated(false), 300);
  };

  return (
    <div className="flex flex-col gap-[15px] rounded-[8px] border border-border px-[12px] py-[15px]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[14px] font-semibold">AI 추천 색상</p>
          <div className="flex items-center gap-2 text-[11px]">
            <p className="text-gray2">
              남은 횟수 <span className="font-medium">2/3</span>
            </p>
            <button
              onClick={clickRotateHandler}
              className={`transition-transform duration-300 ${isRotated ? 'animate-rotate-180' : ''}`}
            >
              <RetryIcon width={13} className="text-main" />
            </button>
          </div>
        </div>
        <p className="text-[11px] text-gray3">
          프롬프트에 입력하신 내용에 따라 추천 색상이 변하니, 다른 색상 추천을 받고 싶다면 문구를 바꾸고 새로 고침
          버튼을 클릭하세요.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-[55px] w-[55px] rounded-[8px] bg-itembg" />
        <div className="h-[55px] w-[55px] rounded-[8px] bg-itembg" />
        <div className="h-[55px] w-[55px] rounded-[8px] bg-itembg" />
        <div className="h-[55px] w-[55px] rounded-[8px] bg-itembg" />
      </div>
    </div>
  );
};

export default RecommendedColor;
