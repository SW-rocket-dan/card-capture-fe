import { Background, Layer, Position } from '@/store/useCardsStore/type';

export type Command = {
  type: CommandType;
  execute: () => void;
  undo: () => void;
};

export type LayerCommandParams = {
  cardId: number;
  layerId: number;
  layerData?: Layer;
};

export type BackgroundCommandParams = {
  cardId: number;
  backgroundData: Background;
};

export type CommandParams = LayerCommandParams | BackgroundCommandParams;

export type CommandType =
  | 'ADD_LAYER'
  | 'DELETE_LAYER'
  | 'MODIFY_LAYER'
  | 'MODIFY_BACKGROUND'
  | 'ADD_CARD'
  | 'DELETE_CARD'
  | 'COPY'
  | 'PASTE';

export type BasePosition = Omit<Position, 'zIndex'>;
