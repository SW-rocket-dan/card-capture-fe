import React from 'react';
import PromptHistoryBox from '@/components/editor/Tab/components/PromptTab/PromptHistoryBox/PromptHistoryBox';

const PromptTab = () => {
  return (
    <div className="flex h-full w-[280px] flex-1 flex-col overflow-y-scroll">
      <header className="flex h-[50px] items-center border-b-[1px] border-b-border p-[15px] text-[15px] font-semibold">
        프롬프트 재요청
      </header>
      <PromptHistoryBox />
    </div>
  );
};

export default PromptTab;
