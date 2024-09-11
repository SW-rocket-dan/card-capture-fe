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
  const router = useRouter();

  /**
   * 라우팅된 아이디 기반으로 템플릿 데이터 가져오기
   */
  const params = useParams();
  const id = params.templateId as string;

  const { data } = useQuery<Template>({
    queryKey: [`template-${id}`],
    queryFn: () => templateApi.getTemplateData(Number(id)),
  });

  /**
   * 받아온 템플릿 데이터를 기반으로 선택되었는지 여부를 기록하는 selectedList 상태 선언
   */
  const [templateData, setTemplateData] = useState<Card[]>([]);
  const [selectedList, setSelectedList] = useState<boolean[]>([]);

  useEffect(() => {
    if (!data) return;

    const parsedData = jsonUtils.parseEscapedJson(data.editor);
    const processedTemplateData = Array.isArray(parsedData) ? parsedData : [parsedData];

    setTemplateData(processedTemplateData);

    const selectedData = templateData.map(() => false);
    setSelectedList(selectedData);
  }, [data]);

  /**
   * 특정 인덱스(템플릿)의 선택 여부를 변경하는 핸들러
   */
  const toggleSelectionAtIndexHandler = (index: number) => {
    setSelectedList(prev => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];

      return newArray;
    });
  };

  /**
   * 모든 템플릿이 선택되었는지 확인하는 상태 선언
   */
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  useEffect(() => {
    const allSelected = selectedList.every(Boolean);
    setIsAllSelected(allSelected);
  }, [selectedList]);

  /**
   * 템플릿 전체를 선택하거나 해제하는 핸들러
   * 선택되지 않은게 한 개라도 있다면 클릭시 전체 선택되도록 설정
   */
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

  /**
   * 선택된 템플릿이 있는지 (개수 상관 없음) 여부를 확인하는 로직
   * 버튼의 활성화를 위해서 선언 관리
   */
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  useEffect(() => {
    setHasChecked(selectedList.some(Boolean));
  }, [selectedList]);

  /**
   * 에디터 페이지로 이동하는 핸들러
   */
  const moveToEditor = () => {
    router.push(`/editor/${id}`);
  };

  /**
   * card에 그려진 dom을 image export 하는 hook
   * Ref에 그려진 요소들을 이미지로 변환, 다운로드 함
   */
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
          disable={!hasChecked}
          onClick={downloadCardHandler}
        >
          <p>이미지 바로 다운받기</p>
          <DownloadIcon width={14} />
        </Button>
        <Button
          className="w-[283px] rounded-[20px] py-[11px] text-[12.5px]"
          type="full"
          disable={!hasChecked}
          onClick={moveToEditor}
        >
          <p>무료로 편집하러 가기</p>
          <StarsIcon width={14} />
        </Button>
      </div>

      <DownloadProgressModal isOpen={isDownloading} onOpenChange={setIsDownloading} />
    </div>
  );
};

export default ResultTemplate;
