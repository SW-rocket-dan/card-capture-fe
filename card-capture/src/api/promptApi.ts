// accessToken 가져오기
const token = localStorage.getItem('accessToken');

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/template/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();

    return jsonData.data;
  } catch (e) {
    console.error(e);
  }
};

export default { postPromptTemplateData };
