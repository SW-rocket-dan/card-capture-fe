import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OptionItem from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionItem';
import AddOptionButton from '@/components/prompt/PromptInput/components/PromptOptionInput/components/AddOptionButton';
import React from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { OptionsType } from '@/components/prompt/PromptInput/components/PromptOptionInput/PromptOptionInput';

type OptionSelectModalType = {
  onSelect: (option: OptionsType) => void;
};

const OptionSelectorModal = ({ onSelect }: OptionSelectModalType) => {
  const { isMobile } = useIsMobile();

  return (
    <div className="flex flex-col items-center justify-center gap-[40px]">
      <DialogHeader>
        <DialogTitle>어떤 내용을 추가적으로 {isMobile && <br />} 작성하고 싶나요?</DialogTitle>
      </DialogHeader>
      <div className="grid w-full grid-cols-1 items-center justify-center justify-items-center gap-3 sm:grid-cols-2 md:grid-cols-4">
        <OptionItem title="인물" content="작성해주세요" onClickOption={() => onSelect('person')} />
        <OptionItem title="사물" content="작성해주세요" onClickOption={() => onSelect('entity')} />
        <OptionItem title="배경" content="작성해주세요" onClickOption={() => onSelect('background')} />
        <AddOptionButton onClickOption={() => onSelect('anything')}>자유롭게 작성하기</AddOptionButton>
      </div>
    </div>
  );
};

export default OptionSelectorModal;
