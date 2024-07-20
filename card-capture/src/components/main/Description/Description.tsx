import useIsMobile from '@/hooks/useIsMobile';

const Description = () => {
  const { isMobile } = useIsMobile();

  return (
    <div className="flex h-fit w-full items-center justify-center bg-white px-5 lg:h-dvh">
      <div className="flex flex-col items-center justify-center gap-[40px] py-[100px] lg:flex-row lg:gap-[120px] 2xl:gap-[170px]">
        <div className="xs:w-[340px] flex w-[300px] flex-col items-center justify-start gap-[30px] sm:w-[500px] md:gap-[40px] 2xl:w-[700px] 2xl:gap-[50px]">
          {/* 큰 제목과 작은 설명 부분 */}
          <div className="flex w-full flex-col gap-[20px] whitespace-nowrap">
            <div className="xs:text-[26px] flex flex-col text-[24px] font-bold leading-[40px] md:text-[40px] md:leading-[60px] 2xl:text-[50px] 2xl:leading-[75px]">
              <p className="font-extrabold text-main">FAST, EASY, SIMPLE</p>
              <p>짧은 시간안에 적은 편집으로</p>
              <p>쉽게 카드뉴스를 제작할 수 있는</p>
            </div>

            <p className="xs:text-sm xs:leading-7 whitespace-normal text-xs font-light leading-5 text-gray2 md:whitespace-nowrap md:text-base 2xl:text-lg">
              SNS 홍보용 카드 뉴스가 필요하신가요? 간단하게 만들고 싶으신가요? {!isMobile && <br />}
              인스타그램 등 다양한 SNS에서 활용할 수 있는 카드 뉴스 제작을 도와드립니다!
            </p>
          </div>

          {/* 추가 설명 창 부분 */}
          <div className="bg-bannerbg xs:text-[14px] xs:leading-7 xs:py-[30px] w-full rounded-[15px] px-[20px] py-[25px] text-[13px] leading-6 text-gray2 md:px-[25px] md:py-[30px] md:text-[16px] 2xl:text-[20px] 2xl:leading-9">
            Card Capture는 <span className="font-bold">LLM 생성형 멀티모달 AI</span>를 기반으로 하여{' '}
            {!isMobile && <br />}
            카드뉴스의 배치, 글꼴, 색상을 추천하며, AI 생성 후 <span className="font-bold">후편집</span>이 가능하고{' '}
            {!isMobile && <br />}
            일러스트와 배경 <span className="font-bold">재생성 기능</span>을 제공합니다.
          </div>
        </div>

        {/* 동영상 부분  */}
        <div className="xs:h-[210px] xs:w-[340px] h-[185px] w-[300px] rounded-[20px] bg-light-gray drop-shadow-lg sm:h-[320px] sm:w-[510px] 2xl:h-[430px] 2xl:w-[700px]">
          {/* 사용 영상 gif 들어갈 자리 */}
        </div>
      </div>
    </div>
  );
};

export default Description;
