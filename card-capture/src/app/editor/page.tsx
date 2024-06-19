//page.tsx
'use client';
import { useCardsStore } from '@/store/useCardsStore';
import { Card } from '@/store/useCardsStore/type';
import { useEffect, useState } from 'react';

type Props = {};
const page = ({}: Props) => {
  // 아직 react-query 적용 안해둠(TEST 용도)
  const card = useCardsStore(state => state.cards);
  const setCard = useCardsStore(state => state.setCard);

  useEffect(() => {
    const func = async () => {
      const data = await (
        await fetch('http://localhost:3000/api/mocks/cards')
      ).json();
      setCard(data);
    };
    func();
  }, []);

  console.log(card);

  return <div className="w-96 h-96 bg-slate-400 relative"></div>;
};

export default page;
