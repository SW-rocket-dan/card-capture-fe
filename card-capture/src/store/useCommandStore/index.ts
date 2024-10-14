import { create } from 'zustand';
import { Command } from '@/store/useCommandStore/type';
import { produce } from 'immer';
import { Layer } from '@/store/useCardsStore/type';
import { useCardsStore } from '@/store/useCardsStore';

type commandStore = {
  past: Command[];
  future: Command[];
  clipboard: Layer | null;

  addCommand: (command: Command) => void;
  undo: () => void;
  redo: () => void;
};

export const useCommandStore = create<commandStore>()((set, get) => ({
  past: [],
  future: [],
  clipboard: null,

  addCommand: command =>
    set(
      produce(draft => {
        // 새로 수행된 작업을 기록하고, 미래는 초기화
        draft.past.push(command);
        draft.future = [];
      }),
    ),
  undo: () =>
    set(
      produce(draft => {
        if (draft.past.length > 0) {
          const pastCommand = draft.past.pop();
          const currentCommand = getCurrentCommand(pastCommand);
          draft.future.push(currentCommand);

          // 과거 기록 재실행
          executeCommand(JSON.parse(JSON.stringify(pastCommand)));
        }
      }),
    ),
  redo: () =>
    set(
      produce(draft => {
        if (draft.future.length > 0) {
          const futureCommand = draft.future.pop();
          const currentCommand = getCurrentCommand(futureCommand);
          draft.past.push(currentCommand);

          executeCommand(JSON.parse(JSON.stringify(futureCommand)));
        }
      }),
    ),
}));

/**
 * 현재 상태에 대한 command 가져오는 함수
 */
const getCurrentCommand = (command: Command): Command => {
  const cardsStore = useCardsStore.getState();

  switch (command.type) {
    case 'ADD_LAYER':
    case 'DELETE_LAYER':
    case 'MODIFY_LAYER':
      const layer = cardsStore.getLayer(command.cardId, command.layerId);
      if (!layer) return command;

      return {
        ...command,
        layerData: layer,
      };
    case 'MODIFY_BACKGROUND':
      const bg = cardsStore.getBackground(command.cardId);
      if (!bg) return command;

      return {
        ...command,
        backgroundData: bg,
      };
    default:
      return command;
  }
};

/**
 * 명령대로 실행하는 힘수
 * 명령에 맞게 값을 변경,삭제,추가함 -> useCardStore의 값을 변경함
 */
const executeCommand = (command: Command) => {
  const { type, cardId } = command;
  const cardStore = useCardsStore.getState();

  switch (type) {
    case 'MODIFY_LAYER':
      if ('layerId' in command && 'layerData' in command && command.layerId !== undefined && command.layerData) {
        cardStore.setLayer(cardId, command.layerId, command.layerData);
      }
  }
};
