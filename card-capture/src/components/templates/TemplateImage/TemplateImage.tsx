import { Template } from '@/types';
import { useEffect, useState } from 'react';
import Poster from '@/components/common/Poster/Poster';
import { jsonUtils } from '@/utils';
import { Card } from '@/store/useCardsStore/type';

type TemplateImageProps = {
  data?: Template;
};

const TemplateImage = ({ data }: TemplateImageProps) => {
  if (!data) return <></>;

  const [isValidImage, setIsValidImage] = useState<boolean>(false);

  /**
   * 유효한 이미지 url인지 확인하는 로직
   */
  useEffect(() => {
    if (!data.fileUrl) return;

    const img = new window.Image();
    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
    img.src = data.fileUrl;
  }, [data.fileUrl]);

  const [templateData, setTemplateData] = useState<Card[]>([]);

  useEffect(() => {
    const parsedData = jsonUtils.parseEscapedJson(data.editor);
    setTemplateData(parsedData);
  }, [data.editor]);

  return (
    <div className="flex w-[950px] flex-row justify-between">
      {/*{isValidImage ? (*/}
      {/*  <Image src={data.fileUrl} alt="templateImage" width={500} height={500} />*/}
      {/*) : (*/}
      {/*  <Poster size={500} card={templateData[0]} />*/}
      {/*)}*/}
      <Poster size={450} card={templateData[0]} />
      <div className="flex w-[450px] flex-col justify-start">
        <div className="flex flex-row items-center justify-end"></div>
      </div>
    </div>
  );
};

export default TemplateImage;
