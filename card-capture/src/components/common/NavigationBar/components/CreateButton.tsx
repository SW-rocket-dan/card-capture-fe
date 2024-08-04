import useGoogleAuth from '@/hooks/useGoogleAuth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { useRouter } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';

type CreateButtonProps = {
  children: React.ReactNode;
};

const CreateButton = ({ children }: CreateButtonProps) => {
  const router = useRouter();
  const { isLoggedIn, loginHandler } = useGoogleAuth('prompt');

  const { isMobile } = useIsMobile();

  return (
    <Dialog>
      {!isLoggedIn ? (
        <DialogTrigger>{children}</DialogTrigger>
      ) : (
        <div onClick={() => router.push('/prompt')}>{children}</div>
      )}

      <DialogContent className="h-[240px] w-[300px] px-7 py-10 sm:h-[270px] sm:w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-dark-main">로그인 후</span>에 <br /> 카드뉴스를 제작할 수 있어요!
          </DialogTitle>
          <DialogDescription>
            로그인하고 Card Capture와 함께
            {isMobile && <br />} AI 카드 포스터를 만들어보세요!
          </DialogDescription>

          <div className="flex flex-col py-3 sm:py-5">
            <button onClick={loginHandler}>
              <img alt="google-login" src="/image/web_light_sq_SI.svg" className="w-[200px]" />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateButton;
