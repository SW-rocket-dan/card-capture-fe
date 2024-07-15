import UpIcon from '@/components/common/Icon/UpIcon';
import DownIcon from '@/components/common/Icon/DownIcon';
import ImageButton from '@/components/editor/Tab/components/EditTab/common/ImageButton';
import OpacityButton from '@/components/editor/Tab/components/EditTab/common/OpacityButton';
import { useState } from 'react';
import OrderBox from '@/components/editor/Tab/components/EditTab/common/OrderBox';
import SizeBox from '@/components/editor/Tab/components/EditTab/common/SizeBox';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import { imageApi } from '../../../api';

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
 * s3 이미지 링크에서 이미지의 높이, 너비(비율)을 추출해서 가져오는 함수
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

const ImageEditBox = ({ focused = false }: { focused?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(focused);
  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * 이미지를 저장할 프리사인 링크를 요청하기 위해 필요한 쿼리스트링을 만드는 로직
   * @return QueryString
   */
  const getImageQueryString = (imageFile: File) => {
    const { fileName, fileExtension } = extractFileNameAndExtension(imageFile);

    return new URLSearchParams({
      dirName: 'test',
      fileName: fileName,
      extension: fileExtension,
    }).toString();
  };

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

  const [opacity, setOpacity] = useState<number>(100);

  return (
    <div className="flex w-full flex-col border-b-[1px] border-border">
      <div
        onClick={openHandler}
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-extrabold`}
      >
        <p>이미지</p>
        {isOpen ? <UpIcon width={13} className="text-gray1" /> : <DownIcon width={13} className="text-gray1" />}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-[10px] px-[15px] pb-[20px]">
          <ImageButton onChangeImage={addImageLayerHandler} />
          <SizeBox />
          <OpacityButton opacity={opacity} setOpacity={setOpacity} />
          <OrderBox />
        </div>
      )}
    </div>
  );
};

export default ImageEditBox;
