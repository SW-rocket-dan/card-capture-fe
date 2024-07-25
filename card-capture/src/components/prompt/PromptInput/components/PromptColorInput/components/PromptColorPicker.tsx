import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import RecommendedColor from '@/components/prompt/PromptInput/components/PromptColorInput/components/RecommendedColor';
import DefaultColor from '@/components/prompt/PromptInput/components/PromptColorInput/components/DefaultColor';
import CustomColor from '@/components/prompt/PromptInput/components/PromptColorInput/components/CustomColor';
import { IColor } from 'react-color-palette';
import { UseFormRegister } from 'react-hook-form';
import { PromptInputFormType } from '@/components/prompt/PromptInput/PromptInput';
import { hexToRgba, rgbaToHsva } from '@/components/common/ColorPicker/colorUtils';
import useIsMobile from '@/hooks/useIsMobile';

type PromptColorPickerProps = {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
  closeHandler: () => void;
};

const PromptColorPicker = ({ color, setColor, closeHandler }: PromptColorPickerProps) => {
  const [currentTab, setCurrentTab] = useState<'recommend' | 'custom'>('recommend');

  const changeColorHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.toUpperCase();

    const hexColor = newColor;
    const rgba = hexToRgba(hexColor);
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
    <div className="z-10 flex w-[340px] flex-col gap-[15px] rounded-[20px] border border-itembg bg-white px-[20px] pb-[15px] pt-[15px] drop-shadow-md duration-100 animate-in fade-in-0 zoom-in-95 sm:absolute sm:ml-[200px] sm:mt-[20px]">
      {/* 탭 선택 부분 */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4 text-[14px] font-semibold text-gray4">
          <button
            onClick={() => setCurrentTab('recommend')}
            className={`${currentTab === 'recommend' ? 'text-main' : ''}`}
          >
            추천 색상
          </button>
          <button onClick={() => setCurrentTab('custom')} className={`${currentTab === 'custom' ? 'text-main' : ''}`}>
            직접 선택
          </button>
        </div>
        <button onClick={closeHandler}>
          <CloseIcon width={11} className="text-gray2" />
        </button>
      </div>

      {currentTab === 'recommend' ? (
        <div className="flex flex-col gap-[15px]">
          <RecommendedColor color={color} setColor={setColor} />
          <DefaultColor color={color} setColor={setColor} />
        </div>
      ) : (
        <CustomColor color={color} setColor={setColor} />
      )}

      {/* 섹상 코드 입력 부분 */}
      <div className="flex w-full items-center justify-between rounded-[8px] bg-itembg px-[15px] py-[12px]">
        <div className="flex flex-row items-center gap-3">
          <p className="text-[12px] text-gray2">선택한 색상</p>
          <p className="text-[13px] font-semibold">
            #
            <input
              value={color.hex.slice(1, 7)}
              onChange={changeColorHandler}
              className="bg-transparent font-bold outline-none"
              maxLength={6}
            />
          </p>
        </div>
        <p className="pr-1 text-[10px] text-gray4">HEX</p>
      </div>
    </div>
  );
};

export default PromptColorPicker;
