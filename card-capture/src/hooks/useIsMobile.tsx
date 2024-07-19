import { useEffect, useState } from 'react';

const useIsMobile = () => {
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

  return { isMobile };
};

export default useIsMobile;
