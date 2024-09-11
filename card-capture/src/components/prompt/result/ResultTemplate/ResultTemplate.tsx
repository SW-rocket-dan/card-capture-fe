'use client';

import Poster from '@/components/common/Poster/Poster';
import { useQuery } from '@tanstack/react-query';
import { templateApi } from '@/api';
import { Template } from '@/types';
import { useEffect, useState } from 'react';
import { jsonUtils } from '@/utils';
import { Card } from '@/store/useCardsStore/type';
import { useParams } from 'next/navigation';
import CheckBox from '@/components/common/CheckBox/CheckBox';

const ResultTemplate = () => {
  /**
   * 라우팅된 아이디 기반으로 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const { data } = useQuery<Template>({
    queryKey: [`template-${id}`],
    queryFn: () => templateApi.getTemplateData(Number(id)),
  });

  const [templateData, setTemplateData] = useState<Card>();

  useEffect(() => {
    if (!data) return;

    const templateData = jsonUtils.parseEscapedJson(data.editor);
    setTemplateData(templateData[0]);
  }, [data]);

  const [isAllSelected, setIsAllSelected] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[900px] flex-row items-center gap-2 border-b-[1px] border-border pb-3">
        <CheckBox isChecked={isAllSelected} setIsChecked={setIsAllSelected} />
        <p className="text-[15px] font-medium tracking-little-tight" onClick={() => setIsAllSelected(prev => !prev)}>
          전체 선택
        </p>
      </div>
      <div className="flex flex-row gap-5 pt-7">
        <Poster size={400} card={templateData} />
        <Poster size={400} card={templateData} />
      </div>
    </div>
  );
};

export default ResultTemplate;
