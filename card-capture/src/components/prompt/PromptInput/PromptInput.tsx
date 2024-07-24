import PromptTextInput from '@/components/prompt/PromptInput/components/PromptTextInput/PromptTextInput';
import PromptPurposeInput from '@/components/prompt/PromptInput/components/PromptPurposeInput/PromptPurposeInput';
import PromptColorInput from '@/components/prompt/PromptInput/components/PromptColorInput/PromptColorInput';
import PromptModelInput from '@/components/prompt/PromptInput/components/PromptModelInput/PromptModelInput';
import PromptOptionInput from '@/components/prompt/PromptInput/components/PromptOptionInput/PromptOptionInput';

const PromptInput = () => {
  return (
    <div className="flex min-w-[300px] max-w-[630px] flex-col gap-[30px] border-b border-border pb-[60px] lg:border-b-0 lg:border-r lg:pr-[100px]">
      <PromptTextInput />
      <PromptPurposeInput />
      <PromptColorInput />
      <PromptModelInput />
      <PromptOptionInput />
    </div>
  );
};

export default PromptInput;
