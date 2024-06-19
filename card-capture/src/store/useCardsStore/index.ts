import { create } from 'zustand';
import { Card } from './type';
import { Draft, produce } from 'immer';

/**
 * Card 1장을 받아 저장하는 스토어
 * 나중에는 여러장을 받을 수 있게 구조변경해야함
 * useProjectStore도 설계되면 스토어를 조각으로 합쳐야 함
 */
type useCardsStore = {
  cards: Card[];
  setCard: (card: Card) => void;
};

export const useCardsStore = create<useCardsStore>()(set => ({
  cards: [],
  setCard: (card: Card) =>
    set(
      //immer를 활용하여 불변성 유지
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards = [card];
      }),
    ),
}));
