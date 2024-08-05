import { useAuthStore } from '@/store/useAuthStore';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginApi } from '@/api';
import { tokenUtils } from '@/utils';

const useGoogleAuth = (type?: string) => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const [isListening, setIsListening] = useState(false);

  const router = useRouter();

  /**
   * redirect된 창에서 현재 컴포넌트로 메세지를 보내면 수신해서 처리하는 함수
   * 메세지에는 google에서 전달한 authcode가 담겨져있음
   */
  const handleMessage = useCallback(
    async (event: MessageEvent) => {
      if (event.data.type === 'GOOGLE_AUTH_CODE') {
        const code = event.data.code;

        const { accessToken, refreshToken } = await loginApi.getJWTToken(code);

        // 토큰 쿠키에 설정
        if (accessToken && refreshToken) {
          tokenUtils.setTokens(accessToken, refreshToken);
          setIsLoggedIn(true);
        }

        // 인증이 완료되면 리스너 제거
        window.removeEventListener('message', handleMessage);
        setIsListening(false);

        if (type === 'prompt') router.push('/prompt');
      }
    },
    [setIsLoggedIn],
  );

  const loginHandler = async () => {
    if (!isListening) {
      window.addEventListener('message', handleMessage);
      setIsListening(true);
    }

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

  return { isLoggedIn, loginHandler };
};

export default useGoogleAuth;
