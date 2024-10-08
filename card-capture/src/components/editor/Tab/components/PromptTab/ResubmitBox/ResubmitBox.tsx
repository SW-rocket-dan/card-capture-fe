import React, { ChangeEvent, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Button from '@/components/common/Button/Button';
import AIIcon from '@/components/common/Icon/AIIcon';
import { useFocusStore } from '@/store/useFocusStore';
import { useCardsStore } from '@/store/useCardsStore';
import { Image } from '@/store/useCardsStore/type';
import { templateApi } from '@/api';
import { authUtils } from '@/utils';

const ResubmitBox = () => {
  /**
   * 업데이트 할 요소의 정보를 store에서 가져오는 로직
   */
  const focusedCardId = useFocusStore(state => state.focusedCardId);
  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const getImageLayer = useCardsStore(state => state.getImageLayer);
  const setImageLayer = useCardsStore(state => state.setImageLayer);

  /**
   * id 기반으로 선택된 이미지의 정보를 가져오는 로직
   */
  const [imageData, setImageData] = useState<Image | undefined>();

  useEffect(() => {
    const focusedLayer = getImageLayer(focusedCardId, focusedLayerId);

    if (focusedLayer) setImageData(focusedLayer);
    else setImageData(undefined);
  }, [focusedLayerId, focusedCardId]);

  /**
   * textarea에 입력된 새로운 프롬프트 텍스트 관리 로직
   */
  const [promptMessage, setPromptMessage] = useState<string>('');

  const changeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPromptMessage(e.target.value);
  };

  /**
   * 변경할 이미지와 입력한 프롬프트의 정보를 서버에 전송하여 새로운 이미지 받아오는 로직
   * 새로운 이미지를 받아온 후에 store에 반영
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitPromptHandler = async () => {
    const imageId = imageData?.imageId;
    if (!imageId || !promptMessage.length) return;

    // 프롬프트 데이터 서버로 전송
    setIsLoading(true);
    const { changedAiImageId, changedAiImageUrl } = await templateApi.changeImage(imageId, promptMessage);
    setIsLoading(false);

    const focusedLayer = getImageLayer(focusedCardId, focusedLayerId);
    if (!focusedLayer) return;

    // store에 새 이미지 업데이트
    setImageLayer(focusedCardId, focusedLayerId, {
      ...focusedLayer,
      imageId: changedAiImageId,
      url: changedAiImageUrl,
    });
  };

  // 로그인 여부 확인
  const isLoggedIn = authUtils.getIsLoggedIn();

  return (
    <div className={`flex w-full flex-col border-t border-border pb-[15px]`}>
      <p
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        AI에게 재요청하기
      </p>

      {isLoading && (
        <div className="flex w-full flex-col items-center justify-center gap-3 py-7">
          <svg
            className="h-14 w-14 animate-spin text-main"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-[12px] text-gray2">이미지 재생성 중</p>
        </div>
      )}
      {!isLoading && isLoggedIn && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 pb-[15px]">
            <div className="flex flex-col gap-2 px-[15px]">
              <label className="text-[12px] font-medium text-gray9">
                재요청 받고 싶은 요소를 선택해주세요! (요소 클릭)
              </label>
              <div className="flex flex-row items-center gap-2">
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-fit rounded-md border border-border px-2 py-0.5 text-[12px] ${imageData ? 'bg-gray1 font-medium text-white' : 'bg-white text-gray2'}`}
                      >
                        이미지
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">현재는 이미지만 가능해요!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {imageData && (
                  <div className="flex flex-row items-center gap-2">
                    <img src={imageData?.url} width={25} className="border border-border" alt="img" />
                    <p className="text-xs">선택 완료!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 px-[15px]">
              <p className="text-[12px] font-medium text-gray9">재요청 받고 싶은 부분에 대한 설명을 작성해주세요!</p>
              <textarea
                onChange={changeMessageHandler}
                className="h-[90px] resize-none rounded-[10px] border border-border p-2 text-xs outline-none placeholder:text-gray5"
                placeholder="예시) 인물의 나이대를 20대로 만들어주세요"
              />
            </div>
          </div>

          <Button
            type="default"
            className="mx-[15px] gap-[6px] border-2 py-[10px] text-xs"
            onClick={submitPromptHandler}
          >
            <AIIcon width={15} className="text-main" />
            <p>AI에게 재요청하기</p>
          </Button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="mx-[15px] flex flex-col items-center justify-center gap-2 rounded-md border border-border py-5">
          <p className="text-center text-[13px] font-semibold">
            로그인 후에 <br />
            <span className="text-main">AI 재요청 기능</span>을 사용해보세요!
          </p>
          <p className="text-[10.5px] text-gray2">더 많은 스티커 사용, 카드 자동 저장 ai 이미지 생성</p>
        </div>
      )}
    </div>
  );
};

export default ResubmitBox;
