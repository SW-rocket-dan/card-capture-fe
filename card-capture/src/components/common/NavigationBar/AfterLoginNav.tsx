import TempProfileIcon from '@/components/common/Icon/TempProfileIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import UpIcon from '@/components/common/Icon/UpIcon';

const AfterLoginNav = () => {
  /**
   * 드롭다운 열고 닫는 로직
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className="flex w-full flex-row items-center justify-between gap-[30px] lg:gap-[60px]">
      <div className="text-md w-[300px] whitespace-nowrap">Card Capture</div>
      <ul className="flex flex-row gap-[30px] whitespace-nowrap text-[12px] font-semibold lg:gap-[50px] lg:text-[14px]">
        <li>요금제</li>
        <li>다른 템플릿 보기</li>
        <li>제작하기</li>
      </ul>

      <div ref={ref} className="relative">
        <div className="flex w-[300px] flex-row justify-end gap-1.5" onClick={openHandler}>
          <TempProfileIcon width={40} height={40} />
          {isOpen ? (
            <UpIcon width={15} className="text-defaultBlack" />
          ) : (
            <DownIcon width={15} className="text-defaultBlack" />
          )}
        </div>

        {isOpen && (
          <div
            className={`absolute right-0 z-20 mt-[20px] flex w-[150px] flex-col rounded-lg bg-white py-[5px] text-[14px] font-medium drop-shadow-md`}
            style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
          >
            <button className="hover:bg-bannerbg flex h-[40px] w-full items-center justify-start px-[20px]">
              마이페이지
            </button>
            <button className="hover:bg-bannerbg flex h-[40px] w-full items-center justify-start px-[20px] text-main">
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterLoginNav;
