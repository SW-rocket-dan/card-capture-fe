import StarsIcon from '@/components/common/Icon/StarsIcon';

const PromptPreview = () => {
  return (
    <div className="flex min-w-[300px] flex-col items-center justify-start gap-[30px] lg:w-[400px]">
      <div className="flex w-full flex-col gap-[20px]">
        <p className="text-[15px] font-semibold">미리보기</p>
        {/* 미리보기 화면 */}
        <div className="aspect-square w-full rounded-[10px] bg-border"></div>
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
