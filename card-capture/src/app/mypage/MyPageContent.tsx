'use client';

import React from 'react';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import UserTemplates from '@/components/mypage/UserTemplates/UserTemplates';
import useChannelTalk from '@/hooks/useChannelTalk';

const MyPageContent = () => {
  useChannelTalk();

  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <UserTemplates />
      </div>
    </div>
  );
};

export default MyPageContent;
