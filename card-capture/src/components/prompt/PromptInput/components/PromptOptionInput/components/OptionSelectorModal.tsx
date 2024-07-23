import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OptionItem from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionItem';
import AddOptionButton from '@/components/prompt/PromptInput/components/PromptOptionInput/components/AddOptionButton';
import React from 'react';

const OptionSelectorModal = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[40px]">
      <DialogHeader>
        <DialogTitle>어떤 내용을 추가적으로 작성하고 싶나요?</DialogTitle>
      </DialogHeader>
      <div className="flex items-center justify-center gap-3">
        <OptionItem title="인물" content="작성해주세요" />
        <OptionItem title="사물" content="작성해주세요" />
        <OptionItem title="배경" content="작성해주세요" />
        <AddOptionButton>자유롭게 작성하기</AddOptionButton>
      </div>
    </div>
  );
};

export default OptionSelectorModal;
