import MagicIcon from '@/components/common/Icon/MagicIcon';

const ResultTitle = () => {
  return (
    <div
      className="flex min-h-[130px] w-full flex-row items-center justify-center gap-[15px] md:min-h-[150px]"
      style={{ background: 'linear-gradient(180deg, #E9E8FF 0%, rgba(245, 245, 251, 0) 100%)' }}
    >
      <MagicIcon width={38} />
      <p className="text-[25px] font-bold md:text-[30px]">AI가 열심히 카드 포스터를 만들었어요!</p>
    </div>
  );
};

export default ResultTitle;
