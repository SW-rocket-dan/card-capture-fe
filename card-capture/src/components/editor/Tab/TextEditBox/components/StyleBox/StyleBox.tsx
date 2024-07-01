import AlignButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/AlignButton';
import SpacingButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/SpacingButton';
import ListButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/ListButton';

const StyleBox = () => {
  return (
    <div className="flex flex-row items-center px-[15px] py-[10px]">
      <AlignButton />
      <SpacingButton />
      <ListButton />
    </div>
  );
};

export default StyleBox;
