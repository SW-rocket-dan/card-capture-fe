import React, { useEffect, useState } from 'react';
import CloseIcon from '@/components/common/Icon/CloseIcon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import illustrationApi, { StickerDataType } from '@/api/illustrationApi';
import FindIcon from '@/components/common/Icon/FindIcon';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import { authUtils } from '@/utils';

const IllustrationBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * 미리보기 화면에 띄워질 스티커 가져오는 로직
   * 현재는 임시로 '사과'에 대해 검색해서 나오는 스티커가 들어있음
   */
  const [initialStickers, setInitialStickers] = useState([]);

  useEffect(() => {
    const getInitialStickers = async () => {
      // 로컬 스토리지에서 데이터 확인
      const storedStickers = localStorage.getItem('appleStickers');
      const storeAllStickers = localStorage.getItem('stickers');

      // 로그인 여부 확인
      const isLoggedIn = authUtils.getIsLoggedIn();

      if (storedStickers && storeAllStickers) {
        // 저장된 데이터가 있으면 사용
        setInitialStickers(JSON.parse(storedStickers));
        setSearchedStickers(JSON.parse(storeAllStickers));
      } else if (!isLoggedIn) {
        // 로그인 안되었을 경우 Nexr 서버에서 가져오기
        const response = await fetch('/api/editor/stickers');
        const stickers = await response.json();

        const stickerUrls = stickers.stickerUrls;

        setInitialStickers(stickerUrls.slice(0, 5));
        setSearchedStickers(stickerUrls);
      } else {
        // 호그인이 되어 있고, 저장된 데이터가 없으면 API 호출
        const appleStickers = await illustrationApi.getSearchedStickers('사과');
        const appleStickersUrl = appleStickers.map(({ fileUrl }: StickerDataType) => fileUrl);

        const allStickers = await illustrationApi.getSearchedStickers('');
        const stickersUrl = allStickers.map(({ fileUrl }: StickerDataType) => fileUrl);

        // 데이터를 상태에 설정
        setInitialStickers(appleStickersUrl.slice(0, 5));
        setSearchedStickers(stickersUrl);

        // 로컬 스토리지에 데이터 저장
        localStorage.setItem('appleStickers', JSON.stringify(appleStickersUrl.slice(0, 5)));
        localStorage.setItem('stickers', JSON.stringify(stickersUrl));
      }
    };

    getInitialStickers();
  }, []);

  /**
   * 스티커 검색어 관련 로직
   */
  const [searchWord, setSearchWord] = useState('');

  const changeSearchWordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  /**
   * 스티커 검색 처리 로직
   */
  const [searchedStickers, setSearchedStickers] = useState([]);

  const searchStickerHandler = async () => {
    const stickers = await illustrationApi.getSearchedStickers(searchWord);
    const stickersUrl = stickers.map(({ fileUrl }: StickerDataType) => fileUrl);

    setSearchedStickers(stickersUrl);
  };

  /**
   * 선택된 스티커를 새로운 Illust Layer로 추가하는 로직
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const addIllustLayer = useCardsStore(state => state.addIllustLayer);

  const addIllustLayerHandler = (url: string) => {
    addIllustLayer(focusedCardId, url);
  };

  // 로그인 여부 확인
  const isLoggedIn = authUtils.getIsLoggedIn();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col gap-2 rounded-[10px] border-[1px] border-border px-[10px] py-[10px]">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs text-gray4">일러스트</p>
          <PopoverTrigger asChild>
            <button className="flex flex-row text-[10px] text-gray4">더보기 &gt;</button>
          </PopoverTrigger>
        </div>
        <div className="flex flex-row gap-[5px]">
          {initialStickers.map((url, index) => (
            <button
              key={index}
              onClick={() => addIllustLayerHandler(url)}
              className="h-[42px] w-[42px] cursor-pointer overflow-hidden rounded-[5px] border border-border"
            >
              <img src={url} alt="sticker" className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>

      <PopoverContent
        asChild
        className={`absolute left-full z-50 -mt-[50px] ml-[50px] w-[275px] rounded-[8px] bg-white p-0`}
        style={{ boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08', zIndex: 10000 }}
      >
        <div>
          <div className="flex flex-row justify-between border-b-[1px] border-border px-[15px] py-[10px] font-bold">
            <p className="text-xs">일러스트</p>
            <button onClick={openHandler}>
              <CloseIcon width={8} className="text-gray2" />
            </button>
          </div>

          <div className="flex flex-col gap-[10px] px-[15px] pb-[15px] pt-[10px] text-[11px] text-gray2">
            {/* 검색창 */}
            {isLoggedIn && (
              <div className="flex flex-row items-center justify-between gap-3 rounded-[8px] border-[1px] border-border px-[10px] py-[9px]">
                <input
                  onChange={changeSearchWordHandler}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      searchStickerHandler();
                    }
                  }}
                  type="text"
                  className="flex-1 text-[11px] outline-none"
                  placeholder="일러스트 검색 ex) 고양이"
                />
                <button onClick={searchStickerHandler}>
                  <FindIcon width={14} />
                </button>
              </div>
            )}

            {/*/!* 최근 사용 *!/*/}
            {/*<div className="gap flex flex-col">*/}
            {/*  <p className="py-[5px]">최근 사용</p>*/}
            {/*  <div className="flex flex-row justify-between">*/}
            {/*    <div className="h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px] bg-gray8" />*/}
            {/*    <div className="h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px] bg-gray8" />*/}
            {/*    <div className="h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px] bg-gray8" />*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* 일러스트 검색 결과 */}
            <div className="flex max-h-[270px] flex-col overflow-y-scroll">
              <p className="py-[5px]">검색 결과</p>
              <div className="flex flex-row flex-wrap justify-between gap-y-2">
                {searchedStickers.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => addIllustLayerHandler(url)}
                    className="h-[75px] w-[75px] cursor-pointer overflow-hidden rounded-[5px] border border-border"
                  >
                    <img src={url} alt="sticker" className="h-full w-full" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default IllustrationBox;
