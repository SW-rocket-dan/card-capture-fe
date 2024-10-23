import { Background, Card, Layer } from '@/store/useCardsStore/type';

export type CommandType =
  | 'ADD_LAYER'
  | 'DELETE_LAYER'
  | 'MODIFY_LAYER'
  | 'MODIFY_BACKGROUND'
  | 'ADD_CARD'
  | 'DELETE_CARD'
  | 'COPY'
  | 'PASTE';

type BaseCommand = {
  type: CommandType;
  cardId: number;
};

type LayerCommand = BaseCommand & {
  type: 'ADD_LAYER' | 'DELETE_LAYER' | 'MODIFY_LAYER' | 'COPY' | 'PASTE';
  layerId: number;
  layerData: Layer;
};

type BackgroundCommand = BaseCommand & {
  type: 'MODIFY_BACKGROUND';
  backgroundData: Partial<Background>;
};

type CardCommand = BaseCommand & {
  type: 'ADD_CARD' | 'DELETE_CARD';
  cardData: Card;
};

export type Command = LayerCommand | BackgroundCommand | CardCommand;

// 타입 가드 함수
export const isLayerCommand = (command: Command): command is LayerCommand => {
  return ['ADD_LAYER', 'DELETE_LAYER', 'MODIFY_LAYER'].includes(command.type);
};

export const isBackgroundCommand = (command: Command): command is BackgroundCommand => {
  return command.type === 'MODIFY_BACKGROUND';
};
