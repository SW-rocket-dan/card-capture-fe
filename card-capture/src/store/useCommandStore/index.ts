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

  addCommand: (command: Command) => void;
  undo: () => void;
  redo: () => void;

  copy: (cardId: number, layerId: number) => void;
  paste: (cardId: number) => void;
};

export const useCommandStore = create<commandStore>()((set, get) => ({
  past: [],
  future: [],
  clipboard: null,

  addCommand: command =>
    set(
      produce(draft => {
        const currentPast = get().past;

        // 과거 커맨드와 비교해서 같으면 추가하지 않음
        if (currentPast.length > 0) {
          const pastCommand = currentPast[currentPast.length - 1];

          if (areCommandsEqual(pastCommand, command)) return;
        }
        
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

          undoCommand(JSON.parse(JSON.stringify(pastCommand)));
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
        cardsStore.addDuplicateLayer(cardId, JSON.parse(JSON.stringify(draft.clipboard)));
      }),
    );
  },
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
    case 'ADD_LAYER':
      if ('layerData' in command && command.layerData) {
        cardStore.addLayer(cardId, command.layerData as Layer);
      }
      break;
    case 'DELETE_LAYER':
      if ('layerId' in command && command.layerId !== undefined) {
        cardStore.deleteLayer(cardId, command.layerId);
      }
      break;
    case 'MODIFY_LAYER':
      if ('layerId' in command && 'layerData' in command && command.layerId !== undefined && command.layerData) {
        cardStore.setLayer(cardId, command.layerId, command.layerData);
      }
      break;
    case 'MODIFY_BACKGROUND':
      if ('backgroundData' in command) {
        cardStore.setBackground(cardId, command.backgroundData);
      }
  }
};

/**
 * 명령을 반대로 실행하는 함수
 * undo할 때 이전 명령을 취소하는 커맨드를 실행함
 */
const undoCommand = (command: Command) => {
  const { type, cardId } = command;
  const cardStore = useCardsStore.getState();

  switch (type) {
    case 'ADD_LAYER':
      if ('layerData' in command && command.layerId !== undefined) {
        cardStore.deleteLayer(cardId, command.layerId);
      }
      break;
    case 'DELETE_LAYER':
      if ('layerId' in command && command.layerData && command.layerId !== undefined) {
        cardStore.addLayer(cardId, command.layerData);
      }
      break;
    case 'MODIFY_LAYER':
      if ('layerId' in command && 'layerData' in command && command.layerId !== undefined && command.layerData) {
        cardStore.setLayer(cardId, command.layerId, command.layerData);
      }
      break;
    case 'MODIFY_BACKGROUND':
      if ('backgroundData' in command) {
        cardStore.setBackground(cardId, command.backgroundData);
      }
  }
};

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
