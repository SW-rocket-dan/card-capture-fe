'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import Banner from '@/components/main/Banner/Banner';
import Description from '@/components/main/Description/Description';
import TemplateGallery from '@/components/main/TemplateGallery/TemplateGallery';
import SearchTemplate from '@/components/main/SearchTemplate/SearchTemplate';

const MainContent = () => {
  return (
    <div className="w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={true} />
      <Banner />
      <Description />
      <TemplateGallery />
      <SearchTemplate />
    </div>
  );
};

export default MainContent;
