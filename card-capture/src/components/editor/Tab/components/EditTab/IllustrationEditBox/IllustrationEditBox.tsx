import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import SizeBox from '@/components/editor/Tab/components/EditTab/common/SizeBox';
import OpacityButton from '@/components/editor/Tab/components/EditTab/common/OpacityButton';
import OrderBox from '@/components/editor/Tab/components/EditTab/common/OrderBox';
import { useState } from 'react';
import IllustrationBox from '@/components/editor/Tab/components/EditTab/IllustrationEditBox/components/IllustrationBox';
import ShapeModalBox from '@/components/editor/Tab/components/EditTab/IllustrationEditBox/components/ShapeModalBox';
import useLayerStyles from '@/components/editor/Tab/hooks/useLayerStyles';

const IllustrationEditBox = ({ focused = false }: { focused?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(focused);
  const [opacity, setOpacity] = useState<number>(100);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * 현재 선택된 이미지 데이터를 가져오고, 이미지를 설정하는 로직이 담긴 hook
   */
  const { position, changePositionHandler } = useLayerStyles();

  return (
    <div className="flex w-full flex-col border-b-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-extrabold`}
      >
        <p>일러스트 / 도형</p>
        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[10px] px-[15px] pb-[20px]">
          <IllustrationBox />
          <ShapeModalBox />
          <SizeBox />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
          <OrderBox />
        </div>
      )}
    </div>
  );
};

export default IllustrationEditBox;
