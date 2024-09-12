import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import ResultTitle from '@/components/prompt/result/ResultTitle/ResultTitle';
import ResultTemplate from '@/components/prompt/result/ResultTemplate/ResultTemplate';
import ResultPromotion from '@/components/prompt/result/ResultPromotion/ResultPromotion';

const ResultContent = () => {
  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col items-center pt-[60px]">
        <ResultTitle />
        <ResultTemplate />
        <ResultPromotion />
      </div>
    </div>
  );
};

export default ResultContent;
