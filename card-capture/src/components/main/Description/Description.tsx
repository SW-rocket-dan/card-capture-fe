const Description = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-white">
      <div className="flex flex-row items-center justify-center gap-[120px]">
        <div className="flex w-[500px] flex-col gap-[40px]">
          <div className="gap flex flex-col gap-[20px]">
            <div className="flex flex-col whitespace-nowrap text-[40px] font-bold leading-[60px]">
              <p className="font-extrabold text-main">FAST, EASY, SIMPLE</p>
              <p>짧은 시간안에 적은 편집으로</p>
              <p>쉽게 카드뉴스를 제작할 수 있는</p>
            </div>
            <p className="font-light leading-6 text-gray2">
              SNS 홍보용 카드 뉴스가 필요하신가요? 간단하게 만들고 싶으신가요? <br />
              인스타그램 등 다양한 SNS에서 활용할 수 있는 카드 뉴스 제작을 도와드립니다!
            </p>
          </div>

          <div className="bg-bannerbg rounded-[15px] px-[25px] py-[30px] text-[16px] leading-7 text-gray2">
            Card Capture는 <span className="font-bold">LLM 생성형 멀티모달 AI</span>를 기반으로 하여 <br />
            카드뉴스의 배치, 글꼴, 색상을 추천하며, AI 생성 후 <span className="font-bold">후편집</span>이 가능하고
            <br />
            일러스트와 배경 <span className="font-bold">재생성 기능</span>을 제공합니다.
          </div>
        </div>
        <div className="h-[320px] w-[510px] rounded-[20px] bg-light-gray drop-shadow-lg">
          {/* 사용 영상 gif 들어갈 자리 */}
        </div>
      </div>
    </div>
  );
};

export default Description;
