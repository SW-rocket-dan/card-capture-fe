import { tokenUtils } from '@/utils';

/**
 * refreshToken을 사용하여 새로운 accessToken을 받아오는 POST api
 */
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/auth/google/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const jsonData = await response.json();

      return jsonData.data;
    }
  } catch (e) {
    console.error('Failed to refresh token:', e);
  }

  return null;
};

/**
 * 토큰 만료시 자동으로 재발급, 재요청하는 커스텀 fetch 함수
 */
export const customFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = tokenUtils.getAccessToken();

  // accessToken 존재하면 헤더에 삽입
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // api 요청
  let response = await fetch(url, options);

  // accessToken이 만료된 경우
  if (response.status === 401) {
    const refreshToken = tokenUtils.getRefreshToken();

    if (refreshToken) {
      // accessToken 재발급
      const newToken = await refreshAccessToken(refreshToken);

      if (newToken) {
        tokenUtils.setTokens(newToken.accessToken, newToken.refreshToken); // 쿠키에 토큰 저장

        // accessToken 헤더에 삽입
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newToken.accessToken}`,
        };

        // 재발급 받은 토큰으로 재요청 보내기
        response = await fetch(url, options);
      }
    }
  }

  return response;
};
