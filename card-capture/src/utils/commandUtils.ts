import { Command, CommandParamsMap, CommandType } from '@/lib/commands/type';
import { CommandFactory } from '@/lib/commands/factories/commandFactory';
import { createInvoker } from '@/lib/commands/invoker';

/**
 * 발신자를 생성하여 커맨드를 호출하는 함수
 * 발신자 생성 - 커맨드 생성 - 호출 하는 단계가 매번 반복되어서 유틸로 분리
 */
export const dispatchCommand = <T extends keyof CommandParamsMap>(type: T, params: CommandParamsMap[T]) => {
  const command = CommandFactory.createCommand(type, params);
  const invoker = createInvoker();

  invoker.executeCommand(command);
};

/**
 * 두 커맨드가 특정 커맨드 타입이면서 같은 커맨드 타입을 가지고 있는지 확인
 * 같은 타입 커맨드인 경우 replace 허기 위해 확인
 */
export const shouldReplaceCommand = (
  newCommand: Command,
  lastCommand: Command | undefined,
  commandType: CommandType[],
) => {
  if (!lastCommand) return false;

  return (
    commandType.includes(newCommand.type) &&
    commandType.includes(lastCommand.type) &&
    newCommand.type === lastCommand.type
  );
};

export default { dispatchCommand, shouldReplaceCommand };
