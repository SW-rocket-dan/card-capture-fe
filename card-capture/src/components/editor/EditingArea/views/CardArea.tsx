import FocusBox from '@/components/editor/EditingArea/components/FocusBox/FocusBox';
import TextBox from '@/components/editor/EditingArea/components/TextBox/TextBox';
import { Card, Image, Shape } from '@/store/useCardsStore/type';
import ShapeBox from '@/components/editor/EditingArea/components/ShapeBox/ShapeBox';
import LayerBox from '@/components/editor/EditingArea/components/LayerBox/LayerBox';
import CardAddBox from '@/components/editor/EditingArea/views/CardAddBox';
import LayerAddBox from '@/components/editor/EditingArea/views/LayerAddBox';
import Button from '@/components/common/Button/Button';
import { useFocusStore } from '@/store/useFocusStore';
import ImageBox from '@/components/editor/EditingArea/components/ImageBox/ImageBox';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCardsStore } from '@/store/useCardsStore';
import { parseEscapedJson } from '@/utils/jsonUtils';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { Progress } from '@/components/ui/progress';

const CardArea = ({ card }: { card: Card }) => {
  const cardId = card.id;
  const background = card.background;

  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);
  const setFocusedCardId = useFocusStore(state => state.setFocusedCardId);

  const makeFocusLayerHandler = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    setFocusedLayerId(id);
    setFocusedCardId(cardId);
  };

  const unFocusLayerHandler = () => {
    setFocusedLayerId(-1);
  };

  /**
   * json 확인하기 위한 임시 로직
   */
  const [isOpen, setIsOpen] = useState(false);
  const [json, setJson] = useState('');
  const setCard = useCardsStore(state => state.setCard);

  const changeCardHandler = () => {
    const templateData = parseEscapedJson(json);
    setCard(templateData.cards);

    setIsOpen(false);
  };

  /**
   * card에 그려진 dom을 image export 하는 handler
   * html2canvas와 file-saver 사용
   */
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(10);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCardHandler = async () => {
    if (!cardRef || !cardRef.current) return;

    // 포커스 된 항목이 있는 경우 FocusBox의 테두리도 함께 출력될 수 있으므로 제거
    setFocusedLayerId(-1);
    await new Promise(resolve => setTimeout(resolve, 100));

    // 다운로드가 시작되면서 대기 모달이 떠야 함으로 상태 변경
    setIsDownloading(true);

    try {
      const cardArea = cardRef.current;

      // html-to-image 사용하여 이미지로 변경
      const dataUrl = await toPng(cardArea, {
        includeQueryParams: true,
        quality: 0.8, // 품질 설정
        width: cardArea.offsetWidth,
        height: cardArea.offsetHeight,
      });

      // file-saver 라이브러리 사용하여 자동 다운로드
      saveAs(dataUrl, 'card-capture-image.png');
    } catch (e) {
      console.error('Error converting card to image', e);
    } finally {
      setIsDownloading(false);
      setProgress(10);
    }
  };

  /**
   * progress 바를 10씩 증가시키는 함수
   */
  const increaseProgress = useCallback(() => {
    if (progress < 90) {
      setProgress(prevProgress => prevProgress + 10);
    }
  }, [progress]);

  /**
   * 3초에 한번씩 progress를 증가시키는 로직
   */
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isDownloading) {
      timer = setInterval(increaseProgress, 300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDownloading, increaseProgress]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[10px] bg-editorbg">
      {/* 카드 추가 관리 박스 / 레이어 추가 관리 박스*/}
      <div className="flex w-[550px] flex-row justify-between">
        <CardAddBox />
        <div className="flex flex-row items-center gap-[10px]">
          <LayerAddBox cardId={cardId} />

          {/* json import 버튼 - 임시 / 백엔드 확인용 */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="rounded-md bg-white p-2 text-sm">JSON</button>
            </DialogTrigger>
            <DialogContent className="flex w-[320px] flex-col items-center justify-center px-[20px] py-[40px] sm:w-[400px] md:w-[750px] md:px-[30px]">
              <DialogTitle>Json String 입력하기</DialogTitle>
              <textarea
                onChange={e => setJson(e.target.value)}
                placeholder="앞뒤로 따옴표 빼고 입력해야 합니다"
                className="min-h-[230px] w-full resize-none rounded-[8px] border border-border p-5 text-[13px] outline-none"
              />
              <Button onClick={changeCardHandler} type="full" className="h-[40px] w-full text-[13px] sm:w-[170px]">
                입력완료
              </Button>
            </DialogContent>
          </Dialog>

          <Button onClick={downloadCardHandler} type="full" className="h-[36px] w-[145px] rounded-[5px]">
            <span className="text-xs">Export</span>
          </Button>
        </div>
      </div>

      {/* export 중에 뜨는 모달 */}
      <Dialog open={isDownloading} onOpenChange={setIsDownloading}>
        <DialogContent className="flex w-[400px] flex-col items-center justify-center px-[20px] py-[40px]">
          <div className="flex flex-col items-center justify-center gap-1">
            <DialogTitle>카드뉴스를 이미지로 변환하고 있어요!</DialogTitle>
            <DialogDescription>대기 창을 닫아도 다운로드는 문제없이 진행됩니다</DialogDescription>
          </div>
          <div className="flex flex-col">
            <Progress value={progress} className="w-[250px]" />
            <div className="h-3 w-3 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>

      {/* card에 요소 출력 */}
      <div
        ref={cardRef}
        className="relative h-[550px] w-[550px] overflow-hidden border-[1px] border-border bg-white"
        style={{
          userSelect: 'auto',
          backgroundImage: `url(${background.url})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: background.color,
          opacity: background.opacity / 100,
        }}
        onClick={unFocusLayerHandler}
      >
        {card.layers.map((layer, idx) => {
          if (focusedLayerId === layer.id) {
            if (layer.type === 'text') {
              //텍스트 Focus Box
              return (
                <FocusBox key={idx} cardId={cardId} layerId={layer.id} type="text">
                  <TextBox key={idx} cardId={cardId} layerId={layer.id} />
                </FocusBox>
              );
            } else if (layer.type === 'shape') {
              // 도형 Focus Box
              const { type, color } = layer.content as Shape;
              return (
                <FocusBox key={idx} cardId={cardId} layerId={layer.id}>
                  <ShapeBox shapeType={type} color={color} />
                </FocusBox>
              );
            } else if (layer.type === 'image') {
              const { url } = layer.content as Image;

              return (
                <FocusBox key={idx} cardId={cardId} layerId={layer.id}>
                  <ImageBox url={url} position={layer.position} />
                </FocusBox>
              );
            }
          } else {
            if (layer.type === 'text') {
              // Text Layer Box
              return (
                <LayerBox key={idx} position={layer.position} onClick={e => makeFocusLayerHandler(e, layer.id)}>
                  <TextBox key={idx} cardId={cardId} layerId={layer.id} />
                </LayerBox>
              );
            } else if (layer.type === 'shape') {
              // 도형 Layer Box
              const { type, color } = layer.content as Shape;
              return (
                <LayerBox key={idx} position={layer.position} onClick={e => makeFocusLayerHandler(e, layer.id)}>
                  <ShapeBox shapeType={type} color={color} />
                </LayerBox>
              );
            } else if (layer.type === 'image') {
              const { url } = layer.content as Image;

              return (
                <LayerBox key={idx} position={layer.position} onClick={e => makeFocusLayerHandler(e, layer.id)}>
                  <ImageBox url={url} position={layer.position} />
                </LayerBox>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default CardArea;
