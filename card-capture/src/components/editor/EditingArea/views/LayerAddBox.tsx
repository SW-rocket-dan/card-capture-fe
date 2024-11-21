import TextIcon from '@/components/common/Icon/TextIcon';
import SquareIcon from '@/components/common/Icon/SquareIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useCardsStore } from '@/store/useCardsStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShapeType } from '@/store/useCardsStore/type';
import { useFocusStore } from '@/store/useFocusStore';
import React from 'react';
import { commandUtils } from '@/utils';

const LayerAddBox = ({ cardId }: { cardId: number }) => {
  /**
   * 새로운 Text Layer를 추가하는 로직
   */
  const addTextLayerHandler = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();

    commandUtils.dispatchCommand('ADD_LAYER', {
      cardId,
      type: 'text',
    });
  };

  /**
   * 새로운 Shape Layer를 추가하는 로직
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);

  const addShapeLayerHandler = (e: React.PointerEvent | React.MouseEvent, type: ShapeType) => {
    e.stopPropagation();

    commandUtils.dispatchCommand('ADD_LAYER', {
      cardId: focusedCardId,
      type: 'shape',
      content: { type: type },
    });
  };

  return (
    <div className="flex cursor-pointer flex-row items-center justify-center gap-[8px] rounded-[8px] bg-white px-[5px] py-[5px]">
      <div className="flex h-[25px] w-[25px] items-center justify-center hover:text-main" onClick={addTextLayerHandler}>
        <TextIcon width={13} />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-[25px] w-[25px] cursor-pointer flex-row items-center justify-center gap-1 hover:text-main">
            <SquareIcon width={12} />
            <DownIcon width={7} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="mt-2 flex flex-row p-1.5" style={{ zIndex: 10000 }}>
          <div className="flex flex-row gap-[5px]">
            <button
              onClick={e => addShapeLayerHandler(e, 'circle')}
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] hover:bg-itembg"
            >
              <div className="h-[20px] w-[20px] rounded-full bg-gray7" />
            </button>
            <button
              onClick={e => addShapeLayerHandler(e, 'triangle')}
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] hover:bg-itembg"
            >
              <div
                className="h-[18px] w-[18px] bg-gray7"
                style={{
                  position: 'absolute',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                }}
              />
            </button>
            <button
              onClick={e => addShapeLayerHandler(e, 'rect')}
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] hover:bg-itembg"
            >
              <div className="h-[18px] w-[18px] bg-gray7" />
            </button>
            <button
              onClick={e => addShapeLayerHandler(e, 'star')}
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] hover:bg-itembg"
            >
              <div
                className="h-[22px] w-[22px] bg-gray7"
                style={{
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
              />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LayerAddBox;
