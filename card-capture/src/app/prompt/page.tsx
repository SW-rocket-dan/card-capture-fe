'use client';

import PromptTitle from '@/components/prompt/PromptTitle/PromptTitle';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import PromptInput from '@/components/prompt/PromptInput/PromptInput';
import PromptPreview from '@/components/prompt/PromptPreview/PromptPreview';

const PromptPage = () => {
  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <PromptTitle />
        <div className="flex flex-row items-start justify-center gap-[50px] py-[70px]">
          <PromptInput />
          <PromptPreview />
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
