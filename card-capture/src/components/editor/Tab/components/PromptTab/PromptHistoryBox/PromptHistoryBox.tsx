import React from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Template } from '@/types';

const PromptHistoryBox = () => {
  /**
   * 라우팅된 아이디 기반으로 캐시에서 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const queryClient = useQueryClient();
  const templateData = queryClient.getQueryData<Template>([`template-${id}`]);

  return (
    <div className="flex w-full flex-col">
      <p
        className={`flex h-[50px] flex-row items-center justify-between px-[15px] py-[20px] text-[14px] font-semibold`}
      >
        이전에 입력한 프롬프트
      </p>

      <div className="flex flex-col gap-4 pb-[15px]">
        <div className="flex flex-col gap-2 px-[15px]">
          <label className="text-[12px] text-gray4">입력한 문구</label>
          <p className="text-gray9 h-[90px] overflow-y-scroll rounded-[10px] border border-border p-2.5 text-[12px]">
            {templateData?.prompt.phraseDetails.phrases.map(str => <p>{str}</p>)}
          </p>
        </div>
        <div className="flex flex-col gap-2 px-[15px]">
          <label className="text-[12px] text-gray4">목적</label>
          <p className="text-gray9 rounded-[10px] border border-border p-2.5 text-[12px]">
            {templateData?.prompt.purpose}
          </p>
        </div>
        <div className="flex flex-row justify-between px-[15px]">
          <label className="text-[12px] text-gray4">색상</label>
          <div
            className="!h-[19px] !w-[35px] rounded-md border-2 border-border"
            style={{ backgroundColor: `${templateData?.prompt.color}` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptHistoryBox;
