/**
 * 백엔드에 구글 로그인을 위해 필요한 로그인 url, 리다이렉트 url 등등을 요청하는 GET 함수
 */
const getGoogleLoginData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/auth/google/login`);

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error('google login error', e);
  }
};

/**
 * google authcode 전송해서 JWT 토큰 가져오는 GET 함수
 */
const getJWTToken = async (code: string) => {
  try {
    const queryString = new URLSearchParams({ code: code });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/auth/google/redirect?${queryString}`);

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error('getJWTToken error', e);
  }
};

export default { getGoogleLoginData, getJWTToken };
