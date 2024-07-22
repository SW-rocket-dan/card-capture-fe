import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';

const PromptTextInput = () => {
  return (
    <div className="flex w-full flex-col">
      <PromptCategoryText>1. 카드뉴스 문구 입력</PromptCategoryText>
      <PromptTitleText>카드뉴스에 작성할 문구를 입력해주세요</PromptTitleText>
    </div>
  );
};

export default PromptTextInput;
