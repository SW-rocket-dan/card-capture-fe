import { useState } from 'react';
import MainTab from '@/components/editor/Tab/MainTab';
import EditTab from '@/components/editor/Tab/components/EditTab/EditTab';
import PromptTab from '@/components/editor/Tab/components/PromptTab/PromptTab';
import { isTabType, TabType } from '@/types';

const Tab = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('edit');

  const changeTabHandler = (tab: string) => {
    if (!isTabType(tab)) return;

    setCurrentTab(tab);
  };

  return (
    <div className="fixed left-0 top-[60px] flex h-[calc(100%-60px)] w-[350px] flex-row justify-start bg-white">
      <MainTab currentTab={currentTab} onChange={changeTabHandler} />
      {currentTab === 'edit' && <EditTab />}
      {currentTab === 'prompt' && <PromptTab />}
    </div>
  );
};

export default Tab;
