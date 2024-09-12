'use client';

import '@/components/main/SearchTemplate/SearchTemplate.styles.css';
import StickerIcon from '@/components/common/Icon/StickerIcon';
import ImageIcon from '@/components/common/Icon/ImageIcon';
import { useRouter } from 'next/navigation';

const ResultPromotion = () => {
  const router = useRouter();

  const navigateToPricingPage = () => {
    router.push('/pricing');
  };

  return (
    <div className="flex w-[900px] flex-col items-center justify-center gap-10 py-10">
      <p className="animate-bounce text-[19px] font-semibold">이용권 1장 사용 완료!</p>
      <div className="relative w-full overflow-hidden rounded-[15px] p-8">
        <div className="background" />
        <div className="overlay-dark" />
        <button
          className="z-1 relative flex w-full flex-col items-center justify-center gap-5"
          onClick={navigateToPricingPage}
        >
          <p className="font-medium text-white">구독권으로 업그레이드 하고 더 많은 혜택을 누리세요!</p>
          <div className="flex flex-row gap-4">
            <div className="flex w-[350px] items-center justify-center gap-3 rounded-[10px] bg-white bg-opacity-[0.15] p-5 text-[12px] text-white">
              <StickerIcon width={22} />
              <p>편집시 스티커를 무제한으로 사용할 수 있어요!</p>
            </div>
            <div className="flex w-[350px] items-center justify-center gap-3 rounded-[10px] bg-white bg-opacity-[0.15] p-5 text-[12px] text-white">
              <ImageIcon width={22} />
              <p>편집시 스티커를 무제한으로 사용할 수 있어요!</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResultPromotion;
