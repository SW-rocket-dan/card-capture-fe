import { Command, CommandParamsMap, CommandType } from '@/lib/commands/type';
import {
  createAddLayerCommand,
  createDeleteLayerCommand,
  createModifyBackgroundCommand,
  createModifyImageLayerCommand,
  createModifyLayerPositionCommand,
  createModifyShapeLayerCommand,
  createModifyTextLayerCommand,
} from '@/lib/commands/concreteCommands';

type CommandImplementations = {
  [T in keyof CommandParamsMap]: (params: CommandParamsMap[T]) => Command;
};

const commandImplementations: CommandImplementations = {
  ADD_LAYER: ({ cardId, type, content }) => createAddLayerCommand(cardId, type, content),

  DELETE_LAYER: ({ cardId, layerId }) => createDeleteLayerCommand(cardId, layerId),

  MODIFY_TEXT_LAYER: ({ cardId, layerId, content }) => createModifyTextLayerCommand(cardId, layerId, content),

  MODIFY_IMAGE_LAYER: ({ cardId, layerId, content }) => createModifyImageLayerCommand(cardId, layerId, content),

  MODIFY_SHAPE_LAYER: ({ cardId, layerId, color }) => createModifyShapeLayerCommand(cardId, layerId, color),

  MODIFY_POSITION: ({ cardId, layerId, position }) => createModifyLayerPositionCommand(cardId, layerId, position),

  MODIFY_BACKGROUND: ({ cardId, backgroundData, initialBackgroundData }) =>
    createModifyBackgroundCommand(cardId, backgroundData, initialBackgroundData),
};

export const CommandFactory = {
  createCommand<T extends keyof CommandParamsMap>(type: T, params: CommandParamsMap[T]): Command {
    const implementation = commandImplementations[type];
    return implementation(params);
  },
};
