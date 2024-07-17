'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';

export default function Home() {
  return (
    <div className="w-screen overflow-y-scroll font-Pretendard">
      <div className="flex h-full flex-row overflow-y-scroll pt-[65px]">
        <NavigationBar isTransparent={true} />
      </div>
    </div>
  );
}
