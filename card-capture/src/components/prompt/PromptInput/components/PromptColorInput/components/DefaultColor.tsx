import React from 'react';

const DefaultColor = () => {
  return (
    <div className="flex flex-col gap-[15px] rounded-[8px] border border-border px-[13px] py-[15px]">
      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-semibold">기본 테마 색상</p>
        <p className="text-[10.5px] text-gray3">일반적으로 카드뉴스에 많이 사용되는 색상을 추천해드려요.</p>
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

export default DefaultColor;
