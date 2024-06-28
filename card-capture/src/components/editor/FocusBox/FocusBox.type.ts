export type Offset = {
  y: number;
  x: number;
};

export type ResizeOffset = {
  startClientX: number;
  startClientY: number;
  startWidth: number;
  startHeight: number;
  startCenterX: number;
  startCenterY: number;
};

export type Direction =
  | 'none'
  | 's'
  | 'w'
  | 'e'
  | 'n'
  | 'ne'
  | 'nw'
  | 'se'
  | 'sw';

export type calculateCoord = {
  e: PointerEvent;
  diffX: number;
  diffY: number;
  startX: number;
  startY: number;
};
