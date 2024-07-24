const PromptTitle = () => {
  return (
    <div className="flex min-h-[150px] w-full flex-col items-center justify-center gap-[10px] bg-bannerbg md:min-h-[190px]">
      <p className="text-[30px] font-bold md:text-[35px]">카드뉴스 제작하기</p>
      <p className="text-[13px] text-gray2">제작에 필요한 정보들을 입력해주세요!</p>
    </div>
  );
};

export default PromptTitle;
