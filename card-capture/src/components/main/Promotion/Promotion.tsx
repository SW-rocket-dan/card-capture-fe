import { createPortal } from 'react-dom';
import GiftIcon from '@/components/common/Icon/GiftIcon';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf0tw7G5pugJkqACyWcTSmIcYEPAzIsgygLlPpTCB0QO5vuhQ/viewform';
const OPEN_CHAT_URL = 'https://open.kakao.com/o/gmoTa9Wg';

const Promotion = () => {
  const openEventFormHandler = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return createPortal(
    <div className="fixed bottom-[93px] right-6 flex flex-col gap-[14px]">
      <button
        className="flex h-[56px] w-[56px] items-center justify-center rounded-bl-[24px] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[24px] border-[0.1px] border-border bg-heart"
        onClick={() => openEventFormHandler(FORM_URL)}
      >
        <GiftIcon width={30} className="text-white" />
      </button>
      <button
        className="h-[56px] w-[56px] overflow-hidden rounded-bl-[24px] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[24px] border-[0.1px] border-border"
        onClick={() => openEventFormHandler(OPEN_CHAT_URL)}
      >
        <img alt="kakao" src="/image/kakao_logo.png" className="h-full w-full" />
      </button>
    </div>,
    document.body,
  );
};

export default Promotion;
