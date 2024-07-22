import React, { useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import RecommendedColor from '@/components/prompt/PromptInput/components/PromptColorInput/components/RecommendedColor';
import CustomColor from '@/components/prompt/PromptInput/components/PromptColorInput/components/CustomColor';

const PromptColorPicker = () => {
  const [currentTab, setCurrentTab] = useState<'recommend' | 'custom'>('recommend');

  return (
    <div className="absolute z-10 ml-[200px] mt-[20px] flex w-[340px] flex-col gap-[15px] rounded-[20px] border border-itembg bg-white px-[20px] pb-[15px] pt-[15px] drop-shadow-md">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4 text-[14px] font-semibold text-gray4">
          <button className="">추천 색상</button>
          <button className="">직접 선택</button>
        </div>
        <button>
          <CloseIcon width={11} className="text-gray2" />
        </button>
      </div>
      <RecommendedColor />
      <CustomColor />
      <div className="flex w-full items-center justify-between rounded-[8px] bg-itembg px-[15px] py-[12px]">
        <div className="flex flex-row items-center gap-3">
          <p className="text-[12px] text-gray2">선택한 색상</p>
          <p className="text-[13px] font-semibold">
            # <input className="bg-transparent font-bold outline-none" maxLength={6} />
          </p>
        </div>
        <p className="pr-1 text-[10px] text-gray4">HEX</p>
      </div>
    </div>
  );
};

export default PromptColorPicker;
