import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DivButton from '@/components/common/Button/DivButton';
import React from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import LoginIcon from '@/components/common/Icon/LoginIcon';
import Link from 'next/link';

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
        className="text-md font-GmarketSans flex w-[300px] justify-start whitespace-nowrap"
      >
        Card Capture
      </button>

      {!isMobile && (
        <ul className="flex flex-row gap-[30px] whitespace-nowrap text-[12px] font-semibold lg:gap-[50px] lg:text-[14px]">
          <button
            onClick={() => {
              trackAmplitudeEvent('nav-pricing-click');
              router.push('/pricing');
            }}
          >
            요금제
          </button>
          <Link href="/templates/all">
            <p onClick={() => trackAmplitudeEvent('nav-click-templates')}>다른 템플릿 보기</p>
          </Link>

          <Link href="/login?create=true">
            <p onClick={() => trackAmplitudeEvent('nav-create-a-click')}>제작하기</p>
          </Link>
        </ul>
      )}

      {!isMobile && (
        <div className="flex w-[300px] flex-row justify-end gap-2.5">
          <div onClick={() => trackAmplitudeEvent('nav-login-click')}>
            <Link href="/login">
              <DivButton type="default" className="h-[40px] w-[110px] rounded-[10px]">
                <LoginIcon width={15} />
                <p className="text-[14px]">Login</p>
              </DivButton>
            </Link>
          </div>

          <Link href="/login?create=true">
            <DivButton
              onClick={() => trackAmplitudeEvent('nav-create-b-click')}
              type="full"
              className="h-[40px] w-[110px] rounded-[10px]"
            >
              <p className="text-[14px]">제작하기</p>
            </DivButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BeforeLoginNav;
