'use client';

import useGoogleAuth from '@/hooks/useGoogleAuth';
import React, { useCallback } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LoginModal = () => {
  /**
   * 제작하기 버튼을 클릭해서 들어온 로그인 창인지 확인
   * 어떤 버튼인지에 따라 출력되는 메세지를 다르게 하기 위함
   */
  const searchParams = useSearchParams();
  const isCreateButton = !!searchParams.get('create');
  const isRedirect = !!searchParams.get('redirect');

  const title = isCreateButton ? (
    <>
      <span className="text-dark-main">로그인 후</span>에 <br /> 포스터를 제작할 수 있어요!
    </>
  ) : (
    <>
      지금 로그인하고
      <br /> 3분 만에 포스터를 만들어보세요!
    </>
  );

  /**
   * modal 관리 로직
   */
  const router = useRouter();

  /**
   * 모달을 닫으려고 할 때 리다이렉트 되어서 왔으면 뒤로 돌아가면 안되기 떄문에 main으로 이동
   * 메인 화면에서 들어가는 경우 히스토리를 남기지 않기 위해서 back으로 뒤로 이동시킴
   */
  const changeOpenHandler = useCallback(() => {
    if (isRedirect) {
      router.push('/');
    } else {
      router.back();
    }
  }, [isRedirect, router]);

  /**
   * 구글 로그인 진행하는 버튼
   * 로그인 마친 후에 다른 페이지로 라우팅할 것인지에 따라 type 적어줌
   */
  const { loginHandler } = isCreateButton ? useGoogleAuth('prompt') : useGoogleAuth();

  const { isMobile } = useIsMobile();

  /**
   * 경로를 확인하고 login 창이 아니면 렌더링 하지 않음
   * OAuth 로그인 창이 뜨면서 경로가 이동되는데 이 때 모달(/login)창이 꺼지게 하기 위함 (없으면 경로는 이동되는데 모달이 계속 렌더링됨)
   */
  const pathname = usePathname();
  if (pathname !== '/login') return null;

  return (
    <Dialog open={true} onOpenChange={changeOpenHandler}>
      <DialogContent className="h-[260px] w-[300px] px-7 py-10 sm:w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
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
