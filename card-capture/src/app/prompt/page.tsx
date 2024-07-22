'use client';

import PromptTitle from '@/components/prompt/PromptTitle/PromptTitle';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';

const PromptPage = () => {
  return (
    <div className="h-screen w-screen font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-row !overscroll-y-none pt-[60px]">
        <PromptTitle />
      </div>
    </div>
  );
};

export default PromptPage;
