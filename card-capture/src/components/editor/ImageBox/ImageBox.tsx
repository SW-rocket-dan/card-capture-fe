import Image from 'next/image';

type ImageBoxProps = {
  url: string;
};

const ImageBox = ({ url }: ImageBoxProps) => {
  return (
    <div className="h-full w-full">
      <Image src={url} alt="image" />
    </div>
  );
};

export default ImageBox;
