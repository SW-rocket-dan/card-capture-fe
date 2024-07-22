import TemplateList from '@/components/main/TemplateGallery/components/TemplateList/TemplateList';
import TemplateSelector from '@/components/main/TemplateGallery/components/TemplateSelector/TemplateSelector';
import { useEffect, useState } from 'react';
import {
  ANYTHING_DUMMY_DATA,
  BLOG_DUMMY_DATA,
  INSTAGRAM_DUMMY_DATA,
} from '@/components/main/TemplateGallery/data/templateData';
import useIsMobile from '@/hooks/useIsMobile';

const TemplateGallery = () => {
  const [clickedItem, setClickedItem] = useState('instagram');
  const [templateData, setTemplateData] = useState(INSTAGRAM_DUMMY_DATA);

  const clickHandler = (value: string) => {
    setClickedItem(value);
  };

  useEffect(() => {
    if (clickedItem === 'instagram') setTemplateData(INSTAGRAM_DUMMY_DATA);
    if (clickedItem === 'blog') setTemplateData(BLOG_DUMMY_DATA);
    if (clickedItem === 'anything') setTemplateData(ANYTHING_DUMMY_DATA);
  }, [clickedItem]);

  const { isMobile } = useIsMobile();

  return (
    <div className="bg-bannerbg px- flex h-fit w-full items-center justify-center px-5 py-[80px] md:h-dvh">
      <div className="flex flex-col items-center justify-center gap-[30px] md:gap-[40px]">
        <div className="flex flex-col items-center justify-center gap-[15px]">
          <p className="xs:text-[26px] text-[23px] font-bold md:text-[40px] 2xl:text-[50px]">
            다른 사람이 만든 카드뉴스 보기
          </p>
          <p className="xs:w-[350px] text-center text-[13px] font-light text-gray2 sm:w-[500px] md:w-[600px] md:text-[15px] 2xl:text-[17px]">
            다른 사용자들이 Card Capture를 사용해서 만든 카드 뉴스를 확인해보세요! {!isMobile && <br />}
            클릭하면 더 많은 템플릿을 볼 수 있어요
          </p>
        </div>
        <TemplateSelector selected={clickedItem} onChangeSelected={clickHandler} />
        <TemplateList templateData={templateData} />
      </div>
    </div>
  );
};

export default TemplateGallery;
