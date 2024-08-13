import StarsIcon from '@/components/common/Icon/StarsIcon';
import CreateButton from '@/components/common/NavigationBar/components/CreateButton';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';

const BannerButton = () => {
  const { trackAmplitudeEvent } = useAmplitudeContext();

  /**
   * 메인 배너의 제작하기 버튼 클릭에 대한 tracking
   */
  const clickHandler = () => {
    trackAmplitudeEvent('main-create-click');
  };

  return (
    <CreateButton>
      <div
        onClick={clickHandler}
        className="flex cursor-pointer flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[28px] py-[13px] md:px-[32px] md:py-[15px] lg:px-[38px] lg:py-[18px]"
        style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
      >
        <p className="text-[13px] font-medium text-white md:text-[14px] lg:text-[15px]">카드뉴스 AI로 제작하기</p>
        <StarsIcon width={18} className="text-white" />
      </div>
    </CreateButton>
  );
};

export default BannerButton;
