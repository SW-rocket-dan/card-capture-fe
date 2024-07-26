//page.tsx
'use client';

import FocusBox from '@/components/editor/EditingArea/components/FocusBox/FocusBox';
import LayerBox from '@/components/editor/EditingArea/components/LayerBox/LayerBox';
import { useCardsStore } from '@/store/useCardsStore';
import React, { useEffect, useState } from 'react';
import TextBox from '@/components/editor/EditingArea/components/TextBox/TextBox';
import TextToolbar from '@/components/editor/EditingArea/components/TextBox/TextToolbar';
import ShapeBox from '@/components/editor/EditingArea/components/ShapeBox/ShapeBox';
import { Shape } from '@/store/useCardsStore/type';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/EditingArea/EditingArea';

const EditorContent = () => {
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
