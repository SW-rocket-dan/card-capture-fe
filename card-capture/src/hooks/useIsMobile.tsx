import { useEffect, useState } from 'react';

const useIsMobile = (width?: number) => {
  /**
   * 반응형을 위해 window.innerWidth를 저장하여 모바일 화면인지 아닌지 구분
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

  // 너비가 640px일 때 요소를
  const isMobile = windowWidth <= (width ? width : 640);

  return { isMobile, windowWidth };
};

export default useIsMobile;
