import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Button from '@/components/common/Button/Button';
import AIIcon from '@/components/common/Icon/AIIcon';

const ResubmitBox = () => {
  return (
    <div className="flex w-full flex-col border-t border-border">
      <p
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        AI에게 재요청하기
      </p>

      <div className="flex flex-col gap-4 pb-[15px]">
        <div className="flex flex-col gap-2 px-[15px]">
          <label className="text-gray9 text-[12px] font-medium">
            재요청 받고 싶은 요소를 선택해주세요! (요소 클릭)
          </label>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className={`w-fit rounded-md border border-border px-2 py-0.5 text-[12px] text-gray2`}>이미지</div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">현재는 이미지만 가능해요!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col gap-2 px-[15px]">
          <p className="text-gray9 text-[12px] font-medium">재요청 받고 싶은 부분에 대한 설명을 작성해주세요!</p>
          <textarea
            className="h-[90px] resize-none rounded-[10px] border border-border p-2 text-xs outline-none placeholder:text-gray5"
            placeholder="예시) 인물의 나이대를 20대로 만들어주세요"
          />
        </div>
      </div>

      <Button type="default" className="mx-[15px] gap-[6px] border-2 py-[10px] text-xs">
        <AIIcon width={15} className="text-main" />
        <p>AI에게 재요청하기</p>
      </Button>
    </div>
  );
};

export default ResubmitBox;
