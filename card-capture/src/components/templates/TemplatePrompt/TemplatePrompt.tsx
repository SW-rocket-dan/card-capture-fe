import { Prompt } from '@/types';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';

type TemplatePromptProps = {
  prompt?: Prompt;
};

const TemplatePrompt = ({ prompt }: TemplatePromptProps) => {
  if (!prompt) return <></>;

  return (
    <div className="flex w-full flex-col justify-between gap-7 border-border bg-itembg p-7 sm:mb-10 sm:w-[650px] sm:rounded-[30px] sm:border sm:bg-white sm:p-10 sm:shadow-default md:w-[780px] md:p-[50px] lg:w-[900px]">
      <p className="text-[18px] font-semibold md:text-[22px]">입력된 프롬프트</p>
      <div className="flex flex-col gap-7 px-1">
        <div className="flex flex-col gap-[7px]">
          <PromptCategoryText>1. 문구</PromptCategoryText>
          <PromptTitleText>포스터에 작성할 문구를 입력해주세요</PromptTitleText>
          {prompt.phraseDetails.phrases.map(str => (
            <p className="w-full rounded-[10px] border border-border bg-white px-[15px] py-[12px] text-[13px] text-gray2 outline-none">
              {str}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-[7px]">
          <PromptCategoryText>2. 목적</PromptCategoryText>
          <PromptTitleText>제작 목적을 입력해주세요</PromptTitleText>
          <p className="w-full rounded-[10px] border border-border bg-white px-[15px] py-[12px] text-[13px] text-gray2 outline-none">
            {prompt.purpose}
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <PromptCategoryText>3. 색상</PromptCategoryText>
          <PromptTitleText>색상을 선택해주세요</PromptTitleText>
          <div className="flex flex-row items-center gap-[10px]">
            <div
              className="h-[30px] w-[30px] rounded-[8px] border-2 border-border"
              style={{ backgroundColor: `${prompt.color}` }}
            />
            <p className="text-[13px] tracking-little-tight">{prompt.color}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <PromptCategoryText>4. 모델</PromptCategoryText>
          <PromptTitleText>이미지 모델을 선택해주세요</PromptTitleText>
          <p className="flex w-full items-center rounded-[10px] border border-border bg-white px-[15px] py-[12px] text-gray2 outline-none">
            {prompt.model === 'DALL_E_3' && (
              <div className="flex flex-row gap-4">
                <p className="whitespace-nowrap text-[12px] font-semibold text-defaultBlack md:text-[14px]">Dalle 3</p>
                <p className="text-[12px] md:text-[13px]">
                  {' '}
                  '고해상도, 창의적이고 귀여운 카드 포스터 적합 이미지를 생성합니다!'
                </p>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplatePrompt;
