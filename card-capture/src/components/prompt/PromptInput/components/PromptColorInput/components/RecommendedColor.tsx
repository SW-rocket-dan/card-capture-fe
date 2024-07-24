import RetryIcon from '@/components/common/Icon/RetryIcon';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IColor } from 'react-color-palette';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import { hexToRgba, rgbaToHsva } from '@/components/common/ColorPicker/colorUtils';

type RecommendedColorProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
};

const AI_COLORS = ['#FFA6A6', '#FF7E55', '#FFC369', '#FFFFFF'];

const RecommendedColor = ({ color, setColor }: RecommendedColorProps) => {
  const [freeCount, setFreeCount] = useState<number>(3);
  const [isRotated, setIsRotated] = useState<boolean>(false);

  /**
   * ai 추천 색상 다시 요청하는 버튼 click handler
   */
  const clickRetryHandler = () => {
    if (freeCount <= 0) return;

    setIsRotated(true);
    setFreeCount(prev => prev - 1);

    setTimeout(() => setIsRotated(false), 300);
  };

  /**
   * 선택한 색상을 hex,rgb,hsv로 변환해서 상태에 저장하는 핸들러
   * IColor 타입이라서 세가지 버전의 색상이 모두 존재해야 함
   */
  const changeColorHandler = (val: string) => {
    const newColor = val.slice(1);
    const rgba = hexToRgba(newColor);
    const hsva = rgbaToHsva(rgba);

    if (/^[0-9A-F]*$/.test(newColor)) {
      if (newColor.length <= 6) {
        setColor({
          ...color,
          hex: `#${newColor}`,
          rgb: rgba,
          hsv: hsva,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-[15px] rounded-[8px] border border-border px-[13px] py-[15px]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[14px] font-semibold">AI 추천 색상</p>
          <div className="flex flex-row items-center gap-2.5 text-[11px]">
            <div className="flex flex-row gap-1 text-gray2">
              남은 횟수 <p className="w-4 font-medium">{freeCount}/3</p>
            </div>
            <button
              onClick={clickRetryHandler}
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
        {AI_COLORS.map((val, index) => (
          <button
            key={index + val}
            onClick={() => changeColorHandler(val)}
            className={`flex h-[53px] w-[53px] items-center justify-center rounded-[8px] border border-border`}
            style={{ backgroundColor: val }}
          >
            {color.hex === val && (
              <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
                <CheckIcon width={13} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendedColor;
