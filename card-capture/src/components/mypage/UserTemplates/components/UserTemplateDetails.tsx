import Button from '@/components/common/Button/Button';
import HeartIcon from '@/components/common/Icon/HeartIcon';
import CheckIcon from '@/components/common/Icon/CheckIcon';
import { Template } from '@/types';
import { useRouter } from 'next/navigation';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Poster from '@/components/common/Poster/Poster';
import useParseTemplateData from '@/hooks/useParseTemplateData';
import useIsMobile from '@/hooks/useIsMobile';
import { useEffect, useState } from 'react';

type UserTemplateDetailsProps = {
  template: Template;
};

const UserTemplateDetails = ({ template }: UserTemplateDetailsProps) => {
  const router = useRouter();

  const moveToEditorHandler = () => {
    router.push(`/editor/${template.id}`);
  };

  const templateData = useParseTemplateData(template.editor);
  const [templateSize, setTemplateSize] = useState<number>(270);
  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (isMobile) setTemplateSize(240);
    else setTemplateSize(260);
  }, [isMobile]);

  /**
   * 마이페이지에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  return (
    <div className="flex w-fit flex-col gap-2 rounded-[20px] border border-border p-4">
      <div className="h-fit w-fit overflow-hidden rounded-[20px] border border-border bg-border">
        {templateData ? (
          <Poster size={templateSize} card={templateData[0]} hasBorder={false} />
        ) : (
          <div style={{ width: `${templateSize}px`, height: `${templateSize}px` }}></div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex flex-row justify-between">
          <p className="text-[15px] font-semibold">
            {template.title.slice(0, 13)} {template.title.length >= 13 && '...'}
          </p>

          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center justify-end gap-1">
              <HeartIcon width={18} className="text-heart" />
              <p className="text-xs text-gray5">{template.likes}</p>
            </div>
            <div className="flex flex-row items-center justify-end gap-1">
              <CheckIcon width={18} className="text-blue-500" />
              <p className="text-xs text-gray5">{template.purchaseCount}</p>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-gray2">{template.description}</p>
        <div className="flex flex-row gap-2 text-[12px] text-gray5">
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
            className="w-full rounded-lg py-2 text-[12px]"
            type="full"
          >
            <p className="font-medium">에디터로 이동</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTemplateDetails;
