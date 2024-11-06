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

export type ContentType = Image | Shape | Text | Illust;

export type Layer = TextLayer | ImageLayer | ShapeLayer | IllustLayer;

export type TextLayer = {
  type: 'text';
  content: Text;
  id: number;
  position: Position;
};

export type ImageLayer = {
  type: 'image';
  content: Image;
  id: number;
  position: Position;
};

export type ShapeLayer = {
  type: 'shape';
  content: Shape;
  id: number;
  position: Position;
};

export type IllustLayer = {
  type: 'illust';
  content: Illust;
  id: number;
  position: Position;
};

export type LayerTypeMap = {
  text: TextLayer;
  image: ImageLayer;
  shape: ShapeLayer;
  illust: IllustLayer;
};

export type LayerContentMap = {
  text: TextLayer['content'];
  shape: ShapeLayer['content'];
  image: ImageLayer['content'];
  illust: IllustLayer['content'];
};

export type Image = {
  imageId?: number;
  url: string;
  cropStartX?: number;
  cropStartY?: number;
  cropWidth?: number;
  cropHeight?: number;
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

/**
 * 타입 가드
 */

export const isImageContent = (content: Layer['content']): content is Image => {
  return 'url' in content;
};

export const isShapeContent = (content: Layer['content']): content is Shape => {
  return 'type' in content && 'color' in content;
};

export const isIllustContent = (content: Layer['content']): content is Image => {
  return 'url' in content;
};

export const isTextContent = (content: Layer['content']): content is Text => {
  return 'content' in content;
};
