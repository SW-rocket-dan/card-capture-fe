'use client';

import React from 'react';
import Tab from '@/components/editor/Tab/Tab';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import EditingArea from '@/components/editor/EditingArea/EditingArea';

const EditorPage = () => {
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

export default EditorPage;
