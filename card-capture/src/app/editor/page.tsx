//page.tsx
'use client';
import LayerBox from '@/components/editor/LayerBox';
import { useCardsStore } from '@/store/useCardsStore';
import { Card } from '@/store/useCardsStore/type';
import { useEffect, useState } from 'react';

type Props = {};
const page = ({}: Props) => {
  // 아직 react-query 적용 안해둠(TEST 용도)
  const cards = useCardsStore(state => state.cards);
  const setCard = useCardsStore(state => state.setCard);

  //cards 받아오기 [임시] <- react-query로 변경해야 함
  useEffect(() => {
    const func = async () => {
      const data = await (
        await fetch('http://localhost:3000/api/mocks/cards')
      ) //주소도 .env 설정하고 넣어야함!
        .json();
      console.log(data);
      setCard(data.cards);
    };
    func();
  }, []);

  return (
    <div className="w-96 h-96 bg-slate-400 relative">
      {cards[0]?.layers.map((layer, idx) => (
        <LayerBox
          key={idx}
          component={
            <p style={{ background: 'green', width: '100%', height: '100%' }}>
              TEST
            </p>
          }
          position={layer.position}
        />
      ))}
    </div>
  );
};

export default page;
