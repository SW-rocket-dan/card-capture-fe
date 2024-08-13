import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import LoginButton from '@/components/common/NavigationBar/components/LoginButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DivButton from '@/components/common/Button/DivButton';
import React from 'react';
import CreateButton from '@/components/common/NavigationBar/components/CreateButton';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';

const BeforeLoginNav = () => {
  const router = useRouter();
  const { isMobile } = useIsMobile();

  /**
   * 로그인 전 네비게이션 바에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  return (
    <div className="flex w-full flex-row items-center justify-between gap-[30px] lg:gap-[60px]">
      <button
        onClick={() => {
          trackAmplitudeEvent('nav-logo-click');
          router.push('/');
        }}
        className="text-md =whitespace-nowrap flex w-[300px] justify-start"
      >
        Card Capture
      </button>

      {!isMobile && (
        <ul className="flex flex-row gap-[30px] whitespace-nowrap text-[12px] font-semibold lg:gap-[50px] lg:text-[14px]">
          <TooltipProvider>
            <button
              onClick={() => {
                trackAmplitudeEvent('nav-pricing-click');
                router.push('/pricing');
              }}
            >
              요금제
            </button>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>다른 템플릿 보기</TooltipTrigger>
              <TooltipContent>
                <p className="font-normal">준비중!</p>
              </TooltipContent>
            </Tooltip>
            <CreateButton>
              <p onClick={() => trackAmplitudeEvent('nav-create-a-click')}>제작하기</p>
            </CreateButton>
          </TooltipProvider>
        </ul>
      )}

      {!isMobile && (
        <div className="flex w-[300px] flex-row justify-end gap-2.5">
          <div onClick={() => trackAmplitudeEvent('nav-login-click')}>
            <LoginButton />
          </div>

          <CreateButton>
            <DivButton
              onClick={() => trackAmplitudeEvent('nav-create-b-click')}
              type="full"
              className="h-[40px] w-[110px] rounded-[10px]"
            >
              <p className="text-[14px]">제작하기</p>
            </DivButton>
          </CreateButton>
        </div>
      )}
    </div>
  );
};

export default BeforeLoginNav;
