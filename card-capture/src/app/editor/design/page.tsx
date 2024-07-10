'use client';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/Tab/EditingArea/EditingArea';

const EditorPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden font-Pretendard">
      <NavigationBar />
      <div className="flex h-full flex-row overflow-y-hidden pt-[65px]">
        <Tab />
        <EditingArea />
      </div>
    </div>
  );
};

export default EditorPage;
