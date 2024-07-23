import StarsIcon from '@/components/common/Icon/StarsIcon';

const PromptPreview = () => {
  return (
    <div className="flex w-[400px] flex-col items-center justify-start gap-[30px]">
      <div className="flex flex-col gap-[20px]">
        <p className="text-[15px] font-semibold">미리보기</p>
        <div className="h-[400px] w-[400px] rounded-[10px] bg-border"></div>
      </div>
      <button
        className="flex flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[40px] py-[18px]"
        style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
      >
        <p className="text-[13px] font-medium text-white">카드뉴스 제작하기</p>
        <StarsIcon width={18} className="text-white" />
      </button>
    </div>
  );
};

export default PromptPreview;
