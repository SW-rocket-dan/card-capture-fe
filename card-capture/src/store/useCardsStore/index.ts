import { create } from 'zustand';
import { Card, Layer, Position } from './type';
import { Draft, produce } from 'immer';

/**
 * Card 1장을 받아 저장하는 스토어
 * 나중에는 여러장을 받을 수 있게 구조변경해야함!!!!!
 * useProjectStore도 설계되면 스토어를 조각으로 합쳐야 함
 */
type useCardsStore = {
  cards: Card[];
  setCard: (card: Card[]) => void;
  setPosition: (layerId: number, position: Position) => void;
};

export const useCardsStore = create<useCardsStore>()(set => ({
  cards: [],
  setCard: (cards: Card[]) =>
    set(
      //immer를 활용하여 불변성 유지
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards = cards;
      }),
    ),
  setPosition: (layerId: number, position: Position) =>
    set(
      //position 변경
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards[0].layers = draft.cards[0].layers.map(v =>
          v.id === layerId ? { ...v, position: position } : v,
        );
      }),
    ),
}));
