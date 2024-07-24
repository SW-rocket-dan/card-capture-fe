import PromptCategoryText from '@/components/prompt/PromptInput/components/common/PromptCategoryText';
import PromptTitleText from '@/components/prompt/PromptInput/components/common/PromptTitleText';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import AddOptionButton from '@/components/prompt/PromptInput/components/PromptOptionInput/components/AddOptionButton';

import OptionSelectorModal from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionSelectorModal';
import OptionInputModal from '@/components/prompt/PromptInput/components/PromptOptionInput/components/OptionInputModal';

const PromptOptionInput = () => {
  const [isWriting, setIsWriting] = useState<boolean>(false);

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

      <div className="flex flex-row flex-wrap gap-[10px]">
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <AddOptionButton>추가하기</AddOptionButton>
            </div>
          </DialogTrigger>

          <DialogContent className="w-[800px] px-[40px] py-[40px]">
            <OptionSelectorModal />
            {/*<OptionInputModal title="인물" content="ai가 그릴 그림에 포함된 인물의 묘사" />*/}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PromptOptionInput;
