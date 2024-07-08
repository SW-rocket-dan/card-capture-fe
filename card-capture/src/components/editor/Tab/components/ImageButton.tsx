import Button from '@/components/common/Button/Button';
import UploadIcon from '@/components/common/Icon/UploadIcon';

const ImageButton = () => {
  return (
    <Button type="default" className="gap-2 border-2 py-[11px]">
      <UploadIcon width={16} />
      <p className="text-sm font-extrabold">이미지 업로드</p>
    </Button>
  );
};

export default ImageButton;
