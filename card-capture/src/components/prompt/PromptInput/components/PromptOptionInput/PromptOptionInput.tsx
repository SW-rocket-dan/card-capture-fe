import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import AddOptionButton from '@/components/prompt/PromptInput/components/PromptOptionInput/components/AddOptionButton';
import OptionSelectorModal from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionSelectorModal';
import OptionInputModal from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionInputModal';
import OptionItem from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionItem';

export type OptionsType = 'person' | 'entity' | 'background' | 'anything';

const OPTIONS = {
  person: { title: '인물', content: 'ai가 그릴 그림에 포함될 인물의 묘사' },
  entity: { title: '사물', content: 'ai가 그릴 그림에 포함될 사물의 묘사' },
  background: { title: '배경', content: 'ai가 그릴 그림에 포함될 배경의 묘사' },
  anything: { title: '아무거나', content: 'ai가 그릴 그림에 포함될 아무거나의 묘사' },
};

type OptionDataType = {
  [key: string]: { title: string; content: string };
};

const PromptOptionInput = () => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionsType>('person');
  const [optionData, setOptionData] = useState<OptionDataType>({});

  const selectOptionHandler = (option: OptionsType) => {
    setIsWriting(true);
    setSelectedOption(option);
  };

  const changeOptionDataHandler = (option: string, title: string, data: string) => {
    if (data.trim() === '') {
      setIsOpen(false);
      return;
    }

    setOptionData(prev => ({
      ...prev,
      [option]: { title, content: data },
    }));

    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsOpen(prev => !prev);
    setIsWriting(false);
  };

  //@TODO: 옵션 출력이 두 줄로 나타나는 오류 존재함. 옵션이 필요할 때 수정하기

  return (
    <div className="flex w-full flex-col gap-[15px]">
      <PromptCategoryText>
        5. 세부 옵션 <span className="font-medium text-highlightBorder">(필수 X)</span>
      </PromptCategoryText>
      <div className="flex flex-col gap-[5px]">
        <PromptTitleText>세부적인 옵션을 추가해주세요</PromptTitleText>
        <p className="text-[12px] font-light text-gray4">
          생성될 이미지에서 더 자세하게 표현되었으면 하는 부분을 작성해주세요.
        </p>
      </div>

      <div className="flex w-full flex-row flex-wrap">
        <Dialog open={isOpen} onOpenChange={openModalHandler}>
          <div className="flex w-full flex-row flex-wrap gap-[10px]">
            {Object.entries(optionData).map(([key, value]) => (
              <OptionItem title={value.title} content={value.content} />
            ))}

            <DialogTrigger asChild>
              <div className="w-full">
                <AddOptionButton>추가하기</AddOptionButton>
              </div>
            </DialogTrigger>
          </div>

          <DialogContent className="w-[320px] px-[20px] py-[40px] sm:w-[400px] md:w-[750px] md:px-[30px]">
            {!isWriting ? (
              <OptionSelectorModal onSelect={selectOptionHandler} />
            ) : (
              <OptionInputModal
                type={selectedOption}
                title={OPTIONS[selectedOption].title}
                content={OPTIONS[selectedOption].content}
                changeOptionDataHandler={changeOptionDataHandler}
                closeModal={openModalHandler}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PromptOptionInput;
