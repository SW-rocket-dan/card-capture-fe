import FormatBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/FormatBox/FormatBox';
import SizeSelectBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import { availableFontSize } from '@/components/editor/EditingArea/components/TextBox/TextFormat';
import RecentColorsBox from '@/components/editor/EditingArea/components/FocusBox/components/InlineTextEditBox/components/RecentColorsBox';
import RecentFontsBox from '@/components/editor/EditingArea/components/FocusBox/components/InlineTextEditBox/components/RecentFontsBox';

const InlineTextEditBox = () => {
  return (
    <div className="shadow-base flex h-[47px] w-[320px] flex-row items-center rounded-[8px] bg-white px-3">
      <RecentColorsBox type="text" />
      <RecentFontsBox />
      <SizeSelectBox sizeList={availableFontSize} ratio={0.85} />
      <FormatBox ratio={0.87} />
    </div>
  );
};

export default InlineTextEditBox;
