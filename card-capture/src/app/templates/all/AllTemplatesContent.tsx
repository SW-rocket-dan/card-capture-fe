'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import { useParams } from 'next/navigation';

import AllTemplatesList from '@/components/templates/all/AllTemplatesList';

const AllTemplatesContent = () => {
  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <AllTemplatesList title="다른 템플릿 보기" content="다른 사용자가 만든 템플릿을 구경해보세요!" />
      </div>
    </div>
  );
};

export default AllTemplatesContent;
