export type Cards = {
  cards: Card[];
};

export type Card = {
  background: Background;
  layers: Layer[];
};
export type Background = {
  url: string;
  opacity: number;
  color: string;
};

export type Layer = {
  type: 'text' | 'image' | 'shape' | 'illust';
  content: Image | Shape | Text | Illust;
  id: number;
  opacity: number;
  zIndex: number; // array 쓰는 방식도 있긴함, sort 최적화문제 걱정 x
  position: Position;
};

export type Image = {
  url: string;
  cropStartX: number;
  cropStartY: number;
  cropWidth: number;
  cropHeight: number;
};

export type Shape = {
  type: 'rect' | 'circle' | 'triangle'; // svg로 쓸까?
  color: string;
};

export type Illust = {
  url: string;
};

//기술검토 필요
export type Text = {
  content: string;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
};
