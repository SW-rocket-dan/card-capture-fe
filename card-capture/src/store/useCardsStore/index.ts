import { create } from 'zustand';
import { Background, Card, Image, Layer, Position, Shape, ShapeType, Text, ZIndexMap } from './type';
import { Draft, produce } from 'immer';
import ReactQuill from 'react-quill';
import { useFocusStore } from '@/store/useFocusStore';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { useCommandStore } from '@/store/useCommandStore';

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
  getLayer: (cardId: number, layerId: number) => Layer | null;
  deleteLayer: (cardId: number, layerId: number) => void;

  getLayerText: (cardId: number, layerId: number) => ReactQuill.Value | null;
  setLayerText: (cardId: number, layerId: number, text: ReactQuill.Value) => void;

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
                const card = draft.cards.find(({ id }) => id === cardId);
                if (!card) return;

                const layerIndex = card.layers.findIndex(layer => layer.id === layerId);
                if (layerIndex !== -1) {
                  card.layers[layerIndex] = { ...card.layers[layerIndex], ...newLayer };
                }
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

                const layerToDelete = get().getLayer(cardId, layerId);
                if (!layerToDelete) return;

                card.layers = card.layers.filter(({ id }) => id !== layerId);

                useCommandStore.getState().addCommand({
                  type: 'DELETE_LAYER',
                  cardId,
                  layerId,
                  layerData: layerToDelete,
                });
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

                const beforeLayer = get().getLayer(cardId, layerId);
                if (!beforeLayer) return null;

                useCommandStore.getState().addCommand({
                  type: 'MODIFY_LAYER',
                  cardId,
                  layerId,
                  layerData: beforeLayer,
                });
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

                const beforeLayer = get().getLayer(cardId, layerId);
                if (!beforeLayer) return null;

                useCommandStore.getState().addCommand({
                  type: 'MODIFY_LAYER',
                  cardId,
                  layerId,
                  layerData: beforeLayer,
                });
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

              const beforeBg = get().getBackground(cardId);
              if (!beforeBg) return null;

              useCommandStore.getState().addCommand({
                type: 'MODIFY_BACKGROUND',
                cardId,
                backgroundData: beforeBg,
              });
            }),
          );
        },

        getBackground: (cardId: number) => {
          const card = get().cards.find(({ id }) => id === cardId);
          if (!card) return null;

          return card.background;
        },

        getImageLayer: (cardId, layerId) => {
          const card = get().cards.find(({ id }) => id === cardId);
          if (!card) return null;

          const layer = card.layers.find(({ id }) => id === layerId);
          if (!layer) return null;

          if (layer.type !== 'image') return null;

          return layer.content as Image;
        },

        setImageLayer: (cardId, layerId, image) =>
          set(
            produce(
              (
                draft: Draft<{
                  cards: Card[];
                }>,
              ) => {
                const card = draft.cards[cardId];
                if (!card) return null;

                const layer = card.layers.find(l => l.id === layerId);
                if (!layer) return null;

                layer.content = image;

                const beforeLayer = get().getLayer(cardId, layerId);
                if (!beforeLayer) return null;

                useCommandStore.getState().addCommand({
                  type: 'MODIFY_LAYER',
                  cardId,
                  layerId,
                  layerData: beforeLayer,
                });
              },
            ),
          ),

        setShapeLayerColor: (cardId, layerId, color) =>
          set(
            produce(draft => {
              const card = draft.cards.find((card: Card) => card.id === cardId);
              if (!card) return null;

              const layer = card.layers.find((layer: Layer) => layer.id === layerId);
              if (!layer || layer.type !== 'shape' || (layer.content as Shape).color === color) return;

              (layer.content as Shape).color = color;

              const beforeLayer = get().getLayer(cardId, layerId);
              if (!beforeLayer) return;

              useCommandStore.getState().addCommand({
                type: 'MODIFY_LAYER',
                cardId,
                layerId,
                layerData: beforeLayer,
              });
            }),
          ),

        getShapeLayer: (cardId, layerId) => {
          const card = get().cards.find(({ id }) => id === cardId);
          if (!card) return null;

          const layer = card.layers.find(({ id }) => id === layerId);
          if (!layer) return null;

          return layer.content as Shape;
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

                useCommandStore.getState().addCommand({
                  type: 'ADD_LAYER',
                  cardId,
                  layerId: layer.id,
                  layerData: layer,
                });
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

        addTextLayer: (cardId: number) =>
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
                const newLayerId = maxLayerId + 1;
                const newZIndex = Math.max(...Object.values(draft.zIndexMap[cardId] || {}), 0) + 1;

                const newLayer: Layer = {
                  id: newLayerId,
                  type: 'text',
                  content: {
                    content: '',
                  },
                  position: {
                    x: 220,
                    y: 220,
                    width: 200,
                    height: 60,
                    rotate: 0,
                    zIndex: newZIndex,
                    opacity: 100,
                  },
                };

                draft.cards[cardId].layers.push(newLayer);

                if (!draft.zIndexMap[cardId]) {
                  draft.zIndexMap[cardId] = {};
                }
                draft.zIndexMap[cardId][newLayerId] = newZIndex;

                useFocusStore.getState().updateFocus(cardId, newLayerId);

                useCommandStore.getState().addCommand({
                  type: 'ADD_LAYER',
                  cardId,
                  layerId: newLayerId,
                  layerData: newLayer,
                });
              },
            ),
          ),

        addImageLayer: (cardId, url, dimension) =>
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
                const newLayerId = maxLayerId + 1;
                const newZIndex = Math.max(...Object.values(draft.zIndexMap[cardId] || {}), 0) + 1;

                const newLayer: Layer = {
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
                    zIndex: newZIndex,
                    opacity: 100,
                  },
                };

                draft.cards[cardId].layers.push(newLayer);

                if (!draft.zIndexMap[cardId]) {
                  draft.zIndexMap[cardId] = {};
                }
                draft.zIndexMap[cardId][newLayerId] = newZIndex;

                useFocusStore.getState().updateFocus(cardId, newLayerId);

                useCommandStore.getState().addCommand({
                  type: 'ADD_LAYER',
                  cardId,
                  layerId: newLayerId,
                  layerData: newLayer,
                });
              },
            ),
          ),

        addShapeLayer: (cardId, type) =>
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
                const newLayerId = maxLayerId + 1;
                const newZIndex = Math.max(...Object.values(draft.zIndexMap[cardId] || {}), 0) + 1;

                const newLayer: Layer = {
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
                    zIndex: newZIndex,
                    opacity: 100,
                  },
                };
                draft.cards[cardId].layers.push(newLayer);

                if (!draft.zIndexMap[cardId]) {
                  draft.zIndexMap[cardId] = {};
                }
                draft.zIndexMap[cardId][newLayerId] = newZIndex;

                useFocusStore.getState().updateFocus(cardId, newLayerId);

                useCommandStore.getState().addCommand({
                  type: 'ADD_LAYER',
                  cardId,
                  layerId: newLayerId,
                  layerData: newLayer,
                });
              },
            ),
          ),

        addIllustLayer: (cardId, url) =>
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
                const newLayerId = maxLayerId + 1;
                const newZIndex = Math.max(...Object.values(draft.zIndexMap[cardId] || {}), 0) + 1;

                const newLayer: Layer = {
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
                    zIndex: newZIndex,
                    opacity: 100,
                  },
                };
                draft.cards[cardId].layers.push(newLayer);

                if (!draft.zIndexMap[cardId]) {
                  draft.zIndexMap[cardId] = {};
                }
                draft.zIndexMap[cardId][newLayerId] = newZIndex;

                useFocusStore.getState().updateFocus(cardId, newLayerId);

                useCommandStore.getState().addCommand({
                  type: 'ADD_LAYER',
                  cardId,
                  layerId: newLayerId,
                  layerData: newLayer,
                });
              },
            ),
          ),

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
