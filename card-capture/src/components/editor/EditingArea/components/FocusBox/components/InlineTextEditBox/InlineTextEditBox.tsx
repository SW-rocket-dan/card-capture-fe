import FormatBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/FormatBox/FormatBox';
import SizeSelectBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import { availableFontSize } from '@/components/editor/EditingArea/components/TextBox/TextFormat';

const InlineTextEditBox = () => {
  return (
    <div className="shadow-base flex h-[50px] w-[300px] flex-row items-center gap-[15px] rounded-[8px] bg-white">
      <SizeSelectBox sizeList={availableFontSize} ratio={0.85} />
      <FormatBox ratio={0.9} />
    </div>
  );
};

export default InlineTextEditBox;
