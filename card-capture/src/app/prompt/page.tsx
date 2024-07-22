'use client';

import PromptTitle from '@/components/prompt/PromptTitle/PromptTitle';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import PromptInput from '@/components/prompt/PromptInput/PromptInput';
import PromptPreview from '@/components/prompt/PromptPreview/PromptPreview';

const PromptPage = () => {
  return (
    <div className="h-screen w-screen font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col !overscroll-y-none pt-[60px]">
        <PromptTitle />
        <div className="flex flex-row items-center justify-center gap-[70px] py-[70px]">
          <PromptInput />
          <PromptPreview />
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
