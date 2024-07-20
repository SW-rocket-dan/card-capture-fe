import TemplateList from '@/components/main/TemplateGallery/components/TemplateList/TemplateList';
import TemplateSelector from '@/components/main/TemplateGallery/components/TemplateSelector/TemplateSelector';
import { useEffect, useState } from 'react';

export type DummyTemplateType = {
  img: string;
  tags: string[];
};

const INSTAGRAM_DUMMY_DATA: DummyTemplateType[] = [
  {
    img: '',
    tags: ['인스타그램'],
  },
  {
    img: '',
    tags: ['반갑', '습니', '당'],
  },
  {
    img: '',
    tags: ['안녕', '하세', '요'],
  },
];

const BLOG_DUMMY_DATA: DummyTemplateType[] = [
  {
    img: '',
    tags: ['블로그'],
  },
  {
    img: '',
    tags: ['반갑', '습니', '당'],
  },
  {
    img: '',
    tags: ['안녕', '하세', '요'],
  },
];

const ANYTHING_DUMMY_DATA: DummyTemplateType[] = [
  {
    img: '',
    tags: ['아무거나'],
  },
  {
    img: '',
    tags: ['반갑', '습니', '당'],
  },
  {
    img: '',
    tags: ['안녕', '하세', '요'],
  },
];

const TemplateGallery = () => {
  const [clickedItem, setClickedItem] = useState('instagram');
  const [templateData, setTemplateData] = useState(INSTAGRAM_DUMMY_DATA);

  const clickHandler = (value: string) => {
    setClickedItem(value);
    console.log(value);
  };

  useEffect(() => {
    if (clickedItem === 'instagram') setTemplateData(INSTAGRAM_DUMMY_DATA);
    if (clickedItem === 'blog') setTemplateData(BLOG_DUMMY_DATA);
    if (clickedItem === 'anything') setTemplateData(ANYTHING_DUMMY_DATA);
  }, [clickedItem]);

  return (
    <div className="bg-bannerbg flex h-fit w-full items-center justify-center lg:h-dvh">
      <div className="flex flex-col items-center justify-center gap-[40px]">
        <div className="flex flex-col gap-[15px]">
          <p className="text-[40px] font-bold">다른 사람이 만든 카드뉴스 보기</p>
          <p className="text-center text-[15px] font-light text-gray2">
            다른 사용자들이 Card Capture를 사용해서 만든 카드 뉴스를 확인해보세요! <br />
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
