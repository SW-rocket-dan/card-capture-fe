import { create } from 'zustand';
import { MutableRefObject } from 'react';
import ReactQuill from 'react-quill';
import Delta from 'quill';

interface TextState {
  text: ReactQuill.Value | null;
  format: Record<string, any>;
  ref: MutableRefObject<ReactQuill | null> | null;
  setText: (delta: ReactQuill.Value) => void;
  setFormat: (format: Record<string, any>) => void;
  setRef: (ref: React.MutableRefObject<ReactQuill | null>) => void;
}

export const useTextStore = create<TextState>(set => ({
  text: null,
  format: {},
  ref: null,
  setText: text => set({ text }),
  setFormat: format =>
    set((state: TextState) => ({
      format: { ...state.format, ...format },
    })),
  setRef: ref => set({ ref }),
}));
