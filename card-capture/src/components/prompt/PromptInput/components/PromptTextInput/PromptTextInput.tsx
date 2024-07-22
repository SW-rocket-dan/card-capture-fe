import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';

const PromptTextInput = () => {
  return (
    <div className="flex w-full flex-col gap-[15px]">
      <PromptCategoryText>1. 카드뉴스 문구 입력</PromptCategoryText>
      <div className="flex flex-col gap-[5px]">
        <PromptTitleText>카드뉴스에 작성할 문구를 입력해주세요</PromptTitleText>
        <p className="text-[12px] font-light text-gray4">
          입력 후에 강조할 문구를 드래그해서 선택해주세요. 카드뉴스에서 색상으로 강조됩니다. 예시) 우리의{' '}
          <span className="text-main">제품</span>
        </p>
      </div>
    </div>
  );
};

export default PromptTextInput;
