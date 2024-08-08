import { create } from 'zustand';
import { Background, Card, Cards, Layer, Position, Shape, ShapeType, Text } from './type';
import { Draft, produce } from 'immer';
import ReactQuill from 'react-quill';
import { useFocusStore } from '@/store/useFocusStore';
import { persist } from 'zustand/middleware';

export const INITIAL_CARD: Card = {
  id: 0,
  background: {
    url: '',
    opacity: 100,
    color: '#FFFFFF',
  },
  layers: [],
};

/**
 * Card를 저장하는 스토어
 */
type useCardsStore = {
  templateId: number;
  cards: Card[];

  setTemplateId: (templateId: number) => void;

  setCard: (card: Card[]) => void;
  addCard: () => void;

  getLayer: (cardId: number, layerId: number) => Layer | null;
  deleteLayer: (cardId: number, layerId: number) => void;

  getLayerText: (cardId: number, layerId: number) => ReactQuill.Value | null;
  setLayerText: (cardId: number, layerId: number, text: ReactQuill.Value) => void;

  setPosition: (cardId: number, layerId: number, position: Position) => void;
  getPosition: (cardId: number, layerId: number) => Position | null;

  setBackground: (cardId: number, background: Partial<Background>) => void;
  getBackground: (cardId: number) => Background | null;

  setShapeLayerColor: (cardId: number, layerId: number, color: string) => void;
  getShapeLayer: (cardId: number, layerId: number) => Shape | null;

  addTextLayer: (cardId: number) => void;
  addImageLayer: (
    cardId: number,
    url: string,
    dimension: {
      width: number;
      height: number;
    },
  ) => void;
  addShapeLayer: (cardId: number, type: ShapeType) => void;
  addIllustLayer: (cardId: number, url: string) => void;
};

export const useCardsStore = create(
  persist<useCardsStore>(
    (set, get) => ({
      templateId: -1,
      cards: [],

      setTemplateId: templateId => set({ templateId }),

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

      getLayer: (cardId, layerId) => {
        const card = get().cards.find(({ id }) => id === cardId);
        if (!card) return null;

        const layer = card.layers.find(({ id }) => id === layerId);
        if (!layer) return null;

        return layer;
      },

      deleteLayer: (cardId, layerId) => {
        set(
          produce(
            (
              draft: Draft<{
                cards: Card[];
              }>,
            ) => {
              const card = draft.cards.find(({ id }) => id === cardId);
              if (!card) return;
              card.layers = card.layers.filter(({ id }) => id !== layerId);
            },
          ),
        );
      },

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

      setPosition: (cardId: number, layerId: number, position: Position) =>
        set(
          produce(
            (
              draft: Draft<{
                cards: Card[];
              }>,
            ) => {
              const card = draft.cards.find((card: Card) => card.id === cardId);

              if (card) card.layers = card.layers.map(v => (v.id === layerId ? { ...v, position: position } : v));
            },
          ),
        ),

      getPosition: (cardId, layerId) => {
        const card = get().cards.find(({ id }) => id === cardId);
        if (!card) return null;

        const layer = card.layers.find(({ id }) => id === layerId);
        if (!layer) return null;

        return layer.position;
      },

      setBackground: (cardId: number, background: Partial<Background>) => {
        set(
          produce(draft => {
            const card = draft.cards.find((card: Card) => card.id === cardId);
            if (card) {
              card.background = { ...card.background, ...background };
            }
          }),
        );
      },

      getBackground: (cardId: number) => {
        const card = get().cards.find(({ id }) => id === cardId);
        if (!card) return null;

        return card.background;
      },

      setShapeLayerColor: (cardId, layerId, color) =>
        set(
          produce(draft => {
            const card = draft.cards.find((card: Card) => card.id === cardId);

            if (card) {
              const layer = card.layers.find((layer: Layer) => layer.id === layerId);

              if (layer && layer.type === 'shape') {
                (layer.content as Shape).color = color;
              }
            }
          }),
        ),

      getShapeLayer: (cardId, layerId) => {
        const card = get().cards.find(({ id }) => id === cardId);
        if (!card) return null;

        const layer = card.layers.find(({ id }) => id === layerId);
        if (!layer) return null;

        return layer.content as Shape;
      },

      addTextLayer: (cardId: number) =>
        set(
          produce(
            (
              draft: Draft<{
                cards: Card[];
              }>,
            ) => {
              // 현재 카드의 레이어 중 가장 큰 ID 값을 찾고 + 1
              const maxLayerId = draft.cards[cardId].layers.reduce((max, layer) => Math.max(max, layer.id), -1);
              const newLayerId = maxLayerId + 1;

              draft.cards[cardId].layers.push({
                id: newLayerId,
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
                  zIndex: 3,
                  opacity: 100,
                },
              });

              useFocusStore.getState().updateFocus(cardId, newLayerId);
            },
          ),
        ),

      addImageLayer: (cardId, url, dimension) =>
        set(
          produce(
            (
              draft: Draft<{
                cards: Card[];
              }>,
            ) => {
              // 현재 카드의 레이어 중 가장 큰 ID 값을 찾고 + 1
              const maxLayerId = draft.cards[cardId].layers.reduce((max, layer) => Math.max(max, layer.id), -1);
              const newLayerId = maxLayerId + 1;

              draft.cards[cardId].layers.push({
                id: newLayerId,
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
                  width: dimension.width,
                  height: dimension.height,
                  rotate: 0,
                  zIndex: 2,
                  opacity: 100,
                },
              });

              useFocusStore.getState().updateFocus(cardId, newLayerId);
            },
          ),
        ),

      addShapeLayer: (cardId, type) =>
        set(
          produce(
            (
              draft: Draft<{
                cards: Card[];
              }>,
            ) => {
              // 현재 카드의 레이어 중 가장 큰 ID 값을 찾고 + 1
              const maxLayerId = draft.cards[cardId].layers.reduce((max, layer) => Math.max(max, layer.id), -1);
              const newLayerId = maxLayerId + 1;

              draft.cards[cardId].layers.push({
                id: newLayerId,
                type: 'shape',
                content: {
                  type: type,
                  color: '#DDDDDD',
                },
                position: {
                  x: 200,
                  y: 200,
                  width: 200,
                  height: 200,
                  rotate: 0,
                  zIndex: 2,
                  opacity: 100,
                },
              });

              useFocusStore.getState().updateFocus(cardId, newLayerId);
            },
          ),
        ),

      addIllustLayer: (cardId, url) =>
        set(
          produce(
            (
              draft: Draft<{
                cards: Card[];
              }>,
            ) => {
              // 현재 카드의 레이어 중 가장 큰 ID 값을 찾고 + 1
              const maxLayerId = draft.cards[cardId].layers.reduce((max, layer) => Math.max(max, layer.id), -1);
              const newLayerId = maxLayerId + 1;

              draft.cards[cardId].layers.push({
                id: newLayerId,
                type: 'illust',
                content: {
                  url,
                },
                position: {
                  x: 200,
                  y: 200,
                  width: 200,
                  height: 200,
                  rotate: 0,
                  zIndex: 2,
                  opacity: 100,
                },
              });

              useFocusStore.getState().updateFocus(cardId, newLayerId);
            },
          ),
        ),
    }),

    { name: 'cardStore' },
  ),
);
