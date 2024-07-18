import BeforeLoginNav from '@/components/common/NavigationBar/BeforeLoginNav';
import { useEffect, useState } from 'react';

type NavigationBarProps = {
  isTransparent: boolean;
};

const NavigationBar = ({ isTransparent = false }: NavigationBarProps) => {
  /**
   * 스크롤 위치에 따라서 네비게이션 바의 배경 색을 변경하는 로직
   * 메인 화면에서 위치에 따라서 투명 -> 흰 배경으로 바뀌어야 해서 구현
   */
  const [navBg, setNavBg] = useState('bg-transparent');

  const scrollNavHandler = () => {
    if (!isTransparent) return;

    if (window.scrollY > 500) {
      setNavBg('bg-white');
    } else {
      setNavBg('bg-transparent');
    }
  };

  useEffect(() => {
    if (isTransparent) {
      window.addEventListener('scroll', scrollNavHandler);
    }

    return () => {
      if (isTransparent) {
        window.removeEventListener('scroll', scrollNavHandler);
      }
    };
  }, [isTransparent]);

  /**
   * 반응형을 위해 window.innerWidth를 저장하여 모바일 화면에서는 버튼들이 숨겨지도록 처리
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

  // 너비가 640px 이하일 때 요소들을 숨김
  const isMobile = windowWidth <= 640;

  return (
    <div
      className={`fixed left-0 top-0 z-20 flex min-h-[65px] w-full items-center justify-between border-b-[1px] border-border px-[30px] ${isTransparent ? navBg : 'bg-white'}`}
    >
      <div className="text-md whitespace-nowrap">Card Capture</div>
      {!isMobile && <BeforeLoginNav />}
    </div>
  );
};

export default NavigationBar;
