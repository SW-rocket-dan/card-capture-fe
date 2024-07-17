import BeforeLoginNav from '@/components/common/NavigationBar/BeforeLoginNav';
import { useEffect, useState } from 'react';

type NavigationBarProps = {
  isTransparent: boolean;
};

const NavigationBar = ({ isTransparent = false }: NavigationBarProps) => {
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

  return (
    <div
      className={`fixed left-0 top-0 z-20 flex min-h-[65px] w-full items-center justify-between border-b-[1px] border-border px-[30px] ${isTransparent ? navBg : 'bg-white'}`}
    >
      <div className="text-md">Card Capture</div>
      <BeforeLoginNav />
    </div>
  );
};

export default NavigationBar;
