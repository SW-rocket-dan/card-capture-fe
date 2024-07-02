'use client';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import Tab from '@/components/editor/Tab/Tab';

const EditorPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col font-Pretendard">
      <NavigationBar />
      <div className="flex h-full flex-row">
        <Tab />
        <div className="bg-editorbg flex-1" />
      </div>
    </div>
  );
};

export default EditorPage;
