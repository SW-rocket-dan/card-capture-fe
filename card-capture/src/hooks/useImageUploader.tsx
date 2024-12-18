import { imageApi } from '@/api';
import { getImageDimensions, getImageQueryString, resizeImage } from '@/components/editor/Tab/utils/imageData';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import { authUtils, commandUtils } from '@/utils';

const useImageUploader = () => {
  /**
   * 이미지를 s3에 저장하고 받아온 이미지 링크를 반환하는 로직
   * 1. 이미지 파일의 정보를 가지고 쿼리스트링 제작
   * 2. 쿼리스트링을 사용해 프리사인 링크와 이미지 링크를 서버에서 받아옴
   * 3. 이미지 파일을 프리사인 링크로 전송
   */
  const uploadImageToS3 = async (imageFile: File) => {
    const queryString = getImageQueryString(imageFile);

    const { presignedUrl, fileUrl } = await imageApi.getPreSignedUrl(queryString);
    const url = await imageApi.putImage(imageFile, presignedUrl);

    return fileUrl;
  };

  /**
   * 서버에 저장한 이미지 링크를 store에 등록하는 로직
   * useCardStore에 새로운 Layer로 추가함
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);

  const addImageLayerHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imageFile = event.target.files[0];

    const isLoggedIn = authUtils.getIsLoggedIn();
    let imageUrl;

    if (isLoggedIn) {
      imageUrl = await uploadImageToS3(imageFile);
    } else {
      imageUrl = await getPreviewUrl(imageFile);
    }

    const dimension = await getImageDimensions(imageUrl);
    const resizedDimension = resizeImage(dimension, 400);
    
    commandUtils.dispatchCommand('ADD_LAYER', {
      cardId: focusedCardId,
      type: 'image',
      content: { url: imageUrl },
      position: { width: resizedDimension.width, height: resizedDimension.height },
    });
  };

  /**
   * 서버에 저장한 이미지를 배경으로 등록하는 로직
   * 카드의 크기인 550px 기준으로 width를 조정해서 저장
   */
  const setBackground = useCardsStore(state => state.setBackground);

  const addBackgroundImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imageFile = event.target.files[0];

    const isLoggedIn = authUtils.getIsLoggedIn();
    let imageUrl;

    if (isLoggedIn) {
      imageUrl = await uploadImageToS3(imageFile);
    } else {
      imageUrl = await getPreviewUrl(imageFile);
    }

    setBackground(focusedCardId, { url: imageUrl });
  };

  /**
   * 이미지 파일의 링크를 추출해서 반환하는 함수
   * 미로그인 상황에 서버와 통신하지 않고 이미지를 import 하기 위해서 사용
   */
  const getPreviewUrl = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = e => {
        if (typeof e.target?.result === 'string') {
          resolve(e.target.result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };

      fileReader.onerror = error => {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  };

  return { uploadImageToS3, addImageLayerHandler, addBackgroundImageHandler };
};

export default useImageUploader;
