import { useState } from 'react';
import MainTab from '@/components/editor/Tab/MainTab';
import EditTab from '@/components/editor/Tab/components/EditTab/EditTab';
import PromptTab from '@/components/editor/Tab/components/PromptTab/PromptTab';

const Tab = () => {
  const [currentTab, setCurrentTab] = useState('edit');

  const changeTabHandler = (tab: string) => {
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
