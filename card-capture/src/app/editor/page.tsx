//page.tsx
'use client';
import FocusBox from '@/components/editor/FocusBox';
import LayerBox from '@/components/editor/LayerBox';
import { useCardsStore } from '@/store/useCardsStore';
import { useEffect, useState } from 'react';

type Props = {};
const page = ({}: Props) => {
  // 아직 react-query 적용 안해둠(TEST 용도)
  const cards = useCardsStore(state => state.cards);
  const setCard = useCardsStore(state => state.setCard);

  //focus 상태, 얘도 좌측 탭이랑 연동하려면 추후 store로 만들긴 해야함!
  const [focusLayerId, setFocusLayerId] = useState(-1);

  const makeFocusLayerHandler = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFocusLayerId(id);
  };

  const unFocusLayerHandler = () => {
    setFocusLayerId(-1);
  };

  //cards 받아오기 [임시] <- react-query로 변경해야 함
  useEffect(() => {
    const func = async () => {
      const data = await (
        await fetch('http://localhost:3000/api/mocks/cards')
      ) //주소도 .env 설정하고 넣어야함!
        .json();
      setCard(data.cards);
    };
    func();
  }, []);

  return (
    <div
      className="w-96 h-96 bg-slate-400 relative ml-8"
      onClick={unFocusLayerHandler}
    >
      {/* 현재는 카드가 한장이라고 고정하고 구현 */}
      {cards[0]?.layers.map((layer, idx) =>
        focusLayerId === layer.id ? (
          <FocusBox
            key={idx}
            layerId={layer.id}
            component={
              <p style={{ background: 'green', width: '100%', height: '100%' }}>
                IM FOCUS!!
              </p>
            }
          />
        ) : (
          <LayerBox
            key={idx}
            component={
              <p style={{ background: 'green', width: '100%', height: '100%' }}>
                TEST
              </p> // 후에 <Image/>,<Text/> 등 실제 내용을 넘겨줄 자리
            }
            position={layer.position}
            onClick={e => makeFocusLayerHandler(e, layer.id)}
          />
        ),
      )}
    </div>
  );
};

export default page;
