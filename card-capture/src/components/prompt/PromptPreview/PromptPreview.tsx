import StarsIcon from '@/components/common/Icon/StarsIcon';
import { PromptInputFormType } from '@/app/prompt/page';
import { rgba } from 'polished';
import { hexToRgba } from '@/components/common/ColorPicker/colorUtils';

type PromptPreviewProps = {
  formData: PromptInputFormType;
};

const PromptPreview = ({ formData }: PromptPreviewProps) => {
  const { phrases, model, color, purpose, emphasis } = formData;

  const phrasesList = phrases.map(val => val.value);
  const rgbColor = { ...hexToRgba(color), a: 1 };
  const imgUrl = `/image/${model}.png`;

  return (
    <div className="flex min-w-[300px] flex-col items-center justify-start gap-[30px] lg:w-[400px]">
      <div className="flex w-full flex-col gap-[20px]">
        <p className="text-[15px] font-semibold">미리보기</p>

        {/* 미리보기 화면 */}
        <div
          className="flex aspect-square w-full flex-col items-center justify-center gap-5 rounded-[10px] border border-border p-5"
          style={{ backgroundColor: rgba(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a), filter: 'blur(5px)' }}
        >
          <div className="flex flex-col items-center justify-center text-[19px] font-semibold">
            {phrasesList.map(phrase => (
              <p>
                {phrase.slice(0, 20)} {phrase.length > 20 && '...'}
              </p>
            ))}
          </div>
          <p className={`rounded-md bg-white text-[14px] text-gray4 ${purpose !== '' ? 'p-2' : ''}`}>{purpose}</p>
          {model && <img src={imgUrl} alt="model-logo" className="h-[50px] object-fill" />}
        </div>
      </div>
      <button
        className="flex flex-row items-center justify-center gap-1 rounded-[40px] bg-main px-[40px] py-[18px]"
        style={{ boxShadow: '0 0 14px rgba(111, 108, 255, 0.5)' }}
      >
        <p className="text-[13px] font-medium text-white">카드뉴스 제작하기</p>
        <StarsIcon width={18} className="text-white" />
      </button>
    </div>
  );
};

export default PromptPreview;
