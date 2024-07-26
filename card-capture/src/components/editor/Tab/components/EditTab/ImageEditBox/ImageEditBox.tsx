import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import ImageButton from '@/components/editor/Tab/components/EditTab/common/ImageButton';
import OpacityButton from '@/components/editor/Tab/components/EditTab/common/OpacityButton';
import { useState } from 'react';
import OrderBox from '@/components/editor/Tab/components/EditTab/common/OrderBox';
import SizeBox from '@/components/editor/Tab/components/EditTab/common/SizeBox';
import useImageUploader from '@/hooks/useImageUploader';

const ImageEditBox = ({ focused = false }: { focused?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(focused);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const [opacity, setOpacity] = useState<number>(100);

  /**
   * 새로운 Image Layer를 추가하는 로직
   */
  const { addImageLayerHandler } = useImageUploader();

  return (
    <div className="flex w-full flex-col border-b-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        <p>이미지</p>
        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[10px] px-[15px] pb-[20px]">
          <ImageButton onChangeImage={addImageLayerHandler} />
          <SizeBox />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
          <OrderBox />
        </div>
      )}
    </div>
  );
};

export default ImageEditBox;
