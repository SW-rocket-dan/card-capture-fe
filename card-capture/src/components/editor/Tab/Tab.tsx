import { useState } from 'react';
import MainTab from '@/components/editor/Tab/MainTab';
import EditTab from '@/components/editor/Tab/components/EditTab/EditTab';

const Tab = () => {
  const [currenTab, setCurrentTab] = useState('edit');

  const changeTabHandler = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="fixed left-0 top-[60px] flex h-[calc(100%-60px)] w-[350px] flex-row justify-start bg-white">
      <MainTab currentTab={currenTab} onChange={changeTabHandler} />
      {currenTab === 'edit' && <EditTab />}
    </div>
  );
};

export default Tab;
