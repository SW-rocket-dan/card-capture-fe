import { Draft } from 'immer';
import { Card, Layer } from '@/store/useCardsStore/type';

type CardAndLayer = {
  card: Card;
  layer: Layer;
  layerIndex: number;
};

/**
 * 원하는 카드와 레이어를 찾아서 반환하는 유틸함수
 * cardStore에서 값을 변경할 때 검색하는 함수가 여러번 사용되어서 분리
 */
export const findCardAndLayer = (cards: Card[], cardId: number, layerId: number): CardAndLayer | null => {
  const card = cards.find(({ id }) => id === cardId);
  if (!card) return null;

  const layerIndex = card.layers.findIndex(l => l.id === layerId);
  if (layerIndex === -1) return null;

  const layer = card.layers[layerIndex];

  return { card, layer, layerIndex };
};

/**
 * 원하는 타입의 레이어를 찾아서 반환하는 유틸함수
 * 레이어를 찾은 후에 타입체크를 통해 타입을 좁혀서 반환
 */
export const findTypedLayer = <T extends Layer>(
  cards: Card[],
  cardId: number,
  layerId: number,
  type: T['type'],
): (CardAndLayer & { layer: T }) | null => {
  const found = findCardAndLayer(cards, cardId, layerId);
  if (!found) return null;

  const { card, layer, layerIndex } = found;
  if (layer.type !== type) return null;

  return { card, layer: layer as T, layerIndex };
};

/**
 * Draft용 유틸 함수
 */

type WritableDraftCard = Draft<Card>;
type WritableDraftLayer = Draft<Layer>;

type DraftCardAndLayer = {
  card: WritableDraftCard;
  layer: WritableDraftLayer;
  layerIndex: number;
};

/**
 * Draft에서 원하는 카드와 레이어를 찾아서 반환하는 유틸함수
 * cardStore에서 값을 변경할 때 검색하는 함수가 여러번 사용되어서 분리
 */
export const findDraftCardAndLayer = (
  cards: WritableDraftCard[],
  cardId: number,
  layerId: number,
): DraftCardAndLayer | null => {
  const card = cards.find(({ id }) => id === cardId);
  if (!card) return null;

  const layerIndex = card.layers.findIndex(l => l.id === layerId);
  if (layerIndex === -1) return null;

  const layer = card.layers[layerIndex];

  return { card, layer, layerIndex };
};

/**
 * Draft에서 원하는 타입의 레이어를 찾아서 반환하는 유틸함수
 * 레이어를 찾은 후에 타입체크를 통해 타입을 좁혀서 반환
 */
export const findTypedDraftLayer = <T extends Layer>(
  cards: WritableDraftCard[],
  cardId: number,
  layerId: number,
  type: T['type'],
): (DraftCardAndLayer & { layer: Draft<T> }) | null => {
  const found = findDraftCardAndLayer(cards, cardId, layerId);
  if (!found) return null;

  const { card, layer, layerIndex } = found;
  if (layer.type !== type) return null;

  return { card, layer: layer as Draft<T>, layerIndex };
};
