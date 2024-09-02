'use client';

import useGoogleAuth from '@/hooks/useGoogleAuth';
import React, { useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useRouter, useSearchParams } from 'next/navigation';

const LoginModal = () => {
  /**
   * 제작하기 버튼을 클릭해서 들어온 로그인 창인지 확인
   * 어떤 버튼인지에 따라 출력되는 메세지를 다르게 하기 위함
   */
  const searchParams = useSearchParams();
  const isCreateButton = !!searchParams.get('create');

  const title = isCreateButton ? (
    <>
      <span className="text-dark-main">로그인 후</span>에 <br /> 카드뉴스를 제작할 수 있어요!
    </>
  ) : (
    <>
      지금 로그인하고
      <br /> 3분 만에 카드 뉴스를 만들어보세요!
    </>
  );

  /**
   * modal 관리 로직
   */
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  // 모달을 닫으려고 하면 router.back()해서 페이지 이동
  const changeOpenHandler = () => {
    setIsOpen(prev => !prev);
    if (isOpen) router.back();
  };

  /**
   * 구글 로그인 진행하는 버튼
   * 로그인 마친 후에 다른 페이지로 라우팅할 것인지에 따라 type 적어줌
   */
  const { loginHandler } = isCreateButton ? useGoogleAuth('prompt') : useGoogleAuth();

  const initiateLoginHandler = () => {
    loginHandler();
    setIsOpen(false);
  };

  const { isMobile } = useIsMobile();

  return (
    <Dialog open={isOpen} onOpenChange={changeOpenHandler}>
      <DialogContent className="h-[260px] w-[300px] px-7 py-10 sm:w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription>
            로그인하면 Card Capture와 함께 {isMobile && <br />} AI 카드 포스터를 만들 수 있어요!
          </DialogDescription>

          <div className="flex flex-col py-5">
            <button onClick={initiateLoginHandler}>
              <img alt="google-login" src="/image/web_light_sq_SI.svg" className="w-[200px]" />
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
