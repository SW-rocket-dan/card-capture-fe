import { create } from 'zustand';
import {
  Background,
  Card,
  Image,
  ImageLayer,
  Layer,
  LayerType,
  LayerTypeMap,
  Position,
  Shape,
  ShapeLayer,
  ShapeType,
  Text,
  TextLayer,
  ZIndexMap,
} from './type';
import { Draft, produce } from 'immer';
import ReactQuill from 'react-quill';
import { useFocusStore } from '@/store/useFocusStore';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useCommandStore } from '@/store/useCommandStore';
import {
  findCardAndLayer,
  findDraftCardAndLayer,
  findTypedDraftLayer,
  findTypedLayer,
} from '@/store/useCardsStore/utils';

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
  zIndexMap: ZIndexMap;

  usedColors: string[];
  usedFonts: string[];

  setTemplateId: (templateId: number) => void;
  setCard: (card: Card[]) => void;
  getCard: (cardId: number) => Card | null;
  addCard: () => void;

  setLayer: (cardId: number, layerId: number, newLayer: Layer) => void;
  getLayer: {
    (cardId: number, layerId: number): Layer | null | undefined;
    <T extends LayerType>(cardId: number, layerId: number, type: T): LayerTypeMap[T] | null | undefined;
  };
  deleteLayer: (cardId: number, layerId: number) => void;

  getNewLayerInfo: (cardId: number) => { layerId: number; zIndex: number };

  getTextLayer: (cardId: number, layerId: number) => ReactQuill.Value | null;
  setTextLayer: (cardId: number, layerId: number, text: ReactQuill.Value) => void;

  setPosition: (cardId: number, layerId: number, position: Position) => void;
  getPosition: (cardId: number, layerId: number) => Position | null;

  setBackground: (cardId: number, background: Partial<Background>) => void;
  getBackground: (cardId: number) => Background | null;

  setImageLayer: (cardId: number, layerId: number, image: Image) => void;
  getImageLayer: (cardId: number, layerId: number) => Image | null;

  setShapeLayerColor: (cardId: number, layerId: number, color: string) => void;
  getShapeLayer: (cardId: number, layerId: number) => Shape | null;

  addLayer: (cardId: number, layer: Layer) => void;
  addDuplicateLayer: (cardId: number, layer: Layer) => { layerId: number; layerData: Layer } | null;

  // z-index 변경 로직
  moveLayerForward: (cardId: number, layerId: number) => void;
  moveLayerBackward: (cardId: number, layerId: number) => void;
  moveLayerToFront: (cardId: number, layerId: number) => void;
  moveLayerToBack: (cardId: number, layerId: number) => void;

  setUsedColors: (color: string) => void;
  setUsedFonts: (fontList: string[]) => void;
};

