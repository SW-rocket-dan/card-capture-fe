import { useState } from 'react';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import OpacityButton from '@/components/editor/Tab/components/OpacityButton';
import ImageButton from '@/components/editor/Tab/components/ImageButton';

const BackgroundEditBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="border-border' flex w-full flex-col border-b-[1px] border-t-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex flex-row items-center justify-between px-[20px] py-[19px] text-[17px] font-extrabold`}
      >
        <p>배경</p>
        {isOpen ? <UpIcon width={15} className="text-gray1" /> : <DownIcon width={15} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[12px] px-[15px] pb-[20px]">
          <ImageButton />
          <OpacityButton />
        </div>
      )}
    </div>
  );
};

export default BackgroundEditBox;
