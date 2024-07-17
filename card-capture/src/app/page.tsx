'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import Banner from '@/components/main/Banner/Banner';

export default function Home() {
  return (
    <div className="w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={true} />
      <Banner />
    </div>
  );
}
