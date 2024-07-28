import Button from '@/components/common/Button/Button';
import LoginIcon from '@/components/common/Icon/LoginIcon';
import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';
import LoginButton from '@/components/common/Login/LoginButton';

const BeforeLoginNav = () => {
  const router = useRouter();

  const { isMobile } = useIsMobile();

  return (
    <div className="flex w-full flex-row items-center justify-between gap-[30px] lg:gap-[60px]">
      <button onClick={() => router.push('/')} className="text-md =whitespace-nowrap flex w-[300px] justify-start">
        Card Capture
      </button>

      {!isMobile && (
        <ul className="flex flex-row gap-[30px] whitespace-nowrap text-[12px] font-semibold lg:gap-[50px] lg:text-[14px]">
          <li>요금제</li>
          <li>다른 템플릿 보기</li>
          <li>제작하기</li>
        </ul>
      )}

      {!isMobile && (
        <div className="flex w-[300px] flex-row justify-end gap-2.5">
          <LoginButton />
          <Button type="full" className="h-[40px] w-[110px] rounded-[10px]">
            <p className="text-[14px]">제작하기</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default BeforeLoginNav;
