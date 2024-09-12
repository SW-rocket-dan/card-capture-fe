'use client';

import '@/components/main/SearchTemplate/SearchTemplate.styles.css';
import StickerIcon from '@/components/common/Icon/StickerIcon';
import ImageIcon from '@/components/common/Icon/ImageIcon';
import { useRouter } from 'next/navigation';
import useIsMobile from '@/hooks/useIsMobile';

const ResultPromotion = () => {
  const router = useRouter();

  const navigateToPricingPage = () => {
    router.push('/pricing');
  };

  const { isMobile } = useIsMobile();

  return (
    <div className="flex w-[340px] flex-col items-center justify-center gap-10 py-10 sm:w-[500px] md:w-[700px] lg:w-[900px]">
      <p className="animate-bounce text-[19px] font-semibold">이용권 1장 사용 완료!</p>
      <div className="relative w-full overflow-hidden rounded-[15px] p-8">
        <div className="background" />
        <div className="overlay-dark" />
        <button
          className="z-1 relative flex w-full flex-col items-center justify-center gap-5"
          onClick={navigateToPricingPage}
        >
          <p className="font-medium text-white">
            구독권으로 업그레이드 하고 {isMobile && <br />} 더 많은 혜택을 누리세요!
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex w-[300px] items-center justify-center gap-3 rounded-[10px] bg-white bg-opacity-[0.15] p-5 text-[11px] text-white md:text-[12px] lg:w-[350px]">
              <StickerIcon width={22} />
              <p>편집시 스티커를 무제한으로 사용할 수 있어요!</p>
            </div>
            <div className="flex w-[300px] items-center justify-center gap-3 rounded-[10px] bg-white bg-opacity-[0.15] p-5 text-[11px] text-white md:text-[12px] lg:w-[350px]">
              <ImageIcon width={22} />
              <p>AI 생성 이미지에서 원하는 부분만 바꿀 수 있어요!</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResultPromotion;