export const useCardsStore = create(
  subscribeWithSelector(
    persist<useCardsStore>(
      (set, get) => ({
        templateId: -1,
        cards: [],
        zIndexMap: {},

        usedColors: [],
        usedFonts: [],

        setTemplateId: templateId => set({ templateId }),

        setCard: (cards: Card[] | Card) =>
          set(
            produce((draft: Draft<{ cards: Card[]; zIndexMap: ZIndexMap }>) => {
              if (Array.isArray(cards)) {
                draft.cards = cards.flat(); // 중첩된 배열을 평탄화
              } else {
                draft.cards = [cards]; // 단일 Card 객체를 배열로 변환
              }

              // 설정하려는 card의 z-index를 추출해서 map에 저장하기
              draft.zIndexMap = {};
              draft.cards.forEach(card => {
                draft.zIndexMap[card.id] = {};

                card.layers.forEach(layer => {
                  draft.zIndexMap[card.id][layer.id] = layer.position.zIndex;
                });
              });
            }),
          ),

        getCard: cardId => {
          const card = get().cards.find(({ id }) => id === cardId);
          if (!card) return null;

          return card;
        },

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

        // command 등록용
        setLayer: (cardId, layerId, newLayer) =>
          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                }>,
              ) => {
                const found = findDraftCardAndLayer(draft.cards, cardId, layerId);
                if (!found) return;

                const { card, layer, layerIndex } = found;

                card.layers[layerIndex] = newLayer;
              },
            ),
          ),

        getLayer: ((cardId: number, layerId: number, type?: LayerType) => {
          if (type) {
            const found = findTypedLayer(get().cards, cardId, layerId, type);
            if (!found) return null;

            return found.layer;
          } else {
            const found = findCardAndLayer(get().cards, cardId, layerId);
            if (!found) return null;

            return found.layer;
          }
        }) as useCardsStore['getLayer'],

        deleteLayer: (cardId, layerId) => {
          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                }>,
              ) => {
                const found = findDraftCardAndLayer(draft.cards, cardId, layerId);
                if (!found) return null;

                const { card } = found;

                card.layers = card.layers.filter(({ id }) => id !== layerId);
              },
            ),
          );
        },

        getNewLayerInfo: (cardId: number) => {
          const maxLayerId = get().cards[cardId].layers.reduce((max, layer) => Math.max(max, layer.id), -1);
          const maxZIndex = Math.max(...Object.values(get().zIndexMap[cardId] || {}), 0);

          return {
            layerId: maxLayerId + 1,
            zIndex: maxZIndex + 1,
          };
        },

        getTextLayer: (cardId, layerId) => {
          const found = findTypedLayer<TextLayer>(get().cards, cardId, layerId, 'text');
          if (!found) return null;

          return found.layer.content.content;
        },

        setTextLayer: (cardId, layerId, text) =>
          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                }>,
              ) => {
                const found = findTypedDraftLayer<TextLayer>(draft.cards, cardId, layerId, 'text');
                if (!found) return null;

                found.layer.content = { content: text };
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
                const found = findDraftCardAndLayer(draft.cards, cardId, layerId);
                if (!found) return;

                found.layer.position = position;
              },
            ),
          ),

        getPosition: (cardId, layerId) => {
          const found = findCardAndLayer(get().cards, cardId, layerId);
          if (!found) return null;

          return found.layer.position;
        },

        setBackground: (cardId: number, background: Partial<Background>) => {
          set(
            produce(draft => {
              const card = draft.cards.find((card: Card) => card.id === cardId);
              if (!card) return null;

              card.background = { ...card.background, ...background };
            }),
          );
        },

        getBackground: (cardId: number) => {
          const card = get().cards.find(({ id }) => id === cardId);
          if (!card) return null;

          return card.background;
        },

        getImageLayer: (cardId, layerId) => {
          const found = findTypedLayer<ImageLayer>(get().cards, cardId, layerId, 'image');
          if (!found) return null;

          return found.layer.content;
        },

        setImageLayer: (cardId, layerId, image) =>
          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                }>,
              ) => {
                const found = findTypedDraftLayer<ImageLayer>(draft.cards, cardId, layerId, 'image');
                if (!found) return;

                found.layer.content = image;
              },
            ),
          ),

        setShapeLayerColor: (cardId, layerId, color) =>
          set(
            produce(draft => {
              const found = findTypedDraftLayer<ShapeLayer>(draft.cards, cardId, layerId, 'shape');
              if (!found) return;

              // 색상 같은지 체크 없으면 커맨드 기록에 오류 발생함
              if (found.layer.content.color === color) return;
              found.layer.content.color = color;
            }),
          ),

        getShapeLayer: (cardId, layerId) => {
          const found = findTypedLayer<ShapeLayer>(get().cards, cardId, layerId, 'shape');
          if (!found) return null;

          return found.layer.content;
        },

        addLayer: (cardId, layer) =>
          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                  zIndexMap: ZIndexMap;
                }>,
              ) => {
                draft.cards[cardId].layers.push(layer);

                if (!draft.zIndexMap[cardId]) {
                  draft.zIndexMap[cardId] = {};
                }
                draft.zIndexMap[cardId][layer.id] = layer.position.zIndex;

                useFocusStore.getState().updateFocus(cardId, layer.id);
              },
            ),
          ),

        addDuplicateLayer: (cardId, layer) => {
          let newLayerId: number | undefined;
          let newLayer: Layer | undefined;

          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                  zIndexMap: ZIndexMap;
                }>,
              ) => {
                // 현재 카드의 레이어 중 가장 큰 ID 값을 찾고 + 1
                const maxLayerId = draft.cards[cardId].layers.reduce((max, layer) => Math.max(max, layer.id), -1);
                const newZIndex = Math.max(...Object.values(draft.zIndexMap[cardId] || {}), 0) + 1;

                newLayerId = maxLayerId + 1;

                // 복사한 레이어의 z-index, layerId 업데이트 함
                newLayer = {
                  ...layer,
                  id: newLayerId,
                  position: {
                    ...layer.position,
                    zIndex: newZIndex,
                    x: layer.position.x + 10, // 약간의 오프셋을 주어 겹치지 않게 함
                    y: layer.position.y + 10,
                  },
                };

                draft.cards[cardId].layers.push(newLayer);

                if (!draft.zIndexMap[cardId]) {
                  draft.zIndexMap[cardId] = {};
                }
                draft.zIndexMap[cardId][newLayerId] = newZIndex;

                useFocusStore.getState().updateFocus(cardId, newLayerId);
              },
            ),
          );

          if (newLayerId === undefined || newLayer === undefined) return null;

          return {
            layerId: newLayerId,
            layerData: newLayer,
          };
        },
        
        moveLayerForward: (cardId, layerId) =>
          set(
            produce((draft: Draft<{ cards: Card[]; zIndexMap: ZIndexMap }>) => {
              const cardZIndexMap = draft.zIndexMap[cardId];
              if (!cardZIndexMap) return;

              // 다음 z-index값 찾아서 swap
              const currentZIndex = cardZIndexMap[layerId];
              const nextHigherLayer = Object.entries(cardZIndexMap).find(
                ([id, zIndex]) => zIndex === currentZIndex + 1,
              );

              if (nextHigherLayer) {
                const [nextLayerId, nextZIndex] = nextHigherLayer;
                cardZIndexMap[layerId] = nextZIndex;
                cardZIndexMap[parseInt(nextLayerId)] = currentZIndex;
              }
            }),
          ),

        moveLayerBackward: (cardId, layerId) =>
          set(
            produce((draft: Draft<{ cards: Card[]; zIndexMap: ZIndexMap }>) => {
              const cardZIndexMap = draft.zIndexMap[cardId];
              if (!cardZIndexMap) return;

              // 이전 z-index값 찾아서 z-index swap
              const currentZIndex = cardZIndexMap[layerId];
              const nextLowerLayer = Object.entries(cardZIndexMap).find(([id, zIndex]) => zIndex === currentZIndex - 1);

              if (nextLowerLayer) {
                const [nextLayerId, nextZIndex] = nextLowerLayer;
                cardZIndexMap[layerId] = nextZIndex;
                cardZIndexMap[parseInt(nextLayerId)] = currentZIndex;
              }
            }),
          ),

        moveLayerToFront: (cardId, layerId) =>
          set(
            produce((draft: Draft<{ cards: Card[]; zIndexMap: ZIndexMap }>) => {
              const cardZIndexMap = draft.zIndexMap[cardId];
              if (!cardZIndexMap) return;

              const highestZIndex = Math.max(...Object.values(cardZIndexMap));
              const currentZIndex = cardZIndexMap[layerId];

              // 위로 보내고자 하는 z-index보다 큰 값 1씩 감소시킴
              Object.keys(cardZIndexMap).forEach(id => {
                const layerIdNum = parseInt(id);
                if (cardZIndexMap[layerIdNum] > currentZIndex) {
                  cardZIndexMap[layerIdNum]--;
                }
              });

              // 가장 큰 값을 현재 z-index로 설정
              cardZIndexMap[layerId] = highestZIndex;
            }),
          ),

        moveLayerToBack: (cardId, layerId) =>
          set(
            produce((draft: Draft<{ cards: Card[]; zIndexMap: ZIndexMap }>) => {
              const cardZIndexMap = draft.zIndexMap[cardId];
              if (!cardZIndexMap) return;

              const lowestZIndex = Math.min(...Object.values(cardZIndexMap));
              const currentZIndex = cardZIndexMap[layerId];

              // 밑으로 보내고자 하는 z-index보다 큰 값들을 1씩 증가시킴
              Object.keys(cardZIndexMap).forEach(id => {
                const layerIdNum = parseInt(id);
                if (cardZIndexMap[layerIdNum] < currentZIndex) {
                  cardZIndexMap[layerIdNum]++;
                }
              });

              // 가장 작은 값을 현재 z-index로 설정
              cardZIndexMap[layerId] = lowestZIndex;
            }),
          ),

        setUsedColors: color =>
          set(
            produce((draft: Draft<{ usedColors: string[] }>) => {
              draft.usedColors = Array.from(new Set([...draft.usedColors, color]));
            }),
          ),

        setUsedFonts: fontList =>
          set(
            produce((draft: Draft<{ usedFonts: string[] }>) => {
              draft.usedFonts = Array.from(new Set([...draft.usedFonts, ...fontList]));
            }),
          ),
      }),

      { name: 'cardStore' },
    ),
  ),
);

// ZIndexMap이 변경되면 card의 z-index도 변경되도록 하는 미들웨어
useCardsStore.subscribe(
  state => state.zIndexMap,
  zIndexMap => {
    useCardsStore.setState(
      produce((draft: Draft<{ cards: Card[] }>) => {
        draft.cards.forEach(card => {
          const cardZIndexMap = zIndexMap[card.id];

          if (cardZIndexMap) {
            card.layers.forEach(layer => {
              if (cardZIndexMap[layer.id] !== undefined) {
                layer.position.zIndex = cardZIndexMap[layer.id];
              }
            });
          }
        });
      }),
    );
  },
);
