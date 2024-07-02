import AlignButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/AlignButton';
import SpacingButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/SpacingButton';
import ListButton from '@/components/editor/Tab/TextEditBox/components/StyleBox/components/ListButton';
import ColorButton from '@/components/editor/Tab/components/ColorButton';

const StyleBox = () => {
  return (
    <div className="flex flex-row items-center gap-[20px] px-[15px] py-[10px]">
      <AlignButton />
      <SpacingButton />
      <ListButton />
      <ColorButton />
    </div>
  );
};

export default StyleBox;
