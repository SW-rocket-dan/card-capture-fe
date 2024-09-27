import FormatBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/FormatBox/FormatBox';
import SizeSelectBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import { availableFontSize } from '@/components/editor/EditingArea/components/TextBox/TextFormat';
import { useCardsStore } from '@/store/useCardsStore';
import { editorUtils } from '@/utils';
import RecentColorsBox from '@/components/editor/EditingArea/components/FocusBox/components/InlineTextEditBox/components/RecentColorsBox';
import RecentFontsBox from '@/components/editor/EditingArea/components/FocusBox/components/InlineTextEditBox/components/RecentFontsBox';
import useTextStyle from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextStyle';
import { useEffect } from 'react';
import { useFocusStore } from '@/store/useFocusStore';

const InlineTextEditBox = () => {
  const currentRef = useFocusStore(state => state.currentRef);
  const textRange = currentRef?.current?.getEditor().getSelection();

  const { getTextStyle } = useTextStyle();

  useEffect(() => {
    if (!currentRef) return;

    getTextStyle();
  }, [currentRef, textRange]);

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
