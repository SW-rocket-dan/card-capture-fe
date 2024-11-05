import { CommandParamsMap } from '@/lib/commands/type';
import { CommandFactory } from '@/lib/commands/factories/commandFactory';
import { createInvoker } from '@/lib/commands/invoker';

export const dispatchCommand = <T extends keyof CommandParamsMap>(type: T, params: CommandParamsMap[T]) => {
  const command = CommandFactory.createCommand(type, params);
  const invoker = createInvoker();

  invoker.executeCommand(command);
};

export default { dispatchCommand };
