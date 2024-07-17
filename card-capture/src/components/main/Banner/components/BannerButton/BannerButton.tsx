import StarsIcon from '@/components/common/Icon/StarsIcon';

const BannerButton = () => {
  return (
    <button
      className="flex flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[38px] py-[18px]"
      style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
    >
      <p className="text-[15px] font-medium text-white">카드뉴스 AI로 제작하기</p>
      <StarsIcon width={18} className="text-white" />
    </button>
  );
};

export default BannerButton;
