import { useState } from 'react';
import MainTab from '@/components/editor/Tab/MainTab';
import EditTab from '@/components/editor/Tab/EditTab';

const Tab = () => {
  const [currenTab, setCurrentTab] = useState('edit');

  const changeTabHandler = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="flex h-full w-[420px] flex-row justify-start">
      <MainTab currentTab={currenTab} onChange={changeTabHandler} />
      <EditTab />
    </div>
  );
};

export default Tab;
