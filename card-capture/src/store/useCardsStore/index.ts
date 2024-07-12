import { create } from 'zustand';
import { Background, Card, Cards, Position, Text } from './type';
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

  setBackgroundColor: (cardId: number, backgroundColor: string) => void;
  setBackground: (cardId: number, background: Background) => void;
  getBackground: (cardId: number) => Background | null;

  addTextLayer: (cardId: number) => void;
  addImageLayer: (cardId: number, url: string) => void;
};

export const useCardsStore = create<useCardsStore>()((set, get) => ({
  cards: [],

  setCard: (cards: Card[]) =>
    set(
      //immer를 활용하여 불변성 유지
      produce(
        (
          draft: Draft<{
            cards: Card[];
          }>,
        ) => {
          draft.cards = cards;
        },
      ),
    ),

  addCard: () =>
    set(
      produce(
        (
          draft: Draft<{
            cards: Card[];
          }>,
        ) => {
          draft.cards.push(INITIAL_CARD);
        },
      ),
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

  setLayerText: (cardId, layerId, text) =>
    set(
      produce(
        (
          draft: Draft<{
            cards: Card[];
          }>,
        ) => {
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
        },
      ),
    ),

  setPosition: (layerId: number, position: Position) =>
    set(
      //position 변경
      produce(
        (
          draft: Draft<{
            cards: Card[];
          }>,
        ) => {
          draft.cards[0].layers = draft.cards[0].layers.map(v => (v.id === layerId ? { ...v, position: position } : v));
        },
      ),
    ),

  setBackgroundColor: (cardId: number, backgroundColor: string) =>
    set(
      produce(draft => {
        const card = draft.cards.find((card: Card) => card.id === cardId);
        if (card) {
          card.background = { ...card.background, color: backgroundColor };
        }
      }),
    ),

  setBackground: (cardId: number, background: Background) =>
    set(
      produce(draft => {
        const card = draft.cards.find((card: Card) => card.id === cardId);
        if (card) {
          card.background = background;
        }
      }),
    ),

  getBackground: (cardId: number) => {
    const card = get().cards.find(({ id }) => id === cardId);
    if (!card) return null;

    return card.background;
  },

  addTextLayer: (cardId: number) =>
    set(
      produce(
        (
          draft: Draft<{
            cards: Card[];
          }>,
        ) => {
          draft.cards[cardId].layers.push({
            id: draft.cards[cardId].layers.length + 1,
            type: 'text',
            content: {
              content: '',
            },
            position: {
              x: 220,
              y: 220,
              width: 200,
              height: 45,
              rotate: 0,
              zIndex: 2,
              opacity: 10,
            },
          });
        },
      ),
    ),

  addImageLayer: (cardId: number, url: string) =>
    set(
      produce(
        (
          draft: Draft<{
            cards: Card[];
          }>,
        ) => {
          draft.cards[cardId].layers.push({
            id: draft.cards[cardId].layers.length + 1,
            type: 'image',
            content: {
              url: url,
              cropStartX: 0,
              cropStartY: 0,
              cropWidth: 0,
              cropHeight: 0,
            },
            position: {
              x: 200,
              y: 200,
              width: 200,
              height: 100,
              rotate: 0,
              zIndex: 2,
              opacity: 1,
            },
          });
        },
      ),
    ),
}));
