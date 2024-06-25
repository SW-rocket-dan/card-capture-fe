export type Offset = {
  y: number;
  x: number;
};

export type ResizeOffset = {
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
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
