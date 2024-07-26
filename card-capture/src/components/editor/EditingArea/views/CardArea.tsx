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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { useCardsStore } from '@/store/useCardsStore';
import { parseEscapedJson } from '@/utils/jsonUtils';

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

          <Button type="full" className="h-[36px] w-[145px] rounded-[5px]">
            <span className="text-xs">Export</span>
          </Button>
        </div>
      </div>

      {/* */}
      <div
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
