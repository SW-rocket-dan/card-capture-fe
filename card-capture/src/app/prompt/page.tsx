'use client';

import PromptTitle from '@/components/prompt/PromptTitle/PromptTitle';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import PromptInput from '@/components/prompt/PromptInput/PromptInput';
import PromptPreview from '@/components/prompt/PromptPreview/PromptPreview';
import { useFieldArray, useForm } from 'react-hook-form';

export type PromptInputFormType = {
  phrases: { value: string }[];
  emphasis: { value: string }[];
  purpose: string;
  color: string;
  model: string;
};

const PromptPage = () => {
  const formMethods = useForm<PromptInputFormType>({
    mode: 'onBlur',
    defaultValues: { phrases: [{ value: '' }], color: '#000000' },
  });

  const phraseFieldArray = useFieldArray({ control: formMethods.control, name: 'phrases' });
  const emphasisFieldArray = useFieldArray({ control: formMethods.control, name: 'emphasis' });

  const fieldArrays = { phraseFieldArray, emphasisFieldArray };

  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <PromptTitle />
        <div className="flex flex-col items-center justify-center gap-[50px] px-[20px] py-[50px] xs:px-[50px] md:py-[70px] lg:flex-row lg:items-start">
          <PromptInput formMethods={formMethods} fieldArrays={fieldArrays} />
          <PromptPreview formData={formMethods.watch()} />
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
