import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import React, { useEffect, useState } from 'react';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useCardsStore } from '@/store/useCardsStore';
import { editorUtils } from '@/utils';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';

type RecentColorsBoxProps = {
  type: 'text' | 'shape';
};

const RecentColorsBox = ({ type }: RecentColorsBoxProps) => {
  const cards = useCardsStore(state => state.cards);
  const usedColors = useCardsStore(state => state.usedColors);
  const setUsedColors = useCardsStore(state => state.setUsedColors);

  /**
   * 카드가 가지고 있는 색상데이터 추출해서 전역에 저장
   */
  useEffect(() => {
    const colorList = editorUtils.extractColors(cards);
    setUsedColors(colorList);
  }, [cards]);

  /**
   * 최근에 사용된 16개의 색상만 뽑아내서 배열로 반환
   */
  const [usedColorList, setUsedColorList] = useState<(string | undefined)[]>([]);

  const sliceAndPadArray = (list: string[]) => {
    const colors: string[] = list.slice(0, 16).reverse();
    const initList: undefined[] = new Array(16).fill(undefined);

    return [...colors, ...initList].slice(0, 16);
  };

  useEffect(() => {
    setUsedColorList(sliceAndPadArray(usedColors));
  }, [usedColors]);

  const { changeStyleHandler } = useTextFormatting();

  const changeColorHandler = (color: string | undefined) => {
    if (!color) return;

    if (type === 'text') changeStyleHandler('color', color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex h-[25px] items-center justify-center gap-1 pr-3">
          <button
            className={`!h-[20px] !w-[20px] rounded-md border-2 border-border`}
            style={{ backgroundColor: '#FFFFFF' }}
          />
          <DownIcon width={10} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        asChild
        align="start"
        className={`absolute left-full z-50 -ml-[10px] -mt-[110px] w-[207px] rounded-[8px] bg-white p-2`}
        style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08', zIndex: 10000 }}
      >
        <div className="flex flex-row flex-wrap gap-1">
          {usedColorList.map(color => (
            <button
              disabled={!color}
              onClick={() => changeColorHandler(color)}
              className={`h-[20px] w-[20px] rounded-sm`}
              style={{ backgroundColor: color || '#D9D9D9' }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RecentColorsBox;
