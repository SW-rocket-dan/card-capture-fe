import React, { useEffect, useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import RetryIcon from '@/components/common/Icon/RetryIcon';
import RecommendedColor from '@/components/prompt/PromptInput/components/PromptColorInput/components/RecommendedColor';

const PromptColorPicker = () => {
  const [currentTab, setCurrentTab] = useState<'recommend' | 'custom'>('recommend');

  return (
    <div className="absolute z-10 ml-[200px] mt-[20px] flex w-[350px] flex-col gap-[15px] rounded-[20px] bg-white px-[20px] pb-[15px] pt-[10px] drop-shadow-md">
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
    </div>
  );
};

export default PromptColorPicker;
