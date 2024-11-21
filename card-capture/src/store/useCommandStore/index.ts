import { create } from 'zustand';
import { produce } from 'immer';
import { Layer } from '@/store/useCardsStore/type';
import { Command } from '@/lib/commands/type';
import { shouldReplaceCommand } from '@/utils/commandUtils';

type commandStore = {
  past: Command[];
  future: Command[];
  clipboard: Layer | null;

  addToHistory: (command: Command) => void;
  undo: () => void;
  redo: () => void;

  setClipboard: (layer: Layer | null) => void;
};

export const useCommandStore = create<commandStore>()((set, get) => ({
  past: [],
  future: [],
  clipboard: null,
  lastCommandTime: 0,

  addToHistory: command => {
    console.group('[addCommend]', command.type);
    console.info(command);

    set(
      produce(draft => {
        const lastCommand = draft.past[draft.past.length - 1];

        const currentTime = Date.now();
        const timeDiff = currentTime - draft.lastCommandTime;

        // 색상 변경과 같이 연속 변경되는 커맨드들은 push가 아닌 replace / 이전값을 유지해서 초기 배경값 유지
        // 시간 차이 1초 이내일 때만 replace

        if (
          shouldReplaceCommand(command, lastCommand, [
            'MODIFY_BACKGROUND',
            'MODIFY_SHAPE_LAYER',
            'MODIFY_TEXT_LAYER',
          ]) &&
          timeDiff < 200
        ) {
          if (command.type === 'MODIFY_BACKGROUND')
            draft.past[draft.past.length - 1] = {
              ...command,
              initialBackgroundData: lastCommand.initialBackgroundData,
            };

          if (command.type === 'MODIFY_SHAPE_LAYER')
            draft.past[draft.past.length - 1] = {
              ...command,
              initialColor: lastCommand.initialColor,
            };

          if (command.type === 'MODIFY_TEXT_LAYER')
            draft.past[draft.past.length - 1] = {
              ...command,
              initialText: lastCommand.initialText,
            };

          draft.lastCommandTime = currentTime; // 현재 시간 업데이트
          return;
        }

        draft.past.push(command);
        draft.future = []; // 새 커맨드가 추가되면 future는 초기화
        draft.lastCommandTime = currentTime; // 현재 시간 업데이트
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

  setClipboard: layer => set({ clipboard: layer }),
}));
