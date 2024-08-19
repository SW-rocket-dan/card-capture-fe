const parseEscapedJson = (escapedString: string) => {
  try {
    // 유효한 JSON 이스케이프 시퀀스를 임시 토큰으로 대체
    const tokenizedString = escapedString
      .replace(/\\n/g, '__NEWLINE__')
      .replace(/\\"/g, '__QUOTE__')
      .replace(/\\\\/g, '__BACKSLASH__')
      .replace(/\\t/g, '__TAB__')
      .replace(/\\r/g, '__RETURN__')
      .replace(/\\f/g, '__FORMFEED__')
      .replace(/\\b/g, '__BACKSPACE__');

    // 남아있는 단일 백슬래시 제거
    const cleanedString = tokenizedString.replace(/\\/g, '');

    // 임시 토큰을 원래의 이스케이프 시퀀스로 복원
    const restoredString = cleanedString
      .replace(/__NEWLINE__/g, '\\n')
      .replace(/__QUOTE__/g, '\\"')
      .replace(/__BACKSLASH__/g, '\\\\')
      .replace(/__TAB__/g, '\\t')
      .replace(/__RETURN__/g, '\\r')
      .replace(/__FORMFEED__/g, '\\f')
      .replace(/__BACKSPACE__/g, '\\b');

    // JSON 문자열을 JavaScript 객체로 변환
    const jsonObject = JSON.parse(restoredString);

    return jsonObject;
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
};

export default { parseEscapedJson };
