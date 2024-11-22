'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TemplateList } from '@/types';
import { templateApi } from '@/api';

import UserTemplates from '@/components/mypage/UserTemplates/UserTemplates';

const AllTemplatesContent = () => {
  /**
   * 라우팅된 아이디 기반으로 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const { data } = useQuery<TemplateList>({
    queryKey: [`template-${id}`],
    queryFn: () => templateApi.getPublicTemplateData(),
  });

  return (
    <div className="w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col items-center justify-center gap-10 pt-[60px]">
        <UserTemplates data={data} title="다른 템플릿 보기" content="다른 사용자가 만든 템플릿을 구경해보세요!" />
      </div>
    </div>
  );
};

export default AllTemplatesContent;
