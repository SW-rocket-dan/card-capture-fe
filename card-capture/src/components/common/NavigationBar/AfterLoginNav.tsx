import TempProfileIcon from '@/components/common/Icon/TempProfileIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import UpIcon from '@/components/common/Icon/UpIcon';
import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuthStore } from '@/store/useAuthStore';
import { tokenUtils } from '@/utils';

const AfterLoginNav = () => {
  const router = useRouter();

  /**
   * 드롭다운 열고 닫는 로직
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * 로그아웃 상태 전역 상태에 등록
   * 네비게이션 바 자동으로 변경되어야 하기 때문에 등록함
   */
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const setIsModalOpen = useAuthStore(state => state.setIsModalOpen);

  const logoutHandler = () => {
    if (window.confirm('로그아웃 시 메인페이지로 이동됩니다. 정말 로그아웃하시겠습니까?')) {
      tokenUtils.clearTokens();
      setIsLoggedIn(false);
      setIsModalOpen(false); // 이전에 redirect하면서 state가 open으로 설정되어 있을 수 있기에 false로 변경

      router.push('/');
    }
  };

  // 반응형 적용을 위해 모바일 화면인지 확인하는 hook
  const { isMobile } = useIsMobile();

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className="flex w-full flex-row items-center justify-between gap-[30px] lg:gap-[60px]">
      <button onClick={() => router.push('/')} className="text-md flex w-[300px] justify-start whitespace-nowrap">
        Card Capture
      </button>

      {!isMobile && (
        <ul className="flex cursor-pointer flex-row gap-[30px] whitespace-nowrap text-[12px] font-semibold lg:gap-[50px] lg:text-[14px]">
          <TooltipProvider>
            <button onClick={() => router.push('/pricing')}>요금제</button>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>다른 템플릿 보기</TooltipTrigger>
              <TooltipContent>
                <p className="font-normal">준비중!</p>
              </TooltipContent>
            </Tooltip>
            <button onClick={() => router.push('/prompt')}>제작하기</button>
          </TooltipProvider>
        </ul>
      )}

      {!isMobile && (
        <div ref={ref} className="relative">
          <div className="w-[300px]">
            <div className="flex cursor-pointer flex-row justify-end gap-1.5" onClick={openHandler}>
              <TempProfileIcon width={38} height={38} />
              {isOpen ? (
                <UpIcon width={15} className="text-defaultBlack" />
              ) : (
                <DownIcon width={15} className="text-defaultBlack" />
              )}
            </div>
          </div>

          {isOpen && (
            <div
              className={`absolute right-0 z-20 mt-[20px] flex w-[150px] flex-col rounded-lg bg-white py-[5px] text-[14px] font-medium drop-shadow-md duration-200 animate-in fade-in-0 zoom-in-95`}
              style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08' }}
            >
              <button
                onClick={() => router.push('/mypage')}
                className="flex h-[40px] w-full items-center justify-start px-[20px] hover:bg-bannerbg"
              >
                마이페이지
              </button>
              <button
                onClick={logoutHandler}
                className="flex h-[40px] w-full items-center justify-start px-[20px] text-main hover:bg-bannerbg"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AfterLoginNav;
