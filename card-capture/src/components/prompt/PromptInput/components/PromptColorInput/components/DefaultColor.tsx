import React, { Dispatch, SetStateAction } from 'react';
import { hexToRgba, rgbaToHsva } from '@/components/common/ColorPicker/colorUtils';
import { IColor } from 'react-color-palette';
import CheckIcon from '@/components/common/Icon/CheckIcon';

type RecommendedColorProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
};

const THEME_COLORS = ['#FFFACD', '#FFD1DC', '#E6E6FA', '#B2F7EF'];

const DefaultColor = ({ color, setColor }: RecommendedColorProps) => {
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
        <p className="text-[14px] font-semibold">기본 테마 색상</p>
        <p className="text-[10.5px] text-gray3">일반적으로 포스터에 많이 사용되는 색상을 추천해드려요.</p>
      </div>
      <div className="flex items-center justify-between">
        {THEME_COLORS.map((val, index) => (
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

export default DefaultColor;
