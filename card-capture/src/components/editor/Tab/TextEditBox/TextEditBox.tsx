import FontSelectBox from '@/components/editor/Tab/TextEditBox/components/FontSelectBox/FontSelectBox';
import { availableFontFamily, availableFontSize } from '@/components/text/TextFormat';
import SizeSelectBox from '@/components/editor/Tab/TextEditBox/components/SizeSelectBox/SizeSelectBox';
import FormatBox from '@/components/editor/Tab/TextEditBox/components/FormatBox/FormatBox';
import StyleBox from '@/components/editor/Tab/TextEditBox/components/StyleBox/StyleBox';
import OutlineBox from '@/components/editor/Tab/TextEditBox/components/OutlineBox/OutlineBox';
import OrderBox from '@/components/editor/Tab/components/OrderBox';
import './TextEditBox.styles.css';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useState } from 'react';

const TextEditBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div id="toolbar" className="flex w-full flex-col">
      <div
        onClick={openHandler}
        className={`flex h-[70px] flex-row items-center justify-between px-[20px] py-[19px] text-[17px] font-bold ${!isOpen && 'border-b-[1px] border-border'}`}
      >
        <p>텍스트</p>
        {isOpen ? <UpIcon width={15} className="text-gray1" /> : <DownIcon width={15} className="text-gray1" />}
      </div>

      {isOpen && (
        <div className="flex flex-col gap-[12px] px-[15px] pb-[20px]">
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
    </div>
  );
};

export default TextEditBox;
