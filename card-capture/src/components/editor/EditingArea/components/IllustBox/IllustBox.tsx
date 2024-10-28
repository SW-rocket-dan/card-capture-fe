import Image from 'next/image';
import { Position } from '@/store/useCardsStore/type';

type IllustBoxProps = {
  url: string;
  position?: Position;
};

const IllustBox = ({ url, position }: IllustBoxProps) => {
  return (
    <div
      className="h-full w-full select-none"
      style={{ opacity: position?.opacity, width: position?.width, height: position?.height }}
    >
      <Image src={url} alt="image" className="pointer-events-none" layout="fill" objectFit="contain" quality={100} />
    </div>
  );
};

export default IllustBox;
