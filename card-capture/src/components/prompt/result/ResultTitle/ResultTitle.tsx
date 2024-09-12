import MagicIcon from '@/components/common/Icon/MagicIcon';
import useIsMobile from '@/hooks/useIsMobile';

const ResultTitle = () => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className="flex min-h-[150px] w-full flex-col items-center justify-center gap-2 py-5 md:min-h-[150px] md:flex-row md:gap-[15px]"
      style={{ background: 'linear-gradient(180deg, #E9E8FF 0%, rgba(245, 245, 251, 0) 100%)' }}
    >
      <MagicIcon width={isMobile ? 30 : 38} />
      <p className="text-center text-[20px] font-bold sm:text-[22px] md:text-[30px]">
        AI가 열심히 {isMobile && <br />} 카드 포스터를 만들었어요!
      </p>
    </div>
  );
};

export default ResultTitle;
