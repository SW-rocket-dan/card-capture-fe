//page.tsx
'use client';

import React from 'react';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/EditingArea/EditingArea';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import useChannelTalk from '@/hooks/useChannelTalk';

const EditorContent = () => {
  useChannelTalk();

  const isAuthenticated = useAuthRedirect();

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen w-screen bg-editorbg font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-row !overscroll-y-none pt-[60px]">
        <Tab />
        <EditingArea />
      </div>
    </div>
  );
};

export default EditorContent;
