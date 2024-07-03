import { useState } from 'react';
import DownArrowIcon from '@/components/common/Icon/DownArrowIcon';
import UpArrowIcon from '@/components/common/Icon/UpArrowIcon';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import useTextFormatting from '@/components/editor/Tab/TextEditBox/hooks/useTextFormatting';

type SizeSelectBoxProps = {
  sizeList: string[];
};

const SizeSelectBox = ({ sizeList }: SizeSelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { changeStyleHandler } = useTextFormatting();

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const selectSizeHandler = (idx: number) => {
    setSelectedIndex(idx);
    changeStyleHandler('size', sizeList[idx]);
  };

  // @TODO 크기 숫자로 입력받는 것과 Small,Large 선택지도 만들어야 함

  return (
    <div className="relative">
      <div onClick={openHandler} className="flex min-w-36 flex-row justify-between rounded-md bg-itembg p-[10px]">
        <p>{sizeList[selectedIndex].slice(0, -2)}</p>
        {isOpen ? (
          <UpArrowIcon width={15} className="text-gray1" />
        ) : (
          <DownArrowIcon width={15} className="text-gray1" />
        )}
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-[10px] flex w-full max-w-36 flex-col overflow-hidden rounded-xl bg-white"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <ul className="flex max-h-48 flex-col overflow-y-auto">
            {sizeList.map((size, index) =>
              selectedIndex === index ? (
                <li className="flex flex-row justify-between bg-main px-[12px] py-[8px]">
                  <p className="text-white">{size.slice(0, -2)}</p>
                  <CheckIcon className="text-white" width={12} />
                </li>
              ) : (
                <li onClick={() => selectSizeHandler(index)} className="px-[12px] py-[8px] hover:bg-itembg">
                  {size.slice(0, -2)}
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SizeSelectBox;
