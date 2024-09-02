'use client';

import useGoogleAuth from '@/hooks/useGoogleAuth';
import React, { useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  // 모달을 닫으려고 하면 router.back()해서 페이지 이동
  const changeOpenHandler = () => {
    setIsOpen(prev => !prev);
    if (isOpen) router.back();
  };

  // 구글 로그인 진행하는 버튼
  const { loginHandler } = useGoogleAuth();
  const { isMobile } = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={changeOpenHandler}>
      <DialogContent className="h-[270px] w-[300px] px-7 py-10 sm:w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            지금 로그인하고
            <br /> 3분만에 카드 뉴스를 만들어보세요!
          </DialogTitle>
          <DialogDescription>
            로그인하면 Card Capture와 함께 {isMobile && <br />} AI 카드 포스터를 만들 수 있어요!
          </DialogDescription>

          <div className="flex flex-col py-5">
            <button onClick={loginHandler}>
              <img alt="google-login" src="/image/web_light_sq_SI.svg" className="w-[200px]" />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
