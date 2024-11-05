import { Command } from '@/lib/commands/type';
import { useCommandStore } from '@/store/useCommandStore';

export const createInvoker = () => {
  return {
    executeCommand: (command: Command) => {
      command.execute();
      useCommandStore.getState().addToHistory(command);
    },
  };
};
