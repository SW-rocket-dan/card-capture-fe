import { usePathname, useRouter } from 'next/navigation';
import { authUtils } from '@/utils';
import { useCallback, useEffect } from 'react';

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = authUtils.getIsLoggedIn();

  const handleRedirect = useCallback(async () => {
    try {
      alert('로그인이 필요한 페이지입니다. 로그인 먼저 진행해주세요!');

      // 메인 페이지로 이동
      await router.replace('/');

      // 메인 페이지로 이동 후 일정 시간 뒤에 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login?redirect=true');
      }, 100);
    } catch (error) {
      console.error('Redirect error:', error);
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/') {
      handleRedirect();
    }
  }, [isAuthenticated, pathname, handleRedirect]);

  return isAuthenticated;
};

export default useAuthRedirect;
