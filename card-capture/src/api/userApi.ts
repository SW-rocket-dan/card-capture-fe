import { customFetch } from '@/api/customFetchApi';

/**
 * 사용자가 가진 이용권을 받아오는 GET api
 * jwt 토큰을 기준으로 정보 가져옴
 */
const getProductCategories = async () => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/user/product-categories`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data.userProductCategories;
  } catch (e) {
    console.error(e);
  }
};

const getUserData = async () => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/user/me`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error('Failed to GET user data : ', e);
  }
};

export default { getProductCategories, getUserData };
