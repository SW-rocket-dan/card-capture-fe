'use client';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';
import EditingArea from '@/components/editor/Tab/EditingArea/EditingArea';

const EditorPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col font-Pretendard">
      <NavigationBar />
      <div className="flex h-full flex-row">
        <Tab />
        <EditingArea />
      </div>
    </div>
  );
};

export default EditorPage;
