import Button from '@/components/common/Button/Button';
import HeartIcon from '@/components/common/Icon/HeartIcon';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import { Template } from '@/types';
import { useRouter } from 'next/navigation';
import { useCardsStore } from '@/store/useCardsStore';
import { jsonUtils } from '@/utils';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';

type UserTemplateDetailsProps = {
  template: Template;
};

const UserTemplateDetails = ({ template }: UserTemplateDetailsProps) => {
  const setCards = useCardsStore(state => state.setCard);
  const setTemplateId = useCardsStore(state => state.setTemplateId);
  const router = useRouter();

  const moveToEditorHandler = () => {
    const templateData = jsonUtils.parseEscapedJson(template.editor);

    setCards(templateData);
    setTemplateId(template.id);

    router.push('/editor');
  };

  /**
   * 마이페이지에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  return (
    <div className="flex w-fit flex-col gap-2 rounded-[20px] border border-border p-4">
      <div className="h-[250px] w-[250px] rounded-[20px] bg-gray8 md:h-[270px] md:w-[270px]"></div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex flex-row justify-between">
          <p className="text-[16px] font-semibold">
            {template.title.slice(0, 13)} {template.title.length >= 13 && '...'}
          </p>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center justify-end gap-1">
              <HeartIcon width={20} className="text-heart" />
              <p className="text-xs text-gray5">{template.likes}</p>
            </div>
            <div className="flex flex-row items-center justify-end gap-1">
              <CheckIcon width={20} className="text-blue-500" />
              <p className="text-xs text-gray5">{template.purchaseCount}</p>
            </div>
          </div>
        </div>

        <p className="text-[14px] text-gray2">{template.description}</p>
        <div className="flex flex-row gap-2 text-xs text-gray5">
          {template.templateTags.map(({ korean, english }) => (
            <p key={english}>#{korean}</p>
          ))}
        </div>
        <div className="mt-2 flex flex-row gap-2">
          <Button
            onClick={() => {
              trackAmplitudeEvent('mypage-goToEditor-click');
              moveToEditorHandler();
            }}
            className="w-full rounded-md py-2 text-[13px]"
            type="full"
          >
            에디터로 이동
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTemplateDetails;
