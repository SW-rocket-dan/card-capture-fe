import { useEffect, useState } from 'react';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import OpacityButton from '@/components/editor/Tab/components/OpacityButton';
import ImageButton from '@/components/editor/Tab/components/ImageButton';
import ColorButton from '@/components/editor/Tab/components/ColorButton';
import { useColor } from 'react-color-palette';
import { useCardsStore } from '@/store/useCardsStore';
import { useFocusStore } from '@/store/useFocusStore';

const BackgroundEditBox = () => {
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const background = useCardsStore(state => state.getBackground(focusedCardId));
  const setBackground = useCardsStore(state => state.setBackground);

  const [color, setColor] = useColor(background?.color || '#FFFFFF');
  const [opacity, setOpacity] = useState<number>(100);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    setBackground(focusedCardId, { ...background, color: color.hex, opacity: opacity, url: '' });
  }, [color, opacity]);

  return (
    <div className="flex w-full flex-col border-b-[1px] border-t-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-extrabold`}
      >
        <p>배경</p>
        <div className="flex flex-row gap-3">
          <ColorButton color={color} setColor={setColor} className="h-4 w-20 rounded-[5px]" direction="right" />
          {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[12px] px-[15px] pb-[20px]">
          <ImageButton />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
        </div>
      )}
    </div>
  );
};

export default BackgroundEditBox;