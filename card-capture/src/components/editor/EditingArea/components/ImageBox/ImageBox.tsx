import Image from 'next/image';
import { Position } from '@/store/useCardsStore/type';

type ImageBoxProps = {
  url: string;
  position: Position;
};

const ImageBox = ({ url, position }: ImageBoxProps) => {
  return (
    <div className="h-full w-full" style={{ opacity: position.opacity }}>
      <Image src={url} alt="image" className="pointer-events-none" width={position.width} height={position.height} />
    </div>
  );
};

export default ImageBox;
