import { create } from 'zustand';
import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';

type useFocusStore = {
  focusedLayerId: number;
  currentRef: MutableRefObject<ReactQuill | null> | null;

  setFocusedLayerId: (focusId: number) => void;
  setCurrentRef: (ref: MutableRefObject<ReactQuill | null> | null) => void;
};

export const useFocusStore = create<useFocusStore>()(set => ({
  focusedLayerId: -1,
  currentRef: null,

  setFocusedLayerId: focusedId => set({ focusedLayerId: focusedId }),
  setCurrentRef: ref => set({ currentRef: ref }),
}));
