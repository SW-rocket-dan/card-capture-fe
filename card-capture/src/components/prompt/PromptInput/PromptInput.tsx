import PromptTextInput from '@/components/prompt/PromptInput/components/PromptTextInput/PromptTextInput';
import PromptPurposeInput from '@/components/prompt/PromptInput/components/PromptPurposeInput/PromptPurposeInput';
import PromptColorInput from '@/components/prompt/PromptInput/components/PromptColorInput/PromptColorInput';
import PromptModelInput from '@/components/prompt/PromptInput/components/PromptModelInput/PromptModelInput';
import PromptOptionInput from '@/components/prompt/PromptInput/components/PromptOptionInput/PromptOptionInput';

const PromptInput = () => {
  return (
    <div className="flex w-[630px] flex-col gap-[30px] border-r border-border pr-[100px]">
      <PromptTextInput />
      <PromptPurposeInput />
      <PromptColorInput />
      <PromptModelInput />
      <PromptOptionInput />
    </div>
  );
};

export default PromptInput;
