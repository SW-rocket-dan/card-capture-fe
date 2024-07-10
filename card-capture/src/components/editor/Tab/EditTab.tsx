import TextEditBox from '@/components/editor/Tab/TextEditBox/TextEditBox';
import BackgroundEditBox from '@/components/editor/Tab/BackgroundEditBox/BackgroundEditBox';
import ImageEditBox from '@/components/editor/Tab/ImageEditBox/ImageEditBox';

const EditTab = () => {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b-[1px] border-b-border p-[20px] text-lg font-extrabold">요소 수정</header>
      <TextEditBox />
      <ImageEditBox />
      <BackgroundEditBox />
    </div>
  );
};

export default EditTab;
