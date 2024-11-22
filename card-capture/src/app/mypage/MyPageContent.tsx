'use client';

import React from 'react';
import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import UserTemplates from '@/components/mypage/UserTemplates/UserTemplates';
import useChannelTalk from '@/hooks/useChannelTalk';
import { TemplateList } from '@/types';
import { templateApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

const MyPageContent = () => {
  useChannelTalk();

  const { data } = useQuery<TemplateList>({ queryKey: ['all-template'], queryFn: templateApi.getAllTemplateData });

  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <UserTemplates data={data} title="내 템플릿 보기" content="내가 만든 템플릿을 모아서 볼 수 있어요!" />
      </div>
    </div>
  );
};

export default MyPageContent;
