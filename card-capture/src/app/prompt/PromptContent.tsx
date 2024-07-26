'use client';

import PromptTitle from '@/components/prompt/PromptTitle/PromptTitle';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import PromptInput from '@/components/prompt/PromptInput/PromptInput';
import PromptPreview from '@/components/prompt/PromptPreview/PromptPreview';
import { useFieldArray, useForm } from 'react-hook-form';
import { promptApi } from '@/app/prompt/api';
import { PromptFormType } from '@/app/prompt/api/promptApi';
import { parseEscapedJson } from '@/utils/jsonUtils';
import { useCardsStore } from '@/store/useCardsStore';
import { useRouter } from 'next/navigation';

export type PromptInputFormType = {
  phrases: { value: string }[];
  emphasis: { value: string }[];
  purpose: string;
  color: string;
  model: string;
};

const PromptContent = () => {
  /**
   * react-hook-form 사용하여 프롬프트에 입력되는 값들 관리
   */
  const formMethods = useForm<PromptInputFormType>({
    mode: 'onBlur',
    defaultValues: { phrases: [{ value: '' }], color: '#000000', emphasis: [{ value: '1' }, { value: '2' }] },
  });

  // 값을 배열로 저장해야 하는 값들 useFieldArray 사용해서 관리
  const phraseFieldArray = useFieldArray({ control: formMethods.control, name: 'phrases' });
  const emphasisFieldArray = useFieldArray({ control: formMethods.control, name: 'emphasis' });
  const fieldArrays = { phraseFieldArray, emphasisFieldArray };

  const setCards = useCardsStore(state => state.setCard);
  const router = useRouter();

  /**
   * form 제출하고 템플릿 데이터 받아오는 handler
   */
  const submitHandler = async (data: PromptInputFormType) => {
    const phrasesArray = data.phrases.map(p => p.value);
    const emphasisArray = data.phrases.map(p => p.value);

    // api request 형식에 맞게 배열 변경
    const submitData: PromptFormType = {
      ...data,
      phrase: {
        phrases: phrasesArray,
        firstEmphasis: emphasisArray[0],
        secondEmphasis: emphasisArray[1],
      },
    };

    // 서버에 제출하고 템플릿 정보 받아와서 Card Type으로 변경
    const { templateId, editor } = await promptApi.postPromptTemplateData(submitData);
    const templateData = parseEscapedJson(editor);

    // store에 템플릿 저장
    setCards(templateData.cards);

    router.push('/editor');
  };

  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <PromptTitle />
        <div className="flex flex-col items-center justify-center gap-[50px] px-[20px] py-[50px] xs:px-[50px] md:py-[70px] lg:flex-row lg:items-start">
          <PromptInput formMethods={formMethods} fieldArrays={fieldArrays} />
          <PromptPreview formData={formMethods.watch()} onSubmit={submitHandler} />
        </div>
      </div>
    </div>
  );
};

export default PromptContent;
