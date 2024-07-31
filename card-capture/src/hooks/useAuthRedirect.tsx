import { usePathname, useRouter } from 'next/navigation';
import { authUtils } from '@/utils';
import { useEffect } from 'react';

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = authUtils.getIsLoggedIn();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/') {
      alert('로그인이 필요한 페이지입니다. 로그인 먼저 진행해주세요!');
      router.push('/?openLoginModal=true');
    }
  }, [isAuthenticated, router, pathname]);

  return isAuthenticated;
};

export default useAuthRedirect;
