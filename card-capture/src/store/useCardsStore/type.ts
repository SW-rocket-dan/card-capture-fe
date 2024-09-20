import ReactQuill from 'react-quill';

export type Cards = {
  cards: Card[];
};

export type Card = {
  id: number;
  background: Background;
  layers: Layer[];
};

export type Background = {
  imageId?: number;
  url: string;
  opacity: number;
  color: string;
};

export type LayerType = 'text' | 'image' | 'shape' | 'illust';

export type Layer = {
  type: LayerType;
  content: Image | Shape | Text | Illust;
  id: number;
  position: Position;
};

export type Image = {
  imageId?: number;
  url: string;
  cropStartX: number;
  cropStartY: number;
  cropWidth: number;
  cropHeight: number;
};

export type ShapeType = 'rect' | 'circle' | 'triangle' | 'star';

export type Shape = {
  type: ShapeType;
  color: string;
};

export type Illust = {
  url: string;
};

export type Text = {
  content: ReactQuill.Value;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  zIndex: number;
  opacity: number;
};

export type ZIndexMap = {
  [cardId: number]: {
    [layerId: number]: number;
  };
};
