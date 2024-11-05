import { create } from 'zustand';
import { Command, isBackgroundCommand, isLayerCommand } from '@/store/useCommandStore/type';
import { produce } from 'immer';
import { Layer } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';
import { commonUtils } from '@/utils';

type commandStore = {
  past: Command[];
  future: Command[];
  clipboard: Layer | null;

  addToHistory: (command: Command) => void;
  undo: () => void;
  redo: () => void;

  copy: (cardId: number, layerId: number) => void;
  paste: (cardId: number) => void;
};

export const useCommandStore = create<commandStore>()((set, get) => ({
  past: [],
  future: [],
  clipboard: null,

  addToHistory: command => {
    console.group('[addCommend]', command.type);
    console.info(command);

    set(
      produce(draft => {
        draft.past.push(command);
        draft.future = []; // 새 커맨드가 추가되면 future는 초기화
      }),
    );

    console.groupEnd();
  },
  undo: () =>
    set(
      produce(draft => {
        if (draft.past.length === 0) return;

        const command = draft.past.pop()!;
        command.undo();
        draft.future.push(command);
      }),
    ),
  redo: () =>
    set(
      produce(draft => {
        if (draft.future.length === 0) return;

        const command = draft.future.pop()!;
        command.execute();
        draft.past.push(command);
      }),
    ),

  copy: (cardId, layerId) =>
    set(
      produce(draft => {
        const cardsStore = useCardsStore.getState();
        const currentLayer = cardsStore.getLayer(cardId, layerId);

        if (!currentLayer) return;

        draft.clipboard = currentLayer;
      }),
    ),
  paste: cardId => {
    set(
      produce(draft => {
        if (!draft.clipboard) return;

        const cardsStore = useCardsStore.getState();

        const newLayerData = cardsStore.addDuplicateLayer(cardId, JSON.parse(JSON.stringify(draft.clipboard)));
        if (newLayerData === null) return;

        const { layerId, layerData } = newLayerData;
        draft.past.push({
          type: 'ADD_LAYER',
          cardId,
          layerId: layerId,
          layerData: layerData,
        });
      }),
    );
  },
}));

/**
 * 두 커맨드가 완전히 같은지 확인하는 함수 (깊은 비교)
 * 커맨드가 같은 경우에는 스택에 추가하지 않기 위해서 사용됨
 */
const areCommandsEqual = (command1: Command, command2: Command): boolean => {
  // 타입, 카드 아이디 비교
  if (command1.type !== command2.type || command1.cardId !== command2.cardId) {
    return false;
  }

  // LayerCommand 비교
  if (isLayerCommand(command1) && isLayerCommand(command2)) {
    return command1.layerId === command2.layerId && commonUtils.isEqual(command1.layerData, command2.layerData);
  }

  // BackgroundCommand 비교
  if (isBackgroundCommand(command1) && isBackgroundCommand(command2)) {
    return commonUtils.isEqual(command1.backgroundData, command2.backgroundData);
  }

  return false;
};
