'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React, { useEffect } from 'react';
import Banner from '@/components/main/Banner/Banner';
import Description from '@/components/main/Description/Description';
import TemplateGallery from '@/components/main/TemplateGallery/TemplateGallery';
import SearchTemplate from '@/components/main/SearchTemplate/SearchTemplate';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Footer from '@/components/common/Footer/Footer';

const MainContent = () => {
  /**
   * 미로그인 상태로 다른 페이지에 접속했을 때, 메인페이지로 리디렉션 후 로그인 모달을 띄우는 로직
   * 로그인 모달을 열라고 전역 상태로 전달함
   */
  const searchParams = useSearchParams();
  const router = useRouter();

  const setIsModalOpen = useAuthStore(state => state.setIsModalOpen);

  useEffect(() => {
    if (searchParams.get('openLoginModal') === 'true') {
      setIsModalOpen(true);

      router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <div className="w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={true} />
      <Banner />
      <Description />
      <TemplateGallery />
      <SearchTemplate />
      <Footer />
    </div>
  );
};

export default MainContent;
