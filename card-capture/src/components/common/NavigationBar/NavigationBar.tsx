import BeforeLoginNav from '@/components/common/NavigationBar/BeforeLoginNav';
import { useEffect, useState } from 'react';
import AfterLoginNav from '@/components/common/NavigationBar/AfterLoginNav';

type NavigationBarProps = {
  isTransparent: boolean;
};

const NavigationBar = ({ isTransparent = false }: NavigationBarProps) => {
  /**
   * 스크롤 위치에 따라서 네비게이션 바의 배경 색을 변경하는 로직
   * 메인 화면에서 위치에 따라서 투명 -> 흰 배경으로 바뀌어야 해서 구현
   */
  const [navBg, setNavBg] = useState('bg-transparent');
  const documentHeight = document.documentElement.clientHeight - 60; // 뷰포트 높이 - 네비게이션바 높이

  const scrollNavHandler = () => {
    if (!isTransparent) return;

    if (window.scrollY > documentHeight) {
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

  return (
    <div
      className={`fixed left-0 top-0 z-20 flex min-h-[60px] w-full items-center justify-between border-b-[1px] border-border px-[30px] backdrop-blur-sm ${isTransparent ? navBg : 'bg-white'}`}
    >
      {/*<BeforeLoginNav />*/}
      <AfterLoginNav />
    </div>
  );
};

export default NavigationBar;
