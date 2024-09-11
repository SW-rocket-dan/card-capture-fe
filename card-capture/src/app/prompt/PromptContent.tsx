'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React, { useState } from 'react';
import PromptInput from '@/components/prompt/PromptInput/PromptInput';
import PromptPreview from '@/components/prompt/PromptPreview/PromptPreview';
import { useFieldArray, useForm } from 'react-hook-form';
import { PromptSubmitType } from '@/api/templateApi';
import { useCardsStore } from '@/store/useCardsStore';
import { useRouter } from 'next/navigation';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { templateApi } from '@/api';
import { jsonUtils } from '@/utils';
import Title from '@/components/common/Title/Title';
import Loading from '@/components/common/Loading/Loading';
import useChannelTalk from '@/hooks/useChannelTalk';

export type PromptInputFormType = {
  phrases: { value: string }[];
  emphasis: { value: string }[];
  purpose: string;
  color: string;
  model: string;
};

const PromptContent = () => {
  useChannelTalk();

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

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  /**
   * form 제출하고 템플릿 데이터 받아오는 handler
   */
  const submitHandler = async (data: PromptInputFormType) => {
    const phrasesArray = data.phrases.map(p => p.value);
    const emphasisArray = data.phrases.map(p => p.value);

    // api request 형식에 맞게 배열 변경
    const submitData: PromptSubmitType = {
      prompt: {
        ...data,
        phraseDetails: {
          phrases: phrasesArray,
          firstEmphasis: emphasisArray[0],
          secondEmphasis: emphasisArray[1],
        },
      },
    };

    // 로딩 시작
    setIsLoading(true);

    // 서버에 제출하고 템플릿 정보 받아와서 Card Type으로 변경
    const { id, editor } = await templateApi.createTemplate(submitData);

    // 로딩 끝, 페이지 이동
    setIsLoading(false);
    router.push(`/prompt/result/${id}`);
  };

  const isAuthenticated = useAuthRedirect();

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      {isLoading && <Loading>카드뉴스 제작 중</Loading>}
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <Title title="카드뉴스 제작하기" content="제작에 필요한 정보들을 입력해주세요!" />
        <div className="flex flex-col items-center justify-center gap-[50px] px-[20px] py-[50px] xs:px-[50px] md:py-[70px] lg:flex-row lg:items-start">
          <PromptInput formMethods={formMethods} fieldArrays={fieldArrays} />
          <PromptPreview formData={formMethods.watch()} onSubmit={submitHandler} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default PromptContent;
