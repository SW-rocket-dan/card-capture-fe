import { imageApi } from '@/components/editor/Tab/api';
import { getImageDimensions, getImageQueryString, resizeImage } from '@/components/editor/Tab/utils/imageData';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';

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
  const addImageLayer = useCardsStore(state => state.addImageLayer);

  const addImageLayerHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imageFile = event.target.files[0];
    const imageUrl = await uploadImageToS3(imageFile);

    const dimension = await getImageDimensions(imageUrl);
    const resizedDimension = resizeImage(dimension, 400);

    addImageLayer(focusedCardId, imageUrl, resizedDimension);
  };

  /**
   * 서버에 저장한 이미지를 배경으로 등록하는 로직
   * 카드의 크기인 550px 기준으로 width를 조정해서 저장
   */
  const setBackgroundUrl = useCardsStore(state => state.setBackgroundUrl);

  const addBackgroundImageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imageFile = event.target.files[0];
    const imageUrl = await uploadImageToS3(imageFile);

    setBackgroundUrl(focusedCardId, imageUrl);
  };

  return { uploadImageToS3, addImageLayerHandler, addBackgroundImageHandler };
};

export default useImageUploader;
