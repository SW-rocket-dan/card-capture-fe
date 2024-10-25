import Image from 'next/image';
import { Position } from '@/store/useCardsStore/type';

type ImageBoxProps = {
  url: string;
  position?: Position;
};

const ImageBox = ({ url, position }: ImageBoxProps) => {
  return (
    <div className="h-full w-full" style={{ opacity: position?.opacity }}>
      <Image src={url} alt="image" className="pointer-events-none" layout="fill" objectFit="contain" quality={100} />
    </div>
  );
};

export default ImageBox;
