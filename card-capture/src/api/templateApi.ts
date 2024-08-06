import { customFetch } from '@/api/customFetchApi';

export type PromptFormType = {
  phrase: {
    phrases: string[];
    firstEmphasis: string;
    secondEmphasis: string;
  };
  purpose: string;
  color: string;
  model: string;
};

/**
 * 프롬프트 데이터를 받아서 서버에서 전송하는 post api
 * response로 생성된 템플릿의 아이디와 json 데이터를 받아옴
 */
const postPromptTemplateData = async (data: PromptFormType) => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

/**
 * id값 기반으로 하나의 템플릿 데이터를 가져오는 get api
 */
const getTemplateData = async (id: number) => {
  const queryString = `id=${id}`;

  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/{id}?${queryString}`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

/**
 * 유저가 생성한 모든 템플릿 데이터를 가져오는 get api
 */
const getAllTemplateData = async () => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/all`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

export default { postPromptTemplateData, getTemplateData, getAllTemplateData };
