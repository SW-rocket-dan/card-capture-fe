import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import ImageButton from '@/components/editor/Tab/components/ImageButton';
import SizeBox from '@/components/editor/Tab/components/SizeBox';
import OpacityButton from '@/components/editor/Tab/components/OpacityButton';
import OrderBox from '@/components/editor/Tab/components/OrderBox';
import { useState } from 'react';

const IllustrationEditBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(100);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="border-b-[1px]border-border flex w-full flex-col">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-extrabold`}
      >
        <p>일러스트 / 도형</p>
        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[10px] px-[15px] pb-[20px]">
          <SizeBox />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
          <OrderBox />
        </div>
      )}
    </div>
  );
};

export default IllustrationEditBox;
