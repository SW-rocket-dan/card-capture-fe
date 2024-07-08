import { useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * 클릭한 부분(target)이 현재 컴포넌트(ref)가 아니라면 모달을 닫는 callback 실행
     */
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return ref;
};

export default useClickOutside;
