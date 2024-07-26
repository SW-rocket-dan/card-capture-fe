import Button from '@/components/common/Button/Button';
import UploadIcon from '@/components/common/Icon/UploadIcon';
import { useRef } from 'react';

type ImageButtonProps = {
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageButton = ({ onChangeImage }: ImageButtonProps) => {
  const imgRef = useRef<HTMLInputElement | null>(null);

  /**
   * 이미지 버튼을 클릭하면 image input이 열리게 하는 로직
   */
  const openImageInput = () => {
    //
    // if (!imgRef || !imgRef.current) return;
    //
    // imgRef.current.click();
  };

  return (
    <>
      <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={onChangeImage} />
      <Button type="default" onClick={openImageInput} className="gap-[6px] border-2 py-[10px]">
        <UploadIcon width={14} />
        <p className="text-xs font-semibold">이미지 업로드</p>
      </Button>
    </>
  );
};

export default ImageButton;
