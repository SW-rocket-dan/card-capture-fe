import React from 'react';

const PromptHistoryBox = () => {
  return (
    <div className="flex w-full flex-col">
      <p
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        이전에 입력한 프롬프트
      </p>

      <div className="flex flex-col gap-4 pb-[15px]">
        <div className="flex flex-col gap-2 px-[15px]">
          <label className="text-[12px] text-gray4">입력한 문구</label>
          <p className="h-[90px] rounded-[10px] border border-border p-1"></p>
        </div>
        <div className="flex flex-col gap-2 px-[15px]">
          <label className="text-[12px] text-gray4">목적</label>
          <p className="rounded-[10px] border border-border p-1"></p>
        </div>
        <div className="flex flex-row justify-between px-[15px]">
          <label className="text-[12px] text-gray4">색상</label>
          <div
            className="!h-[19px] !w-[35px] rounded-md border-2 border-border"
            style={{ backgroundColor: '#111111' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptHistoryBox;
