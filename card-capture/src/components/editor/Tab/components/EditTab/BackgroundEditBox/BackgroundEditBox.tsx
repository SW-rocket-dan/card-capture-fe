import { useEffect, useRef, useState } from 'react';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import OpacityButton from '@/components/editor/Tab/components/EditTab/common/OpacityButton';
import ImageButton from '@/components/editor/Tab/components/EditTab/common/ImageButton';
import ColorButton from '@/components/editor/Tab/components/EditTab/common/ColorButton';
import { IColor, useColor } from 'react-color-palette';
import { INITIAL_CARD, useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';
import useImageUploader from '@/hooks/useImageUploader';
import BackgroundDeleteBox from '@/components/editor/Tab/components/EditTab/BackgroundEditBox/components/BackgroundDeleteBox';
import { commandUtils } from '@/utils';
import { Background } from '@/store/useCardsStore/type';

const BackgroundEditBox = ({ focused = false }: { focused?: boolean }) => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const background = useCardsStore(state => state.getBackground(focusedCardId));

  /**
   * 배경 색상과 투명도가 변경되면 store에 업데이트 하는 로직
   */
  const [color, setColor] = useColor(background?.color || '#FFFFFF');
  const [opacity, setOpacity] = useState<number>(background?.opacity || 100);

  const changeColorHandler = (newColor: IColor) => {
    commandUtils.dispatchCommand('MODIFY_BACKGROUND', {
      cardId: focusedCardId,
      backgroundData: { color: newColor.hex, opacity },
      initialBackgroundData: background || INITIAL_CARD.background,
    });
  };

  const changeOpacityHandler = (newOpacity: number) => {
    commandUtils.dispatchCommand('MODIFY_BACKGROUND', {
      cardId: focusedCardId,
      backgroundData: { color: color.hex, opacity: newOpacity },
      initialBackgroundData: background || INITIAL_CARD.background,
    });
  };

  /**
   * 드롭다운 열고 닫는 로직
   */
  const [isOpen, setIsOpen] = useState<boolean>(focused);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 이미지 받아와서 서버에 저장하고, store에 둥록허는 hook
  const { addBackgroundImageHandler } = useImageUploader();

  return (
    <div className="flex w-full flex-col border-b-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        <p>배경</p>
        <div className="flex flex-row gap-3">
          <ColorButton
            color={color}
            setColor={changeColorHandler}
            className="h-4 w-20 rounded-[5px]"
            direction="right"
          />
          {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-[12px] px-[15px] pb-[20px]">
          {background?.url === '' ? <ImageButton onChangeImage={addBackgroundImageHandler} /> : <BackgroundDeleteBox />}

          <OpacityButton opacity={opacity} setOpacity={changeOpacityHandler} />
        </div>
      )}
    </div>
  );
};

export default BackgroundEditBox;
