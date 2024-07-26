import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useIsMobile from '@/hooks/useIsMobile';
import { UseFormSetValue } from 'react-hook-form';
import { PromptInputFormType } from '@/app/prompt/PromptContent';

type PromptModelInputProps = {
  setValue: UseFormSetValue<PromptInputFormType>;
};

const PromptModelInput = ({ setValue }: PromptModelInputProps) => {
  const { isMobile } = useIsMobile(520);

  const changeModelHandler = (model: string) => {
    setValue('model', model);
  };

  return (
    <div className="flex w-full flex-col gap-[15px]">
      <PromptCategoryText>4. 모델</PromptCategoryText>
      <PromptTitleText>사용할 이미지 모델을 선택해주세요</PromptTitleText>

      <Select onValueChange={changeModelHandler}>
        <SelectTrigger>
          <SelectValue className="placeholder:text-gray5" placeholder="어떤 AI로 이미지를 만들지 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="dalle">
              <div className="flex flex-row items-center gap-3">
                <p className="text-[14px] font-semibold">Dalle 3</p>
                <p className="hidden text-[11px] text-gray2 xs:block sm:text-[12px]">
                  {isMobile
                    ? '창의적이고 귀여운 이미지'
                    : '고해상도, 창의적이고 귀여운 카드 포스터 적합 이미지를 생성합니다!'}
                </p>
              </div>
            </SelectItem>
            <SelectItem value="stable">
              <div className="flex flex-row items-center gap-3">
                <p className="text-[14px] font-semibold">Stable Diffusion</p>
                <p className="hidden text-[11px] text-gray2 xs:block sm:text-[12px]">
                  {isMobile
                    ? '사실적이고 사람 특화된 이미지'
                    : '고해상도, 사실적이고 사람 일러스트에 특화된 이미지를 생성합니다!'}
                </p>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PromptModelInput;
