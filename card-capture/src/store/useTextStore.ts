import { create } from 'zustand';
import { DeltaStatic } from 'quill';

interface TextState {
  text: DeltaStatic | null;
  format: Record<string, any>;
  setText: (delta: DeltaStatic) => void;
  setFormat: (format: Record<string, any>) => void;
}

export const useTextStore = create<TextState>(set => ({
  text: null,
  format: {},
  setText: text => set({ text }),
  setFormat: format =>
    set((state: TextState) => ({
      format: { ...state.format, ...format },
    })),
}));
