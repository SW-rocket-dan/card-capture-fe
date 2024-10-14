import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import PlusIcon from '@/components/common/Icon/PlusIcon';
import { UseFieldArrayReturn, UseFormRegister } from 'react-hook-form';
import { PromptInputFormType } from '@/app/prompt/PromptContent';
import MinusIcon from '@/components/common/Icon/MinusIcon';

type PromptTextInputProps = {
  register: UseFormRegister<PromptInputFormType>;
  phraseFieldArray: UseFieldArrayReturn<PromptInputFormType, 'phrases', 'id'>;
  emphasisFieldArray: UseFieldArrayReturn<PromptInputFormType, 'emphasis', 'id'>;
};

const MAX_PHRASES_LEN = 5;

const PromptTextInput = ({ register, phraseFieldArray, emphasisFieldArray }: PromptTextInputProps) => {
  const { fields, append: appendPhrase, remove: removePhrase } = phraseFieldArray;
  const { append: appendEmphasis, remove, replace } = emphasisFieldArray;

  /**
   * 문구 입력 창을 추가하는 버튼. 최대 MAX_PHRASES_LEN 까지만 추가 가능
   */
  const appendPhraseHandler = () => {
    if (fields.length >= MAX_PHRASES_LEN) return;

    appendPhrase({ value: '' });
  };

  /**
   * 문구 입력 창을 삭제하는 버튼
   */
  const removePhraseHandler = (index: number) => {
    removePhrase(index);
  };

  return (
    <div className="flex w-full flex-col gap-[15px]">
      {/* 설명 부분 */}
      <PromptCategoryText>1. 카드뉴스 문구 입력</PromptCategoryText>
      <div className="flex flex-col gap-[5px]">
        <PromptTitleText>카드뉴스에 작성할 문구를 입력해주세요</PromptTitleText>
        <p className="text-[12px] font-light text-gray4">
          입력 후에 강조할 문구를 드래그해서 선택해주세요. 카드뉴스에서 색상으로 강조됩니다. 예시) 우리의{' '}
          <span className="text-main">제품</span>
        </p>
      </div>

      {/* 입력 부분 */}
      <div className="flex flex-col gap-[7px]">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row items-center gap-[10px]">
            <input
              type="text"
              {...register(`phrases.${index}.value`)}
              autoComplete="off"
              placeholder="문구를 입력해주세요"
              className="w-[calc(100%-40px)] rounded-[10px] border border-border px-[15px] py-[11px] text-[13px] outline-none placeholder:text-gray5"
            />

            {index === fields.length - 1 ? (
              <button
                onClick={appendPhraseHandler}
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border-[1.5px] ${index === MAX_PHRASES_LEN - 1 ? 'cursor-default border-border' : 'border-main'}`}
              >
                <PlusIcon
                  width={12}
                  className={`${index === MAX_PHRASES_LEN - 1 ? 'text-border' : 'text-main'}`}
                  strokeWidth={2}
                />
              </button>
            ) : (
              <button
                onClick={() => removePhraseHandler(index)}
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border-[1.5px] ${index === MAX_PHRASES_LEN - 1 ? 'cursor-default border-border' : 'border-main'}`}
              >
                <MinusIcon width={12} className="text-main" strokeWidth={2} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptTextInput;
