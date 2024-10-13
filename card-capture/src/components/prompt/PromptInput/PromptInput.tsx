import PromptTextInput from '@/components/prompt/PromptInput/components/PromptTextInput/PromptTextInput';
import PromptPurposeInput from '@/components/prompt/PromptInput/components/PromptPurposeInput/PromptPurposeInput';
import PromptColorInput from '@/components/prompt/PromptInput/components/PromptColorInput/PromptColorInput';
import PromptModelInput from '@/components/prompt/PromptInput/components/PromptModelInput/PromptModelInput';
import PromptOptionInput from '@/components/prompt/PromptInput/components/PromptOptionInput/PromptOptionInput';
import {
  Control,
  UseFieldArrayReturn,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { PromptInputFormType } from '@/app/prompt/PromptContent';

type PromptInputProps = {
  formMethods: {
    watch: UseFormWatch<PromptInputFormType>;
    control: Control<PromptInputFormType>;
    register: UseFormRegister<PromptInputFormType>;
    getValues: UseFormGetValues<PromptInputFormType>;
    setValue: UseFormSetValue<PromptInputFormType>;
  };
  fieldArrays: {
    phraseFieldArray: UseFieldArrayReturn<PromptInputFormType, 'phrases'>;
    emphasisFieldArray: UseFieldArrayReturn<PromptInputFormType, 'emphasis'>;
  };
};

const PromptInput = ({ formMethods, fieldArrays }: PromptInputProps) => {
  const { register, setValue } = formMethods;
  const { phraseFieldArray, emphasisFieldArray } = fieldArrays;

  return (
    <div className="flex min-w-[300px] max-w-[630px] flex-col gap-[30px] border-b border-border pb-[60px] lg:border-b-0 lg:border-r lg:pr-[100px]">
      <PromptTextInput
        register={register}
        emphasisFieldArray={emphasisFieldArray}
        phraseFieldArray={phraseFieldArray}
      />
      <PromptPurposeInput register={register} />
      <PromptColorInput setValue={setValue} />
      <PromptModelInput setValue={setValue} />
      <PromptOptionInput />
    </div>
  );
};

export default PromptInput;
