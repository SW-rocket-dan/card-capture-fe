import { useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import useClickOutside from '@/hooks/useClickOutside';

const IllustrationBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative">
      <div className="flex flex-col gap-2 rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs text-gray4">일러스트</p>
          <button onClick={openHandler} className="flex flex-row text-[10px] text-gray4">
            더보기 &gt;{' '}
          </button>
        </div>
        <div className="flex flex-row gap-[5px]">
          <div className="bg-gray8 h-[42px] w-[42px] cursor-pointer overflow-hidden rounded-[5px]" />
          <div className="bg-gray8 h-[42px] w-[42px] cursor-pointer overflow-hidden rounded-[5px]" />
          <div className="bg-gray8 h-[42px] w-[42px] cursor-pointer overflow-hidden rounded-[5px]" />
          <div className="bg-gray8 h-[42px] w-[42px] cursor-pointer overflow-hidden rounded-[5px]" />
          <div className="bg-gray8 h-[42px] w-[42px] cursor-pointer overflow-hidden rounded-[5px]" />
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className={`absolute left-full z-20 -mt-[100px] ml-[22px] w-[270px] rounded-[8px] bg-white`}
          style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
        >
          <div className="flex flex-row justify-between border-b-[1px] border-border px-[15px] py-[10px] font-extrabold">
            <p className="text-xs">일러스트</p>
            <button onClick={openHandler}>
              <CloseIcon width={8} className="text-gray2" />
            </button>
          </div>
          <div className="flex flex-col gap-[10px] px-[15px] pb-[15px] pt-[10px] text-[11px] text-gray2">
            <div className="gap flex flex-col">
              <p className="py-[5px]">최근 사용</p>
              <div className="flex flex-row justify-between">
                <div className="bg-gray8 h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px]" />
                <div className="bg-gray8 h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px]" />
                <div className="bg-gray8 h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px]" />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="py-[5px]">모든 일러스트</p>
              <div className="flex flex-row justify-between">
                <div className="bg-gray8 h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px]" />
                <div className="bg-gray8 h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px]" />
                <div className="bg-gray8 h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IllustrationBox;
