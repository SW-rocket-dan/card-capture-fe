import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import SizeBox from '@/components/editor/Tab/components/EditTab/common/SizeBox';
import OpacityButton from '@/components/editor/Tab/components/EditTab/common/OpacityButton';
import OrderBox from '@/components/editor/Tab/components/EditTab/common/OrderBox';
import { useState } from 'react';
import IllustrationBox from '@/components/editor/Tab/components/EditTab/IllustrationEditBox/components/IllustrationBox';
import ShapeModalBox from '@/components/editor/Tab/components/EditTab/IllustrationEditBox/components/ShapeModalBox';

const IllustrationEditBox = ({ focused = false }: { focused?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(focused);
  const [opacity, setOpacity] = useState<number>(100);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="flex w-full flex-col border-b-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        <p>일러스트 / 도형</p>
        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[10px] px-[15px] pb-[20px]">
          <IllustrationBox />
          <ShapeModalBox />
          <SizeBox type="shape" />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
          {/*<OrderBox />*/}
        </div>
      )}
    </div>
  );
};

export default IllustrationEditBox;
