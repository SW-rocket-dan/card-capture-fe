import CardArea from '@/components/editor/Tab/EditingArea/components/CardArea';
import { INITIAL_CARD, useCardsStore } from '@/store/useCardsStore';
import { useEffect } from 'react';

const EditingArea = () => {
  const cards = useCardsStore(state => state.cards);
  const setCard = useCardsStore(state => state.setCard);

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

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[17px] bg-editorbg pl-[420px]">
      {cards.map(card => (
        <CardArea key={card.id} card={card} />
      ))}
    </div>
  );
};

export default EditingArea;
