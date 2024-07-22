import { ChangeEventHandler, useState } from 'react';
import SearchIcon from '@/components/common/Icon/SearchIcon';

const SearchTemplateBox = () => {
  const [searchWord, setSearchWord] = useState<string>('');

  const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchWord(e.target.value);
  };

  return (
    <div className="xs:w-[340px] flex h-[50px] w-[300px] flex-row items-center justify-between rounded-[15px] bg-white py-[20px] pl-[25px] pr-[10px] sm:h-[50px] sm:w-[600px] md:h-[55px] md:w-[650px]">
      <input
        className="flex-1 text-[13px] text-defaultBlack outline-none placeholder:text-gray5 md:text-[15px]"
        type="text"
        value={searchWord}
        onChange={changeHandler}
        placeholder="카드 뉴스를 검색해보세요. 예) 음식점 홍보"
      />
      <button className="flex h-[33px] w-[33px] items-center justify-center rounded-full bg-main md:h-[40px] md:w-[40px]">
        <SearchIcon width={20} className="text-white" />
      </button>
    </div>
  );
};

export default SearchTemplateBox;
