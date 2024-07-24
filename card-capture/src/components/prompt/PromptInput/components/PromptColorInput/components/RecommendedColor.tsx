import RetryIcon from '@/components/common/Icon/RetryIcon';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IColor } from 'react-color-palette';

type RecommendedColorProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
};

const AI_COLORS = ['#FFA6A6', '#FF7E55', '#FFC369', '#FFFFFF'];
const THEME_COLORS = ['#FFFACD', '#FFD1DC', '#E6E6FA', '#B2F7EF'];

const RecommendedColor = ({ color, setColor }: RecommendedColorProps) => {
  const [freeCount, setFreeCount] = useState<number>(3);
  const [isRotated, setIsRotated] = useState<boolean>(false);

  const clickRotateHandler = () => {
    if (freeCount <= 0) return;

    setIsRotated(true);
    setFreeCount(prev => prev - 1);

    setTimeout(() => setIsRotated(false), 300);
  };

  return (
    <div className="flex flex-col gap-[15px] rounded-[8px] border border-border px-[13px] py-[15px]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[14px] font-semibold">AI 추천 색상</p>
          <div className="flex flex-row items-center gap-2.5 text-[11px]">
            <p className="flex flex-row gap-1 text-gray2">
              남은 횟수 <div className="w-5 font-medium">{freeCount}/3</div>
            </p>
            <button
              onClick={clickRotateHandler}
              className={`transition-transform duration-300 ${isRotated ? 'animate-rotate-180' : ''}`}
            >
              <RetryIcon width={13} className="text-main" />
            </button>
          </div>
        </div>
        <p className="text-[10.5px] text-gray3">
          프롬프트에 입력하신 내용에 따라 추천 색상이 변하니, 다른 색상 추천을 받고 싶다면 문구를 바꾸고 새로 고침
          버튼을 클릭하세요.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-[53px] w-[53px] rounded-[8px] border border-border bg-itembg" />
        <div className="h-[53px] w-[53px] rounded-[8px] border border-border bg-itembg" />
        <div className="h-[53px] w-[53px] rounded-[8px] border border-border bg-itembg" />
        <div className="h-[53px] w-[53px] rounded-[8px] border border-border bg-itembg" />
      </div>
    </div>
  );
};

export default RecommendedColor;
