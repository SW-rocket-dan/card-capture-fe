import { create } from 'zustand';
import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';

type useFocusStore = {
  focusedId: number;
  currentRef: MutableRefObject<ReactQuill | null> | null;
  isDragging: boolean;

  setFocusedId: (focusId: number) => void;
  setCurrentRef: (ref: MutableRefObject<ReactQuill | null> | null) => void;
  setIsDragging: (isDragging: boolean) => void;
};

export const useFocusStore = create<useFocusStore>()(set => ({
  focusedId: -1,
  currentRef: null,
  isDragging: false,

  setFocusedId: focusedId => set({ focusedId }),
  setCurrentRef: ref => set({ currentRef: ref }),
  setIsDragging: isDragging => set({ isDragging }),
}));
