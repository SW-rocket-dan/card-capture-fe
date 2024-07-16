'use client';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/EditingArea/EditingArea';

const EditorPage = () => {
  return (
    <div className="h-screen w-screen bg-editorbg font-Pretendard">
      <NavigationBar />
      <div className="flex h-full flex-row !overscroll-y-none pt-[65px]">
        <Tab />
        <EditingArea />
      </div>
    </div>
  );
};

export default EditorPage;
