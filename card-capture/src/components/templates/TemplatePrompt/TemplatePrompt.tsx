import { Prompt } from '@/types';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';

type TemplatePromptProps = {
  prompt?: Prompt;
};

const TemplatePrompt = ({ prompt }: TemplatePromptProps) => {
  if (!prompt) return <></>;

  return (
    <div className="mb-10 flex w-[900px] flex-col justify-between gap-7 rounded-[30px] border border-border p-[50px] shadow-default">
      <p className="text-[22px] font-semibold">입력된 프롬프트</p>
      <div className="flex flex-col gap-7 px-1">
        <div className="flex flex-col gap-[7px]">
          <PromptCategoryText>1. 문구</PromptCategoryText>
          <PromptTitleText>카드뉴스에 작성할 문구를 입력해주세요</PromptTitleText>
          {prompt.phraseDetails.phrases.map(str => (
            <p className="w-full rounded-[10px] border border-border px-[15px] py-[12px] text-[13px] text-gray2 outline-none">
              {str}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-[7px]">
          <PromptCategoryText>2. 목적</PromptCategoryText>
          <PromptTitleText>제작 목적을 입력해주세요</PromptTitleText>
          <p className="w-full rounded-[10px] border border-border px-[15px] py-[12px] text-[13px] text-gray2 outline-none">
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
          <p className="w-full rounded-[10px] border border-border px-[15px] py-[12px] text-[13px] text-gray2 outline-none">
            {prompt.model === 'DALL_E_3' && (
              <div className="flex flex-row gap-4">
                <p className="text-[14px] font-semibold text-defaultBlack">Dalle 3</p>
                <p>'고해상도, 창의적이고 귀여운 카드 포스터 적합 이미지를 생성합니다!'</p>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplatePrompt;
