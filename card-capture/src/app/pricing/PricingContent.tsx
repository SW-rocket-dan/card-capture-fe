'use client';

import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import Title from '@/components/common/Title/Title';
import SinglePayment from '@/components/pricing/SinglePayment/SinglePayment';

const PricingContent = () => {
  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col gap-[50px] pt-[60px]">
        <Title title="결제 플랜" content="합리적인 가격으로 ai와 함께 카드뉴스를 제작해보세요!" />
        <SinglePayment />
      </div>
    </div>
  );
};

export default PricingContent;
