'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import Banner from '@/components/main/Banner/Banner';
import Description from '@/components/main/Description/Description';
import TemplateGallery from '@/components/main/TemplateGallery/TemplateGallery';
import SearchTemplate from '@/components/main/SearchTemplate/SearchTemplate';
import Footer from '@/components/common/Footer/Footer';
import useChannelTalk from '@/hooks/useChannelTalk';
import Promotion from '@/components/main/Promotion/Promotion';
import Link from 'next/link';

const MainContent = () => {
  useChannelTalk();

  return (
    <>
      <div className="w-screen overflow-y-scroll font-Pretendard">
        <NavigationBar isTransparent={true} />
        <Banner />
        <Description />
        <TemplateGallery />
        <Link href="/templates/all">
          <SearchTemplate />
        </Link>
        <Footer />
      </div>
      <Promotion />
    </>
  );
};

export default MainContent;
