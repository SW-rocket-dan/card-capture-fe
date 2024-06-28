import { useState } from 'react';
import UpArrowIcon from '@/components/common/Icon/UpArrowIcon';
import DownArrowIcon from '@/components/common/Icon/DownArrowIcon';
import FindIcon from '@/components/common/Icon/FindIcon';
import ClockIcon from '@/components/common/Icon/ClockIcon';
import FontIcon from '@/components/common/Icon/FontIcon';

type SelectBoxProps = {
  list: string[];
};

const FontSelectBox = ({ list }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [recentFontIndex, setRecentFontIndex] = useState<number[]>([]);
  const recentFonts = recentFontIndex.map(index => ({
    index,
    font: list[index],
  }));

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  const selectFontHandler = (idx: number) => {
    setSelectedIndex(idx);
    if (!recentFontIndex.includes(idx)) {
      setRecentFontIndex(prev => [idx, ...prev].slice(0, 2));
    }
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row items-center justify-between rounded-md bg-itembg p-[11px]"
        onClick={openHandler}
      >
        <p className="text-[16px]">{list[selectedIndex]}</p>
        {isOpen ? (
          <UpArrowIcon width={12} className="text-gray1" />
        ) : (
          <DownArrowIcon width={12} className="text-gray1" />
        )}
      </div>

      {/* 폰트 셀렉트 박스 */}
      {isOpen && (
        <div
          className="z-3 absolute mt-[10px] flex w-full flex-col gap-[10px] p-[12px]"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-row items-center justify-between gap-3 rounded-[8px] border-[1px] border-border p-[10px]">
            <input type="text" className="flex-1 text-sm outline-none" />
            <FindIcon width={16} />
          </div>

          {/* 최근 사용 글꼴 박스*/}
          <div>
            <div className="flex flex-row gap-[8px] px-[3px] py-[7px]">
              <ClockIcon width={16} className="text-gray2" />
              <p className="text-gray2 text-sm">최근사용 글꼴</p>
            </div>
            <ul className="flex flex-col">
              {recentFonts.map(({ index, font }) => (
                <li className="p-2" onClick={() => selectFontHandler(index)}>
                  {font}
                </li>
              ))}
            </ul>
          </div>

          {/*모든 글꼴 박스*/}
          <div>
            <div className="flex flex-row gap-[8px] px-[3px] py-[7px]">
              <FontIcon width={16} className="text-gray2" />
              <p className="text-gray2 text-sm">모든 글꼴</p>
            </div>
            <ul className="flex max-h-52 flex-col overflow-y-auto">
              {list.map((fontFamily, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => selectFontHandler(idx)}
                >
                  {fontFamily}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelectBox;
