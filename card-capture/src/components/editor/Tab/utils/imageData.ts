/**
 * 이미지에서 파일 이름과 확장자를 추출해서 반환
 * presigned-url api 요청을 위해서 필요한 정보
 */
const extractFileNameAndExtension = (file: File) => {
  const fullName = file.name;
  const lastDotIndex = fullName.lastIndexOf('.');

  const fileName = fullName.substring(0, lastDotIndex); // 파일 이름
  const fileExtension = fullName.substring(lastDotIndex + 1); // 확장자

  return { fileName, fileExtension };
};

/**
 * 이미지 링크에서 이미지의 높이, 너비(비율)을 추출해서 가져오는 함수
 */
export const getImageDimensions = (url: string) => {
  return new Promise<{
    width: number;
    height: number;
  }>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * 편집 화면에 맞게 이미지 사이즈를 조절하는 기능
 * 이미지 비율을 받아서 비율에 맞게 사이즈 축소
 */
export const resizeImage = (
  dimensions: {
    width: number;
    height: number;
  },
  maxWidth: number,
) => {
  const { width, height } = dimensions;

  const aspectRatio = width / height;
  const resizedHeight = Math.floor(maxWidth / aspectRatio);

  return { width: maxWidth, height: resizedHeight };
};

/**
 * 이미지를 저장할 프리사인 링크를 요청하기 위해 필요한 쿼리스트링을 만드는 로직
 * @return QueryString
 */
export const getImageQueryString = (imageFile: File) => {
  const { fileName, fileExtension } = extractFileNameAndExtension(imageFile);

  return new URLSearchParams({
    dirName: 'test',
    fileName: fileName,
    extension: fileExtension,
  }).toString();
};
