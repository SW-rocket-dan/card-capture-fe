import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DownIcon from '@/components/common/Icon/DownIcon';
import React, { useEffect } from 'react';
import FontAIcon from '@/components/common/Icon/FontAIcon';
import { useCardsStore } from '@/store/useCardsStore';
import { editorUtils } from '@/utils';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';

const RecentFontsBox = () => {
  const cards = useCardsStore(state => state.cards);
  const usedFonts = useCardsStore(state => state.usedFonts);
  const setUsedFonts = useCardsStore(state => state.setUsedFonts);

  /**
   * 카드가 가지고 있는 폰트 데이터 추출해서 전역에 저장
   */
  useEffect(() => {
    const fontList = editorUtils.extractFonts(cards);
    setUsedFonts(fontList);
  }, [cards]);

  // 텍스트 스타일 적용 hook
  const { changeStyleHandler } = useTextFormatting();

  /**
   * 선택된 폰트의 인덱스를 저장하고, 폰트를 적용하는 로직
   */
  const selectFontHandler = (font: string) => {
    changeStyleHandler('font', font);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-[25px] items-center justify-center gap-1 pr-2">
          <FontAIcon width={15} />
          <DownIcon width={10} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        asChild
        align="start"
        className={`absolute left-full z-50 -ml-[10px] -mt-[143px] h-[94px] w-[140px] rounded-[8px] bg-white p-1.5`}
        style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08', zIndex: 10000 }}
      >
        <ul className="flex flex-col overflow-y-auto text-[12px]">
          {usedFonts.map(
            (font, index) => (
              // selectedIndex === index ? (
              //   <button className="flex flex-row items-center justify-between bg-main px-[12px] py-[8px]">
              //     <p className="text-white">{size.slice(0, -2)}</p>
              //     <CheckIcon className="text-white" width={11} />
              //   </button>
              // ) : (
              <button
                onClick={() => selectFontHandler(font)}
                className={`flex justify-start px-[7px] py-[5px] text-[11px] hover:bg-itembg ql-font-${font}`}
              >
                {font}
              </button>
            ),
            // ),
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default RecentFontsBox;
