import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import { useState } from 'react';
import PlusIcon from '@/components/common/Icon/PlusIcon';

const PromptTextInput = () => {
  const [textCount, setTextCount] = useState<number>(1);

  const plusTextHandler = () => {
    if (textCount >= 5) return;

    setTextCount(prev => prev + 1);
  };

  return (
    <div className="flex w-full flex-col gap-[15px]">
      {/* 설명 부분 */}
      <PromptCategoryText>1. 카드뉴스 문구 입력</PromptCategoryText>
      <div className="flex flex-col gap-[5px]">
        <PromptTitleText>카드뉴스에 작성할 문구를 입력해주세요</PromptTitleText>
        <p className="text-[12px] font-light text-gray4">
          입력 후에 강조할 문구를 드래그해서 선택해주세요. 카드뉴스에서 색상으로 강조됩니다. 예시) 우리의{' '}
          <span className="text-main">제품</span>
        </p>
      </div>

      {/* 입력 부분 */}
      <div className="flex flex-col gap-[7px]">
        {Array.from({ length: textCount }).map((_, index) => (
          <div key={index} className="flex flex-row items-center gap-[10px]">
            <input
              type="text"
              placeholder="문구를 입력해주세요"
              className="w-[calc(100%-40px)] rounded-[10px] border border-border px-[15px] py-[11px] text-[13px] outline-none placeholder:text-gray5"
            />
            {index === textCount - 1 && (
              <button
                onClick={plusTextHandler}
                className="flex h-[27px] w-[27px] items-center justify-center rounded-full border-[1.5px] border-main"
              >
                <PlusIcon width={12} className="bg text-main" strokeWidth={2} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptTextInput;
