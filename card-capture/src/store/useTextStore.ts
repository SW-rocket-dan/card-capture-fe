import { create } from 'zustand';
import { MutableRefObject, useRef } from 'react';
import ReactQuill from 'react-quill';

interface TextState {
  index: number;
  text: ReactQuill.Value[];
  ref: Array<MutableRefObject<ReactQuill | null> | null>;
  setIndex: (index: number) => void;
  setText: (index: number, delta: ReactQuill.Value) => void;
  setRef: (
    index: number,
    ref: React.MutableRefObject<ReactQuill | null>,
  ) => void;
  addTextBox: () => void;
}

export const useTextStore = create<TextState>(set => ({
  index: 0,
  text: [],
  ref: [],
  setIndex: index => set({ index }),
  setText: (index, newText) =>
    set(({ text }) => {
      const newState = [...text];
      if (index >= 0 && index < newState.length) {
        newState[index] = newText;
      }
      return { text: newState };
    }),
  setRef: (index, newRef) =>
    set(({ ref }) => {
      const newState = [...ref];
      if (index >= 0 && index < newState.length) {
        newState[index] = newRef;
      }
      return { ref: newState };
    }),
  addTextBox: () =>
    set(({ ref, text }) => {
      return { text: [...text, ''], ref: [...ref, null] };
    }),
}));
