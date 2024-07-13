import Image from 'next/image';

type ImageBoxProps = {
  url: string;
  width: number;
  height: number;
};

const ImageBox = ({ url, width, height }: ImageBoxProps) => {
  return (
    <div className="h-full w-full">
      <Image src={url} alt="image" width={width} height={height} />
    </div>
  );
};

export default ImageBox;
