import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import { UseFormRegister } from 'react-hook-form';
import { PromptInputFormType } from '@/app/prompt/PromptContent';

type PromptPurposeInputProps = {
  register: UseFormRegister<PromptInputFormType>;
};

const PromptPurposeInput = ({ register }: PromptPurposeInputProps) => {
  return (
    <div className="flex w-full flex-col gap-[15px]">
      <PromptCategoryText>2. 제작 목적</PromptCategoryText>
      <PromptTitleText>제작 목적을 입력해주세요</PromptTitleText>

      <input
        type="text"
        {...register('purpose')}
        placeholder="예시) 커피 자판기 홍보"
        className="w-full rounded-[10px] border border-border px-[15px] py-[11px] text-[13px] outline-none placeholder:text-gray5"
      />
    </div>
  );
};

export default PromptPurposeInput;
