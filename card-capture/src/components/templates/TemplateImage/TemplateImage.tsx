import { Template } from '@/types';
import { useEffect, useState } from 'react';
import Poster from '@/components/common/Poster/Poster';
import Button from '@/components/common/Button/Button';
import HeartIcon from '@/components/common/Icon/HeartIcon';
import useParseTemplateData from '@/hooks/useParseTemplateData';
import useIsMobile from '@/hooks/useIsMobile';

type TemplateImageProps = {
  data?: Template;
};

const TemplateImage = ({ data }: TemplateImageProps) => {
  if (!data) return <></>;
  const { title, description, fileUrl, editor, likes, templateTags } = data;

  const [isValidImage, setIsValidImage] = useState<boolean>(false);

  /**
   * 유효한 이미지 url인지 확인하는 로직
   */
  useEffect(() => {
    if (!fileUrl) return;

    const img = new window.Image();
    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);
    img.src = fileUrl;
  }, [fileUrl]);

  const templateData = useParseTemplateData(editor);

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const tagList: string[] = [];

    templateTags.forEach(({ english, korean }) => {
      if (english.length) tagList.push(english);
      if (korean.length) tagList.push(korean);
    });

    setTags(tagList);
  }, [templateTags]);

  const { isMobile, windowWidth } = useIsMobile(768);
  const [templateSize, setTemplateSize] = useState(450);

  useEffect(() => {
    if (windowWidth < 640) setTemplateSize(300);
    else if (windowWidth < 768) setTemplateSize(350);
    else if (windowWidth < 1024) setTemplateSize(370);
    else setTemplateSize(450);
  }, [windowWidth]);

  return (
    <div className="flex w-[750px] flex-col items-center justify-between py-10 md:w-[800px] md:flex-row md:items-stretch md:gap-10 lg:w-[950px]">
      {/*{isValidImage ? (*/}
      {/*  <Image src={data.fileUrl} alt="templateImage" width={500} height={500} />*/}
      {/*) : (*/}
      {/*  <Poster size={500} card={templateData[0]} />*/}
      {/*)}*/}
      <div className="overflow-hidden rounded-[25px]">
        <Poster size={templateSize} card={templateData[0]} hasBorder={false} />
      </div>

      <div className="flex flex-1 flex-col justify-start gap-7 p-5">
        <div className="flex flex-col border-b border-border pb-7">
          <div className="flex flex-row items-center justify-end gap-1">
            <HeartIcon width={15} className="text-heart" />
            <p className="text-[13px] font-medium">{likes}</p>
          </div>
          <p className="text-[18px] font-semibold md:text-[20px] lg:text-[25px]">{title}</p>
          <p className="pt-2 text-[12px] text-gray2 md:text-[13px] lg:text-[14px]">{description}</p>
        </div>

        <div className={`${isMobile ? `w-[${templateSize}px]` : ''} flex-col md:flex-1`}>
          <div className="flex flex-row flex-wrap gap-1">
            {tags.map(tag => (
              <p className="w-fit rounded-full border border-border px-3 py-1 text-[13px] text-gray2">#{tag}</p>
            ))}
          </div>
        </div>

        <Button type="full" className="w-full rounded-[30px] py-3 shadow-default" shadow={true}>
          <p className="text-[14px] font-medium">구매하기</p>
        </Button>
      </div>
    </div>
  );
};

export default TemplateImage;
