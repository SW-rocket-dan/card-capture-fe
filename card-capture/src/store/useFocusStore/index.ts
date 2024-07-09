import { create } from 'zustand';
import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';

type useFocusStore = {
  focusedCardId: number;
  focusedLayerId: number;
  currentRef: MutableRefObject<ReactQuill | null> | null;

  setFocusedCardId: (focusedId: number) => void;
  setFocusedLayerId: (focusId: number) => void;
  setCurrentRef: (ref: MutableRefObject<ReactQuill | null> | null) => void;
};

export const useFocusStore = create<useFocusStore>()(set => ({
  focusedCardId: 0,
  focusedLayerId: -1,
  currentRef: null,

  setFocusedCardId: focusedId => set({ focusedCardId: focusedId }),
  setFocusedLayerId: focusedId => set({ focusedLayerId: focusedId }),
  setCurrentRef: ref => set({ currentRef: ref }),
}));
