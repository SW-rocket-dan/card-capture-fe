import { ChangeEventHandler, EventHandler, useState } from 'react';
import SearchIcon from '@/components/common/Icon/SearchIcon';

const SearchTemplateBox = () => {
  const [searchWord, setSearchWord] = useState<string>('');

  const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchWord(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex h-[55px] w-[650px] flex-row items-center justify-between rounded-[15px] bg-white py-[20px] pl-[25px] pr-[10px]">
      <input
        className="w-full text-[15px] text-defaultBlack outline-none placeholder:text-gray5"
        type="text"
        value={searchWord}
        onChange={changeHandler}
        placeholder="카드 뉴스를 검색해보세요. 예) 음식점 홍보"
      />
      <button className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-main">
        <SearchIcon width={20} className="text-white" />
      </button>
    </div>
  );
};

export default SearchTemplateBox;
