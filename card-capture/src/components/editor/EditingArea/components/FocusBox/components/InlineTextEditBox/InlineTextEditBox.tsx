import FormatBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/FormatBox/FormatBox';
import SizeSelectBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import { availableFontSize } from '@/components/editor/EditingArea/components/TextBox/TextFormat';
import { useCardsStore } from '@/store/useCardsStore';
import { editorUtils } from '@/utils';
import RecentColorsBox from '@/components/editor/EditingArea/components/FocusBox/components/InlineTextEditBox/components/RecentColorsBox';

const InlineTextEditBox = () => {
  const cards = useCardsStore(state => state.cards);

  const colors = editorUtils.extractColors(cards);

  return (
    <div className="shadow-base flex h-[50px] w-[300px] flex-row items-center gap-[10px] rounded-[8px] bg-white px-2">
      <RecentColorsBox type="text" />
      <SizeSelectBox sizeList={availableFontSize} ratio={0.85} />
      <FormatBox ratio={0.9} />
    </div>
  );
};

export default InlineTextEditBox;
