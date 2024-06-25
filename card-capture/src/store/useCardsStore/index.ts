import { create } from 'zustand';
import { Card, Layer, LayerType, Position } from './type';
import { Draft, produce } from 'immer';
import React, { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';

/**
 * Card 1장을 받아 저장하는 스토어
 * 나중에는 여러장을 받을 수 있게 구조변경해야함!!!!!
 * useProjectStore도 설계되면 스토어를 조각으로 합쳐야 함
 */
type useCardsStore = {
  currentLayerRef: MutableRefObject<ReactQuill | null> | null;
  cards: Card[];

  setCurrentLayerRef: (ref: MutableRefObject<ReactQuill | null> | null) => void;
  setLayerText: (
    cardId: number,
    layerId: number,
    text: ReactQuill.Value,
  ) => void;
  setCard: (card: Card[]) => void;
  setPosition: (layerId: number, position: Position) => void;
  addTextLayer: (cardId: number) => void;
};

export const useCardsStore = create<useCardsStore>()(set => ({
  currentLayerRef: null,
  cards: [],

  setCurrentLayerRef: (ref: MutableRefObject<ReactQuill | null> | null) =>
    set(
      produce(draft => {
        draft.currentLayerRef = { ...ref };
      }),
    ),
  setLayerText: (cardId, layerId, text) => {
    console.log('hi');
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
            x: 150,
            y: 150,
            width: 100,
            height: 100,
            rotate: 0,
            zIndex: 2,
            opacity: 1,
          },
        });
      }),
    ),
}));
