import PromptTextInput from '@/components/prompt/PromptInput/components/PromptTextInput/PromptTextInput';
import PromptPurposeInput from '@/components/prompt/PromptInput/components/PromptPurposeInput/PromptPurposeInput';

const PromptInput = () => {
  return (
    <div className="flex w-[600px] flex-col gap-[30px] border-r border-border pr-[70px]">
      <PromptTextInput />
      <PromptPurposeInput />
    </div>
  );
};

export default PromptInput;
