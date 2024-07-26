export const parseEscapedJson = (escapedString: string) => {
  try {
    // 이스케이프 문자를 제거하여 올바른 JSON 문자열로 변환
    const jsonString = escapedString.replace(/\\/g, '');

    // JSON 문자열을 JavaScript 객체로 변환
    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
};
