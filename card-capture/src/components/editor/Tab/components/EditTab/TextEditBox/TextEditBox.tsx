import FontSelectBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/FontSelectBox/FontSelectBox';
import { availableFontFamily, availableFontSize } from '@/components/editor/EditingArea/components/TextBox/TextFormat';
import SizeSelectBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import FormatBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/FormatBox/FormatBox';
import StyleBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/StyleBox/StyleBox';
import OutlineBox from '@/components/editor/Tab/components/EditTab/TextEditBox/components/OutlineBox/OutlineBox';
import OrderBox from '@/components/editor/Tab/components/EditTab/common/OrderBox';
import './TextEditBox.styles.css';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useState } from 'react';

const TextEditBox = ({ focused = false }: { focused?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(focused);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div id="toolbar" className="flex w-full flex-col">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-bold`}
      >
        <p>텍스트</p>
        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-[10px] px-[15px] pb-[20px]">
          <FontSelectBox list={availableFontFamily} />
          <div className="flex flex-row">
            <SizeSelectBox sizeList={availableFontSize} />
            <FormatBox />
          </div>
          <StyleBox />
          <OutlineBox />
          <OrderBox />
        </div>
      )}
      <div className="w-full !border-b-[1px] border-border" />
    </div>
  );
};

export default TextEditBox;
