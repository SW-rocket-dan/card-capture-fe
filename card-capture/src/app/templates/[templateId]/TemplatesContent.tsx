'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Template } from '@/types';
import { templateApi } from '@/api';
import TemplateImage from '@/components/templates/TemplateImage/TemplateImage';
import TemplatePrompt from '@/components/templates/TemplatePrompt/TemplatePrompt';

const TemplatesContent = () => {
  /**
   * 라우팅된 아이디 기반으로 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const { data } = useQuery<Template>({
    queryKey: [`template-${id}`],
    queryFn: () => templateApi.getTemplateData(Number(id)),
  });

  return (
    <div className="w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col items-center justify-center gap-10 pt-[60px]">
        <TemplateImage data={data} />
        <TemplatePrompt prompt={data?.prompt} />
      </div>
    </div>
  );
};

export default TemplatesContent;
