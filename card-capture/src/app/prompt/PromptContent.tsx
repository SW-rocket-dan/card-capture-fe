'use client';

import PromptTitle from '@/components/prompt/PromptTitle/PromptTitle';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import PromptInput from '@/components/prompt/PromptInput/PromptInput';
import PromptPreview from '@/components/prompt/PromptPreview/PromptPreview';
import { useFieldArray, useForm } from 'react-hook-form';
import { PromptFormType } from '@/app/prompt/api/promptApi';
import { useCardsStore } from '@/store/useCardsStore';
import { useRouter } from 'next/navigation';
import { Card } from '@/store/useCardsStore/type';
import ReactQuill from 'react-quill';
import useAuthRedirect from '@/hooks/useAuthRedirect';

export const MOCK_CARD_DATA: Card[] = [
  {
    id: 0,
    background: {
      url: '',
      opacity: 100,
      color: '#ffffff',
    },
    layers: [
      {
        id: 1,
        type: 'text',
        content: {
          content: {
            ops: [
              {
                attributes: {
                  font: 'Jua',
                  size: '64px',
                },
                insert: '안녕하세요!',
              },
              {
                insert: '\n',
              },
            ],
          } as ReactQuill.Value,
        },
        position: {
          x: 106.94140625,
          y: 43.537109375,
          width: 324.41796875,
          height: 114.875,
          rotate: 0,
          zIndex: 2,
          opacity: 100,
        },
      },
      {
        id: 2,
        type: 'text',
        content: {
          content: {
            ops: [
              {
                attributes: {
                  size: '18px',
                  font: 'Jua',
                  color: '#000000',
                },
                insert: '현재 테스트 기간이라 AI 카드뉴스가 아닌 ',
              },
              {
                attributes: {
                  align: 'center',
                },
                insert: '\n',
              },
              {
                attributes: {
                  size: '18px',
                  font: 'Jua',
                  color: '#000000',
                },
                insert: '임시 데이터가 출력됩니다. 감사합니다',
              },
              {
                attributes: {
                  align: 'center',
                },
                insert: '\n',
              },
            ],
          } as any,
        },
        position: {
          x: 93.5703125,
          y: 136.625,
          width: 350.44140625,
          height: 75.109375,
          rotate: 0,
          zIndex: 2,
          opacity: 100,
        },
      },
      {
        id: 4,
        type: 'image',
        content: {
          url: 'https://cardcaptureposterimage.s3.ap-northeast-2.amazonaws.com/test/65727aec-0e20-4fd6-932a-0d553d07280c_cat.png',
          cropStartX: 0,
          cropStartY: 0,
          cropWidth: 0,
          cropHeight: 0,
        },
        position: {
          x: 52.21484375,
          y: 132.826171875,
          width: 435.484375,
          height: 421.85546875,
          rotate: 0,
          zIndex: 2,
          opacity: 100,
        },
      },
    ],
  },
];

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
    // const { templateId, editor } = await promptApi.postPromptTemplateData(submitData);
    // const templateData = parseEscapedJson(editor);

    // store에 템플릿 저장
    // setCards(templateData.cards);

    // const func = async () => {
    //   const data = await (await fetch('http://localhost:3000/api/mocks/cards')).json();
    //   setCards(data.cards);
    //   console.log(data.cards);
    // };
    // func();

    setCards(MOCK_CARD_DATA);

    router.push('/editor');
  };

  const isAuthenticated = useAuthRedirect();

  if (!isAuthenticated) return null;

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
