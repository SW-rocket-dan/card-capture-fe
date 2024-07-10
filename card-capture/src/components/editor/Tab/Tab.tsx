import { useState } from 'react';
import MainTab from '@/components/editor/Tab/MainTab';
import EditTab from '@/components/editor/Tab/EditTab';

const Tab = () => {
  const [currenTab, setCurrentTab] = useState('edit');

  const changeTabHandler = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="fixed left-0 top-[65px] flex h-[calc(100%-65px)] w-[420px] flex-row justify-start bg-white">
      <MainTab currentTab={currenTab} onChange={changeTabHandler} />
      {currenTab === 'edit' && <EditTab />}
    </div>
  );
};

export default Tab;
