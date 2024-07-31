import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginIcon from '@/components/common/Icon/LoginIcon';
import DivButton from '@/components/common/Button/DivButton';
import useGoogleAuth from '@/hooks/useGoogleAuth';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const LoginButton = () => {
  const { isLoggedIn, loginHandler } = useGoogleAuth();

  const isModalOpen = useAuthStore(state => state.isModalOpen);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isModalOpen);
  }, [isModalOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <DivButton type="default" className="h-[40px] w-[110px] rounded-[10px]">
          <LoginIcon width={15} />
          <p className="text-[14px]">Login</p>
        </DivButton>
      </DialogTrigger>

      <DialogContent className="h-[270px] w-[400px] px-7 py-10">
        {!isLoggedIn ? (
          <DialogHeader>
            <DialogTitle className="text-center">
              지금 로그인하고
              <br /> 3분만에 카드뉴스를 만들어보세요!
            </DialogTitle>
            <DialogDescription>로그인하면 Card Capture와 함께 AI 카드 포스터를 만들 수 있어요!</DialogDescription>

            <div className="flex flex-col py-5">
              <button onClick={loginHandler}>
                <img alt="google-login" src="/image/web_light_sq_SI.svg" className="w-[200px]" />
              </button>
            </div>
          </DialogHeader>
        ) : (
          <DialogHeader>
            <DialogTitle className="text-center">로그인 성공!</DialogTitle>
            <DialogDescription>Card Capture와 함께 AI 카드 포스터를 만들어보세요</DialogDescription>

            <img alt="cat" src="/image/cat.png" className="h-[150px] w-[180px] object-cover" />
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
