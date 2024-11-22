import TempProfileIcon from '@/components/common/Icon/TempProfileIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import React, { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import UpIcon from '@/components/common/Icon/UpIcon';
import useIsMobile from '@/hooks/useIsMobile';
import { usePathname, useRouter } from 'next/navigation';
import { tokenUtils, userUtils } from '@/utils';
import userApi from '@/api/userApi';
import { useQuery } from '@tanstack/react-query';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Button from '@/components/common/Button/Button';
import { templateApi } from '@/api';
import { User } from '@/types';
import Link from 'next/link';

const AfterLoginNav = () => {
  const router = useRouter();

  /**
   * 로그인 전 네비게이션 바에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  /**
   * 드롭다운 열고 닫는 로직
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * 경로에 따라 로그아웃 후 이동되는 페이지 다르게 설정
   * 메인 화면에 있는데 '/'로 이동하면 페이지 재렌더링 되지 않음
   */
  const pathname = usePathname();

  const logoutHandler = () => {
    if (window.confirm('로그아웃 시 메인페이지로 이동됩니다. 정말 로그아웃하시겠습니까?')) {
      tokenUtils.clearTokens();

      if (pathname === '/') router.refresh();
      else router.push('/');
    }
  };

  const createEmptyTemplateHandler = async () => {
    const { templateId, editor } = await templateApi.createEmptyTemplate();

    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push(`/editor/${templateId}`);
  };

  /**
   * 보유한 이용권의 개수를 가져오는 로직
   */
  const { data: ticketData } = useQuery({
    queryKey: ['product-categories'],
    queryFn: userApi.getProductCategories,
    enabled: isOpen,
  });

  const ticketCount = userUtils.getTicketCount(ticketData);

  /**
   * 사용자의 정보를 가져오는 로직
   */
  const { data: userInfo } = useQuery<User>({
    queryKey: ['user-info'],
    queryFn: userApi.getUserData,
  });

  // 반응형 적용을 위해 모바일 화면인지 확인하는 hook
  const { isMobile } = useIsMobile();

  // 컴포넌트 외부 클릭시 모달 닫는 hook
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className="flex w-full flex-row items-center justify-between gap-[30px] lg:gap-[60px]">
      <button
        onClick={() => {
          trackAmplitudeEvent('nav-logo-click');
          router.push('/');
        }}
        className="text-md flex w-[300px] justify-start whitespace-nowrap"
      >
        Card Capture
      </button>

      {!isMobile && (
        <ul className="flex cursor-pointer flex-row gap-[30px] whitespace-nowrap text-[12px] font-semibold lg:gap-[50px] lg:text-[14px]">
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
          <button
            onClick={() => {
              trackAmplitudeEvent('nav-create-c-click');
              router.push('/prompt');
            }}
          >
            제작하기
          </button>
        </ul>
      )}

      {!isMobile && (
        <div ref={ref} className="relative">
          <div className="flex w-[300px] flex-row justify-end gap-4">
            <Button onClick={createEmptyTemplateHandler} type="full" className="h-[38px] w-[130px] rounded-[7px]">
              <p className="text-[12.5px] font-medium">에디터 사용하기</p>
            </Button>
            <div className="flex cursor-pointer flex-row justify-end gap-1.5" onClick={openHandler}>
              {userInfo ? (
                <img src={userInfo?.picture} alt="user-image" width={38} height={38} className="rounded-full" />
              ) : (
                <TempProfileIcon width={38} height={38} />
              )}
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
              <div className="m-[10px] flex h-[40px] items-center justify-between rounded-md border border-border px-3">
                <p className="text-[11px] text-gray2">보유 이용권 수</p>
                <div className="w-[30px] rounded-sm bg-bannerbg text-center">
                  <span className="text-xs">{ticketCount}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  trackAmplitudeEvent('nav-mypage-click');
                  router.push('/mypage');
                }}
                className="flex h-[40px] w-full items-center justify-start px-[20px] hover:bg-bannerbg"
              >
                마이페이지
              </button>
              <button
                onClick={() => {
                  trackAmplitudeEvent('nav-logout-click');
                  logoutHandler();
                }}
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
