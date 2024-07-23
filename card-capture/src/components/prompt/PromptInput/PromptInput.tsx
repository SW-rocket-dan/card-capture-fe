import PromptTextInput from '@/components/prompt/PromptInput/components/PromptTextInput/PromptTextInput';
import PromptPurposeInput from '@/components/prompt/PromptInput/components/PromptPurposeInput/PromptPurposeInput';
import PromptColorInput from '@/components/prompt/PromptInput/components/PromptColorInput/PromptColorInput';
import PromptModelInput from '@/components/prompt/PromptInput/components/PromptModelInput/PromptModelInput';

const PromptInput = () => {
  return (
    <div className="flex w-[620px] flex-col gap-[30px] border-r border-border pr-[80px]">
      <PromptTextInput />
      <PromptPurposeInput />
      <PromptColorInput />
      <PromptModelInput />
    </div>
  );
};

export default PromptInput;
