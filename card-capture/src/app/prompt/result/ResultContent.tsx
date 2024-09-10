import NavigationBar from '@/components/common/NavigationBar/NavigationBar';
import React from 'react';
import ResultTitle from '@/components/prompt/result/ResultTitle/ResultTitle';

const ResultContent = () => {
  return (
    <div className="h-screen w-screen overflow-y-scroll font-Pretendard">
      <NavigationBar isTransparent={false} />
      <div className="flex h-full flex-col pt-[60px]">
        <ResultTitle />
      </div>
    </div>
  );
};

export default ResultContent;
