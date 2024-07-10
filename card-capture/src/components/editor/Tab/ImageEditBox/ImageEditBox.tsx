import ColorButton from '@/components/editor/Tab/components/ColorButton';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import ImageButton from '@/components/editor/Tab/components/ImageButton';
import OpacityButton from '@/components/editor/Tab/components/OpacityButton';
import { useState } from 'react';
import OrderBox from '@/components/editor/Tab/components/OrderBox';
import SizeBox from '@/components/editor/Tab/components/SizeBox';

const ImageEditBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(100);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="border-border' flex w-full flex-col border-b-[1px] border-t-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[70px] flex-row items-center justify-between px-[20px] py-[20px] text-[17px] font-extrabold`}
      >
        <p>이미지</p>
        {isOpen ? <UpIcon width={15} className="text-gray1" /> : <DownIcon width={15} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[12px] px-[15px] pb-[20px]">
          <ImageButton />
          <SizeBox />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
          <OrderBox />
        </div>
      )}
    </div>
  );
};

export default ImageEditBox;
