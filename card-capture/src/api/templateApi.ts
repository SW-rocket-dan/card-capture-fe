import { customFetch } from '@/api/customFetchApi';
import { Template } from '@/types';

export type PromptFormType = {
  phraseDetails: {
    phrases: string[];
    firstEmphasis: string;
    secondEmphasis: string;
  };
  purpose: string;
  color: string;
  model: string;
};

export type PromptSubmitType = {
  prompt: PromptFormType;
};

/**
 * 프롬프트 데이터를 받아서 서버에서 전송하는 post api
 * response로 생성된 템플릿의 아이디와 json 데이터를 받아옴
 */
const createTemplate = async (data: PromptSubmitType) => {
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

const createEmptyTemplate = async () => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/create-empty`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

const updateTemplate = async (templateData: Partial<Template>) => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateData),
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error('Failed to update template :', e);
  }
};

/**
 * id값 기반으로 하나의 템플릿 데이터를 가져오는 get api
 */
const getTemplateData = async (id: number) => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/${id}`, {
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

/**
 * 공유된 모든 템플릿 데이터를 가져오는 get api
 */
const getPublicTemplateData = async () => {
  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/public`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

/**
 * 검색된 템플릿 데이터를 가져오는 get api
 */
const searchTemplates = async (searchString: string) => {
  const queryString = `keyword=${searchString}`;

  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/search?${queryString}`, {
      method: 'GET',
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

/**
 * ai가 생성한 이미지에 추가 프롬프트를 작성하여 변경된 새로운 이미지를 받아오는 post api
 */
const changeImage = async (imageId: number, message: string) => {
  const submitData = { aiImageId: imageId, message };

  try {
    const response = await customFetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/change-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

export default {
  createTemplate,
  createEmptyTemplate,
  updateTemplate,
  getTemplateData,
  getAllTemplateData,
  getPublicTemplateData,
  searchTemplates,
  changeImage,
};
