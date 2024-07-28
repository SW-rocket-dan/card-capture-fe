import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginIcon from '@/components/common/Icon/LoginIcon';
import { loginApi } from '@/components/common/Login/api';
import { useEffect, useState } from 'react';
import DivButton from '@/components/common/Button/DivButton';
import { useAuthStore } from '@/store/useAuthStore';

const LoginButton = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);

  useEffect(() => {
    /**
     * redirect된 창에서 현재 컴포넌트로 메세지를 보내면 수신해서 처리하는 함수
     * 메세지에는 google에서 전달한 authcode가 담겨져있음
     */
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'GOOGLE_AUTH_CODE') {
        const code = event.data.code;

        const { accessToken } = await loginApi.getJWTToken(code);

        localStorage.setItem('accessToken', accessToken); // 임시로 localStorage에 저장함
        setIsLoggedIn(true);
      }
    };

    // 메세지가 발생하면 함수 실행
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loginHandler = async () => {
    const { loginBaseUrl, scope, redirectUri, responseType, clientId } = await loginApi.getGoogleLoginData();

    // 서버에서 가져온 정보를 토대로 이동할 구글 로그인 url 설정
    const googleLoginUrl = `${loginBaseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    // 중앙 지점 좌표 구하기
    const windowWidth = 500;
    const windowHeight = 600;
    const windowLeft = window.screenX + (window.innerWidth - windowWidth) / 2;
    const windowTop = window.screenY + (window.innerHeight - windowHeight) / 2 + 50;

    // google 로그인 새창에 띄우기
    window.open(
      googleLoginUrl,
      '_blank',
      `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`,
    );
  };

  return (
    <Dialog>
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
