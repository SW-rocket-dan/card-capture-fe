import Button from '@/components/common/Button/Button';
import UploadIcon from '@/components/common/Icon/UploadIcon';

const ImageButton = () => {
  return (
    <Button type="default" className="gap-[6px] border-2 py-[10px]">
      <UploadIcon width={14} />
      <p className="text-xs font-extrabold">이미지 업로드</p>
    </Button>
  );
};

export default ImageButton;
