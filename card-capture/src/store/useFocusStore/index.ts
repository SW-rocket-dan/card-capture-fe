import { create } from 'zustand';
import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';
import { TabType } from '@/types';

type useFocusStore = {
  focusedCardId: number;
  focusedLayerId: number;
  currentRef: MutableRefObject<ReactQuill | null> | null;
  currentTab: TabType;

  setFocusedCardId: (focusedId: number) => void;
  setFocusedLayerId: (focusId: number) => void;
  setCurrentRef: (ref: MutableRefObject<ReactQuill | null> | null) => void;
  setCurrentTab: (tab: TabType) => void;

  updateFocus: (cardId: number, layerId: number) => void;
};

export const useFocusStore = create<useFocusStore>()(set => ({
  focusedCardId: 0,
  focusedLayerId: -1,
  currentRef: null,
  currentTab: 'edit',

  setFocusedCardId: focusedId => set({ focusedCardId: focusedId }),
  setFocusedLayerId: focusedId => set({ focusedLayerId: focusedId }),
  setCurrentRef: ref => set({ currentRef: ref }),
  setCurrentTab: tab => set({ currentTab: tab }),

  updateFocus: (cardId, layerId) => set({ focusedCardId: cardId, focusedLayerId: layerId }),
}));
