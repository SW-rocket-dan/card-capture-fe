import { create } from 'zustand';
import { Card, Cards, Position, Text } from './type';
import { Draft, produce } from 'immer';
import ReactQuill from 'react-quill';

export const INITIAL_CARD: Card = {
  id: 0,
  background: {
    url: '',
    opacity: 1,
    color: '#FFFFFF',
  },
  layers: [],
};

export const INITIAL_CARDS: Cards = {
  cards: [],
};

/**
 * Card 1장을 받아 저장하는 스토어
 * 나중에는 여러장을 받을 수 있게 구조 변경해야함!!!!!
 * useProjectStore도 설계되면 스토어를 조각으로 합쳐야 함
 */
type useCardsStore = {
  cards: Card[];

  setCard: (card: Card[]) => void;
  addCard: () => void;

  getLayerText: (cardId: number, layerId: number) => ReactQuill.Value | null;
  setLayerText: (cardId: number, layerId: number, text: ReactQuill.Value) => void;

  setPosition: (layerId: number, position: Position) => void;

  addTextLayer: (cardId: number) => void;
};

export const useCardsStore = create<useCardsStore>()((set, get) => ({
  cards: [],

  setCard: (cards: Card[]) =>
    set(
      //immer를 활용하여 불변성 유지
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards = cards;
      }),
    ),

  addCard: () =>
    set(
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards.push(INITIAL_CARD);
      }),
    ),

  getLayerText: (cardId, layerId) => {
    const card = get().cards.find(({ id }) => id === cardId);
    if (!card) return null;

    const layer = card.layers.find(({ id }) => id === layerId);
    if (!layer) return null;

    if (layer.type !== 'text') return null;

    const { content } = layer.content as Text;
    return content;
  },

  setLayerText: (cardId, layerId, text) => {
    return set(
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards[cardId].layers = draft.cards[cardId].layers.map(v =>
          v.id === layerId
            ? {
                ...v,
                content: {
                  content: text,
                },
              }
            : v,
        );
      }),
    );
  },

  setPosition: (layerId: number, position: Position) =>
    set(
      //position 변경
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards[0].layers = draft.cards[0].layers.map(v => (v.id === layerId ? { ...v, position: position } : v));
      }),
    ),

  addTextLayer: (cardId: number) =>
    set(
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards[cardId].layers.push({
          id: draft.cards[cardId].layers.length + 1,
          type: 'text',
          content: {
            content: '',
          },
          position: {
            x: 300,
            y: 300,
            width: 200,
            height: 50,
            rotate: 0,
            zIndex: 2,
            opacity: 1,
          },
        });
      }),
    ),
}));
