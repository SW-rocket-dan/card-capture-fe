/**
 * 이미지를 s3에 바로 저장할 수 있는 presigned-url을 받아오는 post api
 * 이미지 전송용 presigned-url과 이미지 링크를 받아옴
 */
const getPreSignedUrl = async (queryString: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/s3/generate-presigned-url?${queryString}`, {
      method: 'POST',
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

/**
 * presigned-url에 이미지 퍼일을 전송하는 put api
 */
const putImage = async (imageFile: File, presignedUrl: string) => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: imageFile,
    });

    return response.url;
  } catch (e) {
    console.log(e);
  }
};

export default { getPreSignedUrl, putImage };
