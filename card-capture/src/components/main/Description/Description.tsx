import { useEffect, useState } from 'react';

const Description = () => {
  /**
   * 반응형을 위해 window.innerWidth를 저장하여 모바일 화면에서는 텍스트에 줄바꿈을 넣어줌
   */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // 너비가 768px 이하일 때 요소들을 숨김
  const isMobile = windowWidth <= 768;
  return (
    <div className="flex h-fit w-full items-center justify-center bg-white lg:h-dvh">
      <div className="flex flex-col items-center justify-center gap-[40px] py-[100px] lg:flex-row lg:gap-[120px]">
        <div className="flex w-[350px] flex-col items-center justify-center gap-[30px] sm:w-[420px] md:gap-[40px] lg:w-[500px]">
          <div className="flex w-full flex-col gap-[20px] whitespace-nowrap">
            <div className="flex flex-col text-[26px] font-bold leading-[40px] md:text-[40px] md:leading-[60px]">
              <p className="font-extrabold text-main">FAST, EASY, SIMPLE</p>
              <p>짧은 시간안에 적은 편집으로</p>
              <p>쉽게 카드뉴스를 제작할 수 있는</p>
            </div>
            <p className="whitespace-normal text-sm font-light leading-6 text-gray2 md:whitespace-nowrap md:text-base">
              SNS 홍보용 카드 뉴스가 필요하신가요? 간단하게 만들고 싶으신가요? {!isMobile && <br />}
              인스타그램 등 다양한 SNS에서 활용할 수 있는 카드 뉴스 제작을 도와드립니다!
            </p>
          </div>

          <div className="bg-bannerbg rounded-[15px] px-[20px] py-[30px] text-[14px] leading-7 text-gray2 md:w-[420px] md:px-[25px] md:py-[30px] md:text-[16px] lg:w-[500px]">
            Card Capture는 <span className="font-bold">LLM 생성형 멀티모달 AI</span>를 기반으로 하여{' '}
            {!isMobile && <br />}
            카드뉴스의 배치, 글꼴, 색상을 추천하며, AI 생성 후 <span className="font-bold">후편집</span>이 가능하고{' '}
            {!isMobile && <br />}
            일러스트와 배경 <span className="font-bold">재생성 기능</span>을 제공합니다.
          </div>
        </div>
        <div className="h-[200px] w-[350px] rounded-[20px] bg-light-gray drop-shadow-lg sm:w-[400px] md:h-[320px] md:w-[510px]">
          {/* 사용 영상 gif 들어갈 자리 */}
        </div>
      </div>
    </div>
  );
};

export default Description;
