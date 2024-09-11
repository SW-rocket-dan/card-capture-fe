'use client';

import { useQuery } from '@tanstack/react-query';
import { templateApi } from '@/api';
import { Template } from '@/types';
import { useEffect, useState } from 'react';
import { jsonUtils } from '@/utils';
import { Card } from '@/store/useCardsStore/type';
import { useParams, useRouter } from 'next/navigation';
import CheckBox from '@/components/common/CheckBox/CheckBox';
import SelectedPoster from '@/components/prompt/result/ResultTemplate/components/SelectedPoster';
import Button from '@/components/common/Button/Button';
import DownloadIcon from '@/components/common/Icon/DownloadIcon';
import StarsIcon from '@/components/common/Icon/StarsIcon';
import usePosterDownloader from '@/hooks/usePosterDownloader';
import DownloadProgressModal from '@/components/common/Progress/DownloadProgressModal';

const ResultTemplate = () => {
  /**
   * 라우팅된 아이디 기반으로 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const { data } = useQuery<Template>({
    queryKey: [`template-${id}`],
    queryFn: () => templateApi.getTemplateData(Number(id)),
  });

  const [templateData, setTemplateData] = useState<Card[]>([]);
  const [selectedList, setSelectedList] = useState<boolean[]>([]);

  useEffect(() => {
    if (!data) return;

    const templateData = jsonUtils.parseEscapedJson(data.editor);
    setTemplateData(templateData);

    const selectedData = templateData.map(() => false);
    setSelectedList(selectedData);
  }, [data]);

  const toggleSelectionAtIndexHandler = (index: number) => {
    setSelectedList(prev => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];

      return newArray;
    });
  };

  useEffect(() => {
    const allSelected = selectedList.every(Boolean);
    setIsAllSelected(allSelected);
  }, [selectedList]);

  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const selectAllCheckBoxHandler = () => {
    const isAllChecked = selectedList.every(Boolean);

    if (isAllChecked) {
      setSelectedList(prev => prev.map(_ => false));
      setIsAllSelected(false);
    } else {
      setSelectedList(prev => prev.map(_ => true));
      setIsAllSelected(true);
    }
  };

  const router = useRouter();

  const moveToEditor = () => {
    const hasChecked = selectedList.some(Boolean);

    if (!hasChecked) return;

    router.push(`/editor/${id}`);
  };

  const { cardRef, isDownloading, setIsDownloading, downloadCardHandler } = usePosterDownloader();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[900px] flex-row items-center gap-2 border-b-[1px] border-border pb-3">
        <CheckBox isChecked={isAllSelected} setIsChecked={selectAllCheckBoxHandler} />
        <p className="text-[15px] font-medium tracking-little-tight" onClick={selectAllCheckBoxHandler}>
          전체 선택
        </p>
      </div>

      <div className="flex flex-row gap-5 py-6">
        {templateData.map((card, index) => (
          <SelectedPoster
            key={card.id}
            ref={cardRef}
            size={390}
            card={card}
            isChecked={selectedList[index]}
            setIsChecked={() => toggleSelectionAtIndexHandler(index)}
          />
        ))}
      </div>

      <div className="flex w-[900px] flex-row items-center justify-center gap-5 border-b-[1px] border-border pb-8">
        <Button
          className="box-border w-[280px] rounded-[20px] py-2.5 text-[12.5px]"
          type="default"
          onClick={downloadCardHandler}
        >
          <p>이미지 바로 다운받기</p>
          <DownloadIcon width={14} />
        </Button>
        <Button className="w-[283px] rounded-[20px] py-[11px] text-[12.5px]" type="full" onClick={moveToEditor}>
          <p>무료로 편집하러 가기</p>
          <StarsIcon width={14} />
        </Button>
      </div>

      <DownloadProgressModal isOpen={isDownloading} onOpenChange={setIsDownloading} />
    </div>
  );
};

export default ResultTemplate;
