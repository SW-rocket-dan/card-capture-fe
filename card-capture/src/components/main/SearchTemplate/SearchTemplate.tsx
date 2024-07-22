import './SearchTemplate.styles.css';
import SearchTemplateBox from '@/components/main/SearchTemplate/components/SearchTemplateBox/SearchTemplateBox';

const SearchTemplate = () => {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center px-5">
      <div className="background" />
      <div className="overlay" />
      <div className="z-1 relative flex flex-col items-center justify-center gap-[30px] md:gap-[40px]">
        <div className="flex flex-col items-center justify-center gap-[7px] text-white md:gap-[10px]">
          <p className="xs:text-[26px] text-[23px] font-bold md:text-[40px] 2xl:text-[50px]">
            더 많은 템플릿을 검색해보세요
          </p>
          <p className="text-[12px] sm:text-[13px] md:text-[15px] 2xl:text-[17px]">
            AI와 함께 제작한 다양한 템플릿을 찾아보고 직접 사용해보세요
          </p>
        </div>
        <SearchTemplateBox />
      </div>
    </div>
  );
};

export default SearchTemplate;
