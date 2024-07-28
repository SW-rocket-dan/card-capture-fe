'use client';

import { useEffect } from 'react';

/**
 * 구글 로그인이 성공하면 리다이렉트되는 화면
 */
const GoogleAuthCallback = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 구글에서 쿼리로 전달한 auth code 추출
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code && window.opener) {
        try {
          // 로그인 창을 open한 부모 창으로 code 메세지 전달.
          window.opener.postMessage({ type: 'GOOGLE_AUTH_CODE', code }, '*');
          window.close();
        } catch (error) {
          console.error('Error posting message:', error);
        }
      }
    }, 1500); // 지연을 주지 않으면 redirect 과정중에 useEffect가 실행되어서 인증 프로세스 오류 발생됨

    return () => clearTimeout(timer);
  }, []);

  return <div></div>;
};

export default GoogleAuthCallback;
