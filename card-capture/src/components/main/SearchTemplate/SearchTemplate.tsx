import './SearchTemplate.styles.css';
import SearchTemplateBox from '@/components/main/SearchTemplate/components/SearchTemplateBox/SearchTemplateBox';

const SearchTemplate = () => {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center px-5">
      <div className="background" />
      <div className="overlay" />
      <div className="z-1 relative flex flex-col items-center justify-center gap-[40px]">
        <div className="flex flex-col items-center justify-center gap-[10px] text-white">
          <p className="text-[40px] font-bold">더 많은 템플릿을 검색해보세요</p>
          <p className="text-[15px]">AI와 함께 제작한 다양한 템플릿을 찾아보고 직접 사용해보세요</p>
        </div>
        <SearchTemplateBox />
      </div>
    </div>
  );
};

export default SearchTemplate;
