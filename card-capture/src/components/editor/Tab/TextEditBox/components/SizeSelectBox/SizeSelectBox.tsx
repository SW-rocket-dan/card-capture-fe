import { useState } from 'react';
import DownIcon from '@/components/common/Icon/DownIcon';
import UpIcon from '@/components/common/Icon/UpIcon';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import useTextFormatting from '@/components/editor/Tab/TextEditBox/hooks/useTextFormatting';
import useClickOutside from '@/hooks/useClickOutside';

type SizeSelectBoxProps = {
  sizeList: string[];
};

const SizeSelectBox = ({ sizeList }: SizeSelectBoxProps) => {
  /**
   * 사이즈 드롭다운을 여닫는 click handler
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * 선택된 사이즈를 텍스트에 적용하는 로직
   */
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { changeStyleHandler } = useTextFormatting();

  const selectSizeHandler = (idx: number) => {
    setSelectedIndex(idx);
    changeStyleHandler('size', sizeList[idx]);
  };

  // @TODO 크기 숫자로 입력받는 것과 Small,Large 선택지도 만들어야 함

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button onClick={openHandler} className="flex min-w-36 flex-row justify-between rounded-md bg-itembg p-[10px]">
        <p>{sizeList[selectedIndex].slice(0, -2)}</p>
        {isOpen ? <UpIcon width={15} className="text-gray1" /> : <DownIcon width={15} className="text-gray1" />}
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-[10px] flex w-full max-w-36 flex-col overflow-hidden rounded-xl bg-white"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <ul className="flex max-h-48 flex-col overflow-y-auto">
            {sizeList.map((size, index) =>
              selectedIndex === index ? (
                <button className="flex flex-row items-center justify-between bg-main px-[12px] py-[8px]">
                  <p className="text-white">{size.slice(0, -2)}</p>
                  <CheckIcon className="text-white" width={12} />
                </button>
              ) : (
                <button
                  onClick={() => selectSizeHandler(index)}
                  className="flex justify-start px-[12px] py-[8px] hover:bg-itembg"
                >
                  {size.slice(0, -2)}
                </button>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SizeSelectBox;
