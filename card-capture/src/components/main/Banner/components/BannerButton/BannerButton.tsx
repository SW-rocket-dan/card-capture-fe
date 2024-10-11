import StarsIcon from '@/components/common/Icon/StarsIcon';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Link from 'next/link';
import { authUtils } from '@/utils';
import EditIcon from '@/components/common/Icon/EditIcon';
import useIsMobile from '@/hooks/useIsMobile';

const BannerButton = () => {
  const { trackAmplitudeEvent } = useAmplitudeContext();

  /**
   * 메인 배너의 제작하기 버튼 클릭에 대한 tracking
   */
  const clickHandler = () => {
    trackAmplitudeEvent('main-create-click');
  };

  /**
   * 로그인 여부 확인하기
   */
  const isLoggedIn = authUtils.getIsLoggedIn();

  const { isMobile } = useIsMobile();

  return (
    <div className="flex flex-row gap-4">
      {!isMobile && (
        <Link href={'/editor/sample'}>
          <div
            onClick={clickHandler}
            className="flex w-[197px] cursor-pointer flex-row items-center justify-center gap-2 rounded-[40px] bg-white px-[28px] py-[13px] md:w-[214px] md:py-[15px] lg:w-[235.8px] lg:py-[18px]"
            style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.3)' }}
          >
            <p className="text-[13px] font-semibold text-main md:text-[14px] lg:text-[15px]">에디터 체험하기</p>
            <EditIcon width={18} className="text-main" />
          </div>
        </Link>
      )}

      <Link href={isLoggedIn ? '/prompt' : '/login?create=true'}>
        <div
          onClick={clickHandler}
          className="flex cursor-pointer flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[28px] py-[13px] md:px-[32px] md:py-[15px] lg:px-[38px] lg:py-[18px]"
          style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
        >
          <p className="text-[13px] font-medium text-white md:text-[14px] lg:text-[15px]">카드뉴스 AI로 제작하기</p>
          <StarsIcon width={18} className="text-white" />
        </div>
      </Link>
    </div>
  );
};

export default BannerButton;
