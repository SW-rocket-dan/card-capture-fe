import FocusBox from '@/components/editor/FocusBox/FocusBox';
import TextBox from '@/components/text/TextBox';
import { Shape } from '@/store/useCardsStore/type';
import ShapeBox from '@/components/Shape/ShapeBox';
import LayerBox from '@/components/editor/LayerBox';
import { useEffect, useState } from 'react';
import { INITIAL_CARD, useCardsStore } from '@/store/useCardsStore';

const CardArea = () => {
  // 아직 react-query 적용 안해둠(TEST 용도)
  const cards = useCardsStore(state => state.cards);
  const setCard = useCardsStore(state => state.setCard);
  const addTextLayer = useCardsStore(state => state.addTextLayer);

  /**
   * @NOTE API 나오면 그 때 서버와 연결해볼 계획
   */
  useEffect(() => {
    // const func = async () => {
    //   const data = await (
    //     await fetch('http://localhost:3000/api/mocks/cards')
    //   ) //@FIXME:주소도 .env 설정하고 넣어야함!
    //     .json();
    //   setCard(data.cards);
    // };
    // func();

    setCard([INITIAL_CARD]);
  }, []);

  //focus 상태, 얘도 좌측 탭이랑 연동하려면 추후 store로 만들긴 해야함!
  const [focusLayerId, setFocusLayerId] = useState(-1);

  const makeFocusLayerHandler = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFocusLayerId(id);
  };

  const unFocusLayerHandler = () => {
    setFocusLayerId(-1);
  };

  const addTextLayerHandler = () => {
    addTextLayer(0);
  };

  return (
    <div
      className="relative h-[700px] w-[700px] overflow-hidden border-[1px] border-border bg-white"
      onClick={unFocusLayerHandler}
    >
      {/* 현재는 카드가 한장이라고 고정하고 구현 */}
      {/* @HACKS: 컴포넌트로 빼면 좋을 로직*/}
      {cards[0]?.layers.map((layer, idx) => {
        if (focusLayerId === layer.id) {
          if (layer.type === 'text') {
            //텍스트 Focus Box
            return (
              <FocusBox key={idx} layerId={layer.id}>
                <TextBox key={idx} cardId={0} layerId={layer.id} />
              </FocusBox>
            );
          } else if (layer.type === 'shape') {
            // 도형 Focus Box
            const { type, color } = layer.content as Shape;
            return (
              <FocusBox key={idx} layerId={layer.id}>
                <ShapeBox shapeType={type} color={color} />
              </FocusBox>
            );
          }
        } else {
          if (layer.type === 'text') {
            // Text Layer Box
            return (
              <LayerBox key={idx} position={layer.position} onClick={e => makeFocusLayerHandler(e, layer.id)}>
                <TextBox key={idx} cardId={0} layerId={layer.id} />
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
          }
        }
      })}
    </div>
  );
};

export default CardArea;
