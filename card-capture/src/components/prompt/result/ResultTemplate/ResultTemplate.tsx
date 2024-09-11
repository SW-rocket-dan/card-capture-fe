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
      <CheckBox isChecked={isAllSelected} setIsChecked={setIsAllSelected} />
      <div className="h-[1px] w-[900px] bg-border" />
      <Poster size={400} card={templateData} />
    </div>
  );
};

export default ResultTemplate;
