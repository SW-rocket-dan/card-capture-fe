'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/EditingArea/EditingArea';
import React, { useEffect } from 'react';

import { INITIAL_CARD, useCardsStore } from '@/store/useCardsStore';

const SampleContent = () => {
  const setCards = useCardsStore(state => state.setCard);

  useEffect(() => {
    setCards([INITIAL_CARD]);
  }, []);

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

export default SampleContent;
