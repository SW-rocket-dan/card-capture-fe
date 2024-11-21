import FocusBox from '@/components/editor/EditingArea/components/FocusBox/FocusBox';
import TextBox from '@/components/editor/EditingArea/components/TextBox/TextBox';
import { Card, Illust, Image, Shape } from '@/store/useCardsStore/type';
import ShapeBox from '@/components/editor/EditingArea/components/ShapeBox/ShapeBox';
import LayerBox from '@/components/editor/EditingArea/components/LayerBox/LayerBox';
import CardAddBox from '@/components/editor/EditingArea/views/CardAddBox';
import LayerAddBox from '@/components/editor/EditingArea/views/LayerAddBox';
import Button from '@/components/common/Button/Button';
import { useFocusStore } from '@/store/useFocusStore';
import ImageBox from '@/components/editor/EditingArea/components/ImageBox/ImageBox';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { useCardsStore } from '@/store/useCardsStore';
import { commandUtils, jsonUtils } from '@/utils';
import IllustBox from '@/components/editor/EditingArea/components/IllustBox/IllustBox';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import usePosterDownloader from '@/hooks/usePosterDownloader';
import DownloadProgressModal from '@/components/common/Progress/DownloadProgressModal';
import ExportButton from '@/components/editor/EditingArea/views/ExportButton';
import { useCommandStore } from '@/store/useCommandStore';
import LayerListBox from '@/components/editor/EditingArea/views/components/LayerListBox/LayerListBox';

const CardArea = ({ card }: { card: Card }) => {
  const cardId = card.id;
  const background = card.background;

  const focusedLayerId = useFocusStore(state => state.focusedLayerId);
  const setFocusedLayerId = useFocusStore(state => state.setFocusedLayerId);
  const setFocusedCardId = useFocusStore(state => state.setFocusedCardId);

  const [initialMouseDown, setInitialMouseDown] = useState<React.MouseEvent | null>(null);

  const makeFocusLayerHandler = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    setFocusedLayerId(id);
    setFocusedCardId(cardId);
    setInitialMouseDown(e);
  };

  const unFocusLayerHandler = () => {
    setFocusedLayerId(-1);
  };

  useEffect(() => {
    setInitialMouseDown(null);
  }, [focusedLayerId]);

  /**
   * json 확인하기 위한 임시 로직
   */
  const [isOpen, setIsOpen] = useState(false);
  const [json, setJson] = useState('');
  const setCard = useCardsStore(state => state.setCard);

  const changeCardHandler = () => {
    const templateData = jsonUtils.parseEscapedJson(json);
    setCard([templateData]);

    setIsOpen(false);
  };

  const getJsonDataHandler = () => {
    const currentJson = JSON.stringify(card);
    setJson(currentJson);
  };

  /**
   * card에 그려진 dom을 image export 하는 hook
   * Ref에 그려진 요소들을 이미지로 변환, 다운로드 함
   */
  const { cardRef, isDownloading, setIsDownloading, downloadCardHandler } = usePosterDownloader();

  /**
   * 에디터 페이지에서 버튼 클릭에 대한 tracking
   */
  const { trackAmplitudeEvent } = useAmplitudeContext();

  /**
   * command로 요소 조작하는 hook 사용
   */
  const { redo, undo } = useCommandStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        // metaKey는 Mac의 command 키
        switch (event.key.toLowerCase()) {
          case 'z':
            if (cardId !== null && focusedLayerId !== null) {
              event.preventDefault();

              if (event.shiftKey) {
                redo();
              } else {
                undo();
              }
            }
            break;

          case 'c':
            commandUtils.dispatchCommand('COPY_LAYER', {
              cardId,
              layerId: focusedLayerId,
            });
            break;

          case 'v':
            commandUtils.dispatchCommand('PASTE_LAYER', {
              cardId,
            });
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cardId, focusedLayerId]);

  return (
    <div className="flex flex-1 items-center justify-center gap-[10px] bg-editorbg">
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-[10px]">
          {/* 카드 추가 관리 박스 / 레이어 추가 관리 박스*/}
          <div className="flex w-[550px] flex-row justify-between">
            <CardAddBox />
            <div className="flex flex-row items-center gap-[10px]">
              <LayerAddBox cardId={cardId} />

              {/* json import 버튼 - 임시 / 백엔드 확인용 */}
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button className="rounded-md bg-white p-2 text-xs">JtC</button>
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

              {/* card의 데이터를 json으로 만드는 버튼 - 임시 / 백엔드 확인용 */}
              <Dialog>
                <DialogTrigger asChild onClick={getJsonDataHandler}>
                  <button className="rounded-md bg-white p-2 text-xs">CtJ</button>
                </DialogTrigger>
                <DialogContent className="flex w-[320px] flex-col items-center justify-center px-[20px] py-[40px] sm:w-[400px] md:w-[750px] md:px-[30px]">
                  <DialogTitle>현재 카드 JSON 데이터</DialogTitle>
                  <div className="min-h-[230px] w-full select-text resize-none rounded-[8px] border border-border p-5 text-[13px] outline-none">
                    {json}
                  </div>
                </DialogContent>
              </Dialog>

              <ExportButton onDownload={downloadCardHandler} />
            </div>
          </div>

          {/* export 중에 뜨는 모달 */}
          <DownloadProgressModal isOpen={isDownloading} onOpenChange={setIsDownloading} />

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
                    <FocusBox
                      key={idx}
                      cardId={cardId}
                      layerId={layer.id}
                      type="text"
                      initialMouseDown={initialMouseDown}
                    >
                      <TextBox key={idx} cardId={cardId} layerId={layer.id} type="focus" />
                    </FocusBox>
                  );
                } else if (layer.type === 'shape') {
                  // 도형 Focus Box
                  const { type, color } = layer.content as Shape;
                  return (
                    <FocusBox key={idx} cardId={cardId} layerId={layer.id} initialMouseDown={initialMouseDown}>
                      <ShapeBox shapeType={type} color={color} />
                    </FocusBox>
                  );
                } else if (layer.type === 'image') {
                  const { url } = layer.content as Image;

                  return (
                    <FocusBox
                      key={idx}
                      cardId={cardId}
                      layerId={layer.id}
                      type="image"
                      initialMouseDown={initialMouseDown}
                    >
                      <ImageBox url={url} position={layer.position} />
                    </FocusBox>
                  );
                } else if (layer.type === 'illust') {
                  const { url } = layer.content as Illust;

                  return (
                    <FocusBox key={idx} cardId={cardId} layerId={layer.id} initialMouseDown={initialMouseDown}>
                      <IllustBox url={url} position={layer.position} />
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
                } else if (layer.type === 'illust') {
                  const { url } = layer.content as Illust;

                  return (
                    <LayerBox key={idx} position={layer.position} onClick={e => makeFocusLayerHandler(e, layer.id)}>
                      <IllustBox url={url} position={layer.position} />
                    </LayerBox>
                  );
                }
              }
            })}
          </div>
        </div>

        <LayerListBox card={card} />
      </div>
    </div>
  );
};

export default CardArea;
