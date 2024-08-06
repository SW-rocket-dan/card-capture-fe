'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenUtils } from '@/utils';
import { refreshAccessToken } from '@/api/customFetchApi';

export default function AuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = tokenUtils.getAccessToken();
      const refreshToken = tokenUtils.getRefreshToken();

      // accessToken은 없고 refreshToken만 있을 때 토큰 재발급 진행
      if (!accessToken && refreshToken) {
        try {
          const newToken = await refreshAccessToken(refreshToken);

          if (newToken) {
            tokenUtils.setTokens(newToken.accessToken, newToken.refreshToken); // 쿠키에 토큰 저장
          } else {
            tokenUtils.clearTokens();
            router.push('/');
          }
        } catch (e) {
          console.error('Failed to refresh token:', e);

          tokenUtils.clearTokens();
          router.push('/');
        }
      }
    };

    checkToken();
  }, [router]);

  return null; // UI 렌더링 안함
}
