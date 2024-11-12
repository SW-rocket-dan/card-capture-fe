import { Background, Image, LayerContentMap, LayerType, Position } from '@/store/useCardsStore/type';
import ReactQuill from 'react-quill';

export type Command = {
  type: CommandType;
  execute: () => void;
  undo: () => void;
};

export type CommandType =
  | 'ADD_LAYER'
  | 'DELETE_LAYER'
  | 'MODIFY_POSITION'
  | 'MODIFY_TEXT_LAYER'
  | 'MODIFY_IMAGE_LAYER'
  | 'MODIFY_SHAPE_LAYER'
  | 'MODIFY_ILLUST_LAYER'
  | 'MODIFY_BACKGROUND'
  | 'ADD_CARD'
  | 'DELETE_CARD'
  | 'COPY'
  | 'PASTE';

export type CommandParamsMap = {
  ADD_LAYER: {
    cardId: number;
    type: LayerType;
    content?: Partial<LayerContentMap[LayerType]>;
    position?: Partial<BasePosition>;
  };
  DELETE_LAYER: {
    cardId: number;
    layerId: number;
  };
  MODIFY_TEXT_LAYER: {
    cardId: number;
    layerId: number;
    text: ReactQuill.Value;
    initialText: ReactQuill.Value;
  };
  MODIFY_IMAGE_LAYER: {
    cardId: number;
    layerId: number;
    content: Image;
  };
  MODIFY_SHAPE_LAYER: {
    cardId: number;
    layerId: number;
    color: string;
    initialColor: string;
  };
  MODIFY_POSITION: {
    cardId: number;
    layerId: number;
    position: Position;
  };
  MODIFY_BACKGROUND: {
    cardId: number;
    backgroundData: Partial<Background>;
    initialBackgroundData: Background;
  };
};

export type BasePosition = Omit<Position, 'zIndex'>;
