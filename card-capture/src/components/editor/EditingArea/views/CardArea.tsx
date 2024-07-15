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

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[10px] bg-editorbg">
      <div className="flex w-[550px] flex-row justify-between">
        <CardAddBox />
        <div className="flex flex-row items-center gap-[10px]">
          <LayerAddBox cardId={cardId} />
          <Button type="full" className="h-[36px] w-[145px] rounded-[5px]">
            <span className="text-xs">Export</span>
          </Button>
        </div>
      </div>
      <div
        className="relative h-[550px] w-[550px] overflow-hidden border-[1px] border-border bg-white"
        style={{
          userSelect: 'auto',
          backgroundColor: background.color,
          opacity: background.opacity / 100,
        }}
        onClick={unFocusLayerHandler}
      >
        {/* 현재는 카드가 한장이라고 고정하고 구현 */}
        {/* @HACKS: 컴포넌트로 빼면 좋을 로직*/}
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
