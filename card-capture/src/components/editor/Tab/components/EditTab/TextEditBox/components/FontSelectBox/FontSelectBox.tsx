import { useState } from 'react';
import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import FindIcon from '@/components/common/Icon/FindIcon';
import ClockIcon from '@/components/common/Icon/ClockIcon';
import FontIcon from '@/components/common/Icon/FontIcon';
import useTextFormatting from '@/components/editor/Tab/components/EditTab/TextEditBox/hooks/useTextFormatting';
import useClickOutside from '@/hooks/useClickOutside';

type SelectBoxProps = {
  list: string[];
};

const FontSelectBox = ({ list }: SelectBoxProps) => {
  /**
   * 폰트 리스트 드롭다운을 여는 click handler
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 선택된 폰트 관리하는 state
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [recentFontIndex, setRecentFontIndex] = useState<number[]>([]); // 최근 사용한 폰트 2개
  const recentFonts = recentFontIndex.map(index => ({
    index,
    font: list[index],
  }));

  // 텍스트 스타일 적용 hook
  const { changeStyleHandler } = useTextFormatting();

  /**
   * 선택된 폰트의 인덱스를 저장하고, 폰트를 적용하는 로직
   */
  const selectFontHandler = (idx: number) => {
    setSelectedIndex(idx);
    changeStyleHandler('font', list[idx]);

    // 최근 사용된 폰트 2개만 저장하는 로직
    if (!recentFontIndex.includes(idx)) {
      setRecentFontIndex(prev => [idx, prev[0]]);
    }
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        className="flex h-full w-full flex-row items-center justify-between rounded-[8px] bg-itembg p-[10px]"
        onClick={openHandler}
      >
        <p className="text-[13px]">{list[selectedIndex]}</p>

        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={15} className="text-gray1" />}
      </button>

      {/* 폰트 셀렉트 박스 */}
      {isOpen && (
        <div
          className="absolute z-10 mt-[10px] flex w-full flex-col gap-[10px] rounded-xl bg-white p-[10px]"
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-row items-center justify-between gap-3 rounded-[8px] border-[1px] border-border px-[10px] py-[9px]">
            <input type="text" className="flex-1 text-[11px] outline-none" placeholder="글꼴 검색" />
            <FindIcon width={14} />
          </div>

          {/* 최근 사용 글꼴 박스*/}
          <div>
            <div className="flex flex-row gap-[6px] px-[3px] py-[6px]">
              <ClockIcon width={14} className="text-gray2" />
              <p className="text-[11px] text-gray2">최근사용 글꼴</p>
            </div>
            <ul className="flex flex-col">
              {recentFonts.map(({ index, font }) => (
                <button
                  key={index + font}
                  className="flex cursor-pointer justify-start p-1.5 hover:bg-gray-100"
                  onClick={() => selectFontHandler(index)}
                >
                  <div className={`ql-font-${font} text-xs font-medium`}>{font}</div>
                </button>
              ))}
            </ul>
          </div>

          {/*모든 글꼴 박스*/}
          <div>
            <div className="flex flex-row gap-[6px] px-[3px] py-[7px]">
              <FontIcon width={14} className="text-gray2" />
              <p className="text-[11px] text-gray2">모든 글꼴</p>
            </div>
            <ul className="flex max-h-32 flex-col overflow-y-auto">
              {list.map((fontFamily, idx) => (
                <button
                  key={idx}
                  className="flex cursor-pointer justify-start p-1.5 hover:bg-gray-100"
                  onClick={() => selectFontHandler(idx)}
                >
                  <div className={`ql-font-${fontFamily} text-xs font-medium`}>{fontFamily}</div>
                </button>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelectBox;
