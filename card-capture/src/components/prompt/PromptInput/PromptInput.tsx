import PromptTextInput from '@/components/prompt/PromptInput/components/PromptTextInput/PromptTextInput';
import PromptPurposeInput from '@/components/prompt/PromptInput/components/PromptPurposeInput/PromptPurposeInput';
import PromptColorInput from '@/components/prompt/PromptInput/components/PromptColorInput/PromptColorInput';
import PromptModelInput from '@/components/prompt/PromptInput/components/PromptModelInput/PromptModelInput';
import PromptOptionInput from '@/components/prompt/PromptInput/components/PromptOptionInput/PromptOptionInput';
import { useFieldArray, useForm } from 'react-hook-form';

export type PromptInputFormType = {
  phrases: { value: string }[];
  emphasis: { value: string }[];
  purpose: string;
  color: string;
  model: string;
};

const PromptInput = () => {
  const { watch, control, register, getValues, setValue } = useForm<PromptInputFormType>({
    mode: 'onBlur',
    defaultValues: { phrases: [{ value: '' }] },
  });

  const phraseFieldArray = useFieldArray({ control, name: 'phrases' });
  const emphasisFieldArray = useFieldArray({ control, name: 'emphasis' });

  return (
    <div className="flex min-w-[300px] max-w-[630px] flex-col gap-[30px] border-b border-border pb-[60px] lg:border-b-0 lg:border-r lg:pr-[100px]">
      <PromptTextInput
        register={register}
        emphasisFieldArray={emphasisFieldArray}
        phraseFieldArray={phraseFieldArray}
      />
      <PromptPurposeInput register={register} />
      <PromptColorInput setValue={setValue} />
      <PromptModelInput />
      <PromptOptionInput />
    </div>
  );
};

export default PromptInput;
