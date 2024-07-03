import { useCardsStore } from '@/store/useCardsStore';
import { useEffect, useState } from 'react';
import FocusBox from '@/components/editor/FocusBox/FocusBox';
import TextBox from '@/components/text/TextBox';
import LayerBox from '@/components/editor/LayerBox';
import { Shape } from '@/store/useCardsStore/type';
import ShapeBox from '@/components/Shape/ShapeBox';
import 'react-quill/dist/quill.snow.css';

const EditingArea = () => {
  // 아직 react-query 적용 안해둠(TEST 용도)
  const cards = useCardsStore(state => state.cards);
  const setCard = useCardsStore(state => state.setCard);
  const addTextLayer = useCardsStore(state => state.addTextLayer);

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

  useEffect(() => {
    const func = async () => {
      const data = await (
        await fetch('http://localhost:3000/api/mocks/cards')
      ) //@FIXME:주소도 .env 설정하고 넣어야함!
        .json();
      setCard(data.cards);
    };
    func();
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center bg-editorbg">
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
                <FocusBox
                  key={idx}
                  layerId={layer.id}
                  component={<TextBox key={idx} cardId={0} layerId={layer.id} />}
                />
              );
            } else if (layer.type === 'shape') {
              // 도형 Focus Box
              const { type, color } = layer.content as Shape;
              return <FocusBox key={idx} layerId={layer.id} component={<ShapeBox shapeType={type} color={color} />} />;
            }
          } else {
            if (layer.type === 'text') {
              // Text Layer Box
              return (
                <LayerBox
                  key={idx}
                  component={<TextBox key={idx} cardId={0} layerId={layer.id} />}
                  position={layer.position}
                  onClick={e => makeFocusLayerHandler(e, layer.id)}
                />
              );
            } else if (layer.type === 'shape') {
              // 도형 Layer Box
              const { type, color } = layer.content as Shape;
              return (
                <LayerBox
                  key={idx}
                  component={<ShapeBox shapeType={type} color={color} />}
                  position={layer.position}
                  onClick={e => makeFocusLayerHandler(e, layer.id)}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default EditingArea;
