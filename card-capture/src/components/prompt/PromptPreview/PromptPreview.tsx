import StarsIcon from '@/components/common/Icon/StarsIcon';
import { rgba } from 'polished';
import { hexToRgba } from '@/components/common/ColorPicker/colorUtils';
import { PromptInputFormType } from '@/app/prompt/PromptContent';
import userApi from '@/api/userApi';
import { userUtils } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';

type PromptPreviewProps = {
  formData: PromptInputFormType;
  onSubmit: (data: PromptInputFormType) => void;
};

const PromptPreview = ({ formData, onSubmit }: PromptPreviewProps) => {
  const { phrases, model, color, purpose, emphasis } = formData;

  const phrasesList = phrases.map(val => val.value);
  const rgbColor = { ...hexToRgba(color), a: 1 };
  const imgUrl = `/image/${model}.png`;

  /**
   * 보유한 이용권의 개수를 가져오는 로직
   */
  const { data } = useQuery({
    queryKey: ['product-categories'],
    queryFn: userApi.getProductCategories,
  });

  const ticketCount = userUtils.getTicketCount(data);

  /**
   * 결제 버튼 한번만 클릭되도록 수정
   */
  const [isClicked, setIsClicked] = useState(false);

  /**
   * 프롬프트 페이지에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  return (
    <div className="flex min-w-[300px] flex-col items-center justify-start gap-[30px] lg:w-[400px]">
      <div className="flex w-full flex-col gap-[20px]">
        <p className="text-[15px] font-semibold">미리보기</p>

        {/* 미리보기 화면 */}
        <div
          className="flex aspect-square w-full flex-col items-center justify-center gap-5 rounded-[10px] border border-border p-5"
          style={{ backgroundColor: rgba(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a), filter: 'blur(5px)' }}
        >
          <div className="flex flex-col items-center justify-center text-[30px] font-semibold">
            {phrasesList.map(phrase => (
              <p key={phrase}>{phrase.slice(0, 20)}</p>
            ))}
          </div>
          <p className={`rounded-md bg-white text-[14px] text-gray4 ${purpose !== '' ? 'p-2' : ''}`}>{purpose}</p>
          {model && <img src={imgUrl} alt="model-logo" className="h-[50px] object-fill" />}
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button
            onClick={() => trackAmplitudeEvent('prompt-create-click')}
            className="flex flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[40px] py-[18px]"
            style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
          >
            <p className="text-[13px] font-medium text-white">카드뉴스 제작하기</p>
            <StarsIcon width={18} className="text-white" />
          </button>
        </DialogTrigger>
        <DialogContent className="flex w-[320px] flex-col items-center justify-center px-[20px] py-[50px] sm:w-[450px] md:px-[30px]">
          {ticketCount > 0 ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <DialogTitle>이용권을 1개 차감하여 카드뉴스를 제작합니다</DialogTitle>
              <DialogDescription className="mb-5 text-[14px]">
                현재 보유하고 있는 이용권은 <span className="text-[15px] font-semibold text-main">{ticketCount}개</span>{' '}
                입니다.
              </DialogDescription>
              <button
                disabled={isClicked}
                className="flex flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[40px] py-[18px]"
                style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
                onClick={() => {
                  trackAmplitudeEvent('prompt-real-create-click');
                  setIsClicked(true);
                  onSubmit(formData);
                }}
              >
                <p className="text-[13px] font-medium text-white">카드뉴스 제작하기</p>
                <StarsIcon width={18} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1">
              <DialogTitle>현재 보유한 이용권이 없습니다</DialogTitle>
              <DialogDescription className="mb-3 text-[14px]">
                이용권 구매 후 카드뉴스 제작이 가능합니다!
              </DialogDescription>
              <Button
                onClick={() => {
                  trackAmplitudeEvent('prompt-pricing-click');
                  window.open('https://www.cardcapture.app/pricing', '_blank');
                }}
                type="default"
                className="px-5 py-2.5 text-[13px]"
              >
                이용권 구매하러 가기
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptPreview;
