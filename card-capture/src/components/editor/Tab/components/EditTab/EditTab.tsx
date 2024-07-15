import TextEditBox from '@/components/editor/Tab/components/EditTab/TextEditBox/TextEditBox';
import BackgroundEditBox from '@/components/editor/Tab/components/EditTab/BackgroundEditBox/BackgroundEditBox';
import ImageEditBox from '@/components/editor/Tab/components/EditTab/ImageEditBox/ImageEditBox';
import IllustrationEditBox from '@/components/editor/Tab/components/EditTab/IllustrationEditBox/IllustrationEditBox';

const EditTab = () => {
  return (
    <div className="flex h-full w-[280px] flex-1 flex-col">
      <header className="h-[50px] border-b-[1px] border-b-border p-[15px] text-[14px] font-bold">요소 수정</header>
      <TextEditBox />
      <ImageEditBox />
      <IllustrationEditBox />
      <BackgroundEditBox />
    </div>
  );
};

export default EditTab;
